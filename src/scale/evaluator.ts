import {
  first,
  last,
  getClosestItemIndexes,
  isDefined,
  isNotDefined,
  isArray,
  identity
} from '../utils';

export interface EvaluatorConfig {
  xAccessor: any;
  useWholeData: boolean;
  width: number;
  xScale: any;
  map: any;
  calculator: Array<any>;
  scaleProvider?: any;
  indexAccessor: any;
  indexMutator: any;
};



export class Evaluator {
  private config: EvaluatorConfig;

  static evaluate(data: any, config: EvaluatorConfig) {
    let mappedData = data.map(config.map);
    let composedCalculator = Evaluator.compose(config.calculator);
    let calculatedData = composedCalculator(mappedData);

    if (config.scaleProvider) {
      let {
        data: finalData,
        xScale: modifiedXScale,
        xAccessor: realXAccessor,
        displayXAccessor
      } = config.scaleProvider(calculatedData, config.xAccessor, config.indexAccessor, config.indexMutator);

      return {
        filterData: Evaluator.extentsWrapper(finalData, config.xAccessor, realXAccessor, config.width, config.useWholeData),
        xScale: modifiedXScale,
        xAccessor: realXAccessor,
        displayXAccessor,
        lastItem: last(finalData)
      };
    }

    return {
      filterData: Evaluator.extentsWrapper(calculatedData, config.xAccessor, config.xAccessor, config.width, config.useWholeData),
      xScale: config.xScale,
      xAccessor: config.xAccessor,
      displayXAccessor: config.xAccessor,
      lastItem: last(calculatedData)
    };
  }

  static canShowTheseManyPeriods(width: number, arrayLength: number): boolean {
    let threshold = 0.75; // number of datapoints per 1 px
    return arrayLength < width * threshold && arrayLength > 1;
  }

  static getDomain(inputDomain, width, filteredData, predicate, currentDomain, canShowTheseMany, realXAccessor) {
    if (canShowTheseMany(width, filteredData.length)) {
      let domain = predicate
        ? inputDomain
        : [realXAccessor(first(filteredData)), realXAccessor(last(filteredData))]; // TODO fix me later
      return domain;
    }

    return currentDomain;
  }

  static extentsWrapper(data, inputXAccessor, realXAccessor, width, useWholeData) {
    function domain(inputDomain, xAccessor, currentPlotData, currentDomain) {
      if (useWholeData) {
        return { plotData: data, domain: inputDomain };
      }

      let left = first(inputDomain);
      let right = last(inputDomain);

      let filteredData = Evaluator.getFilteredResponse(data, left, right, xAccessor);

      let plotData, domain
      if (Evaluator.canShowTheseManyPeriods(width, filteredData.length)) {
        plotData = filteredData;
        domain = realXAccessor === xAccessor ? inputDomain : [realXAccessor(first(plotData)), realXAccessor(last(plotData))];
      } else {
        plotData = currentPlotData || filteredData.slice(filteredData.length - Evaluator.showMax(width));
        domain = currentDomain || [realXAccessor(first(plotData)), realXAccessor(last(plotData))];
      }

      return { plotData, domain };
    }

    // domain.isItemVisibleInDomain = function(d, domain) {};

    return domain;
  }

  static showMax(width: number): number {
    let threshold = 0.75; // number of datapoints per 1 px
    return Math.floor(width * threshold);
  }

  private static getFilteredResponse(data, left, right, xAccessor) {
    let newLeftIndex = getClosestItemIndexes(data, left, xAccessor).right;
    let newRightIndex = getClosestItemIndexes(data, right, xAccessor).left;

    let filteredData = data.slice(newLeftIndex, newRightIndex + 1);

    return filteredData;
  }

  private static compose(funcs: any): any {
    if (funcs.length === 0) {
      return identity;
    }

    if (funcs.length === 1) {
      return funcs[0];
    }

    let [head, ...tail] = funcs;

    return args => tail.reduce((composed, f) => f(composed), head(args));
  }
}