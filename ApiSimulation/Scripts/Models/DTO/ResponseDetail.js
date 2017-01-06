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
                var _this = _super.call(this, item) || this;
                _this.ID = 0;
                _this.Delay = ko.observable(0);
                _this.ContentRaw = ko.observable("");
                _this.ContentType = ko.observable("");
                _this.Hit = 0;
                _this.CreateDate = moment().format();
                _this.ResponseID = 0;
                _this.UseTemplateEngine = ko.observable(true);
                if (item != null) {
                    _this.ID = item.ID;
                    _this.Delay(item.Delay);
                    _this.ContentRaw(item.ContentRaw);
                    _this.ContentType(item.ContentType);
                    _this.Hit = item.Hit;
                    _this.UseTemplateEngine(item.UseTemplateEngine);
                    _this.CreateDate = item.CreateDate;
                    _this.ResponseID = item.ResponseID;
                    _this.IsEditing(false);
                }
                return _this;
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