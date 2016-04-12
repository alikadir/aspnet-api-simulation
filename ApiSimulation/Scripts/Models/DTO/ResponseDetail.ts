namespace Models.DTO
{
    export class ResponseDetail extends DTOBase
    {

        constructor(item?: any)
        {
            super(item);

            if (item != null)
            {
                this.ID = item.ID;
                this.Delay(item.Delay);
                this.ContentRaw(item.ContentRaw);
                this.ContentType(item.ContentType);
                this.Hit = item.Hit;
                this.CreateDate = item.CreateDate;
                this.ResponseID = item.ResponseID;
                this.IsEditing(false);
            }

        }

        ID: number = 0;
        Delay: KnockoutObservable<number> = ko.observable(0);
        ContentRaw: KnockoutObservable<string> = ko.observable("");
        ContentType: KnockoutObservable<string> = ko.observable("");
        Hit: number = 0;
        CreateDate: any = moment().format();
        ResponseID: number = 0;

        IsValid(showMessage: boolean)
        {

            let self = this;

            if (self.ContentRaw() == null || self.ContentRaw().length == 0)
            {
                if (showMessage)
                    $.toaster({ message: 'Content Raw boş geçilemez!', title: 'Uyarı', priority: 'info' });
                return false;
            }
            else if (self.ContentType() == null || self.ContentType().length == 0)
            {
                if (showMessage)
                    $.toaster({ message: 'Content Type boş geçilemez!', title: 'Uyarı', priority: 'info' });
                return false;
            }
            else
                return true;
        }
    }
}