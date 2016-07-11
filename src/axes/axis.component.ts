import { Component, Input, OnChanges, ViewChild, ElementRef, Host } from '@angular/core';
import { Orientation, isDefined } from '../utils';
import { ChartComponent } from '../chart.component';
import { AxisLineComponent } from './axis-line.component';
import { AxisTicksComponent } from './axis-ticks.component';
import * as d3 from 'd3';

@Component({
  selector: 'ng-axis',
  template: `
    <g *ngIf="!chartCanvas.isChartHybrid()" class="{{className}}" [attr.transform]="finalTransform">
      <ng-axis-tick #axisTicks *ngIf="showTicks"></ng-axis-tick>
      <ng-axis-line #axisLine *ngIf="showDomain"></ng-axis-line>
    </g>
  `,
  directives: [AxisLineComponent, AxisTicksComponent]
})
export class AxisComponent implements OnChanges {
  @Input() public className: string;
  @Input() public defaultClassName: string = 'ng2-stockcharts-axis ';
  @Input() public transform: Array<number>;
  @Input() public orient: Orientation;
  @Input() public innerTickSize: number;
  @Input() public outerTickSize: number;
  @Input() public tickFormat: any;
  @Input() public tickPadding: number;
  @Input() public tickSize: number;
  @Input() public ticks: Array<number>;
  @Input() public tickValues: any;
  @Input() public scale: any;
  @Input() public showDomain: boolean = true;
  @Input() public showTicks: boolean = true;
  @Input() public fontFamily: string = 'Helvetica Neue, Helvetica, Arial, sans-serif';
  @Input() public fontSize: number = 12;

  @ViewChild(AxisTicksComponent)
  axisTicks: AxisTicksComponent;

  @ViewChild(AxisLineComponent)
  axisLine: AxisLineComponent;

  private finalTransform: string;

  constructor(@Host() private chart: ChartComponent) {}

  ngOnChanges() {
    this.className = this.defaultClassName.concat(this.className);
    this.finalTransform = `translate(${this.transform[0]}, ${this.transform[1]})`;
    if (this.chart.chartCanvas.isChartHybrid() && isDefined(this.chart.chartCanvas.getCanvases)) {
      this.drawOnCanvas(this);
    }
  }

  public drawOnCanvas(component: AxisComponent) {
    let contexts = component.chart.chartCanvas.getCanvases();
    if (contexts) {
      let { margin, canvasOriginX, canvasOriginY } = component.chart.getContext();
      this.drawOnCanvasStatic(margin, component, [canvasOriginX, canvasOriginY], component.chart.chartCanvas.getCanvases(), component.scale, component.scale);  
    }
  }

  private drawOnCanvasStatic(margin: { left: number, top: number, bottom: number, right: number }, canvasOrigin: [number, number], ctx, xScale: any, yScale: any) {
    let { transform, showDomain, showTicks } = component;
    ctx.save();

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.translate(canvasOrigin[0] + transform[0], canvasOrigin[1] + transform[1]);

    if (showDomain) {
      AxisLine.drawOnCanvasStatic(component.axisLine, component, ctx, xScale, yScale);
    }

    if (showTicks) {
      AxisTicks.drawOnCanvasStatic(component.axisTicks, ctx, xScale, yScale);
    }

    ctx.restore();
  }
}
