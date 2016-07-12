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
  ComponentFixture,
  TestComponentBuilder
} from '@angular/compiler/testing';
import {
  ChartCanvasComponent
} from './chart-canvas.component';
import {
  noop
} from './utils';
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
    [responsive]="responsive"
    [xScale]="xScale">
  </ng-chart-canvas>`,
  directives: [ChartCanvasComponent]
})
export class TestComponent {
  width: number = 320;
  height: number = 320;
  margin: { left: number, top: number, bottom: number, right: number } = { left: 0, top: 0, bottom: 0, right: 0 };
  type: ChartType = ChartType.SVG;
  // @TODO -- This is a hack for now, need to have real data loaded from file via d3 methods
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
    [responsive]="responsive"
    [xScale]="xScale">
  </ng-chart-canvas>`,
  directives: [ChartCanvasComponent]
})
export class TestComponentResponsive {
  width: number = 320;
  height: number = 320;
  margin: { left: number, top: number, bottom: number, right: number } = { left: 0, top: 0, bottom: 0, right: 0 };
  type: ChartType = ChartType.SVG;
  // @TODO -- This is a hack for now, need to have real data loaded from file via d3 methods
  data: any = [{x: '2016-07-08', open: 37.529999, high: 37.84, low: 37.060001, close: 37.740002, volume: 8782900, adjClose: 37.740002}];
  calculator: any = noop;
  xAccessor: any = d => d.x;
  xScale: any = d3.scale.ordinal();
  padding: number = 1;
  zIndex: number = 2;
  xExtents: any = [0, 100];
  seriesName: string = "price";
  flipXScale: boolean = false;
  responsive: boolean = true;
  
  @ViewChild(ChartCanvasComponent) chartCanvas: ChartCanvasComponent;
}

describe('CanvasContainerComponent:', () => {
  let tcb;

  beforeEachProviders(() => [
    TestComponentBuilder,
    TestComponent
  ]);

  beforeEach(inject([TestComponentBuilder], _tcb => {
    tcb = _tcb;
  }));

  it('should display the correct default view', done => {
    tcb.createAsync(TestComponent)
      .then((fixture: ComponentFixture<TestComponent>) => {
        let element: any = fixture.nativeElement;

        fixture.detectChanges();

        expect(element.querySelectorAll('canvas').length).toBe(0);
        let contextObj = fixture.componentInstance.chartCanvas.getCanvases();
        expect(contextObj).toEqual(undefined);

        fixture.componentInstance.type = ChartType.HYBRID;

        fixture.detectChanges();

        let canvases = element.querySelectorAll('canvas');
        expect(canvases.length).toBe(4);
        for (let i of [0, 1, 2, 3]) {
          expect(canvases[i].width).toBe(320);
          expect(canvases[i].height).toBe(320);
        }

        done();
      });
  });

  it('should handle screen resize/responsiveness', done => {
    tcb.createAsync(TestComponentResponsive)
      .then((fixture: ComponentFixture<TestComponentResponsive>) => {
        let element: any = fixture.nativeElement;

        fixture.componentInstance.type = ChartType.HYBRID;
        fixture.componentInstance.width = 600;
        fixture.componentInstance.height = 500;

        fixture.detectChanges();

        let w: number = element.clientWidth;

        let canvases = element.querySelectorAll('canvas');
        expect(canvases.length).toBe(4);
        for (let i of [0, 1, 2, 3]) {
          expect(canvases[i].width).toBe(w);
          expect(canvases[i].height).toBe(500);
        }

        done();
      });
  });

  it('should provide each canvas context', done => {
    tcb.createAsync(TestComponent)
      .then((fixture: ComponentFixture<TestComponent>) => {
        let element: any = fixture.nativeElement;

        fixture.componentInstance.type = ChartType.HYBRID;
        
        fixture.detectChanges();

        let contextObj = fixture.componentInstance.chartCanvas.getCanvases();
        expect(Object.keys(contextObj).length).toBe(4);
        for (let key of Object.keys(contextObj)) {
          expect(contextObj[key]).not.toEqual(undefined);
        }

        done();
      });
  });
});
