
"use strict";
import powerbi from "powerbi-visuals-api";   //// this.formattingSettings.enableAxis.lic.value
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import { TheSettingsModel} from "./settings";
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import { FormattingSettingsService,  formattingSettings  } from "powerbi-visuals-utils-formattingmodel";
import FormattingSettingsCard = formattingSettings.SimpleCard;
import FormattingSettingsSlice = formattingSettings.Slice;
import FormattingSettingsModel = formattingSettings.Model;
import TextInput = formattingSettings.TextInput;
import IFormattingModel = powerbi.visuals.FormattingModel;

import { dataViewObjectsParser } from "powerbi-visuals-utils-dataviewutils";
//import { textMeasurementService } from "powerbi-visuals-utils-formattingutils";
import DataViewObjectsParser = dataViewObjectsParser.DataViewObjectsParser;
import VisualObjectInstance = powerbi.VisualObjectInstance;
import DataView = powerbi.DataView;
import IViewport = powerbi.IViewport;
import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;
import ISelectionManager = powerbi.extensibility.ISelectionManager;
import IVisualLicenseManager = powerbi.extensibility.IVisualLicenseManager;
import LicenseInfoResult = powerbi.extensibility.visual.LicenseInfoResult;
import ServicePlan = powerbi.extensibility.visual.ServicePlan
import { parseElement, resetInjector, runHTMLWidgetRenderer } from "./htmlInjectionUtility";
import {
    select as d3Select,
    Selection as d3Selection,
    BaseType
} from "d3-selection";

enum VisualUpdateType {    Data = 2,    Resize = 4,    ViewMode = 8,  Style = 16,    ResizeEnd = 32,    All = 62,}
const updateHTMLHead: boolean = false;
const renderVisualUpdateType: number[] = [
                VisualUpdateType.Resize,
                VisualUpdateType.ResizeEnd,
                VisualUpdateType.Resize + VisualUpdateType.ResizeEnd];
type Selection<T extends BaseType> = d3Selection<T, any, any, any>;

import DataViewCategoryColumn = powerbi.DataViewCategoryColumn;
import Fill = powerbi.Fill;
import ISandboxExtendedColorPalette = powerbi.extensibility.ISandboxExtendedColorPalette;
import ISelectionId = powerbi.visuals.ISelectionId;
import PrimitiveValue = powerbi.PrimitiveValue;
import DataViewObjectPropertyIdentifier = powerbi.DataViewObjectPropertyIdentifier;
import { dataViewObjects} from "powerbi-visuals-utils-dataviewutils"; 


export class Visual implements IVisual {
     private svg: Selection<any>;
    private host: IVisualHost;
    private element: HTMLElement;
    private selectionManager: ISelectionManager;
    private headNodes;
    private bodyNodes;
    private settings;
    private licenseManager: IVisualLicenseManager;
    getNotificationType: any;
    validlicence: any;
    teststring: any;
    flashlic: any;
    emailpattern: any;
   // private visualSettings: VisualSettings;
    private formattingSettingsService: FormattingSettingsService
    private formattingSettings: TheSettingsModel;

    private directEditElement: Selection<Element>;
    private gggsettingsElement: Selection<Element>;


    private currentUserValidPlans: ServicePlan[] | undefined;
    private hasServicePlans: boolean | undefined;
    private isLicenseUnsupportedEnv: boolean | undefined;
    private isLicenseOK: boolean | undefined;


   

    /**
     * Creates instance . This method is only called once.
     *
     * @constructor
     * @param {VisualConstructorOptions} options - Contains references to the element that will
     *                                             contain the visual and a reference to the host
     *                                             which contains services.
     */
    constructor(options: VisualConstructorOptions) {

        this.formattingSettingsService = new FormattingSettingsService();
        let allowInteractions = options.host.hostCapabilities.allowInteractions;       
 	    this.host = options.host;
        this.element = options.element;
        this.selectionManager = options.host.createSelectionManager();
        this.svg = d3Select(options.element);
        this.headNodes = [];
        this.bodyNodes = [];
        this.handleContextMenu();
        this.teststring = 'd658d3b5-0ede-444f-9e1a-bf9bd5c1f527'

        this.licenseManager = options.host.licenseManager;
        this.licenseManager.clearLicenseNotification


        this.licenseManager.getAvailableServicePlans()
        .then(({ plans, isLicenseUnsupportedEnv, isLicenseInfoAvailable }: LicenseInfoResult) => {
        if (isLicenseInfoAvailable && !isLicenseUnsupportedEnv) {
        this.currentUserValidPlans = plans?.filter(({ spIdentifier, state }) => 
            (state === powerbi.ServicePlanState.Active || state === powerbi.ServicePlanState.Warning)
        );
        this.hasServicePlans = !!this.currentUserValidPlans?.length;
        }
        this.isLicenseUnsupportedEnv = isLicenseUnsupportedEnv;
        
        }).catch((err) => {
        this.currentUserValidPlans = undefined;
        this.hasServicePlans = undefined;
        this.licenseManager.notifyLicenseRequired(1)
        });
    
        // An array of Service Plans purchased by the active user for this visual 
        // plans: ServicePlan[] | undefined;           spIdentifier: string;         state: ServicePlanState;
        // Indicates that the visual is being rendered in a Power BI environment that doesn't support licenses management or enforcement.
        // isLicenseUnsupportedEnv: boolean;
        // Indicates whether the licenses info could be retrieved. 
        // isLicenseInfoAvailable: boolean; */
        // this.licenseManager.notifyLicenseRequired(0)         display an icon license notification, display "upgrade" button.
        // this.licenseManager.notifyLicenseRequired(1)         no licence message 
        // this.licenseManager.notifyLicenseRequired(2)         display a blocker license notification, display "email or upgrade" button.
        // this.licenseManager.notifyFeatureBlocked('Blocked')  not sure what this does   
        // this.licenseManager.clearLicenseNotification         clear notifications 
   
       
        this.host = options.host;
        //Creating the formatting settings service.
        const localizationManager = this.host.createLocalizationManager();
        this.formattingSettingsService = new FormattingSettingsService(localizationManager);


       //create direct edit box
        const directEditDiv = this.creatDirectEditElement();
        const ggsettingsDiv = this.creatggsettingsElement();
       // options.element.appendChild(directEditDiv);
        this.directEditElement = d3Select(directEditDiv);
        this.gggsettingsElement = d3Select(ggsettingsDiv);
        
    }

