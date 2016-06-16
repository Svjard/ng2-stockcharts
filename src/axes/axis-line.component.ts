import { Component, Input, OnInit } from '@angular/core';
import { first, last, hexToRGBA, Orientation } from '../utils';

@Component({
  selector: 'ng-axis-line',
  template: `
    <path
      class="{{className}}"
      [attr.shape-rendering]="shapeRendering"
      [attr.d]="d"
      [attr.fill]="fill"
      [attr.opacity]="opacity"
      [attr.stroke]="stroke"
      [attr.stroke-width]="strokeWidth">
    </path>
  `
})
export class AxisLineComponent {
  @Input() public className: string = 'stockcharts-axis-line';
  @Input() public shapeRendering: string = 'crispEdges';
  @Input() public orient: Orientation;
  @Input() public outerTickSize: number = 0;
  @Input() public fill: string = 'none';
  @Input() public stroke: string = '#000000';
  @Input() public strokeWidth: number = 1;
  @Input() public opacity: number = 1;
  @Input() public range: [number, number];

  public sign: number;
  public d: string;

  ngOnChanges() {
    this.sign = this.orient === Orientation.TOP || this.orient === Orientation.LEFT ? -1 : 1;

    if (this.orient === Orientation.BOTTOM || this.orient === Orientation.TOP) {
      this.d = "M" + this.range[0] + "," + this.sign * this.outerTickSize + "V0H" + this.range[1] + "V" + this.sign * this.outerTickSize;
    } else {
      this.d = "M" + this.sign * this.outerTickSize + "," + this.range[0] + "H0V" + this.range[1] + "H" + this.sign * this.outerTickSize;
    }
  }

  static drawOnCanvasStatic(component: AxisLineComponent, ctx: CanvasRenderingContext2D) {
    let { orient, outerTickSize, stroke, strokeWidth, opacity, range } = component;

    let sign = component.orient === Orientation.TOP || component.orient === Orientation.LEFT ? -1 : 1;
    let xAxis = (component.orient === Orientation.BOTTOM || component.orient === Orientation.TOP);

    ctx.lineWidth = component.strokeWidth;
    ctx.strokeStyle = hexToRGBA(component.stroke, component.opacity);

    ctx.beginPath();

    if (xAxis) {
      ctx.moveTo(component.range[0], component.sign * component.outerTickSize);
      ctx.lineTo(component.range[0], 0);
      ctx.lineTo(component.range[1], 0);
      ctx.lineTo(component.range[1], component.sign * component.outerTickSize);
    } else {
      ctx.moveTo(component.sign * component.outerTickSize, component.range[0]);
      ctx.lineTo(0, component.range[0]);
      ctx.lineTo(0, component.range[1]);
      ctx.lineTo(component.sign * component.outerTickSize, component.range[1]);
    }
    ctx.stroke();
  }
};
