import {Component, AfterViewInit} from '@angular/core';
import {NgClass} from '@angular/common';
import {bootstrap} from '@angular/platform-browser-dynamic';
import * as Ng2Stockcharts from '../../src/ng2-stockcharts';
import * as d3 from 'd3';

const hljs = require('highlight.js');
require('highlight.js/styles/github-gist.css');
require('./sass/style.scss');

@Component({
  selector: 'demo-app',
  template: require('./demo-app.html'),
  directives: [NgClass, Ng2Stockcharts.CORE_DIRECTIVES]
})
class DemoAppComponent implements AfterViewInit {

  basicCodeT: string = require('./basic-example-component.html');
  basicCodeC: string = require('!raw!./basic-example-component.ts');
  selectedTab = 'basic';
  basicTab = 'html';

  type = Ng2Stockcharts.ChartType.SVG;
  width = 900;
  height = 400;
  margin = { left: 50, right: 50, top:10, bottom: 30 };
  data: any = [
    {
      "date": "2015-05-15",
      "open": 48.87,
      "high": 48.91,
      "low": 48.05,
      "close": 48.3,
      "volume": 28642700,
      "adjclose": ""
    },
    {
      "date": "2015-05-18",
      "open": 47.98,
      "high": 48.22,
      "low": 47.61,
      "close": 48.01,
      "volume": 24136500,
      "adjclose": ""
    },
    {
      "date": "2015-05-19",
      "open": 47.56,
      "high": 47.81,
      "low": 47.18,
      "close": 47.58,
      "volume": 28574800,
      "adjclose": ""
    },
    {
      "date": "2015-05-20",
      "open": 47.39,
      "high": 47.93,
      "low": 47.27,
      "close": 47.58,
      "volume": 25047900,
      "adjclose": ""
    },
    {
      "date": "2015-05-21",
      "open": 47.28,
      "high": 47.6,
      "low": 47.01,
      "close": 47.42,
      "volume": 22410700,
      "adjclose": ""
    },
    {
      "date": "2015-05-22",
      "open": 47.3,
      "high": 47.35,
      "low": 46.82,
      "close": 46.9,
      "volume": 25720600,
      "adjclose": ""
    },
    {
      "date": "2015-05-26",
      "open": 46.83,
      "high": 46.88,
      "low": 46.19,
      "close": 46.59,
      "volume": 29581900,
      "adjclose": ""
    },
    {
      "date": "2015-05-27",
      "open": "",
      "high": "",
      "low": "",
      "close": "",
      "volume": "",
      "adjclose": ""
    },
    {
      "date": "2015-05-28",
      "open": 47.5,
      "high": 48.02,
      "low": 47.39,
      "close": 47.45,
      "volume": 19283700,
      "adjclose": ""
    },
    {
      "date": "2015-05-29",
      "open": 47.43,
      "high": 47.57,
      "low": 46.59,
      "close": 46.86,
      "volume": 35428100,
      "adjclose": ""
    },
    {
      "date": "2015-06-01",
      "open": 47.06,
      "high": 47.77,
      "low": 46.62,
      "close": 47.23,
      "volume": 28592900,
      "adjclose": ""
    },
    {
      "date": "2015-06-02",
      "open": 46.93,
      "high": 47.35,
      "low": 46.62,
      "close": 46.92,
      "volume": 21283400,
      "adjclose": ""
    },
    {
      "date": "2015-06-03",
      "open": 47.37,
      "high": 47.74,
      "low": 46.82,
      "close": 46.85,
      "volume": 27955200,
      "adjclose": ""
    },
    {
      "date": "2015-06-04",
      "open": 46.79,
      "high": 47.16,
      "low": 46.2,
      "close": 46.36,
      "volume": 26868000,
      "adjclose": ""
    },
    {
      "date": "2015-06-05",
      "open": 46.31,
      "high": 46.52,
      "low": 45.84,
      "close": 46.14,
      "volume": 25258900,
      "adjclose": ""
    },
    {
      "date": "2015-06-08",
      "open": 47.37,
      "high": 47.74,
      "low": 46.82,
      "close": 46.85,
      "volume": 27955200,
      "adjclose": ""
    },
    {
      "date": "2015-06-09",
      "open": 48.87,
      "high": 48.91,
      "low": 48.05,
      "close": 48.3,
      "volume": 28642700,
      "adjclose": ""
    }
  ];
  xAccessor = d => { console.log(d); return d.date; }
  xScale = d3.time.scale();
  xExtents = [new Date(2011, 0, 1), new Date(2013, 0, 2)];
  id = 0;
  yExtents = d => d.close;
  xAxisAt = Ng2Stockcharts.XAxisAlignment.BOTTOM;
  xAxisOrient = Ng2Stockcharts.XAxisOrientation.BOTTOM;
  ticks = 6;
  yAxisAt = Ng2Stockcharts.YAxisAlignment.LEFT;
  yAxisOrient = Ng2Stockcharts.YAxisOrientation.LEFT;
  parseDate = d3.time.format("%Y-%m-%d").parse;

  constructor() {
    this.data.forEach((d, i) => {
      d.date = new Date(this.parseDate(d.date).getTime());
      d.close = +d.close;
    });
  }
 
  ngAfterViewInit() {
    this.highlight();
  }

  /**
   * Run highlight.js, giving time for DOM to update.
   */
  private highlight() {
    setTimeout(() => hljs.initHighlighting());
  }
}

bootstrap(DemoAppComponent);
