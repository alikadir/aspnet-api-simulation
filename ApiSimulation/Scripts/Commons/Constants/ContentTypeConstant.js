var Commons;
(function (Commons) {
    var Constants;
    (function (Constants) {
        var ContentTypeConstant = (function () {
            function ContentTypeConstant() {
            }
            ContentTypeConstant.AllowedContentTypes = ["application/json", "application/xml", "text/html", "text/plain", "text/csv", "image/png", "image/jpeg", "application/pdf", "video/mp4"];
            return ContentTypeConstant;
        }());
        Constants.ContentTypeConstant = ContentTypeConstant;
    })(Constants = Commons.Constants || (Commons.Constants = {}));
})(Commons || (Commons = {}));
//# sourceMappingURL=ContentTypeConstant.js.map