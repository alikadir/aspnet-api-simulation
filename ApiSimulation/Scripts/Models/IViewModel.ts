interface IViewModel
{

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
    LoadDetail: (parent: Response) => void;

    Items: KnockoutObservableArray<Response>
}