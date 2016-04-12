
namespace Models.DTO
{
    export class Response extends DTOBase
    {
        constructor(item?: any)
        {
            super(item);

            if (item != null)
            {
                this.ID = item.ID;
                this.Hit = item.Hit;
                this.Url(item.Url);
                this.LastRequestDate = item.LastRequestDate;
                this.CreateDate = item.CreateDate;
                this.IsEditing(false);
            }

        }
        ID: number = 0;
        Url: KnockoutObservable<string> = ko.observable("");
        UrlDisplay: KnockoutComputed<string> = ko.computed(() => { return document.location.origin + '/' + this.Url(); });
        Hit: number = 0;
        LastRequestDate: any = moment().format();
        CreateDate: any = moment().format();

        Items: KnockoutObservableArray<ResponseDetail> = ko.observableArray([]);

        IsValid(showMessage: boolean)
        {
            let self = this;

            if (self.Url() != null && self.Url().length > 0)
                return true;
            else
            {
                if (showMessage)
                    $.toaster({ message: 'Url boş geçilemez!', title: 'Uyarı', priority: 'info' });
                return false;
            }
        }

    }
}