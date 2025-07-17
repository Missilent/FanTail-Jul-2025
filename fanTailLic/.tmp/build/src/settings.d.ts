import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";
import Card = formattingSettings.SimpleCard;
import Model = formattingSettings.Model;
import Slice = formattingSettings.Slice;
declare class DirectEditSettings extends Card {
    displayName: string;
    name: string;
    private minFontSize;
    private defaultFontSize;
    licensecode: formattingSettings.TextInput;
    slices: Slice[];
}
/**
*  formatting settings model class
*/
export declare class TheSettingsModel extends Model {
    directEditSettings: DirectEditSettings;
    cards: Card[];
}
export declare class rcv_scriptSettings {
    provider: any;
    source: any;
}
export {};
