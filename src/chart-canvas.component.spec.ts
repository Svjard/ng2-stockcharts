import { Component, ViewChild } from '@angular/core';
import {
  describe,
  expect,
  beforeEachProviders,
  beforeEach,
  inject,
  it
} from '@angular/core/testing';
import {
  dispatchEvent
} from '@angular/platform-browser/testing';
import {
  ComponentFixture,
  TestComponentBuilder
} from '@angular/compiler/testing';
import {
  ChartCanvasComponent
} from './chart-canvas.component';
import {
  CanvasContainerComponent
} from './canvas-container.component';
import { ChartType, identity, noop } from './utils';
import * as d3 from 'd3';

@Component({
  template: `
  <ng-chart-canvas
    [width]="width"
    [height]="height"
    [margin]="margin"
    [type]="type"
    [data]="data"
    [calculator]="calculator"
    [xAccessor]="xAccessor"
    [xExtents]="xExtents"
    [className]="className"
    [seriesName]="seriesName"
    [zIndex]="zIndex"
    [flipXScale]="flipXScale"
    [padding]="padding"
    [xScale]="xScale">
  </ng-chart-canvas>`,
  directives: [ChartCanvasComponent]
})
export class TestComponent {
  width: number = 960;
  height: number = 500;
  margin: { left: number, top: number, bottom: number, right: number } = { left: 50, top: 20, bottom: 30, right: 20 };
  type: ChartType = ChartType.SVG;
  data: any = [];
  calculator: any = noop;
  xAccessor: any = d => d.x;
  xScale: any = d3.scale.ordinal();
  padding: number = 1;
  zIndex: number = 2;
  xExtents: any = [0, 100];
  seriesName: string = "price";
  flipXScale: boolean = false;
  
  @ViewChild(ChartCanvasComponent) chartCanvas: ChartCanvasComponent;
  @ViewChild(CanvasContainerComponent) canvasContainer: CanvasContainerComponent;
}

describe('ChartCanvasComponent:', () => {
  let tcb;

  beforeEachProviders(() => [
    TestComponentBuilder,
    TestComponent
  ]);

  beforeEach(inject([TestComponentBuilder], _tcb => {
    tcb = _tcb;
  }));

  it('should display the correct default canvas', done => {
    tcb.createAsync(TestComponent)
      .then((fixture: ComponentFixture<TestComponent>) => {
        let element: any = fixture.nativeElement;

        fixture.detectChanges();

        expect(element.querySelectorAll('svg').length).toBe(1);
        expect(element.querySelectorAll('div.ng2-stockcharts').length).toBe(1);
        expect(element.querySelectorAll('svg.ng2-stockcharts').length).toBe(1);

        let container = element.querySelectorAll('div:first');
        expect(container.css('position')).toBe('relative');
        expect(container.css('height')).toBe(fixture.componentInstance.height);
        expect(container.css('width')).toBe(fixture.componentInstance.width);

        expect(fixture.componentInstance.canvasContainer).not.toEqual(undefined);
        expect(fixture.componentInstance.canvasContainer.width).toBe(fixture.componentInstance.width);
        expect(fixture.componentInstance.canvasContainer.height).toBe(fixture.componentInstance.height);
        expect(fixture.componentInstance.canvasContainer.type).toBe(fixture.componentInstance.type);
        expect(fixture.componentInstance.canvasContainer.zIndex).toBe(fixture.componentInstance.zIndex);

        done();
      });
  });
});
