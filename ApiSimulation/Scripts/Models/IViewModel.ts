interface IViewModel
{
    InProgress: KnockoutObservable<boolean>;

    AddNew: () => void;
    Delete: (item: Response) => void;
    Edit: (item: Response) => void;
    Save: (item: Response) => void;
    Cancel: (item: Response) => void;
    Load: () => void;

    AddNewDetail: (parent: Response) => void;
    DeleteDetail: (parent: Response, item: ResponseDetail) => void;
    EditDetail: (item: ResponseDetail) => void;
    SaveDetail: (item: ResponseDetail) => void;
    CancelDetail: (item: ResponseDetail) => void;
    LoadDetail: (parent: Response, callBack?: () => void) => void;

    SelectFile: (item: ResponseDetail, file: any) => void;

    IsValid: (item: Response, showMessage?: boolean) => boolean;
    IsValidDetail: (item: ResponseDetail, showMessage?: boolean) => boolean;

    Items: KnockoutObservableArray<Response>;
}