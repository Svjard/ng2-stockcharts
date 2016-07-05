import { Component, Input, Output, EventEmitter, ElementRef, OnInit, OnChanges, ViewChild } from '@angular/core';
import { ChartType, identity, shallowEqual, isDefined, isNotDefined } from './utils';
//import evaluator from './scale/evaluator';
import * as d3 from 'd3';
import {
  CanvasContainerComponent
} from './canvas-container.component';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAILY = 24 * HOUR;

const CANDIDATES_FOR_RESET = [
  'seriesName',
  'xScaleProvider',
  'map',
  'indexAccessor',
  'indexMutator'
 ];

function shouldResetChart(component: ChartCanvasComponent) {
  return !CANDIDATES_FOR_RESET.every(key => {
    let result = shallowEqual(component[key], component['previous' + key.charAt(0).toUpperCase() + key.slice(1)]);
    return result;
  });
}

function getDimensions(component: ChartCanvasComponent) {
  return {
    height: component.height - component.margin.top - component.margin.bottom,
    width: component.width - component.margin.left - component.margin.right,
  };
}

const cursorStyle = `
  .ng2-stockcharts-grabbing-cursor {
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
  }

  .ng2-stockcharts-crosshair-cursor {
    cursor: crosshair;
  }

  .ng2-stockcharts-tooltip-hover {
    pointer-events: all;
    cursor: pointer;
  }`;

const tooltipStyle = `
  .ng2-stockcharts-default-cursor {
    cursor: default;
  }
  .ng2-stockcharts-move-cursor {
    cursor: move;
  }
  .ng2-stockcharts-ns-resize-cursor {
    cursor: ns-resize;
  }
  .ng2-stockcharts-ew-resize-cursor {
    cursor: ew-resize;
  }`;

@Component({
  selector: 'ng-chart-canvas',
  template: `
    <div [ngStyle]="setContainerStyles()" class="{{className}}" >
      <ng-canvas-container [width]="width" [height]="height" [type]="type" [zIndex]="zIndex" />
      <svg class="{{className}}" [attr.width]="width" [attr.height]="height" [ngStyle]="setSvgStyles()">
        <style>{{getCursorStyle()}}</style>
        <defs>
          <clipPath id="chart-area-clip">
            <rect x="0" y="0" [attr.width]="dimensions.width" [attr.height]="dimensions.height" />
          </clipPath>
        </defs>
        <g transform="translate({{margin.left + 0.5}}, {{margin.top + 0.5}})"}>
        </g>
      </svg>
    </div>
  `
})
export class ChartCanvasComponent implements OnInit, OnChanges {
  @Input() public width: number;
  @Input() public height: number;
  @Input() public margin: { left: number, top: number, bottom: number, right: number } = { top: 20, right: 30, bottom: 30, left: 80 };
  @Input() public type: ChartType = ChartType.HYBRID;
  @Input() public data: Array<any>;
  @Input() public calculator: any = [];
  @Input() public xAccessor: (d: any) => any = identity;
  @Input() public xExtents: any = [d3.min, d3.max];
  @Input() public className: string = 'ng2-stockcharts';
  @Input() public seriesName: string;
  @Input() public zIndex: number = 1;
  @Input() public postCalculator: any = identity;
  @Input() public flipXScale: boolean = false;
  @Input() public padding: number | { left: number, top: number, bottom: number, right: number } = 0;
  @Input() public xScaleProvider: any;
  @Input() public xScale: any;

  //@ViewChild(EventHandlerComponent)
  //eventHandler: EventHandlerComponent
  @ViewChild(CanvasContainerComponent)
  canvases: CanvasContainerComponent;

  public indexAccessor: any = d => d.idx;
  //public indexMutator: any = (d, idx) => ({ ...d, idx });
  public map: any = identity;
  public dimensions: { width: number, height: number };

  private plotFull: boolean;

  static ohlcv(d: any) {
    return {
      date: d.date,
      open: d.open,
      high: d.high,
      low: d.low,
      close: d.close,
      volume: d.volume
    };
  }

  ngOnInit() {
    this.dimensions = getDimensions(this);
    this.calculateState();
  }

  /*ngDoCheck() {
    let reset = shouldResetChart(this);

    if (reset || !shallowEqual(this.xExtents, this.previousXExtents) || this.data !== this.previousData || !shallowEqual(this.calculator, this.previousCalculator)) {
      this.changeDetected = true;
    }

    this.changeDetected = false;
  }
*/
  ngOnChanges() {
    this.dimensions = getDimensions(this);
    this.calculateState();
  }

  private setContainerStyles(): any {
    let styles = {
      'position': 'relative',
      'height': this.height,
      'width': this.width
    };
    return styles;
  }

  private setSvgStyle(): any {
    let styles = {
      'position': 'absolute',
      'zIndex': this.zIndex + 5
    };
    return styles;
  }

  private getCursorStyle(): string {
    /*if (this.eventHandler) {
      return cursorStyle + tooltipStyle;
    } else {
      return tooltipStyle;
    }*/
    return '';
  }
  
  public getDataInfo(): any {
    //return this.eventHandler.getDataInfo();
    return;
  }
  
  public getCanvases(): any {
    if (this.canvases) {
      return this.canvases.getCanvasContexts();
    }
  }

  private calculateState(): any {
    let extent = typeof this.xExtents === 'function'
      ? this.xExtents(this.data)
      : d3.extent(this.xExtents.map(d => d3.functor(d)).map(each => each(this.data, this.xAccessor)));

    var { xAccessor, displayXAccessor, xScale, filterData, lastItem } = this.calculateFullData();

    var { plotData, domain } = filterData(extent, this.xAccessor);

    return {
      plotData,
      filterData,
      xScale: xScale.domain(domain),
      xAccessor,
      displayXAccessor,
      dataAltered: false,
      lastItem,
    };
  }

  private calculateFullData(): any {
    let wholeData = isDefined(this.plotFull) ? this.plotFull : this.xAccessor === identity;

    const dimensions = getDimensions(this);
    let evaluate = evaluator()
      .xAccessor(this.xAccessor)
      .indexAccessor(this.indexAccessor)
      //.indexMutator(this.indexMutator)
      .map(this.map)
      .useWholeData(wholeData)
      .width(dimensions.width)
      .scaleProvider(this.xScaleProvider)
      .xScale(this.xScale)
      .calculator(this.calculator);

    let { xAccessor, displayXAccessor, xScale, filterData, lastItem } = evaluate(this.data);

    return { xAccessor, displayXAccessor, xScale, filterData, lastItem };
  }
};
