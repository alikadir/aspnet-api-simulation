namespace Models.ViewModel
{
    export class AdminViewModel extends ViewModelBase
    {

        constructor() { super(); }

        AddNew = (): void =>
        {
            let item = new DTO.Response();
            item.Category(this.SelectedCategory());
            this.Items.unshift(item);
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
                    $.toaster({ message: 'Kaydedilemedi! Url kullanılıyor olabilir.', title: 'Hata', priority: 'danger' });
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

                self.SelectedCategory(self.Categories()[0]);

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
                    $.toaster({ message: 'Kaydedilemedi!', title: 'Hata', priority: 'danger' });
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
        InProgress: KnockoutObservable<boolean> = ko.observable(false);

        Categories: KnockoutComputed<Array<string>> = ko.computed(
            {
                owner: this,
                read: () =>
                {
                    let returnList = [];

                    this.Items().forEach((item) =>
                    {
                        if (returnList.indexOf(item.Category()) == -1)
                            returnList.push(item.Category());
                    });

                    return returnList;
                }

            });


        private _SelectedCategory: KnockoutObservable<string> = ko.observable("");

        SelectedCategory: KnockoutComputed<string> = ko.computed(
            {
                owner: this,
                read: () =>
                {
                    if (this.Categories().indexOf(this._SelectedCategory()) == -1)
                    {
                        let result = this.Categories()[0];
                        this._SelectedCategory(result);
                        return result;
                    }
                    else
                        return this._SelectedCategory();
                },
                write: (value) =>
                {
                    this._SelectedCategory(value);
                }

            }, this);

        ShowLogDetail = (item: Models.DTO.Response): void =>
        {
            $("#iframe-log-detail").attr("src", "/Admin/LogDetail?responseId=" + item.ID);
            $("#iframe-loading").show();

            $("#modal-log-detail .modal-title").html("<b>Log Detail - </b> <code>" + item.UrlDisplay()+"</code>");
            $("#modal-log-detail").modal('toggle');
        }

    }
}