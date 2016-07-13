import { Component, Input, OnInit } from '@angular/core';
import { first, last, hexToRGBA } from '../utils';
import { Orientation } from '../types';
import { AxisComponent } from './axis.component';

@Component({
  selector: 'ng-axis-line',
  template: `
    <svg:path
      [ngClass]="setPathClass()"
      [attr.shape-rendering]="shapeRendering"
      [attr.d]="d"
      [attr.fill]="fill"
      [attr.opacity]="opacity"
      [attr.stroke]="stroke"
      [attr.stroke-width]="strokeWidth">
    </svg:path>
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

  ngOnInit() {
    console.log('axis-line', this.range);
    this.calculateState();
  }

  private calculateState() {
    this.sign = this.orient === Orientation.TOP || this.orient === Orientation.LEFT ? -1 : 1;

    if (this.orient === Orientation.BOTTOM || this.orient === Orientation.TOP) {
      this.d = `M${this.range[0]},${this.sign * this.outerTickSize}V0H${this.range[1]}V${this.sign * this.outerTickSize}`;
    } else {
      this.d = `M${this.sign * this.outerTickSize},${this.range[0]}H0V${this.range[1]}H${this.sign * this.outerTickSize}`;
    }

    console.log('calculateState', this.orient, this.range, this.sign, this.outerTickSize, this.d);
  }

  setPathClass(): string {
    return this.className || '';
  }

  drawOnCanvas(ctx: CanvasRenderingContext2D) {
    let sign: number = this.orient === Orientation.TOP || this.orient === Orientation.LEFT ? -1 : 1;
    let xAxis: boolean = (this.orient === Orientation.BOTTOM || this.orient === Orientation.TOP);

    ctx.lineWidth = this.strokeWidth;
    ctx.strokeStyle = hexToRGBA(this.stroke, this.opacity);

    ctx.beginPath();

    if (xAxis) {
      ctx.moveTo(this.range[0], sign * this.outerTickSize);
      ctx.lineTo(this.range[0], 0);
      ctx.lineTo(this.range[1], 0);
      ctx.lineTo(this.range[1], sign * this.outerTickSize);
    } else {
      ctx.moveTo(sign * this.outerTickSize, this.range[0]);
      ctx.lineTo(0, this.range[0]);
      ctx.lineTo(0, this.range[1]);
      ctx.lineTo(sign * this.outerTickSize, this.range[1]);
    }

    ctx.stroke();
  }
};
