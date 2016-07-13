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
}
export declare class Evaluator {
    private config;
    static evaluate(data: any, config: EvaluatorConfig): {
        filterData: (inputDomain: any, xAccessor: any, currentPlotData: any, currentDomain: any) => {
            plotData: any;
            domain: any;
        };
        xScale: any;
        xAccessor: any;
        displayXAccessor: any;
        lastItem: any;
    };
    static canShowTheseManyPeriods(width: number, arrayLength: number): boolean;
    static getDomain(inputDomain: any, width: any, filteredData: any, predicate: any, currentDomain: any, canShowTheseMany: any, realXAccessor: any): any;
    static extentsWrapper(data: any, inputXAccessor: any, realXAccessor: any, width: any, useWholeData: any): (inputDomain: any, xAccessor: any, currentPlotData: any, currentDomain: any) => {
        plotData: any;
        domain: any;
    };
    static showMax(width: number): number;
    private static getFilteredResponse(data, left, right, xAccessor);
    private static compose(funcs);
}
