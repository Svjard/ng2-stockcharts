import { Component, Input, ElementRef, ViewChild, Host } from '@angular/core';
import { ChartCanvasComponent } from './chart-canvas.component';
import { ChartType } from './utils';

export interface ICanvasContext {
  axes: CanvasRenderingContext2D;
  mouseCoord: CanvasRenderingContext2D;
  interactive: CanvasRenderingContext2D;
  bg: CanvasRenderingContext2D;
};

@Component({
  selector: 'ng-canvas-container',
  template: `
    <div *ngIf="chartCanvas.isChartHybrid()">
      <canvas #bg class="ng2-stockcharts-canvas" [attr.width]="{{width}}" [attr.height]="{{height}}"></canvas>
      <canvas #canvas_axes class="ng2-stockcharts-canvas" [attr.width]="{{width}}" [attr.height]="{{height}}"></canvas>
      <canvas #canvas_mouse_coordinates class="ng2-stockcharts-canvas" [attr.width]="{{width}}" [attr.height]="{{height}}"></canvas>
      <canvas #canvas_interactive class="ng2-stockcharts-canvas" [attr.width]="{{width}}" [attr.height]="{{height}}"></canvas>
    </div>
  `,
  styles: [`
    .ng2-stockcharts-canvas {
      position: absolute;
      top: 0;
      left: 0;
    }
  `]
})
export class CanvasContainerComponent {
  @Input() public width: number;
  @Input() public height: number;
  @Input() public type: ChartType = ChartType.SVG;
  @Input() public zIndex: number;

  @ViewChild('bg')
  bg: ElementRef;

  @ViewChild('canvas_axes')
  canvas_axes: ElementRef;

  @ViewChild('canvas_mouse_coordinates')
  canvas_mouse_coordinates: ElementRef;

  @ViewChild('canvas_interactive')
  canvas_interactive: ElementRef;

  constructor(@Host() private chartCanvas: ChartCanvasComponent) {}

  public getCanvasContexts(): ICanvasContext  {
    if (!this.chartCanvas.isChartHybrid()) {
      return;
    }

    return {
      axes: this.canvas_axes.nativeElement.getContext('2d'),
      mouseCoord: this.canvas_mouse_coordinates.nativeElement.getContext('2d'),
      interactive: this.canvas_interactive.nativeElement.getContext('2d'),
      bg: this.bg.nativeElement.getContext('2d')
    };
  }
};
