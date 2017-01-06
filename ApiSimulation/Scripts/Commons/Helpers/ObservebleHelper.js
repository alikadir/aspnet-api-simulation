var Commons;
(function (Commons) {
    var Helpers;
    (function (Helpers) {
        var ObservebleHelper = (function () {
            function ObservebleHelper() {
            }
            return ObservebleHelper;
        }());
        ObservebleHelper.ObservableToClassicObject = function (observableObj) {
            return ko.viewmodel.toModel(observableObj);
        };
        ObservebleHelper.ClassicObjectToObservable = function (classicObj) {
            return ko.viewmodel.fromModel(classicObj);
        };
        ObservebleHelper.UpdateObserveble = function (observableObj, classicObj) {
            ko.viewmodel.updateFromModel(observableObj, classicObj);
        };
        Helpers.ObservebleHelper = ObservebleHelper;
    })(Helpers = Commons.Helpers || (Commons.Helpers = {}));
})(Commons || (Commons = {}));
//# sourceMappingURL=ObservebleHelper.js.map