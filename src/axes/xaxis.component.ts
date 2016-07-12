import { Component, Input, OnInit } from '@angular/core';
import { AxisAlignment, XAxisOrientation } from '../types';
import { AxisComponent } from 'axis.component';

@Component({
  selector: 'ng-xaxis',
  template: `
    <ng-axis
      [className]="className"
      [range]={{[0, this.context.width]}}
      [transform]={{[0, axisLocation]}}
      [showTicks]={{showTicks}} tickFormat={{tickFormat}} ticks={{ticks}}
      [scale]={{this.context.xScale}}></ng-axis>
  `
})
export class XAxis {
  @Input() public axisAt: number || AxisAlignment;
  @Input() public orient: XAxisOrientation;
  @Input() public innerTickSize: number;
  @Input() public outerTickSize: number;
  @Input() public tickFormat: any;
  @Input() public tickPadding: number;
  @Input() public tickSize: number;
  @Input() public ticks: number = 10;
  @Input() public tickValues: Array<number>;
  @Input() public showTicks: boolean = true;
  @Input() public showGrid: boolean = false;
  @Input() public className: string = 'ng2-stockcharts-xaxis';

  public axisLocation: number;

  constructor(@Host() private chart: ChartComponent) {}

  ngOnChanges() {
    if (this.axisAt === AxisAlignment.TOP) {
      this.axisLocation = 0;
    }
    else if (axisAt ===  AxisAlignment.BOTTOM) {
      this.axisLocation = this.chart.height;
    }
    else if (axisAt ===  AxisAlignment.MIDDLE) {
      this.axisLocation = (this.chart.height) / 2;
    }
    else {
      this.axisLocation = this.axisAt;
    }

    if (this.tickFormat && this.chart.xScale.isPolyLinear && this.chart.xScale.isPolyLinear()) {
      console.warn('Cannot set tickFormat on a poly linear scale, ignoring tickFormat on XAxis');
      this.tickFormat = undefined;
    }

    if (this.ticks) {
      this.ticks = [this.ticks];
    }
  }
};
