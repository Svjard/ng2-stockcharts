import { Component, Input, OnInit, Host } from '@angular/core';
import { YAxisAlignment, YAxisOrientation } from '../types';
import { AxisComponent } from './axis.component';
import { ChartComponent } from '../chart.component';

@Component({
  selector: 'ng-yaxis',
  template: `
    <ng-axis
      [className]="className"
      [range]="range"
      [transform]="transform"
      [orient]="orient"
      [innerTickSize]="innerTickSize"
      [outerTickSize]="outerTickSize"
      [tickFormat]="tickFormat"
      [tickPadding]="tickPadding"
      [tickSize]="tickSize"
      [ticks]="ticks"
      [tickValues]="tickValues"
      [showTicks]="showTicks"
      [showGrid]="showGrid" 
      [scale]="yScale"></ng-axis>`,
  directives: [AxisComponent],
  viewProviders: [ChartComponent]
})
export class YAxisComponent {
  @Input() public axisAt: YAxisAlignment;
  @Input() public orient: YAxisOrientation;
  @Input() public innerTickSize: number;
  @Input() public outerTickSize: number = 1;
  @Input() public tickFormat: any;
  @Input() public tickPadding: number;
  @Input() public tickSize: number;
  @Input() public ticks: number = 10;
  @Input() public tickValues: Array<number>;
  @Input() public percentScale: boolean = false;
  @Input() public showTicks: boolean = true;
  @Input() public showGrid: boolean = false;
  @Input() public showDomain: boolean = false;
  @Input() public className: string = 'ng2-stockcharts-yaxis';

  private yScale: any;
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
    this.yScale = (this.percentScale) ? this.chart.yScale.copy().domain([0, 1]) : this.chart.yScale;

    this.tickValues = this.tickValues || this.chart.yTicks;

    let axisLocation: number;
    console.log('test', this.axisAt);
    if (this.axisAt === YAxisAlignment.LEFT) {
      console.log('test a', 1);
      axisLocation = 0;
    } else if (this.axisAt ===  YAxisAlignment.RIGHT) {
      console.log('test b', this.chart.width);
      axisLocation = this.chart.width;
    } else if (this.axisAt ===  YAxisAlignment.MIDDLE) {
      console.log('test c', (this.chart.width) / 2);
      axisLocation = (this.chart.width) / 2;
    }

    this.range = [0, this.chart.height];
    console.log('as num', axisLocation);
    this.transform = [axisLocation, 0];
  }
}
