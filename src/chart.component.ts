import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, Host } from '@angular/core';
import { ChartCanvasComponent } from './chart-canvas.component';
import * as d3 from 'd3';
import { YMousePointerDisplayLocation, BoxModel } from './utils';

interface OriginFunc {
  (): [number, number]
}

@Component({
  selector: 'ng-chart',
  template: `
    <g [attr.transform]="transform">
      <ng-content></ng-content>
    </g>
  `,
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnChanges {
  @Input() public height: number | string;
  @Input() public width: number | string;
  @Input() public origin: [number, number] | OriginFunc;
  @Input() public id: string | number = 0;
  @Input() public yExtents: any;
  @Input() public yScale: any = d3.scale.linear();
  @Input() public yMousePointerDisplayLocation: YMousePointerDisplayLocation;
  @Input() public yMousePointerDisplayFormat: any;
  @Input() public flipYScale: boolean = false;
  @Input() public padding: (number | BoxModel) = 0;

  private yMousePointerRectWidth: number = 60;
  private yMousePointerRectHeight: number = 20;
  private canvasOriginX: number;
  private canvasOriginY: number;
  private interactiveState: any;
  private currentItem: any;
  private mouseXY: [number, number];
  private transform: string = '';

  public constructor(@Host() public chartCanvas: ChartCanvasComponent) {
    this.origin = [0, 0];
  }

  public getYScale() {
    return this.yScale.copy();
  }

  public getContext() {
    let chartId = this.id;

    let { width, height } = this;
    let canvasOriginX = 0.5 + this.origin[0] + this.chartCanvas.margin.left;
    let canvasOriginY = 0.5 + this.origin[1] + this.chartCanvas.margin.top;

    return { chartId, canvasOriginX, canvasOriginY, width, height };
  }

  public ngOnChanges() {
    this.transform = `translate(${ this.origin[0] }, ${ this.origin[1] })`;
  }
}
