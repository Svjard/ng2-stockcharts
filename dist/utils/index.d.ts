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
export declare function head(array: Array<any>, accessor?: any): any;
export declare const first: typeof head;
export declare function last(array: Array<any>, accessor?: any): any;
export declare function isDefined(d: any): boolean;
export declare function isNotDefined(d: any): boolean;
export declare function isObject(d: any): boolean;
export declare const isArray: (arg: any) => arg is any[];
export declare function touchPosition(touch: any, e: any): number[];
export declare function mousePosition(e: any): number[];
export declare function clearCanvas(canvasList: any): void;
export declare function hexToRGBA(inputHex: string, opacity: number): string;
export declare function shallowEqual(a: any, b: any): boolean;
export declare function identity<T>(arg: T): T;
export declare function noop<T>(): void;
