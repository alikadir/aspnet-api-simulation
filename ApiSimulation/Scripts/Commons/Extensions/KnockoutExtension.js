var Commons;
(function (Commons) {
    var Extensions;
    (function (Extensions) {
        ko.bindingHandlers.click = {
            init: function (element, valueAccessor, allBindingsAccessor, viewModel, context) {
                var accessor = valueAccessor();
                var clicks = 0;
                var timeout = 500;
                $(element).click(function (event) {
                    if (typeof (accessor) === 'object') {
                        var single = accessor.single;
                        var double = accessor.double;
                        clicks++;
                        if (clicks === 1) {
                            setTimeout(function () {
                                if (clicks === 1) {
                                }
                                else {
                                    double.call(viewModel, context.$data, event);
                                }
                                clicks = 0;
                            }, timeout);
                        }
                    }
                    else {
                        accessor.call(viewModel, context.$data, event);
                    }
                });
            }
        };
    })(Extensions = Commons.Extensions || (Commons.Extensions = {}));
})(Commons || (Commons = {}));
//# sourceMappingURL=KnockoutExtension.js.map