// hepler function here.

let ObservableToClassicObject = (observableObj: any): any =>
{
    return ko.viewmodel.toModel(observableObj);
}

let ClassicObjectToObservable = (classicObj: any): any =>
{
    return ko.viewmodel.fromModel(classicObj);
}

let UpdateObserveble = (observableObj: any, classicObj: any): void =>
{
    ko.viewmodel.updateFromModel(observableObj, classicObj);
}
