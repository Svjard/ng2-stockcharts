export * from './types';
import { ChartCanvasComponent } from './chart-canvas.component';
import { ChartComponent } from './chart.component';
import { XAxisComponent } from './axes/xaxis.component';
import { YAxisComponent } from './axes/yaxis.component';

export const CORE_DIRECTIVES = [ChartCanvasComponent, ChartComponent, XAxisComponent, YAxisComponent];