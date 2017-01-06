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
                var _this = _super.call(this, item) || this;
                _this.ID = 0;
                _this.Url = ko.observable("");
                _this.Category = ko.observable("");
                _this.UrlDisplay = ko.computed(function () { return document.location.origin + '/' + _this.Url(); });
                _this.Hit = 0;
                _this.LastRequestDate = moment().format();
                _this.CreateDate = moment().format();
                _this.Items = ko.observableArray([]);
                if (item != null) {
                    _this.ID = item.ID;
                    _this.Hit = item.Hit;
                    _this.Url(item.Url);
                    _this.Category(item.Category);
                    _this.LastRequestDate = item.LastRequestDate;
                    _this.CreateDate = item.CreateDate;
                    _this.IsEditing(false);
                }
                return _this;
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