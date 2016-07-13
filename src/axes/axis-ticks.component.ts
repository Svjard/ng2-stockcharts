import { Component, Input, OnChanges } from '@angular/core';
import { Orientation } from '../types';
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
    <svg:g [ngClass]="setTickClass()" [attr.transform]="finalTransform">
      <svg:line shape-rendering="crispEdges" [attr.opacity]="tickStrokeOpacity" [attr.stroke]="tickStroke" [attr.x2]="x2" [attr.y2]="y2" />
      <svg:text
        [attr.dy]="dy" [attr.x]="x" [attr.y]="y"
        [attr.fill]="tickStroke"
        [attr.font-size]="fontSize"
        [attr.font-family]="fontFamily"
        [attr.text-anchor]="textAnchor">
        <ng-content></ng-content>
      </svg:text>
    </svg:g>
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
    this.finalTransform = `translate(${this.transform[0]}, ${this.transform[1]})`;
  }

  setTickClass(): string {
    return this.defaultClassName.concat(this.className || '');
  }

  drawOnCanvas(ctx: CanvasRenderingContext2D, result) {
    let { scale, tickTransform, canvas_dy, x, y, x2, y2, format } = result;

    let origin = tickTransform(scale, this);

    ctx.beginPath();

    ctx.moveTo(origin[0], origin[1]);
    ctx.lineTo(origin[0] + x2, origin[1] + y2);
    ctx.stroke();

    ctx.fillText(format(this), origin[0] + x, origin[1] + y + canvas_dy);
  }
}

@Component({
  selector: 'ng-axis-ticks',
  template: `
    <svg:g>
      <ng-axis-tick *ngFor="let tick of ticks" [transform]="result.tickTransform(scale, tick)"
        [tickStroke]="tickStroke" [tickStrokeOpacity]="tickStrokeOpacity"
        [dy]="result.dy" [x]="result.x" [y]="result.y"
        [x2]="result.x2" [y2]="result.y2" [textAnchor]="textAnchor"
        [fontSize]="fontSize" [fontFamily]="fontFamily">{{result.format(tick)}}</ng-axis-tick>
    </svg:g>
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
    this.result = this.process();
  }

  drawOnCanvas(ctx: CanvasRenderingContext2D, xScale: any, yScale: any) {
    let xAxis: boolean = (this.orient === Orientation.BOTTOM || this.orient === Orientation.TOP);

    let result = this.process(xAxis ? xScale : yScale);

    let { tickStroke, tickStrokeOpacity, textAnchor, fontSize, fontFamily } = result;

    ctx.strokeStyle = hexToRGBA(this.tickStroke, this.tickStrokeOpacity);

    ctx.font = `${this.fontSize}px ${this.fontFamily}`;
    ctx.fillStyle = this.tickStroke;
    ctx.textAlign = result.textAnchor === 'middle' ? 'center' : result.textAnchor;

    result.ticks.forEach((tick) => {
      tick.drawOnCanvas(ctx, result);
    });
  }

  private process(_scale?: any) {
    let scale = _scale ? _scale : this.scale;

    let ticks = isNotDefined(this.tickValues)
      ? (scale.ticks
        ? scale.ticks.apply(scale, this.ticks)
        : scale.domain())
      : this.tickValues;

    let baseFormat = scale.tickFormat
      ? scale.tickFormat.apply(scale, this.ticks)
      : identity;

    let format = isNotDefined(this.tickFormat)
      ? baseFormat
      : d => baseFormat(d) ? this.tickFormat(d) : '';

    let sign = this.orient === Orientation.TOP || this.orient === Orientation.LEFT ? -1 : 1;
    let tickSpacing = Math.max(this.innerTickSize, 0) + this.tickPadding;

    let tickTransform;
    let x;
    let y;
    let x2;
    let y2;
    let dy;
    let canvas_dy;
    let textAnchor;

    if (this.orient === Orientation.BOTTOM || this.orient === Orientation.TOP) {
      tickTransform = tickTransform_svg_axisX;
      x2 = 0;
      y2 = sign * this.innerTickSize;
      x = 0;
      y = sign * tickSpacing;
      dy = sign < 0 ? '0em' : '.71em';
      canvas_dy = sign < 0 ? 0 : (this.fontSize * .71);
      textAnchor = 'middle';
    }
    else {
      tickTransform = tickTransform_svg_axisY;
      x2 = sign * this.innerTickSize;
      y2 = 0;
      x = sign * tickSpacing;
      y = 0;
      dy = '.32em';
      canvas_dy = (this.fontSize * .32);
      textAnchor = sign < 0 ? 'end' : 'start';
    }

    return { ticks, scale: scale, tickTransform, tickStroke: this.tickStroke, tickStrokeOpacity: this.tickStrokeOpacity, dy, canvas_dy, x, y, x2, y2, textAnchor, fontSize: this.fontSize, fontFamily: this.fontFamily, format };
  }
};
