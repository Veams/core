declare const VeamsHelpers: {
    pluginName: string;
    initialize: (Veams: any) => void;
    addDefaultHelpers: (Veams: any) => void;
};
export default VeamsHelpers;
export declare type VeamsHelpersType = {
    [key: string]: (...any) => any;
};
