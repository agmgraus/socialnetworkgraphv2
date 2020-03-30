
module powerbi.extensibility.visual.stakeholderMap99E9F31DDFD7429BACA50118466E4D11  {
    // powerbi.extensibility.utils.dataview
    import DataViewObjectsParser = powerbi.extensibility.utils.dataview.DataViewObjectsParser;

    export class SocialNetworkGraphSettings extends DataViewObjectsParser {
        public links: LinksSettings = new LinksSettings();
        public nodes: NodesSettings = new NodesSettings();
    }

    export class Animation {
        public show: boolean = true;
    }

    export class LinksSettings {
        public linkColor: string = "#777";
        public linkWidth: number = 3;
    }

    export class NodesSettings {
        public nodeBorderColor: string = "#000";
        public nodeBorderWidth: number = 5;
        public nodeShowName: boolean = true;
        public nodeNameAlignment: string = "center";
    }

    export class SizeSettings {
        public charge: number = -15;
        public boundedByBox: boolean = false;
    }
}
