using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ApiSimulation.Constants
{
    public static class UrlConstant
    {
        public static string ApiDynamicUrl { get { return string.Format("{0}", HttpContext.Current.Request.Url.PathAndQuery.TrimStart('/')); } }
    }
}
