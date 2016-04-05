interface IViewModel
{

    AddNew: () => void;
    Delete: (item: Response) => void;
    Load: () => void;
    AddNewDetail: (parent: Response) => void;
    DeleteDetail: (parent: Response, item: ResponseDetail) => void;
    LoadDetail: (parent: Response) => void;
    Items: KnockoutObservableArray<Response>
}