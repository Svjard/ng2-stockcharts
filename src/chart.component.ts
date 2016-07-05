import { Component, Input, Output, EventEmitter, ElementRef, OnInit, OnChanges, Host } from '@angular/core';
import { ChartsContainerComponent } from './charts-container.component';
import * as d3 from 'd3';
import { YMousePointerDisplayLocation } from './utils';

@Component({
  selector: 'ng-chart',
  template: `
    <g [attr.transform]="transform">
      <ng-content></ng-content>
    </g>
  `,
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() public height: number | string;
  @Input() public width: number | string;
  @Input() public origin: [number, number] | () => [number, number] = [0, 0];
  @Input() public id: string | number = 0;
  @Input() public yExtents: any;
  @Input() public yScale: any = d3.scale.linear();
  @Input() public yMousePointerDisplayLocation: YMousePointerDisplayLocation;
  @Input() public yMousePointerDisplayFormat: any;
  @Input() public flipYScale: boolean = false;
  @Input() public padding: number | { top: number, left: number, right: number, bottom: number } = 0;
  @Input() public margin: number | { top: number, left: number, right: number, bottom: number } = 0;
  @Input() public show: boolean = true;

  private yMousePointerRectWidth: number = 60;
  private yMousePointerRectHeight: number = 20;
  private canvasOriginX: number;
  private canvasOriginY: number;
  private interactiveState: any;
  private currentItem: any;
  private mouseXY: [number, number];
  private transform: string = '';

  public constructor(@Host() chartsContainer: ChartsContainerComponent) {
    this.container = chartsContainer;
  }

  public yScale() {
    return this.yScale.copy();
  }

  public getContext() {
    let chartId = this.id;

    let { width, height } = this;
    let canvasOriginX = 0.5 + chartConfig.origin[0] + this.context.margin.left;
    let canvasOriginY = 0.5 + chartConfig.origin[1] + this.context.margin.top;

    return { chartId, canvasOriginX, canvasOriginY, width, height };
  }

  public ngOnInit() {
    window.addEventListener('resize', this.handleWindowResize);
    //let w = this.el.parentNode.clientWidth;

    //this.width = w;
  }

  public handleWindowResize() {

  }

  public ngOnChanges() {
    this.transform = `translate(${ this.origin.x }, ${ this.origin.y })`;
  }
}
