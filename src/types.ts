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