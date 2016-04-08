class ResponseDetail
{

    constructor(item?: any)
    {
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
    Delay: KnockoutObservable<number> = ko.observable(0).extend({ min: 2, max: 10 });
    ContentRaw: KnockoutObservable<string> = ko.observable("");
    ContentType: KnockoutObservable<string> = ko.observable("");
    Hit: number = 0;
    CreateDate: Date = new Date();
    ResponseID: number = 0;

    IsEditing: KnockoutObservable<boolean> = ko.observable(true);
    InProgress: KnockoutObservable<boolean> = ko.observable(false);
}