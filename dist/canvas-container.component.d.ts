import { ElementRef } from '@angular/core';
import { ChartCanvasComponent } from './chart-canvas.component';
import { ChartType } from './utils';
export interface ICanvasContext {
    axes: CanvasRenderingContext2D;
    mouseCoord: CanvasRenderingContext2D;
    interactive: CanvasRenderingContext2D;
    bg: CanvasRenderingContext2D;
}
export declare class CanvasContainerComponent {
    private chartCanvas;
    width: number;
    height: number;
    type: ChartType;
    zIndex: number;
    bg: ElementRef;
    canvas_axes: ElementRef;
    canvas_mouse_coordinates: ElementRef;
    canvas_interactive: ElementRef;
    constructor(chartCanvas: ChartCanvasComponent);
    getCanvasContexts(): ICanvasContext;
}
