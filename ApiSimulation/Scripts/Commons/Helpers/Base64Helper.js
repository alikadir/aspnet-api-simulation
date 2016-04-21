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