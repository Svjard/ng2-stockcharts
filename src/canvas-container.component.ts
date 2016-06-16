import { Component, Input, ElementRef, ViewChild } from '@angular/core';

export enum ChartType {
  Svg = 1,
  Hybrid
};

export interface ICanvasContext {
  axes: CanvasRenderingContext2D;
  mouseCoord: CanvasRenderingContext2D;
  interactive: CanvasRenderingContext2D;
  bg: CanvasRenderingContext2D;
};

@Component({
  selector: 'ng-canvas-container',
  template: `
    <div *ngIf="isChartHybrid()">
      <canvas #bg class="stockcharts-canvas" width="{{width}}" height="{{height}}"></canvas>
      <canvas #canvas_axes class="stockcharts-canvas" width="{{width}}" height="{{height}}"></canvas>
      <canvas #canvas_mouse_coordinates class="stockcharts-canvas" width="{{width}}" height="{{height}}"></canvas>
      <canvas #canvas_interactive class="stockcharts-canvas" width="{{width}}" height="{{height}}"></canvas>
    </div>
  `,
  styles: [`
    .stockcharts-canvas {
      position: absolute;
      top: 0;
      left: 0;
    }
  `]
})
export class CanvasContainerComponent {
  @Input() public width: number;
  @Input() public height: number;
  @Input() public type: ChartType = ChartType.Svg;
  @Input() public zIndex: number;

  @ViewChild('bg')
  bg: ElementRef;

  @ViewChild('canvas_axes')
  canvas_axes: ElementRef;

  @ViewChild('canvas_mouse_coordinates')
  canvas_mouse_coordinates: ElementRef;

  @ViewChild('canvas_interactive')
  canvas_interactive: ElementRef;

  public isChartHybrid(): boolean {
    return this.type !== ChartType.Svg;
  }

  public getCanvasContexts(): ICanvasContext  {
    if (this.type === ChartType.Svg) {
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
