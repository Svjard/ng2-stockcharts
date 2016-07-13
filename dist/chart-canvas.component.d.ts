import { ElementRef, OnInit, OnChanges, OnDestroy, ChangeDetectorRef, NgZone, SimpleChange } from '@angular/core';
import { ChartType } from './types';
import { CanvasContainerComponent } from './canvas-container.component';
export declare class ChartCanvasComponent implements OnInit, OnChanges, OnDestroy {
    private elRef;
    private cdr;
    private zone;
    width: number;
    height: number;
    margin: {
        left: number;
        top: number;
        bottom: number;
        right: number;
    };
    type: ChartType;
    data: Array<any>;
    responsive: boolean;
    calculator: any;
    xAccessor: (d: any) => any;
    xExtents: any;
    className: string;
    defaultClassName: string;
    seriesName: string;
    zIndex: number;
    postCalculator: any;
    flipXScale: boolean;
    padding: number | {
        left: number;
        top: number;
        bottom: number;
        right: number;
    };
    xScaleProvider: any;
    xScale: any;
    canvases: CanvasContainerComponent;
    indexAccessor: any;
    indexMutator: any;
    map: any;
    dimensions: {
        width: number;
        height: number;
    };
    private plotFull;
    private finalTransform;
    static ohlcv(d: any): {
        date: any;
        open: any;
        high: any;
        low: any;
        close: any;
        volume: any;
    };
    constructor(elRef: ElementRef, cdr: ChangeDetectorRef, zone: NgZone);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: {
        [propName: string]: SimpleChange;
    }): void;
    handleWindowResize(): void;
    forceUpdate(): void;
    private setContainerStyles();
    private setSvgStyles();
    private getCursorStyle();
    getDataInfo(): any;
    getCanvases(): any;
    setSvgClass(): string;
    isChartHybrid(): boolean;
    private calculateState();
    private calculateFullData();
}
