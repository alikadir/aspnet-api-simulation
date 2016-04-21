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