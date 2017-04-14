var Commons;
(function (Commons) {
    var Constants;
    (function (Constants) {
        var ContentTypeConstant = (function () {
            function ContentTypeConstant() {
            }
            return ContentTypeConstant;
        }());
        ContentTypeConstant.AllowedContentTypes = [
            "application/json",
            "application/xml",
            "application/zip",
            "application/pdf",
            "application/octet-stream",
            "application/x-font-woff",
            "application/x-font-ttf",
            "application/x-font-otf",
            "application/vnd.ms-excel",
            "text/html",
            "text/plain",
            "text/csv",
            "text/css",
            "image/png",
            "image/jpeg",
            "image/gif",
            "video/mp4",
            "video/mpeg",
            "audio/mpeg",
            "audio/mp3"
        ];
        Constants.ContentTypeConstant = ContentTypeConstant;
    })(Constants = Commons.Constants || (Commons.Constants = {}));
})(Commons || (Commons = {}));
//# sourceMappingURL=ContentTypeConstant.js.map