namespace Commons.Extensions
{


    ko.bindingHandlers.click = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, context)
        {
            var accessor = valueAccessor();
            var clicks = 0;
            var timeout = 500;

            $(element).click(function (event)
            {
                if (typeof (accessor) === 'object')
                {
                    var single = accessor.single;
                    var double = accessor.double;
                    clicks++;
                    if (clicks === 1)
                    {
                        setTimeout(function ()
                        {
                            if (clicks === 1)
                            {
                                single.call(viewModel, context.$data, event);
                            } else
                            {
                                double.call(viewModel, context.$data, event);
                            }
                            clicks = 0;
                        }, timeout);
                    }
                } else
                {
                    accessor.call(viewModel, context.$data, event);
                }
            });
        }
    };


    /*
            ko.extenders.required = (target: any): any =>
            {
                target.hasError = ko.observable();
                target.validationMessage = ko.observable();
        
                //define a function to do validation
                function validate(newValue)
                {
                    target.hasError(newValue ? false : true);
                    target.validationMessage(newValue ? "" : "Boş geçilemez!");
                }
        
                //initial validation
                validate(target());
        
                //validate whenever the value changes
                target.subscribe(validate);
        
                //return the original observable
                return target;
            };
     */

}
