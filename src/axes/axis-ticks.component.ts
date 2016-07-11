import { Component, Input, OnChanges } from '@angular/core';
import { Orientation } from '../utils';
import { hexToRGBA, isNotDefined, identity } from '../utils';

function tickTransform_svg_axisX(scale, tick) {
  return [~~ (0.5 + scale(tick)), 0];
}

function tickTransform_svg_axisY(scale, tick) {
  return [0, ~~ (0.5 + scale(tick))];
}

@Component({
  selector: 'ng-axis-tick',
  template: `
    <g class="{{className}}" [attr.transform]="finalTransform">
      <line shape-rendering="crispEdges" [attr.opacity]="tickStrokeOpacity" [attr.stroke]="tickStroke" [attr.x2]="x2" [attr.y2]="y2" />
      <text
        [attr.dy]="dy" [attr.x]="x" [attr.y]="y"
        [attr.fill]="tickStroke"
        [attr.font-size]="fontSize"
        [attr.font-family]="fontFamily"
        [attr.text-anchor]="textAnchor">
        <ng-content></ng-content>
      </text>
    </g>
  `
})
export class AxisTickComponent implements OnChanges {
  @Input() public className: string;
  @Input() public defaultClassName: string = 'ng2-stockcharts-axis-tick ';
  @Input() public transform: Array<number>;
  @Input() public tickStroke: string;
  @Input() public tickStrokeOpacity: number;
  @Input() public textAnchor: string;
  @Input() public fontSize: number;
  @Input() public fontFamily: string;
  @Input() public x: number;
  @Input() public y: number;
  @Input() public x2: number;
  @Input() public y2: number;
  @Input() public dy: string;

  private finalTransform: string;

  ngOnChanges() {
    this.className = this.defaultClassName.concat(this.className);
    this.finalTransform = `translate(${this.transform[0]}, ${this.transform[1]})`;
  }

  static drawOnCanvasStatic(tick, ctx, result) {
    let { scale, tickTransform, canvas_dy, x, y, x2, y2, format } = result;

    let origin = tickTransform(scale, tick);

    ctx.beginPath();

    ctx.moveTo(origin[0], origin[1]);
    ctx.lineTo(origin[0] + x2, origin[1] + y2);
    ctx.stroke();

    ctx.fillText(format(tick), origin[0] + x, origin[1] + y + canvas_dy);
  }
}

@Component({
  selector: 'ng-axis-ticks',
  template: `
    <g>
      <ng-axis-tick *ngFor="let tick of ticks" [transform]="result.tickTransform(scale, tick)"
        [tickStroke]="tickStroke" [tickStrokeOpacity]="tickStrokeOpacity"
        [dy]="result.dy" [x]="result.x" [y]="result.y"
        [x2]="result.x2" [y2]="result.y2" [textAnchor]="textAnchor"
        [fontSize]="fontSize" [fontFamily]="fontFamily">{{result.format(tick)}}</ng-axis-tick>
    </g>
  `
})
export class AxisTicksComponent implements OnChanges {
  @Input() public orient: Orientation;
  @Input() public innerTickSize: number = 5;
  @Input() public tickFormat: any;
  @Input() public tickPadding: number = 6;
  @Input() public ticks: Array<number> = [10];
  @Input() public tickValues: any;
  @Input() public scale: any;
  @Input() public tickStroke: string = '#000000';
  @Input() public tickStrokeOpacity: number = 1;
  @Input() public fontSize: number;
  @Input() public fontFamily: string;

  public result: any;
  public format: any;

  ngOnChanges() {
    this.result = AxisTicksComponent._helper(this);
  }

  static _helper(component: AxisTicksComponent, _scale?: any) {
    let scale = _scale ? _scale : component.scale;

    let ticks = isNotDefined(component.tickValues)
      ? (scale.ticks
        ? scale.ticks.apply(scale, component.ticks)
        : scale.domain())
      : component.tickValues;

    let baseFormat = scale.tickFormat
      ? scale.tickFormat.apply(scale, component.ticks)
      : identity;

    let format = isNotDefined(component.tickFormat)
      ? baseFormat
      : d => baseFormat(d) ? component.tickFormat(d) : '';

    let sign = component.orient === Orientation.TOP || component.orient === Orientation.LEFT ? -1 : 1;
    let tickSpacing = Math.max(component.innerTickSize, 0) + component.tickPadding;

    let tickTransform;
    let x;
    let y;
    let x2;
    let y2;
    let dy;
    let canvas_dy;
    let textAnchor;

    if (component.orient === Orientation.BOTTOM || component.orient === Orientation.TOP) {
      tickTransform = tickTransform_svg_axisX;
      x2 = 0;
      y2 = sign * component.innerTickSize;
      x = 0;
      y = sign * tickSpacing;
      dy = sign < 0 ? '0em' : '.71em';
      canvas_dy = sign < 0 ? 0 : (component.fontSize * .71);
      textAnchor = 'middle';
    }
    else {
      tickTransform = tickTransform_svg_axisY;
      x2 = sign * component.innerTickSize;
      y2 = 0;
      x = sign * tickSpacing;
      y = 0;
      dy = '.32em';
      canvas_dy = (component.fontSize * .32);
      textAnchor = sign < 0 ? 'end' : 'start';
    }

    return { ticks, scale: scale, tickTransform, tickStroke: component.tickStroke, tickStrokeOpacity: component.tickStrokeOpacity, dy, canvas_dy, x, y, x2, y2, textAnchor, fontSize: component.fontSize, fontFamily: component.fontFamily, format };
  }

  static drawOnCanvasStatic(component: AxisTicksComponent, ctx: CanvasRenderingContext2D, xScale: any, yScale: any) {
    let xAxis = (component.orient === Orientation.BOTTOM || component.orient === Orientation.TOP);

    let result = AxisTicksComponent._helper(component, xAxis ? xScale : yScale);

    let { tickStroke, tickStrokeOpacity, textAnchor, fontSize, fontFamily } = result;

    ctx.strokeStyle = hexToRGBA(component.tickStroke, component.tickStrokeOpacity);

    ctx.font = `${component.fontSize}px ${component.fontFamily}`;
    ctx.fillStyle = component.tickStroke;
    ctx.textAlign = result.textAnchor === 'middle' ? 'center' : result.textAnchor;

    result.ticks.forEach((tick) => {
      AxisTickComponent.drawOnCanvasStatic(tick, ctx, result);
    });
  }
};
