namespace Commons.Helpers
{
    export class ObservebleHelper
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
}