import { OnChanges } from '@angular/core';
import { Orientation } from '../types';
export declare class AxisTickComponent implements OnChanges {
    className: string;
    defaultClassName: string;
    transform: Array<number>;
    tickStroke: string;
    tickStrokeOpacity: number;
    textAnchor: string;
    fontSize: number;
    fontFamily: string;
    x: number;
    y: number;
    x2: number;
    y2: number;
    dy: string;
    private finalTransform;
    ngOnChanges(): void;
    setTickClass(): string;
    drawOnCanvas(ctx: CanvasRenderingContext2D, result: any): void;
}
export declare class AxisTicksComponent implements OnChanges {
    orient: Orientation;
    innerTickSize: number;
    tickFormat: any;
    tickPadding: number;
    ticks: Array<number>;
    tickValues: any;
    scale: any;
    tickStroke: string;
    tickStrokeOpacity: number;
    fontSize: number;
    fontFamily: string;
    result: any;
    format: any;
    ngOnChanges(): void;
    drawOnCanvas(ctx: CanvasRenderingContext2D, xScale: any, yScale: any): void;
    private process(_scale?);
}
