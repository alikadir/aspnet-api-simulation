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
                this.ShowLogDetail = function (item) {
                    $("#iframe-log-detail").attr("src", "/Admin/LogDetail?responseId=" + item.ID);
                    $("#iframe-loading").show();
                    $("#modal-log-detail .modal-title").html("<b>Log Detail - </b> <code>" + item.UrlDisplay() + "</code>");
                    $("#modal-log-detail").modal('toggle');
                };
            }
            return AdminViewModel;
        }(ViewModel.ViewModelBase));
        ViewModel.AdminViewModel = AdminViewModel;
    })(ViewModel = Models.ViewModel || (Models.ViewModel = {}));
})(Models || (Models = {}));
//# sourceMappingURL=AdminViewModel.js.map