using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace ApiSimulation
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            

            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.Add("Default", new Route("{controller}/{action}/{id}", new DynamicRouteHandler())
            {
                Defaults = new RouteValueDictionary(new { controller = "Admin", action = "List", id = UrlParameter.Optional })
            });
                      
        }
    }


    public class DynamicRouteHandler : IRouteHandler
    {
        public IHttpHandler GetHttpHandler(RequestContext requestContext)

        {
            string asmTemplate = "ApiSimulation.Controllers.{0}Controller";
           

            string requestMethod = requestContext.HttpContext.Request.HttpMethod;
            string requestController = requestContext.RouteData.Values["controller"].ToString();
           
            var controller = Type.GetType(string.Format(asmTemplate, requestController), false, true);

            if (controller == null)
            {

                requestContext.RouteData.Values["action"] = "DynamicResponse";
                requestContext.RouteData.Values["controller"] = "Operation";

            }

            return new MvcHandler(requestContext);
        }
    }
}