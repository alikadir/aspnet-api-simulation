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
                this.UseTemplateEngine = ko.observable(true);
                if (item != null) {
                    this.ID = item.ID;
                    this.Delay(item.Delay);
                    this.ContentRaw(item.ContentRaw);
                    this.ContentType(item.ContentType);
                    this.Hit = item.Hit;
                    this.UseTemplateEngine(item.UseTemplateEngine);
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