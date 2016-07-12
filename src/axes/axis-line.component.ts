import { Component, Input, OnInit } from '@angular/core';
import { first, last, hexToRGBA, Orientation } from '../utils';
import { AxisComponent } from './axis.component';

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
  @Input() public className: string = 'ng2-stockcharts-axis-line';
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

  drawOnCanvasStatic(ctx: CanvasRenderingContext2D) {
    let { orient, outerTickSize, stroke, strokeWidth, opacity, range } = this;

    let sign = orient === Orientation.TOP || orient === Orientation.LEFT ? -1 : 1;
    let xAxis = (orient === Orientation.BOTTOM || orient === Orientation.TOP);

    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle = hexToRGBA(stroke, opacity);

    ctx.beginPath();

    if (xAxis) {
      ctx.moveTo(range[0], sign * outerTickSize);
      ctx.lineTo(range[0], 0);
      ctx.lineTo(range[1], 0);
      ctx.lineTo(range[1], sign * outerTickSize);
    } else {
      ctx.moveTo(sign * outerTickSize, range[0]);
      ctx.lineTo(0, range[0]);
      ctx.lineTo(0, range[1]);
      ctx.lineTo(sign * outerTickSize, range[1]);
    }

    ctx.stroke();
  }
};
