import { Orientation } from '../types';
export declare class AxisLineComponent {
    className: string;
    shapeRendering: string;
    orient: Orientation;
    outerTickSize: number;
    fill: string;
    stroke: string;
    strokeWidth: number;
    opacity: number;
    range: [number, number];
    sign: number;
    d: string;
    ngOnChanges(): void;
    setPathClass(): string;
    drawOnCanvas(ctx: CanvasRenderingContext2D): void;
}
