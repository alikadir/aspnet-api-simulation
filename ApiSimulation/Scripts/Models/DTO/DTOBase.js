var Models;
(function (Models) {
    var DTO;
    (function (DTO) {
        var DTOBase = (function () {
            function DTOBase(item) {
                this.IsEditing = ko.observable(true);
                this.InProgress = ko.observable(false);
            }
            return DTOBase;
        }());
        DTO.DTOBase = DTOBase;
    })(DTO = Models.DTO || (Models.DTO = {}));
})(Models || (Models = {}));
//# sourceMappingURL=DTOBase.js.map