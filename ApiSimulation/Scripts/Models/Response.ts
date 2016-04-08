class Response 
{
    constructor(item?: any)
    {
        if (item != null)
        {
            this.ID = item.ID;
            this.Hit = item.Hit;
            this.Url(item.Url);
            this.LastRequestDate = item.LastRequestDate;
            this.IsEditing(false);
        }
    }
    ID: number = 0;
    Url: KnockoutObservable<string> = ko.observable("").extend({ required: true, minLength: 3, maxLength: 10 });
    Hit: number = 0;
    LastRequestDate: Date = new Date();

    Items: KnockoutObservableArray<ResponseDetail> = ko.observableArray([]);

    IsEditing: KnockoutObservable<boolean> = ko.observable(true);
    InProgress: KnockoutObservable<boolean> = ko.observable(false);
}