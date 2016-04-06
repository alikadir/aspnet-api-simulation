class ViewModel implements IViewModel
{

    AddNew = (): void =>
    {
        this.Items.unshift(new Response());
    }
    Delete = (item: Response): void =>
    {
        this.Items.remove(item);
    }
    Edit = (item: Response): void =>
    {
        item.IsEditing(true);
    }
    Save = (item: Response): void =>
    {
        // server send
        let self = item;
        self.InProgress(true);
        setTimeout(() => { self.InProgress(false); }, 2000);


        item.IsEditing(false);
    }
    Cancel = (item: Response): void =>
    {
        item.IsEditing(false);
    }
    Load = (): void =>
    {
        let self = this;
        $.getJSON("/Operation/GetResponseList", (data) =>
        {
            self.Items.removeAll();

            let items: Array<Response> = data;

            if (items.length > 0)
            {
                items.forEach((item) =>
                {
                    self.Items.push(new Response(item));
                });
            }

        });
    }

    AddNewDetail = (parent: Response): void =>
    {
        this.LoadDetail(parent);
        parent.Items.unshift(new ResponseDetail());
    }
    DeleteDetail = (parent: Response, item: ResponseDetail): void =>
    {
        parent.Items.remove(item);
    }
    EditDetail = (item: ResponseDetail): void =>
    {
        item.IsEditing(true);
    }
    SaveDetail = (item: ResponseDetail): void =>
    {
        // server send
        let self = item;
        self.InProgress(true);
        setTimeout(() => { self.InProgress(false); }, 2000);


        item.IsEditing(false);
    }
    CancelDetail = (item: ResponseDetail): void =>
    {
        item.IsEditing(false);
    }
    LoadDetail = (parent: Response): void =>
    {
        let self = parent;
        self.InProgress(true);
        $.getJSON("/Operation/GetResponseDetailListByParentID", { parentId: parent.ID }, (data) =>
        {
            self.Items.removeAll();

            let items: Array<ResponseDetail> = data;

            if (items.length > 0)
            {
                items.forEach((item) =>
                {
                    self.Items.push(new ResponseDetail(item));
                });
            }

            self.InProgress(false);

        });
    }

    Items: KnockoutObservableArray<Response> = ko.observableArray([]);


}