    /**
     * Updates the state of the visual. Every sequential databinding and resize will call update.
     *
     * @function
     * @param {VisualUpdateOptions} options - Contains references to the size of the container
     *                                        and the dataView which contains all the data
     *                                        the visual had queried.
     */
    public update(options: VisualUpdateOptions) {


        this.emailpattern = "^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}"    
        this.formattingSettings = this.formattingSettingsService.populateFormattingSettingsModel(TheSettingsModel, options.dataViews?.[0]);
        this.updateDirectEditElementFormat();
  
        this.validlicence = this.formattingSettings.directEditSettings.licensecode.value     
        this.licenseManager.clearLicenseNotification; 

        const emailRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/ 
        //d658d3b5-0ede-444f-9e1a-bf9bd5c1f527
        this.licenseManager.clearLicenseNotification 

        if (emailRegex.test(this.validlicence )    && !this.isLicenseUnsupportedEnv )
         {   this.licenseManager.notifyLicenseRequired(1)
        } else {
            this.licenseManager.notifyLicenseRequired(2)
        }


        if (!options ||
            !options.type ||
            !options.viewport ||
            !options.dataViews ||
            options.dataViews.length === 0 ||
            !options.dataViews[0]) {
            return;
        }
 
        const dataView: DataView = options.dataViews[0];

        let payloadBase64: string = null;
        if (dataView.scriptResult && dataView.scriptResult.payloadBase64) {
            payloadBase64 = dataView.scriptResult.payloadBase64;
        }

        if (renderVisualUpdateType.indexOf(options.type) === -1) {
            if (payloadBase64) {
                this.injectCodeFromPayload(payloadBase64);
            }
        } else {
            this.onResizing(options.viewport);
        }
    }



    public onResizing(finalViewport: IViewport): void {
        // tslint:disable-next-line
        /* add code to handle resizing of the view port */
    }

    private injectCodeFromPayload(payloadBase64: string): void {
        // inject HTML from payload, created in R
        // the code is injected to the 'head' and 'body' sections.
        // if the visual was already rendered, the previous DOM elements are cleared

        resetInjector();

        if (!payloadBase64) {
            return;
        }

        // create 'virtual' HTML, so parsing is easier
        let el: HTMLHtmlElement = document.createElement("html");
        try {
           
            el.innerHTML = window.atob(payloadBase64);  // eslint-disable-line
        } catch (err) {
            return;
        }

        // if 'updateHTMLHead == false', then the code updates the header data only on the 1st rendering
        // this option allows loading and parsing of large and recurring scripts only once.
        if (updateHTMLHead || this.headNodes.length === 0) {
            while (this.headNodes.length > 0) {
                let tempNode: Node = this.headNodes.pop();
                document.head.removeChild(tempNode);
            }
            let headList: HTMLCollectionOf<HTMLHeadElement> = el.getElementsByTagName("head");
            if (headList && headList.length > 0) {
                let head: HTMLHeadElement = headList[0];
                this.headNodes = parseElement(head, document.head);
            }
        }

        // update 'body' nodes, under the rootElement
        while (this.bodyNodes.length > 0) {
            let tempNode: Node = this.bodyNodes.pop();
            this.element.removeChild(tempNode);
        }
        let bodyList: HTMLCollectionOf<HTMLBodyElement> = el.getElementsByTagName("body");
        if (bodyList && bodyList.length > 0) {
            let body: HTMLBodyElement = bodyList[0];
            this.bodyNodes = parseElement(body, this.element);
        }

 
                   runHTMLWidgetRenderer();
    }

    

    public getFormattingModel(): powerbi.visuals.FormattingModel {
        return this.formattingSettingsService.buildFormattingModel(this.formattingSettings);
    }
    


          

    private handleContextMenu() {
        this.svg.on('contextmenu', (event) => {
            const mouseEvent: MouseEvent = event;
            const eventTarget: EventTarget = mouseEvent.target;
            const dataPoint: any = d3Select(<BaseType>eventTarget).datum();
            this.selectionManager.showContextMenu(dataPoint ? dataPoint.selectionId : {}, {
                x: mouseEvent.clientX,
                y: mouseEvent.clientY
            });
            mouseEvent.preventDefault();
      });
    }

    

  private updateDirectEditElementFormat() {
        this.directEditElement
            .classed("direct-edit", true)
            .text(this.formattingSettings.directEditSettings.licensecode.value);
        
    }


    private creatDirectEditElement(): Element {
    const element = document.createElement("div");
    element.setAttribute("class", "direct-edit");
    return element;
}


    private creatggsettingsElement(): Element {
    const element = document.createElement("div");
    element.setAttribute("class", "direct-edit");
    return element;
}
}

