class ResponseDetail
{

    constructor(item?: any)
    {
        if (item != null)
        {
            this.ID(item.ID);
            this.Delay(item.Delay);
            this.ContentRaw(item.ContentRaw);
            this.ContentType(item.ContentType);
            this.Hit(item.Hit);
            this.CreateDate(item.CreateDate);
            this.ResponseID(item.Response);
            this.IsEditing(false);

        }
    }

    ID: KnockoutObservable<number> = ko.observable(0);
    Delay: KnockoutObservable<number> = ko.observable(0);
    ContentRaw: KnockoutObservable<string> = ko.observable("");
    ContentType: KnockoutObservable<string> = ko.observable("");
    Hit: KnockoutObservable<number> = ko.observable(0);
    CreateDate: KnockoutObservable<Date> = ko.observable(new Date());
    ResponseID: KnockoutObservable<number> = ko.observable(0);

    IsEditing: KnockoutObservable<boolean> = ko.observable(true);
    InProgress: KnockoutObservable<boolean> = ko.observable(false);
}