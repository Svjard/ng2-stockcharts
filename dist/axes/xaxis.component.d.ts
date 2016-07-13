import { XAxisAlignment, XAxisOrientation } from '../types';
import { ChartComponent } from '../chart.component';
import { ChartCanvasComponent } from '../chart-canvas.component';
export declare class XAxis {
    private chartCanvas;
    private chart;
    axisAt: number | XAxisAlignment;
    orient: XAxisOrientation;
    innerTickSize: number;
    outerTickSize: number;
    tickFormat: any;
    tickPadding: number;
    tickSize: number;
    ticks: number;
    tickValues: Array<number>;
    showTicks: boolean;
    showGrid: boolean;
    className: string;
    private range;
    private transform;
    constructor(chartCanvas: ChartCanvasComponent, chart: ChartComponent);
    ngOnChanges(): void;
}
