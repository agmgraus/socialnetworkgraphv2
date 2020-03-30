import powerbi from "powerbi-visuals-api";


export interface PeopleGraphNode extends d3.SimulationNodeDatum {
    name: string;
    photo: string;
    size: number;
    color_key: string;
    color?: string;
    extraInfo?: string;
    extraInfos?: ExtraInfo[];
    mouseOver?: boolean;
    selected?: boolean;
    x?: number;
    y?: number;
    fx?: number;
    fy?: number;
    r?: number;
    size_factor?: number;
}

export interface PeopleGraphLink extends d3.SimulationLinkDatum<d3.SimulationNodeDatum> {
    source: PeopleGraphNode;
    target: PeopleGraphNode;
    strength?: number;
    stroke_width?: number;
    linkType?: string;
    x1?: number;
    y1?: number;
    x2?: number;
    y2?: number;
    visible?: boolean;
}

export interface ExtraInfo {
    key: string;
    value: string;
}

export interface ColorKey {
    key: string,
    color: string,
    identity: powerbi.extensibility.ISelectionId
}


export interface ITextRect {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

export interface PeopleGraphNodes {
    [i: string]: PeopleGraphNode;
}


export interface LinkedByName {
    [linkName: string]: number;
}

