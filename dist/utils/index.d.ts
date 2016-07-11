export declare function getClosestItemIndexes2(array: Array<number>, value: number, accessor: any): {
    left: number;
    right: number;
};
export declare function getClosestItemIndexes(array: Array<number>, value: number, accessor: any): {
    left: number;
    right: number;
};
export declare function getClosestItem(array: Array<number>, value: number, accessor: any): any;
export declare function rebind(target: any, source: any, mappings: any): any;
export declare function head(array: Array<number>, accessor: any): number;
export declare const first: typeof head;
export declare function last(array: Array<number>, accessor: any): any;
export declare function isDefined(d: any): boolean;
export declare function isNotDefined(d: any): boolean;
export declare function isObject(d: any): boolean;
export declare const isArray: (arg: any) => arg is any[];
export declare function touchPosition(touch: any, e: any): number[];
export declare function mousePosition(e: any): number[];
export declare function clearCanvas(canvasList: any): void;
export declare function hexToRGBA(inputHex: string, opacity: number): string;
export declare function shallowEqual(a: any, b: any): boolean;
export declare enum YMousePointerDisplayLocation {
    LEFT = 1,
    RIGHT = 2,
}
export declare enum AxisAlignment {
    TOP = 1,
    BOTTOM = 2,
    MIDDLE = 3,
}
export declare enum Orientation {
    TOP = 1,
    BOTTOM = 2,
    LEFT = 3,
    RIGHT = 4,
}
export declare enum XAxisOrientation {
    TOP = 1,
    BOTTOM = 2,
}
export declare enum YAxisOrientation {
    LEFT = 1,
    RIGHT = 2,
}
export declare enum ChartType {
    SVG = 1,
    HYBRID = 2,
}
export interface BoxModel {
    left?: number;
    top?: number;
    bottom?: number;
    right?: number;
}
export declare function identity<T>(arg: T): T;
export declare function noop<T>(): void;
