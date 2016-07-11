import { Component, Input, OnInit } from '@angular/core';
import { hexToRGBA, isDefined, first } from '../utils';
import * as d3 from 'd3';

function segment(points0, points1, ctx) {
  ctx.beginPath();
  let [x0, y0] = first(points0);
  ctx.moveTo(x0, y0);

  let i;
  for (i = 0; i < points1.length; i++) {
    let [x1, y1] = points1[i];
    ctx.lineTo(x1, y1);
  }

  for (i = points0.length - 1; i >= 0; i--) {
    let [x0, y0] = points0[i];
    ctx.lineTo(x0, y0);
  }

  ctx.closePath();
  ctx.fill();
}

@Component({
  selector: 'ng-area',
  template: `
    <path [d]={{d}} stroke={{stroke}} fill={{fill}} className={{className}} [opacity]={{opacity}} />
  `
})
export class Area {
  @Input() public className: string = 'area ';
  @Input() public xScale: any;
  @Input() public yScale: any;
  @Input() public xAccessor: any;
  @Input() public yAccessor: any;
  @Input() public plotData: any;
  @Input() public stroke: string;
  @Input() public fill: string = 'none';
  @Input() public opacity: number = 1;
  @Input() public base: any = (yScale) => first(yScale.range());
  @Input() public defined: any = d => !isNaN(d);

  ngOnChanges() {
    this.className = this.className.concat(isDefined(this.stroke) ? '' : ' line-stroke');
    this.d = this.getArea();
  }

  // handle window resize

  getArea() {
    let newBase = d3.functor(this.base);

    let areaSeries = d3.svg.area()
      .defined(d => defined(this.yAccessor(d)))
      .x((d) => this.xScale(this.xAccessor(d)))
      .y0(newBase.bind(null, this.yScale))
      .y1((d) => this.yScale(this.yAccessor(d)));

    return areaSeries(this.plotData);
  }

  static drawOnCanvas(area, ctx, xScale, yScale, plotData) {
    let newBase = d3.functor(area.base);

    ctx.fillStyle = hexToRGBA(area.fill, area.opacity);
    ctx.strokeStyle = area.stroke;

    let points0 = [], points1 = [];

    for (let i = 0; i < plotData.length; i++) {
      let d = plotData[i];
      if (area.defined(area.yAccessor(d), i)) {
        let [x, y1, y0] = [xScale(area.xAccessor(d)), yScale(area.yAccessor(d)), newBase(yScale, d)];

        points0.push([x, y0]);
        points1.push([x, y1]);
      } else if (points0.length) {
        segment(points0, points1, ctx);
        points0 = [];
        points1 = [];
      }
    }
    if (points0.length) segment(points0, points1, ctx);
  }
}
