namespace Models.DTO
{

    export abstract class DTOBase
    {
        constructor(item?: any) { }

        abstract IsValid(showMessage: boolean): boolean

        IsEditing: KnockoutObservable<boolean> = ko.observable(true);
        InProgress: KnockoutObservable<boolean> = ko.observable(false);

    }
}