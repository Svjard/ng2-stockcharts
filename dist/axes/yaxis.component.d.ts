import { YAxisAlignment, YAxisOrientation } from '../types';
import { ChartComponent } from '../chart.component';
export declare class YAxis {
    private chart;
    axisAt: number | YAxisAlignment;
    orient: YAxisOrientation;
    innerTickSize: number;
    outerTickSize: number;
    tickFormat: any;
    tickPadding: number;
    tickSize: number;
    ticks: number;
    tickValues: Array<number>;
    percentScale: boolean;
    showTicks: boolean;
    showGrid: boolean;
    showDomain: boolean;
    className: string;
    private yScale;
    private range;
    private transform;
    constructor(chart: ChartComponent);
    ngOnChanges(): void;
}
