export class PaginatedInputModel {
    
    PageNumber:Number;
    PageSize:Number;
    SortingParams :SortingParams[];
    FilterParam:FilterParam[];
    
}

export class SortingParams {
    SortOrder:string ;
    ColumnName:string;
}

export class FilterParam {
    FilterValue:string;
    
}