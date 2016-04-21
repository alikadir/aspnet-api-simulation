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