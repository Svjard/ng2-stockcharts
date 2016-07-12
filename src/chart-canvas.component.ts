import {
  Component, Input, Output, EventEmitter,
  ElementRef, OnInit, OnChanges, OnDestroy, ViewChild,
  ChangeDetectionStrategy, ChangeDetectorRef, NgZone,
  SimpleChange, forwardRef
} from '@angular/core';
import { ChartType, BoxModel } from './types';
import { identity, shallowEqual, isDefined, isNotDefined } from './utils';
import { EvaluatorConfig, Evaluator } from './scale/evaluator';
import * as d3 from 'd3';
import {
  CanvasContainerComponent
} from './canvas-container.component';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAILY = 24 * HOUR;

const CANDIDATES_FOR_RESET = [
  'data',
  'calculator',
  'indexAccessor',
  'indexMutator',
  'map',
  'seriesName',
  'xExtents',
  'xScaleProvider',
];

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
    <div [ngStyle]="setContainerStyles()" [className]="setSvgClass()">
      <ng-canvas-container [width]="width" [height]="height" [type]="type" [zIndex]="zIndex"></ng-canvas-container>
      <svg [ngClass]="setSvgClass()" [attr.width]="width" [attr.height]="height" [ngStyle]="setSvgStyles()">
        <style>{{getCursorStyle()}}</style>
        <svg:defs>
          <svg:clipPath id="chart-area-clip">
            <svg:rect x="0" y="0" [attr.width]="dimensions.width" [attr.height]="dimensions.height" />
          </svg:clipPath>
        </svg:defs>
        <svg:g [attr.transform]="finalTransform">
        </svg:g>
      </svg>
    </div>
  `,
  directives: [forwardRef(() => CanvasContainerComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartCanvasComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public width: number = 60;
  @Input() public height: number;
  @Input() public margin: { left: number, top: number, bottom: number, right: number } = { top: 20, right: 30, bottom: 30, left: 80 };
  @Input() public type: ChartType = ChartType.HYBRID;
  @Input() public data: Array<any>;
  @Input() public responsive: boolean = true;
  @Input() public calculator: any = [];
  @Input() public xAccessor: (d: any) => any = identity;
  @Input() public xExtents: any = [d3.min, d3.max];
  @Input() public className: string;
  @Input() public defaultClassName: string = 'ng2-stockcharts ';
  @Input() public seriesName: string;
  @Input() public zIndex: number = 1;
  @Input() public postCalculator: any = identity;
  @Input() public flipXScale: boolean = false;
  @Input() public padding: number | { left: number, top: number, bottom: number, right: number } = 0;
  @Input() public xScaleProvider: any;
  @Input() public xScale: any;

  //@ViewChild(EventHandlerComponent)
  //eventHandler: EventHandlerComponent
  @ViewChild(forwardRef(() => CanvasContainerComponent))
  canvases: CanvasContainerComponent;

  public indexAccessor: any = d => d.idx;
  public indexMutator: any = (d, idx) => { return Object.assign({}, d, {idx: idx}); };
  public map: any = identity;
  public dimensions: { width: number, height: number };

  private plotFull: boolean;
  private finalTransform: string;

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

  constructor(private elRef: ElementRef, private cdr: ChangeDetectorRef, private zone: NgZone) {}

  ngOnInit() {
    if (this.responsive) {
      window.addEventListener('resize', this.handleWindowResize);
      this.handleWindowResize();
    }
  }

  ngOnDestroy() {
    if (this.responsive) {
      window.removeEventListener('resize', this.handleWindowResize);
    }
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    this.dimensions = getDimensions(this);
    this.calculateState();
    this.finalTransform = `translate(${this.margin.left + 0.5}, ${this.margin.top + 0.5})`;

    for (let k in changes) {
      if (CANDIDATES_FOR_RESET.indexOf(k) !== -1 && !changes[k].isFirstChange() && !shallowEqual(changes[k].currentValue, changes[k].previousValue)) {
         this.forceUpdate();
         break;
      }
    }
  }

  handleWindowResize() {
    this.width = this.elRef.nativeElement.parentNode.clientWidth;
    this.forceUpdate();
  }

  forceUpdate() {
    this.zone.run(() => {
      this.cdr.markForCheck();
    });
  }

  private setContainerStyles(): any {
    let styles = {
      'position': 'relative',
      'height': `${this.height}px`,
      'width': `${this.width}px`
    };
    return styles;
  }

  private setSvgStyles(): any {
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

  public setSvgClass(): string {
    return this.defaultClassName.concat(this.className || '');
  }

  public isChartHybrid(): boolean {
    return this.type == ChartType.HYBRID;
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
    
    let { xAccessor, displayXAccessor, xScale, filterData, lastItem } = Evaluator.evaluate(this.data,
      {
        xAccessor: this.xAccessor,
        indexAccessor: this.indexAccessor,
        indexMutator: this.indexMutator,
        map: this.map,
        useWholeData: wholeData,
        width: dimensions.width,
        scaleProvider: this.xScaleProvider,
        xScale: this.xScale,
        calculator: this.calculator
      } as EvaluatorConfig);

    return { xAccessor, displayXAccessor, xScale, filterData, lastItem };
  }
};
