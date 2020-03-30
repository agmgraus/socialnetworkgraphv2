
// powerbi.extensibility.utils.dataview

import powerbi from "powerbi-visuals-api";
import * as dataviewutils from "powerbi-visuals-utils-dataviewutils";
import DataViewObjectsParser = dataviewutils.dataViewObjectsParser.DataViewObjectsParser;

export class SocialNetworkGraphSettings extends DataViewObjectsParser {
    public links: LinksSettings = new LinksSettings();
    public nodes: NodesSettings = new NodesSettings();
    //public dataColors: any;
}

export class Animation {
    public show: boolean = true;
}

export class LinksSettings {
    public linkColor: string = "#777";
    public linkColorMouseover: string = "#000";

    public linkWidth: number = 3;
}

export class NodesSettings {
    public nodeBorderColor: string = "#000";
    public nodeBorderWidth: number = 5;
    public nodeShowName: boolean = true;
    public nodeNameFontFamily: string = 'Segoe UI';
    public nodeFontSize: number = 14;

}

export class SizeSettings {
    public charge: number = -15;
    public boundedByBox: boolean = false;
}
