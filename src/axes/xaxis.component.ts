import { Component, Input, OnInit, OnChanges, Host } from '@angular/core';
import { XAxisAlignment, XAxisOrientation } from '../types';
import { AxisComponent } from './axis.component';
import { ChartComponent } from '../chart.component';
import { ChartCanvasComponent } from '../chart-canvas.component'

@Component({
  selector: 'ng-xaxis',
  template: `
    <ng-axis
      [className]="className"
      [range]="range"
      [transform]="transform"
      [showTicks]="showTicks" [tickFormat]="tickFormat" [ticks]="ticks"
      [scale]="chart.chartCanvas.xScale"></ng-axis>`,
  directives: [AxisComponent],
  viewProviders: [ChartComponent]
})
export class XAxisComponent implements OnInit, OnChanges {
  @Input() public axisAt: XAxisAlignment;
  @Input() public orient: XAxisOrientation;
  @Input() public innerTickSize: number;
  @Input() public outerTickSize: number = 1;
  @Input() public tickFormat: any;
  @Input() public tickPadding: number;
  @Input() public tickSize: number;
  @Input() public ticks: number = 10;
  @Input() public tickValues: Array<number>;
  @Input() public showTicks: boolean = true;
  @Input() public showGrid: boolean = false;
  @Input() public className: string = 'ng2-stockcharts-xaxis';

  private range: [number, number];
  private transform: [number, number];

  constructor(@Host() private chart: ChartComponent) {}

  ngOnInit() {
    this.calculateState();
  }

  ngOnChanges() {
    this.calculateState();
  }

  private calculateState() {
    let axisLocation: number;
    if (this.axisAt === XAxisAlignment.TOP) {
      axisLocation = 0;
    } else if (this.axisAt ===  XAxisAlignment.BOTTOM) {
      axisLocation = this.chart.height;
    } else if (this.axisAt ===  XAxisAlignment.MIDDLE) {
      axisLocation = (this.chart.height) / 2;
    }

    this.range = [0, this.chart.chartCanvas.width];
    this.transform = [0, axisLocation];

    if (this.tickFormat && this.chart.chartCanvas.xScale.isPolyLinear && this.chart.chartCanvas.xScale.isPolyLinear()) {
      console.warn('Cannot set tickFormat on a poly linear scale, ignoring tickFormat on XAxis');
      this.tickFormat = undefined;
    }
  }
};
