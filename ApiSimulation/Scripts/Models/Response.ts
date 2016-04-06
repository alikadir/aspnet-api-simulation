class Response 
{
    constructor(item?: any)
    {
        if (item != null)
        {
            this.ID(item.ID);
            this.Hit(item.Hit);
            this.Url(item.Url);
            this.IsEditing(false);
        }
    }
    ID: KnockoutObservable<number> = ko.observable(0);
    Url: KnockoutObservable<string> = ko.observable("");
    Hit: KnockoutObservable<number> = ko.observable(0);
    Items: KnockoutObservableArray<ResponseDetail> = ko.observableArray([]);

    IsEditing: KnockoutObservable<boolean> = ko.observable(true);
    InProgress: KnockoutObservable<boolean> = ko.observable(false);
}