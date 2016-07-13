export enum YMousePointerDisplayLocation {
  LEFT = 1,
  RIGHT
};

export enum Orientation {
  TOP = 1,
  BOTTOM,
  LEFT,
  RIGHT
};

export enum XAxisOrientation {
  TOP = 1,
  BOTTOM
};

export enum YAxisOrientation {
  LEFT = 1,
  RIGHT
};

export enum XAxisAlignment {
  TOP = 1,
  MIDDLE,
  BOTTOM
};

export enum YAxisAlignment {
  LEFT = 1,
  MIDDLE,
  RIGHT
};

export enum ChartType {
  SVG = 1,
  HYBRID
};

export interface BoxModel {
  left?: number;
  top?: number;
  bottom?: number;
  right?: number;
}

export interface ChartConfig {
  width: number = 320;
  height: number;
  margin:  number | BoxModel = { top: 20, right: 30, bottom: 30, left: 80 };
  type: ChartType = ChartType.HYBRID;
  data: Array<any>;
  responsive: boolean = true;
  calculator: any = [];
  xAccessor: (d: any) => any = identity;
  xExtents: any = [d3.min, d3.max];
  className: string;
  defaultClassName: string = 'ng2-stockcharts ';
  seriesName: string;
  zIndex: number = 1;
  postCalculator: any = identity;
  flipXScale: boolean = false;
  padding: number | BoxModel = 0;
  xScale: any; // xScale or xScaleProvider
}