ko.extenders.required = function (target, overrideMessage) {
    target.hasError = ko.observable();
    target.validationMessage = ko.observable();
    //define a function to do validation
    function validate(newValue) {
        target.hasError(newValue ? false : true);
        target.validationMessage(newValue ? "" : overrideMessage || "This field is required");
    }
    //initial validation
    validate(target());
    //validate whenever the value changes
    target.subscribe(validate);
    //return the original observable
    return target;
};

var ObservebleHelper = (function () {
    function ObservebleHelper() {
    }
    ObservebleHelper.ObservableToClassicObject = function (observableObj) {
        return ko.viewmodel.toModel(observableObj);
    };
    ObservebleHelper.ClassicObjectToObservable = function (classicObj) {
        return ko.viewmodel.fromModel(classicObj);
    };
    ObservebleHelper.UpdateObserveble = function (observableObj, classicObj) {
        ko.viewmodel.updateFromModel(observableObj, classicObj);
    };
    return ObservebleHelper;
}());
var Base64Helper = (function () {
    function Base64Helper() {
    }
    Base64Helper.detectContentType = function (base64) {
        return base64.substring(base64.indexOf(Base64Constant.Base64StartTag) + Base64Constant.Base64StartTag.length, base64.indexOf(Base64Constant.Base64EndTag));
    };
    Base64Helper.clearBase64 = function (base64, contentType) {
        var combine = Base64Constant.Base64StartTag + contentType + Base64Constant.Base64EndTag;
        return base64.substring(base64.indexOf(combine) + combine.length);
    };
    return Base64Helper;
}());

var ContentTypeConstant = (function () {
    function ContentTypeConstant() {
    }
    ContentTypeConstant.AllowedContentTypes = ["application/json", "application/xml", "text/html", "text/plain", "image/png", "image/jpeg", "application/pdf"];
    return ContentTypeConstant;
}());
var Base64Constant = (function () {
    function Base64Constant() {
    }
    Base64Constant.Base64StartTag = "data:";
    Base64Constant.Base64EndTag = ";base64,";
    return Base64Constant;
}());


var Response = (function () {
    function Response(item) {
        this.ID = 0;
        this.Url = ko.observable("").extend({ required: true, minLength: 3, maxLength: 10 });
        this.Hit = 0;
        this.LastRequestDate = new Date();
        this.Items = ko.observableArray([]);
        this.IsEditing = ko.observable(true);
        this.InProgress = ko.observable(false);
        if (item != null) {
            this.ID = item.ID;
            this.Hit = item.Hit;
            this.Url(item.Url);
            this.LastRequestDate = item.LastRequestDate;
            this.IsEditing(false);
        }
    }
    return Response;
}());

var ResponseDetail = (function () {
    function ResponseDetail(item) {
        this.ID = 0;
        this.Delay = ko.observable(0).extend({ min: 2, max: 10 });
        this.ContentRaw = ko.observable("");
        this.ContentType = ko.observable("");
        this.Hit = 0;
        this.CreateDate = new Date();
        this.ResponseID = 0;
        this.IsEditing = ko.observable(true);
        this.InProgress = ko.observable(false);
        if (item != null) {
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
    return ResponseDetail;
}());

var ViewModel = (function () {
    function ViewModel() {
        var _this = this;
        this.InProgress = ko.observable(false);
        this.AddNew = function () {
            _this.Items.unshift(new Response());
        };
        this.Delete = function (item) {
            _this.Items.remove(item);
        };
        this.Edit = function (item) {
            item.IsEditing(true);
        };
        this.Save = function (item) {
            if (!_this.IsValid(item, true))
                return;
            // server send
            var self = item;
            self.InProgress(true);
            setTimeout(function () { self.InProgress(false); }, 2000);
            item.IsEditing(false);
        };
        this.Cancel = function (item) {
            item.IsEditing(false);
            if (!_this.IsValid(item))
                _this.Delete(item);
        };
        this.Load = function () {
            var self = _this;
            self.InProgress(true);
            $.getJSON("/Operation/GetResponseList", function (data) {
                self.Items.removeAll();
                var items = data;
                if (items.length > 0) {
                    items.forEach(function (item) {
                        self.Items.push(new Response(item));
                    });
                }
                self.InProgress(false);
            });
        };
        this.AddNewDetail = function (parent) {
            _this.LoadDetail(parent, function () {
                var detail = new ResponseDetail();
                detail.ResponseID = parent.ID;
                parent.Items.unshift(detail);
            });
        };
        this.DeleteDetail = function (parent, item) {
            parent.Items.remove(item);
        };
        this.EditDetail = function (item) {
            item.IsEditing(true);
        };
        this.SaveDetail = function (item) {
            if (!_this.IsValidDetail(item, true))
                return;
            // server send
            var self = item;
            self.InProgress(true);
            setTimeout(function () { self.InProgress(false); }, 2000);
            item.IsEditing(false);
        };
        this.CancelDetail = function (item) {
            // required alanlar dolu ise kaydet 
            item.IsEditing(false);
        };
        this.LoadDetail = function (parent, callBack) {
            var self = parent;
            self.InProgress(true);
            $.getJSON("/Operation/GetResponseDetailListByParentID", { parentId: parent.ID }, function (data) {
                self.Items.removeAll();
                var items = data;
                if (items.length > 0) {
                    items.forEach(function (item) {
                        self.Items.push(new ResponseDetail(item));
                    });
                }
                self.InProgress(false);
                if (typeof (callBack) === 'function')
                    callBack();
            });
        };
        this.SelectFile = function (item, file) {
            if (file != null) {
                item.InProgress(true);
                var FR = new FileReader();
                FR.onload = function (e) {
                    var base64 = e.target.result;
                    var contentType = Base64Helper.detectContentType(base64);
                    base64 = Base64Helper.clearBase64(base64, contentType);
                    item.ContentType(contentType);
                    item.ContentRaw(base64);
                    item.InProgress(false);
                };
                FR.readAsDataURL(file);
            }
        };
        this.IsValid = function (item, showMessage) {
            if (showMessage === void 0) { showMessage = false; }
            if (item.Url().length > 0)
                return true;
            else {
                if (showMessage)
                    alert("Url is required!");
                return false;
            }
        };
        this.IsValidDetail = function (item, showMessage) {
            if (showMessage === void 0) { showMessage = false; }
            if (item.ContentRaw().length == 0) {
                if (showMessage)
                    alert("ContentRaw is required!");
                return false;
            }
            else if (item.ContentType().length == 0) {
                if (showMessage)
                    alert("ContentType is required!");
                return false;
            }
            else
                return true;
        };
        this.Items = ko.observableArray([]);
    }
    return ViewModel;
}());

var viewModel;
$(function () {
    viewModel = new ViewModel();
    viewModel.Load();
    ko.applyBindings(viewModel);
    $("#btn-new-operation").click(function () { return viewModel.AddNew(); });
});
