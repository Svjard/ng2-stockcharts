import { Component, Input, OnChanges, ViewChild, ElementRef, Host, OnInit } from '@angular/core';
import { isDefined } from '../utils';
import { XAxisOrientation, YAxisOrientation } from '../types';
import { ChartComponent } from '../chart.component';
import { AxisLineComponent } from './axis-line.component';
import { AxisTicksComponent } from './axis-ticks.component';
import * as d3 from 'd3';

@Component({
  selector: 'ng-axis',
  template: `
    <svg:g *ngIf="!chart.chartCanvas.isChartHybrid()" [ngClass]="setAxisClass()" [attr.transform]="finalTransform">
      <ng-axis-tick #axisTicks *ngIf="showTicks"></ng-axis-tick>
      <ng-axis-line #axisLine *ngIf="showDomain" [className]="className" [orient]="orient" [range]="range"></ng-axis-line>
    </svg:g>
  `,
  directives: [AxisLineComponent, AxisTicksComponent]
})
export class AxisComponent implements OnInit, OnChanges {
  @Input() public className: string;
  @Input() public defaultClassName: string = 'ng2-stockcharts-axis ';
  @Input() public transform: Array<number>;
  @Input() public range: [number, number];
  @Input() public orient: XAxisOrientation | YAxisOrientation;
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

  ngOnInit() {}

  ngOnChanges() {
    console.log('AxisComponent', 'ngOnChanges', this.orient, this.outerTickSize);
    this.finalTransform = `translate(${this.transform[0]}, ${this.transform[1]})`;
    if (this.chart.chartCanvas.isChartHybrid() && isDefined(this.chart.chartCanvas.getCanvases)) {
      this.drawOnCanvas(this);
    }
  }

  setAxisClass(): string {
    return this.defaultClassName.concat(this.className || '');
  }

  public drawOnCanvas(component: AxisComponent) {
    let contexts = component.chart.chartCanvas.getCanvases();
    if (contexts) {
      let { canvasOriginX, canvasOriginY } = component.chart.getContext();
      this._drawOnCanvas(component.chart.chartCanvas.margin, [canvasOriginX, canvasOriginY], component.chart.chartCanvas.getCanvases(), component.scale, component.scale);  
    }
  }

  private _drawOnCanvas(margin, canvasOrigin, ctx, xScale, yScale) {
    let { transform, showDomain, showTicks } = this;
    ctx.save();

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.translate(canvasOrigin[0] + transform[0], canvasOrigin[1] + transform[1]);

    if (showDomain) {
      this.axisLine.drawOnCanvas(ctx);
    }

    if (showTicks) {
      this.axisTicks.drawOnCanvas(ctx, xScale, yScale);
    }

    ctx.restore();
  }
}
