var Commons;
(function (Commons) {
    var Constants;
    (function (Constants) {
        var Base64Constant = (function () {
            function Base64Constant() {
            }
            Base64Constant.Base64StartTag = "data:";
            Base64Constant.Base64EndTag = ";base64,";
            return Base64Constant;
        }());
        Constants.Base64Constant = Base64Constant;
    })(Constants = Commons.Constants || (Commons.Constants = {}));
})(Commons || (Commons = {}));
//# sourceMappingURL=Base64Constant.js.map
var Commons;
(function (Commons) {
    var Constants;
    (function (Constants) {
        var ContentTypeConstant = (function () {
            function ContentTypeConstant() {
            }
            ContentTypeConstant.AllowedContentTypes = ["application/json", "application/xml", "text/html", "text/plain", "text/csv", "image/png", "image/jpeg", "application/pdf"];
            return ContentTypeConstant;
        }());
        Constants.ContentTypeConstant = ContentTypeConstant;
    })(Constants = Commons.Constants || (Commons.Constants = {}));
})(Commons || (Commons = {}));
//# sourceMappingURL=ContentTypeConstant.js.map
var Commons;
(function (Commons) {
    var Extensions;
    (function (Extensions) {
        ko.bindingHandlers.click = {
            init: function (element, valueAccessor, allBindingsAccessor, viewModel, context) {
                var accessor = valueAccessor();
                var clicks = 0;
                var timeout = 200;
                $(element).click(function (event) {
                    if (typeof (accessor) === 'object') {
                        var single = accessor.single;
                        var double = accessor.double;
                        clicks++;
                        if (clicks === 1) {
                            setTimeout(function () {
                                if (clicks === 1) {
                                    single.call(viewModel, context.$data, event);
                                }
                                else {
                                    double.call(viewModel, context.$data, event);
                                }
                                clicks = 0;
                            }, timeout);
                        }
                    }
                    else {
                        accessor.call(viewModel, context.$data, event);
                    }
                });
            }
        };
    })(Extensions = Commons.Extensions || (Commons.Extensions = {}));
})(Commons || (Commons = {}));
//# sourceMappingURL=KnockoutExtension.js.map
var Commons;
(function (Commons) {
    var Helpers;
    (function (Helpers) {
        var Base64Helper = (function () {
            function Base64Helper() {
            }
            Base64Helper.detectContentType = function (base64) {
                return base64.substring(base64.indexOf(Commons.Constants.Base64Constant.Base64StartTag) + Commons.Constants.Base64Constant.Base64StartTag.length, base64.indexOf(Commons.Constants.Base64Constant.Base64EndTag));
            };
            Base64Helper.clearBase64 = function (base64, contentType) {
                var combine = Commons.Constants.Base64Constant.Base64StartTag + contentType + Commons.Constants.Base64Constant.Base64EndTag.replace("base64,", "");
                return base64.substring(base64.indexOf(combine) + combine.length);
            };
            return Base64Helper;
        }());
        Helpers.Base64Helper = Base64Helper;
    })(Helpers = Commons.Helpers || (Commons.Helpers = {}));
})(Commons || (Commons = {}));
//# sourceMappingURL=Base64Helper.js.map
var Commons;
(function (Commons) {
    var Extensions;
    (function (Extensions) {
        ko.bindingHandlers.click = {
            init: function (element, valueAccessor, allBindingsAccessor, viewModel, context) {
                var accessor = valueAccessor();
                var clicks = 0;
                var timeout = 200;
                $(element).click(function (event) {
                    if (typeof (accessor) === 'object') {
                        var single = accessor.single;
                        var double = accessor.double;
                        clicks++;
                        if (clicks === 1) {
                            setTimeout(function () {
                                if (clicks === 1) {
                                    single.call(viewModel, context.$data, event);
                                }
                                else {
                                    double.call(viewModel, context.$data, event);
                                }
                                clicks = 0;
                            }, timeout);
                        }
                    }
                    else {
                        accessor.call(viewModel, context.$data, event);
                    }
                });
            }
        };
    })(Extensions = Commons.Extensions || (Commons.Extensions = {}));
})(Commons || (Commons = {}));
//# sourceMappingURL=KnockoutExtension.js.map
var Commons;
(function (Commons) {
    var Helpers;
    (function (Helpers) {
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
        Helpers.ObservebleHelper = ObservebleHelper;
    })(Helpers = Commons.Helpers || (Commons.Helpers = {}));
})(Commons || (Commons = {}));
//# sourceMappingURL=ObservebleHelper.js.map
var Models;
(function (Models) {
    var DTO;
    (function (DTO) {
        var DTOBase = (function () {
            function DTOBase(item) {
                this.IsEditing = ko.observable(true);
                this.InProgress = ko.observable(false);
            }
            return DTOBase;
        }());
        DTO.DTOBase = DTOBase;
    })(DTO = Models.DTO || (Models.DTO = {}));
})(Models || (Models = {}));
//# sourceMappingURL=DTOBase.js.map
var Models;
(function (Models) {
    var ViewModel;
    (function (ViewModel) {
        var ViewModelBase = (function () {
            function ViewModelBase() {
            }
            return ViewModelBase;
        }());
        ViewModel.ViewModelBase = ViewModelBase;
    })(ViewModel = Models.ViewModel || (Models.ViewModel = {}));
})(Models || (Models = {}));
//# sourceMappingURL=ViewModelBase.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Models;
(function (Models) {
    var DTO;
    (function (DTO) {
        var Response = (function (_super) {
            __extends(Response, _super);
            function Response(item) {
                var _this = this;
                _super.call(this, item);
                this.ID = 0;
                this.Url = ko.observable("");
                this.Category = ko.observable("");
                this.UrlDisplay = ko.computed(function () { return document.location.origin + '/' + _this.Url(); });
                this.Hit = 0;
                this.LastRequestDate = moment().format();
                this.CreateDate = moment().format();
                this.Items = ko.observableArray([]);
                if (item != null) {
                    this.ID = item.ID;
                    this.Hit = item.Hit;
                    this.Url(item.Url);
                    this.Category(item.Category);
                    this.LastRequestDate = item.LastRequestDate;
                    this.CreateDate = item.CreateDate;
                    this.IsEditing(false);
                }
            }
            Response.prototype.IsValid = function (showMessage) {
                var self = this;
                if (self.Url() == null || self.Url().length == 0) {
                    if (showMessage)
                        $.toaster({ message: 'Url boş geçilemez!', title: 'Uyarı', priority: 'info' });
                    return false;
                }
                else if (self.Category() == null || self.Category().length == 0) {
                    if (showMessage)
                        $.toaster({ message: 'Category boş geçilemez!', title: 'Uyarı', priority: 'info' });
                    return false;
                }
                else
                    return true;
            };
            return Response;
        }(DTO.DTOBase));
        DTO.Response = Response;
    })(DTO = Models.DTO || (Models.DTO = {}));
})(Models || (Models = {}));
//# sourceMappingURL=Response.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Models;
(function (Models) {
    var DTO;
    (function (DTO) {
        var ResponseDetail = (function (_super) {
            __extends(ResponseDetail, _super);
            function ResponseDetail(item) {
                _super.call(this, item);
                this.ID = 0;
                this.Delay = ko.observable(0);
                this.ContentRaw = ko.observable("");
                this.ContentType = ko.observable("");
                this.Hit = 0;
                this.CreateDate = moment().format();
                this.ResponseID = 0;
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
            ResponseDetail.prototype.IsValid = function (showMessage) {
                var self = this;
                if (self.ContentRaw() == null || self.ContentRaw().length == 0) {
                    if (showMessage)
                        $.toaster({ message: 'Content Raw boş geçilemez!', title: 'Uyarı', priority: 'info' });
                    return false;
                }
                else if (self.ContentType() == null || self.ContentType().length == 0) {
                    if (showMessage)
                        $.toaster({ message: 'Content Type boş geçilemez!', title: 'Uyarı', priority: 'info' });
                    return false;
                }
                else
                    return true;
            };
            return ResponseDetail;
        }(DTO.DTOBase));
        DTO.ResponseDetail = ResponseDetail;
    })(DTO = Models.DTO || (Models.DTO = {}));
})(Models || (Models = {}));
//# sourceMappingURL=ResponseDetail.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Models;
(function (Models) {
    var ViewModel;
    (function (ViewModel) {
        var AdminViewModel = (function (_super) {
            __extends(AdminViewModel, _super);
            function AdminViewModel() {
                var _this = this;
                _super.call(this);
                this.AddNew = function () {
                    var item = new Models.DTO.Response();
                    item.Category(_this.SelectedCategory());
                    _this.Items.unshift(item);
                };
                this.Delete = function (item, callBack) {
                    var self = _this;
                    if (item.ID == 0)
                        self.Items.remove(item);
                    else {
                        self.InProgress(true);
                        $.get("/Operation/DeleteResponse", { id: item.ID }, function () {
                            self.Items.remove(item);
                            self.InProgress(false);
                        });
                    }
                };
                this.Edit = function (item) {
                    item.IsEditing(true);
                };
                this.Save = function (item, callBack) {
                    if (!item.IsValid(true))
                        return;
                    var self = item;
                    self.InProgress(true);
                    $.post("/Operation/SaveResponse", item, function (data) {
                        if (data === 0)
                            $.toaster({ message: 'Kaydedilemedi! Url kullanılıyor olabilir.', title: 'Hata', priority: 'danger' });
                        else {
                            item.ID = data;
                            item.IsEditing(false);
                        }
                        self.InProgress(false);
                        if (typeof (callBack) === 'function')
                            callBack();
                    });
                };
                this.Cancel = function (item) {
                    _this.Reload(item);
                };
                this.Load = function () {
                    var self = _this;
                    self.InProgress(true);
                    $.getJSON("/Operation/GetResponseList", function (data) {
                        self.Items.removeAll();
                        var items = data;
                        if (items.length > 0) {
                            items.forEach(function (item) {
                                self.Items.push(new Models.DTO.Response(item));
                            });
                        }
                        self.SelectedCategory(self.Categories()[0]);
                        self.InProgress(false);
                    });
                };
                this.AddNewDetail = function (parent) {
                    _this.LoadDetails(parent, function () {
                        var detail = new Models.DTO.ResponseDetail();
                        detail.ResponseID = parent.ID;
                        parent.Items.unshift(detail);
                    });
                };
                this.DeleteDetail = function (parent, item, callBack) {
                    var self = _this;
                    if (item.ID == 0)
                        parent.Items.remove(item);
                    else {
                        item.InProgress(true);
                        $.get("/Operation/DeleteResponseDetail", { id: item.ID }, function () {
                            parent.Items.remove(item);
                        });
                    }
                };
                this.EditDetail = function (item) {
                    item.IsEditing(true);
                };
                this.SaveDetail = function (item, callBack) {
                    if (!item.IsValid(true))
                        return;
                    var self = item;
                    self.InProgress(true);
                    $.post("/Operation/SaveResponseDetail", item, function (data) {
                        if (data === 0)
                            $.toaster({ message: 'Kaydedilemedi!', title: 'Hata', priority: 'danger' });
                        else {
                            item.ID = data;
                            item.IsEditing(false);
                        }
                        self.InProgress(false);
                        if (typeof (callBack) === 'function')
                            callBack();
                    });
                };
                this.CancelDetail = function (parent, item) {
                    _this.ReloadDetail(parent, item);
                };
                this.LoadDetails = function (parent, callBack) {
                    var self = parent;
                    self.InProgress(true);
                    $.getJSON("/Operation/GetResponseDetailListByParentID", { parentId: parent.ID }, function (data) {
                        self.Items.removeAll();
                        var items = data;
                        if (items.length > 0) {
                            items.forEach(function (item) {
                                self.Items.push(new Models.DTO.ResponseDetail(item));
                            });
                        }
                        self.InProgress(false);
                        if (typeof (callBack) === 'function')
                            callBack();
                    });
                };
                this.Reload = function (item, callBack) {
                    item.InProgress(true);
                    var self = _this;
                    if (item.ID == 0)
                        _this.Delete(item, callBack);
                    else {
                        $.getJSON("/Operation/GetResponseByID", { id: item.ID }, function (data) {
                            var response = data;
                            self.Items.replace(item, new Models.DTO.Response(response));
                            if (typeof (callBack) === 'function')
                                callBack();
                        });
                    }
                };
                this.ReloadDetail = function (parent, item, callBack) {
                    item.InProgress(true);
                    if (item.ID == 0)
                        _this.DeleteDetail(parent, item, callBack);
                    else {
                        $.getJSON("/Operation/GetResponseDetailByID", { id: item.ID }, function (data) {
                            var responseDetail = data;
                            parent.Items.replace(item, new Models.DTO.ResponseDetail(responseDetail));
                            if (typeof (callBack) === 'function')
                                callBack();
                        });
                    }
                };
                this.SelectFile = function (item, file) {
                    if (file != null) {
                        item.InProgress(true);
                        var FR = new FileReader();
                        FR.onload = function (e) {
                            var base64 = e.target.result;
                            var contentType = Commons.Helpers.Base64Helper.detectContentType(base64);
                            base64 = Commons.Helpers.Base64Helper.clearBase64(base64, contentType);
                            item.ContentType(contentType);
                            item.ContentRaw(base64);
                            item.InProgress(false);
                        };
                        FR.readAsDataURL(file);
                    }
                };
                this.Items = ko.observableArray([]);
                this.InProgress = ko.observable(false);
                this.Categories = ko.computed({
                    owner: this,
                    read: function () {
                        var returnList = [];
                        _this.Items().forEach(function (item) {
                            if (returnList.indexOf(item.Category()) == -1)
                                returnList.push(item.Category());
                        });
                        return returnList;
                    }
                });
                this._SelectedCategory = ko.observable("");
                this.SelectedCategory = ko.computed({
                    owner: this,
                    read: function () {
                        if (_this.Categories().indexOf(_this._SelectedCategory()) == -1) {
                            var result = _this.Categories()[0];
                            _this._SelectedCategory(result);
                            return result;
                        }
                        else
                            return _this._SelectedCategory();
                    },
                    write: function (value) {
                        _this._SelectedCategory(value);
                    }
                }, this);
            }
            return AdminViewModel;
        }(ViewModel.ViewModelBase));
        ViewModel.AdminViewModel = AdminViewModel;
    })(ViewModel = Models.ViewModel || (Models.ViewModel = {}));
})(Models || (Models = {}));
//# sourceMappingURL=AdminViewModel.js.map
var viewModel = new Models.ViewModel.AdminViewModel();
$(function () {
    viewModel.Load();
    ko.applyBindings(viewModel);
    $("#btn-new-operation").click(function () { return viewModel.AddNew(); });
});
//# sourceMappingURL=Admin.js.map