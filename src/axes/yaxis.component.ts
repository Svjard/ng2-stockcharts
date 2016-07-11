import { Component, Input, OnInit, Host } from '@angular/core';
import { AxisAlignment, YAxisOrientation } from '../utils';
import { AxisComponent } from 'axis.component';
import { ChartComponent } from '../chart.component';

@Component({
  selector: 'ng-yaxis',
  template: `
    <ng-axis
      [className]="className"
      [transform]={[axisLocation, 0]}
      [range]={[0, this.context.height]}
      [tickFormat]={{tickFormat}} ticks={{[ticks]}} tickValues={{tickValues}}
      [scale]={{yScale}></ng-axis>
  `,
  directives: [AxisComponent]
})
export class YAxis {
  @Input() public axisAt: number || AxisAlignment;
  @Input() public orient: YAxisOrientation;
  @Input() public innerTickSize: number;
  @Input() public outerTickSize: number;
  @Input() public tickFormat: any;
  @Input() public tickPadding: number;
  @Input() public tickSize: number;
  @Input() public ticks: number = 10;
  @Input() public tickValues: Array<number>;
  @Input() public percentScale: boolean;
  @Input() public showTicks: boolean = true;
  @Input() public showGrid: boolean = false;
  @Input() public showDomain: boolean = false;
  @Input() public className: string = 'ng2-stockcharts-yaxis';

  public axisLocation: number;

  constructor(@Host() private chart: ChartComponent) {}

  ngOnChanges() {
    this.yScale = (this.percentScale) ? this.chart.yScale.copy().domain([0, 1]) : this.chart.yScale;

    this.tickValues = this.tickValues || this.chart.yTicks;

    if (this.axisAt === AxisAlignment.LEFT) {
      this.axisLocation = 0;
    }
    else if (axisAt ===  AxisAlignment.RIGHT) {
      this.axisLocation = this.context.width;
    }
    else if (axisAt ===  AxisAlignment.MIDDLE) {
      this.axisLocation = (this.context.width) / 2;
    }
    else {
      this.axisLocation = this.axisAt;
    }
}
