import { Component, ViewChild, provide } from '@angular/core';
import {
  describe,
  expect,
  beforeEachProviders,
  beforeEach,
  inject,
  it
} from '@angular/core/testing';
import {
  ComponentFixture,
  TestComponentBuilder
} from '@angular/compiler/testing';
import {
  ChartCanvasComponent
} from './chart-canvas.component';
import { identity, noop } from './utils';
import { ChartType } from './types';
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
    [xScale]="xScale"
    [responsive]="responsive">
  </ng-chart-canvas>`,
  directives: [ChartCanvasComponent]
})
export class TestComponent {
  width: number = 960;
  height: number = 500;
  margin: { left: number, top: number, bottom: number, right: number } = { left: 50, top: 20, bottom: 30, right: 20 };
  type: ChartType = ChartType.SVG;
  data: any = [{x: '2016-07-08', open: 37.529999, high: 37.84, low: 37.060001, close: 37.740002, volume: 8782900, adjClose: 37.740002}];
  calculator: any = noop;
  xAccessor: any = d => d.x;
  xScale: any = d3.scale.ordinal();
  padding: number = 1;
  zIndex: number = 2;
  xExtents: any = [0, 100];
  seriesName: string = "price";
  flipXScale: boolean = false;
  responsive: boolean = false;
  
  @ViewChild(ChartCanvasComponent) chartCanvas: ChartCanvasComponent;
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

  it('should display the correct default chart canvas', done => {
    tcb.createAsync(TestComponent)
      .then((fixture: ComponentFixture<TestComponent>) => {
        let element: any = fixture.nativeElement;

        fixture.detectChanges();

        expect(element.querySelectorAll('svg').length).toBe(1);
        expect(element.querySelectorAll('div.ng2-stockcharts').length).toBe(1);
        expect(element.querySelectorAll('svg.ng2-stockcharts').length).toBe(1);

        let container = element.querySelectorAll('div.ng2-stockcharts');
        expect(container[0].style.position).toBe('relative');
        expect(container[0].style.height).toBe(`${fixture.componentInstance.height}px`);
        expect(container[0].style.width).toBe(`${fixture.componentInstance.width}px`);

        expect(fixture.componentInstance.chartCanvas.canvases).not.toEqual(undefined);
        expect(fixture.componentInstance.chartCanvas.canvases.width).toBe(fixture.componentInstance.width);
        expect(fixture.componentInstance.chartCanvas.canvases.height).toBe(fixture.componentInstance.height);
        expect(fixture.componentInstance.chartCanvas.canvases.type).toBe(fixture.componentInstance.type);
        expect(fixture.componentInstance.chartCanvas.canvases.zIndex).toBe(fixture.componentInstance.zIndex);

        done();
      });
  });
});
