import { OnChanges } from '@angular/core';
import { ChartCanvasComponent } from './chart-canvas.component';
import { YMousePointerDisplayLocation, BoxModel } from './types';
export interface OriginFunc {
    (): [number, number];
}
export declare class ChartComponent implements OnChanges {
    chartCanvas: ChartCanvasComponent;
    height: number;
    width: number;
    origin: [number, number] | OriginFunc;
    id: string | number;
    yExtents: any;
    yScale: any;
    yMousePointerDisplayLocation: YMousePointerDisplayLocation;
    yMousePointerDisplayFormat: any;
    flipYScale: boolean;
    padding: (number | BoxModel);
    yTicks: any;
    private yMousePointerRectWidth;
    private yMousePointerRectHeight;
    private canvasOriginX;
    private canvasOriginY;
    private interactiveState;
    private currentItem;
    private mouseXY;
    private transform;
    constructor(chartCanvas: ChartCanvasComponent);
    getYScale(): any;
    getContext(): {
        chartId: string | number;
        canvasOriginX: any;
        canvasOriginY: any;
        width: number;
        height: number;
    };
    ngOnChanges(): void;
}
