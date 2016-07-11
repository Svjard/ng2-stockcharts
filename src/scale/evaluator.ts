import {
  first,
  last,
  getClosestItemIndexes,
  isDefined,
  isNotDefined,
  isArray,
  identity,
} from '../utils';

export default class Evaluator {
  public xAccessor: d3.functor;
  public useWholeData: boolean = true;
  public width: number;
  public xScale: any;
  public map: d3.functor;
  public calculator: Array<d3.functor> = [];
  public scaleProvider: d3.functor;
  public indexAccessor: d3.functor;
  public indexMutator: any;

  evaluate() {
    let mappedData = data.map(this.map);
    let composedCalculator = compose(this.calculator);
    let calculatedData = composedCalculator(mappedData);

    if (isDefined(this.scaleProvider)) {
      let {
        data: finalData,
        xScale: modifiedXScale,
        xAccessor: realXAccessor,
        displayXAccessor
      } = scaleProvider(calculatedData, xAccessor, indexAccessor, indexMutator);

      return {
        filterData: extentsWrapper(finalData, xAccessor, realXAccessor, width, useWholeData),
        xScale: modifiedXScale,
        xAccessor: realXAccessor,
        displayXAccessor,
        lastItem: last(finalData),
      };
    }

    return {
      filterData: extentsWrapper(calculatedData, xAccessor, xAccessor, width, useWholeData),
      xScale,
      xAccessor,
      displayXAccessor: xAccessor,
      lastItem: last(calculatedData),
    };
  }

  canShowTheseManyPeriods(width: number, arrayLength: number): boolean {
    let threshold = 0.75; // number of datapoints per 1 px
    return arrayLength < width * threshold && arrayLength > 1;
  }

  getDomain(inputDomain, width, filteredData, predicate, currentDomain, canShowTheseMany, realXAccessor) {
    if (canShowTheseMany(width, filteredData.length)) {
      let domain = predicate
        ? inputDomain
        : [realXAccessor(first(filteredData)), realXAccessor(last(filteredData))]; // TODO fix me later
      return domain;
    }

    return currentDomain;
  }

  extentsWrapper(data, inputXAccessor, realXAccessor, width, useWholeData) {
    function domain(inputDomain, xAccessor, currentPlotData, currentDomain) {
      if (useWholeData) {
        return { plotData: data, domain: inputDomain };
      }

      let left = first(inputDomain);
      let right = last(inputDomain);

      let filteredData = getFilteredResponse(data, left, right, xAccessor);

      let plotData, domain
      if (canShowTheseManyPeriods(width, filteredData.length)) {
        plotData = filteredData;
        domain = realXAccessor === xAccessor ? inputDomain : [realXAccessor(first(plotData)), realXAccessor(last(plotData))];
      } else {
        plotData = currentPlotData || filteredData.slice(filteredData.length - showMax(width));
        domain = currentDomain || [realXAccessor(first(plotData)), realXAccessor(last(plotData))];
      }

      return { plotData, domain };
    }

    domain.isItemVisibleInDomain = function(d, domain) {};

    return domain;
  }

  showMax(width: number) {
    let threshold = 0.75; // number of datapoints per 1 px
    return Math.floor(width * threshold);
  }

  private getFilteredResponse(data, left, right, xAccessor) {
    let newLeftIndex = getClosestItemIndexes(data, left, xAccessor).right;
    let newRightIndex = getClosestItemIndexes(data, right, xAccessor).left;

    let filteredData = data.slice(newLeftIndex, newRightIndex + 1);

    return filteredData;
  }

  private compose(funcs) {
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