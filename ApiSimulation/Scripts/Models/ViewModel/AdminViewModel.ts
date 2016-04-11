namespace Models.ViewModel
{
    export class AdminViewModel extends ViewModelBase
    {

        constructor() { super(); }

        InProgress: KnockoutObservable<boolean> = ko.observable(false);

        AddNew = (): void =>
        {
            this.Items.unshift(new DTO.Response());
        }
        Delete = (item: DTO.Response, callBack?: () => void): void =>
        {
            let self = this;

            if (item.ID == 0)
                self.Items.remove(item);
            else
            {
                self.InProgress(true);
                $.get("/Operation/DeleteResponse", { id: item.ID }, () =>
                {
                    self.Items.remove(item);
                    self.InProgress(false);
                });
            }

        }
        Edit = (item: DTO.Response): void =>
        {
            item.IsEditing(true);
        }
        Save = (item: DTO.Response, callBack?: () => void): void =>
        {
            if (!item.IsValid(true))
                return;

            let self = item;

            self.InProgress(true);

            $.post("/Operation/SaveResponse", item, (data) =>
            {
                if (data === 0)
                    alert("Kaydedilemedi!");
                else
                {
                    item.ID = data;
                    item.IsEditing(false);
                }
                self.InProgress(false);

                if (typeof (callBack) === 'function')
                    callBack();

            });
        }
        Cancel = (item: DTO.Response): void =>
        {
            this.Reload(item);
        }
        Load = (): void =>
        {
            let self = this;
            self.InProgress(true);
            $.getJSON("/Operation/GetResponseList", (data) =>
            {
                self.Items.removeAll();

                let items: Array<DTO.Response> = data;

                if (items.length > 0)
                {
                    items.forEach((item) =>
                    {
                        self.Items.push(new DTO.Response(item));
                    });
                }
                self.InProgress(false);
            });
        }

        AddNewDetail = (parent: DTO.Response): void =>
        {
            this.LoadDetails(parent, () =>
            {
                let detail = new DTO.ResponseDetail();
                detail.ResponseID = parent.ID;

                parent.Items.unshift(detail);

            });

        }
        DeleteDetail = (parent: DTO.Response, item: DTO.ResponseDetail, callBack?: () => void): void =>
        {

            let self = this;

            if (item.ID == 0)
                parent.Items.remove(item);
            else
            {
                item.InProgress(true);
                $.get("/Operation/DeleteResponseDetail", { id: item.ID }, () =>
                {
                    parent.Items.remove(item);
                });
            }

        }
        EditDetail = (item: DTO.ResponseDetail): void =>
        {
            item.IsEditing(true);
        }
        SaveDetail = (item: DTO.ResponseDetail, callBack?: () => void): void =>
        {

            if (!item.IsValid(true))
                return;

            let self = item;

            self.InProgress(true);

            $.post("/Operation/SaveResponseDetail", item, (data) =>
            {
                if (data === 0)
                    alert("Kaydedilemedi!");
                else
                {
                    item.ID = data;
                    item.IsEditing(false);
                }

                self.InProgress(false);

                if (typeof (callBack) === 'function')
                    callBack();

            });
        }
        CancelDetail = (parent: DTO.Response, item: DTO.ResponseDetail): void =>
        {
            this.ReloadDetail(parent, item);
        }
        LoadDetails = (parent: DTO.Response, callBack?: () => void): void =>
        {
            let self = parent;
            self.InProgress(true);

            $.getJSON("/Operation/GetResponseDetailListByParentID", { parentId: parent.ID }, (data) =>
            {
                self.Items.removeAll();

                let items: Array<DTO.ResponseDetail> = data;

                if (items.length > 0)
                {
                    items.forEach((item) =>
                    {
                        self.Items.push(new DTO.ResponseDetail(item));
                    });
                }

                self.InProgress(false);

                if (typeof (callBack) === 'function')
                    callBack();

            });
        }

        Reload = (item: DTO.Response, callBack?: () => void) =>
        {
            item.InProgress(true);

            let self = this;

            if (item.ID == 0)
                this.Delete(item, callBack);
            else
            {
                $.getJSON("/Operation/GetResponseByID", { id: item.ID }, (data) =>
                {
                    let response: DTO.Response = data;
                    self.Items.replace(item, new DTO.Response(response));

                    if (typeof (callBack) === 'function')
                        callBack();
                });
            }
        }

        ReloadDetail = (parent: DTO.Response, item: DTO.ResponseDetail, callBack?: () => void) =>
        {
            item.InProgress(true);

            if (item.ID == 0)
                this.DeleteDetail(parent, item, callBack);
            else
            {
                $.getJSON("/Operation/GetResponseDetailByID", { id: item.ID }, (data) =>
                {
                    let responseDetail: DTO.ResponseDetail = data;

                    parent.Items.replace(item, new DTO.ResponseDetail(responseDetail));

                    if (typeof (callBack) === 'function')
                        callBack();
                });
            }
        }

        SelectFile = (item: DTO.ResponseDetail, file?: any) =>
        {
            if (file != null)
            {
                item.InProgress(true);

                let FR = new FileReader();

                FR.onload = (e: any) =>
                {
                    let base64: string = e.target.result;
                    let contentType: string = Commons.Helpers.Base64Helper.detectContentType(base64);
                    base64 = Commons.Helpers.Base64Helper.clearBase64(base64, contentType);

                    item.ContentType(contentType);
                    item.ContentRaw(base64);

                    item.InProgress(false);
                };

                FR.readAsDataURL(file);
            }
        }

        Items: KnockoutObservableArray<DTO.Response> = ko.observableArray([]);


    }
}