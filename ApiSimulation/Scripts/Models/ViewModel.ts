class ViewModel implements IViewModel
{

    InProgress: KnockoutObservable<boolean> = ko.observable(false);

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
        if (!this.IsValid(item, true))
            return;

        // server send
        let self = item;
        self.InProgress(true);
        setTimeout(() => { self.InProgress(false); }, 2000);


        item.IsEditing(false);
    }
    Cancel = (item: Response): void =>
    {
        item.IsEditing(false);

        if (!this.IsValid(item))
            this.Delete(item);

    }
    Load = (): void =>
    {
        let self = this;
        self.InProgress(true);
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
            self.InProgress(false);
        });
    }

    AddNewDetail = (parent: Response): void =>
    {
        this.LoadDetail(parent, () =>
        {
            let detail = new ResponseDetail();
            detail.ResponseID = parent.ID;

            parent.Items.unshift(detail);
        });

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

        if (!this.IsValidDetail(item, true))
            return;

        // server send
        let self = item;
        self.InProgress(true);
        setTimeout(() => { self.InProgress(false); }, 2000);


        item.IsEditing(false);
    }
    CancelDetail = (item: ResponseDetail): void =>
    {
        // required alanlar dolu ise kaydet 
        item.IsEditing(false);
    }
    LoadDetail = (parent: Response, callBack?: () => void): void =>
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

            if (typeof (callBack) === 'function')
                callBack();

        });
    }

    SelectFile = (item: ResponseDetail, file?: any) =>
    {
        if (file != null)
        {
            item.InProgress(true);

            let FR = new FileReader();

            FR.onload = (e: any) =>
            {
                let base64: string = e.target.result;
                let contentType: string = Base64Helper.detectContentType(base64);
                base64 = Base64Helper.clearBase64(base64, contentType);

                item.ContentType(contentType);
                item.ContentRaw(base64);

                item.InProgress(false);
            };

            FR.readAsDataURL(file);
        }
    }

    IsValid = (item: Response, showMessage: boolean = false): any =>
    {
        if (item.Url().length > 0)
            return true;
        else
        {
            if (showMessage)
                alert("Url is required!");
            return false;
        }
    }

    IsValidDetail = (item: ResponseDetail, showMessage: boolean = false): any =>
    {
        if (item.ContentRaw().length == 0)
        {
            if (showMessage)
                alert("ContentRaw is required!");
            return false;
        }
        else if (item.ContentType().length == 0)
        {
            if (showMessage)
                alert("ContentType is required!");
            return false;
        }
        else
            return true;
    }

    Items: KnockoutObservableArray<Response> = ko.observableArray([]);


}