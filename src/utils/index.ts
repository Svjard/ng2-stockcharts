import * as d3 from 'd3';

//export * from './accumulatingWindow';
//export * from './mappedSlidingWindow';
//export * from './merge';
export * from './shallowEqual';
//export * from './slidingWindow';
//export * from './zipper';

export function getClosestItemIndexes2(array: Array<number>, value: number, accessor: any): { left: number, right: number } {
  let left: number = d3.bisector(accessor).left(array, value);
  left = Math.max(left - 1, 0);
  let right: number = Math.min(left + 1, array.length - 1);

  let item: number = accessor(array[left]);
  if (item >= value && item <= value) {
    right = left;
  }

  return { left, right };
}

export function getClosestItemIndexes(array: Array<number>, value: number, accessor: any): { left: number, right: number } {
  let lo = 0;
  let hi = array.length - 1;
  while (hi - lo > 1) {
    let mid = Math.round((lo + hi) / 2);
    if (accessor(array[mid]) <= value) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
  // for Date object === does not work, so using the <= in combination with >=
  // the same code works for both dates and numbers
  if (accessor(array[lo]) >= value && accessor(array[lo]) <= value) {
    hi = lo;
  }
  
  if (accessor(array[hi]) >= value && accessor(array[hi]) <= value) {
    lo = hi;
  }

  if (accessor(array[lo]) < value && accessor(array[hi]) < value) {
    lo = hi;
  }
  
  if (accessor(array[lo]) > value && accessor(array[hi]) > value) {
    hi = lo;
  }

  return { left: lo, right: hi };
}

export function getClosestItem(array: Array<number>, value: number, accessor: any): any {
  let { left, right } = getClosestItemIndexes(array, value, accessor);

  if (left === right) {
    return array[left];
  }

  let closest = (Math.abs(accessor(array[left]) - value) < Math.abs(accessor(array[right]) - value))
            ? array[left]
            : array[right];

  return closest;
}

//export const overlayColors = d3.scale.category10();

export function rebind(target: any, source: any, mappings: any): any {
  if (typeof(mappings) !== 'object') {
    return d3.rebind.apply(d3, arguments);
  }

  Object.keys(mappings)
    .forEach(function(targetName) {
      let method = source[mappings[targetName]];
      if (typeof method !== 'function') {
        throw new Error(`The method ${mappings[targetName]} does not exist on the source object`);
      }

      target[targetName] = function() {
        let value = method.apply(source, arguments);
        return value === source ? target : value;
      };
    });

  return target;
}

export function head(array: Array<number>, accessor: any) : number {
  if (accessor && array) {
    let value;
    for (let i = 0; i < array.length; i++) {
      value = array[i];
      if (isDefined(accessor(value))) break;
    }

    return value;
  }

  return array ? array[0] : undefined;
}

export const first = head;

export function last(array: Array<number>, accessor: any): any {
  if (accessor && array) {
    let value;
    for (let i = array.length - 1; i >= 0; i--) {
      value = array[i];
      if (isDefined(accessor(value))) break;
    }

    return value;
  }

  let length = array ? array.length : 0;
  return length ? array[length - 1] : undefined;
}

export function isDefined(d: any): boolean {
  return d !== null && typeof d != 'undefined';
}

export function isNotDefined(d: any): boolean {
  return !isDefined(d);
}

export function isObject(d: any) : boolean {
  return isDefined(d) && typeof d === 'object' && !Array.isArray(d);
}

export const isArray = Array.isArray;

export function touchPosition(touch, e): number[] {
  let container = e.target;
  let rect = container.getBoundingClientRect();
  let x = touch.clientX - rect.left - container.clientLeft;
  let y = touch.clientY - rect.top - container.clientTop;
  let xy = [Math.round(x), Math.round(y)];
  return xy;
}

export function mousePosition(e) : number[] {
  let container = e.currentTarget;
  let rect = container.getBoundingClientRect();
  let x = e.clientX - rect.left - container.clientLeft;
  let y = e.clientY - rect.top - container.clientTop;
  let xy = [Math.round(x), Math.round(y)];
  return xy;
}

export function clearCanvas(canvasList: any) {
  canvasList.forEach(each => {
    each.setTransform(1, 0, 0, 1, 0, 0);
    each.clearRect(-1, -1, each.canvas.width + 2, each.canvas.height + 2);
  });
}

export function hexToRGBA(inputHex: string, opacity: number) : string {
  let hex = inputHex.replace('#', '');
  if (inputHex.indexOf('#') > -1 && (hex.length === 3 || hex.length === 6)) {
    let multiplier = (hex.length === 3) ? 1 : 2;

    let r = parseInt(hex.substring(0, 1 * multiplier), 16);
    let g = parseInt(hex.substring(1 * multiplier, 2 * multiplier), 16);
    let b = parseInt(hex.substring(2 * multiplier, 3 * multiplier), 16);

    let result = `rgba(${r}, ${g}, ${b}, ${opacity})`;

    return result;
  }

  return inputHex;
}

export enum YMousePointerDisplayLocation {
  LEFT = 1,
  RIGHT
};

export enum AxisAlignment {
  TOP = 1,
  BOTTOM,
  MIDDLE
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

export function identity<T>(arg: T): T {
  return arg;
}

export function noop<T>(): void {}
