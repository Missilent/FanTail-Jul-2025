import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import IViewport = powerbi.IViewport;
export declare class Visual implements IVisual {
    private svg;
    private host;
    private element;
    private selectionManager;
    private headNodes;
    private bodyNodes;
    private settings;
    private licenseManager;
    getNotificationType: any;
    validlicence: any;
    teststring: any;
    flashlic: any;
    emailpattern: any;
    private formattingSettingsService;
    private formattingSettings;
    private directEditElement;
    private gggsettingsElement;
    private currentUserValidPlans;
    private hasServicePlans;
    private isLicenseUnsupportedEnv;
    private isLicenseOK;
    /**
     * Creates instance . This method is only called once.
     *
     * @constructor
     * @param {VisualConstructorOptions} options - Contains references to the element that will
     *                                             contain the visual and a reference to the host
     *                                             which contains services.
     */
    constructor(options: VisualConstructorOptions);
    /**
     * Updates the state of the visual. Every sequential databinding and resize will call update.
     *
     * @function
     * @param {VisualUpdateOptions} options - Contains references to the size of the container
     *                                        and the dataView which contains all the data
     *                                        the visual had queried.
     */
    update(options: VisualUpdateOptions): void;
    onResizing(finalViewport: IViewport): void;
    private injectCodeFromPayload;
    getFormattingModel(): powerbi.visuals.FormattingModel;
    private handleContextMenu;
    private updateDirectEditElementFormat;
    private creatDirectEditElement;
    private creatggsettingsElement;
}
