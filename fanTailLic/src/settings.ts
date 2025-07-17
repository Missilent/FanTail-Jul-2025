/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software/*  aaa
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

"use strict";


import { formattingSettings} from "powerbi-visuals-utils-formattingmodel";

import FormattingSettingsCompositeCard = formattingSettings.CompositeCard;
import FormattingSettingsSlice = formattingSettings.Slice;
import FormattingSettingsModel = formattingSettings.Model;
import FormattingSettingsGroup = formattingSettings.Group;


import Card = formattingSettings.SimpleCard;
import Model = formattingSettings.Model;
import Slice = formattingSettings.Slice;
import ColorPicker = formattingSettings.ColorPicker;
import ToggleSwitch = formattingSettings.ToggleSwitch;
import { TextInput } from "powerbi-visuals-utils-formattingmodel/lib/FormattingSettingsComponents";



class DirectEditSettings extends Card {
    displayName: string = "License";
    name: string = "directEdit";
    private minFontSize: number = 8;
    private defaultFontSize: number = 11;
    licensecode = new TextInput({
        displayName: "License Code",
        name: "licensecode",
        value: "",
        placeholder: ""
    });
    slices: Slice[] = [this.licensecode];
}





/**
*  formatting settings model class
*/
export class TheSettingsModel extends Model {
    // Create formatting settings model formatting cards
    directEditSettings = new DirectEditSettings();
    cards: Card[] = [this.directEditSettings]}  ;

 

import FormattingSettingsCard = formattingSettings.SimpleCard;


/**
 * RCV Script Formatting Card
 */
class rcvScriptCardSettings extends FormattingSettingsCard {
    provider: FormattingSettingsSlice = new TextInput({
        name: "provider",
        displayName: "Provider",
        value: undefined,
        placeholder: "Provider"
    });
    source: FormattingSettingsSlice = new TextInput({
        name: "source",
        displayName: "Source",
        value: undefined,
        placeholder: "Source"
    });
    licence: FormattingSettingsSlice = new TextInput({
        name: "licence",
        displayName: "licence",
        value: undefined,
        placeholder: "licence"
    });
    

    name: string = "rcv_script";
    displayName: string = "rcv_script";
    slices: Array<FormattingSettingsSlice> = [this.provider, this.source,this.licence];
}


export class rcv_scriptSettings {
     // undefined
      public provider     // undefined
      public source     }

