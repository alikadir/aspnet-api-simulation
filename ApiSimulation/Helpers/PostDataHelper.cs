using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Helpers;
using System.Web.Script.Serialization;

namespace ApiSimulation.Helpers
{
    public static class PostDataHelper
    {
        public static dynamic GetJson()
        {
            dynamic result;
            HttpContext.Current.Request.InputStream.Position = 0;
            using (var stream = new StreamReader(HttpContext.Current.Request.InputStream))
            {
                result = Json.Decode(stream.ReadToEnd());
            }

            return result;

        }

    }
}