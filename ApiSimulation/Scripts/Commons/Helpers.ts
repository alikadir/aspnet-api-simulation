
class ObservebleHelper
{
    public static ObservableToClassicObject = (observableObj: any): any =>
    {
        return ko.viewmodel.toModel(observableObj);
    }

    public static ClassicObjectToObservable = (classicObj: any): any =>
    {
        return ko.viewmodel.fromModel(classicObj);
    }

    public static UpdateObserveble = (observableObj: any, classicObj: any): void =>
    {
        ko.viewmodel.updateFromModel(observableObj, classicObj);
    }
}

class Base64Helper
{

    public static detectContentType = (base64: string): any =>
    {
        return base64.substring(base64.indexOf(Base64Constant.Base64StartTag) + Base64Constant.Base64StartTag.length, base64.indexOf(Base64Constant.Base64EndTag));
    }

    public static clearBase64 = (base64: string, contentType: string): any =>
    {
        let combine = Base64Constant.Base64StartTag + contentType + Base64Constant.Base64EndTag;
        return base64.substring(base64.indexOf(combine) + combine.length);
    }
}
