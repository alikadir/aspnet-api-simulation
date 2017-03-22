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
                var _this = _super.call(this) || this;
                _this.AddNew = function () {
                    var item = new Models.DTO.Response();
                    item.Category(_this.SelectedCategory());
                    _this.Items.unshift(item);
                };
                _this.Delete = function (item, callBack) {
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
                _this.Edit = function (item) {
                    item.IsEditing(true);
                };
                _this.Save = function (item, callBack) {
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
                _this.Cancel = function (item) {
                    _this.Reload(item);
                };
                _this.Load = function () {
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
                _this.AddNewDetail = function (parent) {
                    _this.LoadDetails(parent, function () {
                        var detail = new Models.DTO.ResponseDetail();
                        detail.ResponseID = parent.ID;
                        parent.Items.unshift(detail);
                    });
                };
                _this.DeleteDetail = function (parent, item, callBack) {
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
                _this.EditDetail = function (item) {
                    item.IsEditing(true);
                    AllTextAreaSizeFix();
                };
                _this.SaveDetail = function (item, callBack) {
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
                _this.CancelDetail = function (parent, item) {
                    _this.ReloadDetail(parent, item);
                };
                _this.LoadDetails = function (parent, callBack) {
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
                _this.Reload = function (item, callBack) {
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
                _this.ReloadDetail = function (parent, item, callBack) {
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
                _this.SelectFile = function (item, file) {
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
                _this.Items = ko.observableArray([]);
                _this.InProgress = ko.observable(false);
                _this.Categories = ko.computed({
                    owner: _this,
                    read: function () {
                        var returnList = [];
                        _this.Items().forEach(function (item) {
                            if (returnList.indexOf(item.Category()) == -1)
                                returnList.push(item.Category());
                        });
                        return returnList;
                    }
                });
                _this._SelectedCategory = ko.observable("");
                _this.SelectedCategory = ko.computed({
                    owner: _this,
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
                }, _this);
                _this.ShowLogDetail = function (item) {
                    $("#iframe-modal").attr("src", "/Admin/LogDetail?responseId=" + item.ID);
                    $("#iframe-loading").show();
                    $("#modal-global .modal-title").html("<b>Log Detail - </b> <code>" + item.UrlDisplay() + "</code>");
                    $("#modal-global").modal('toggle');
                };
                return _this;
            }
            return AdminViewModel;
        }(ViewModel.ViewModelBase));
        ViewModel.AdminViewModel = AdminViewModel;
    })(ViewModel = Models.ViewModel || (Models.ViewModel = {}));
})(Models || (Models = {}));
//# sourceMappingURL=AdminViewModel.js.map