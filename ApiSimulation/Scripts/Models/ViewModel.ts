class ViewModel implements IViewModel
{

    AddNew = (): void =>
    {
        this.Items.push(new Response());
    }
    Delete = (item: Response): void =>
    {
        this.Items.remove(item);
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
        parent.Items.push(new ResponseDetail());
    }
    DeleteDetail = (parent: Response, item: ResponseDetail): void =>
    {
        parent.Items.remove(item);
    }
    LoadDetail = (parent: Response): void =>
    {
        let self = parent;
        $.getJSON("/Operation/GetResponseDetailListByParentID", { parentId: parent.ID }, (data) =>
        {
            self.Items = ko.observableArray([]);

            let items: Array<ResponseDetail> = data;

            if (items.length > 0)
            {
                items.forEach((item) =>
                {
                    self.Items.push(new ResponseDetail(item));
                });
            }

        });
    }

    Items: KnockoutObservableArray<Response> = ko.observableArray([]);

}