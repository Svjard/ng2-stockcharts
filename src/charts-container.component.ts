import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { ChartType, identity, shallowEqual last, isDefined, isNotDefined } from './utils';
import { shouldShowCrossHairStyle } from './utils/ChartDataUtil';
import evaluator from './scale/evaluator';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAILY = 24 * HOUR;

@Component({
  selector: 'ng-charts-container',
  template: `
    <div [ngStyle]="setContainerStyles()" class="{{className}}" >
      <ng-canvas-container [width]="width" [height]="height" [type]="type" [zIndex]="zIndex" />
      <svg class="{{className}}" [attr.width]="width" [attr.height]="height" [ngStyle]="setSvgStyles()">
        <defs>
          <clipPath id="chart-area-clip">
            <rect x="0" y="0" [attr.width]="dimensions.width" [attr.height]="dimensions.height" />
          </clipPath>
        </defs>
        <g transform="translate({{margin.left + 0.5}}, {{margin.top + 0.5}})"}>
        </g>
      </svg>
    </div>
  `,
  styles: [`
    '.stockcharts-grabbing-cursor {
      cursor: grabbing;
      cursor: -moz-grabbing;
      cursor: -webkit-grabbing;
    }
    
    .stockcharts-crosshair-cursor {
      cursor: crosshair;
    }
    
    .stockcharts-tooltip-hover {
      pointer-events: all;
      cursor: pointer;
    }
  `]
})
export class ChartsContainerComponent {
  @Input() public width: number;
  @Input() public height: number;
  @Input() public margin: { left: number, top: number, bottom: number, right: number } = { top: 20, right: 30, bottom: 30, left: 80 };
  @Input() public type: ChartType = ChartType.Hybrid;
  @Input() public data: Array;
  @Input() public calculator: any = [];
  @Input() public xAccessor: (d: any) => any = identity;
  @Input() public xExtents: [any, any] = [d3.min, d3.max];
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
  @ViewChildren(CanvasComponent)
  canvases: QueryList<CanvasComponent>;

  public indexAccessor: any = d => d.idx;
  public indexMutator: any = (d, idx) => ({ ...d, idx });
  public map: any = identity;

  static public getDimensions(component: ChartsContainerComponent) {
    return {
      height: component.height - component.margin.top - component.margin.bottom,
      width: component.width - component.margin.left - component.margin.right,
    };
  }

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

  ngOnChanges() {
    this.cursor = this.getCursorStyle();

    this.calculateState(this.props);

    var { plotData, filterData, xScale, xAccessor, dataAltered, lastItem, displayXAccessor } = this.state;
    var dimensions = getDimensions(this.props);

    var props = { padding, type, margin, postCalculator };
    var stateProps = { plotData, filterData, xScale, xAccessor, dataAltered, lastItem, displayXAccessor };
  }

  public setContainerStyles() {
    let styles = {
      'position': 'relative',
      'height': this.height,
      'width': this.width
    };
    return styles;
  }

  public setSvgStyle() {
    let styles = {
      'position': 'absolute',
      'zIndex': this.zIndex + 5
    };
    return styles;
  }

  public getAttributes(): any {
    let attrs {
      width,
      height,
      margin,
      type,
      data,
      calculator,
      xAccessor,
      xExtents,
      className,
      seriesName,
      zIndex,
      postCalculator,
      flipXScale,
      padding,
      xScaleProvider,
      xScale
    } = this;

    return attrs;
    // plotData, direction, dimensions,
  }
  
  public getDataInfo() {
    //return this.eventHandler.getDataInfo();
  }
  
  public getCanvases() {
    if (this.canvases && this.canvases.length > 0) {
      return this.canvases.getCanvasContexts(); // this is an array, can not call a function here
    }
  }

  private _calculateState() {
    //var { xAccessor: inputXAccesor, xExtents: xExtentsProp, xScaleProvider, plotFull, data } = props;

    let extent = typeof xExtentsProp === 'function'
      ? xExtentsProp(data)
      : d3.extent(xExtentsProp.map(d => d3.functor(d)).map(each => each(data, inputXAccesor)));

    var { xAccessor, displayXAccessor, xScale, filterData, lastItem } = calculateFullData();

    var { plotData, domain } = filterData(extent, inputXAccesor);

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

  private _calculateFullData() {
    //var { data: inputData, calculator, plotFull, xScale: xScaleProp } = props;
    //var { xAccessor: inputXAccesor, map, xScaleProvider, indexAccessor, indexMutator, discontinuous } = props;

    let wholeData = isDefined(this.plotFull) ? this.plotFull : this.xAccessor === identity;

    // xScale = discontinuousTimeScaleProvider(data);
    const dimensions = getDimensions(this);
    let evaluate = evaluator()
      .xAccessor(this.xAccessor)
      .indexAccessor(this.indexAccessor)
      .indexMutator(this.indexMutator)
      .map(this.map)
      .useWholeData(wholeData)
      .width(dimensions.width)
      .scaleProvider(this.xScaleProvider)
      .xScale(this.xScale)
      .calculator(this.calculator);

    let { xAccessor, displayXAccessor, xScale, filterData, lastItem } = evaluate(inputData);

    return { xAccessor, displayXAccessor, xScale, filterData, lastItem };
  }

  private getCursorStyle(): string {
    

    if (this.eventHandler) {
      return style + tooltipStyle;
    } else {
      return tooltipStyle;
    }
  }
};
