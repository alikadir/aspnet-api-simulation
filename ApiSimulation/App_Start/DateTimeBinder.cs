using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ApiSimulation
{
    public class DateTimeBinder : IModelBinder
    {
        public object BindModel(ControllerContext controllerContext, ModelBindingContext bindingContext)
        {

            var value = bindingContext.ValueProvider.GetValue(bindingContext.ModelName).AttemptedValue.ToString();
            if (value.Contains("Date"))
                return new DateTime(1970, 1, 1).AddMilliseconds(Int64.Parse(value.Substring(6).Replace(")/", "")));
            else
                return DateTime.Parse(value);


        }
    }
}