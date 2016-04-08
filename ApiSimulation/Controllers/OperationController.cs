using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace ApiSimulation.Controllers
{
    public class OperationController : ControllerBase
    {
        // GET: Operation
        public JsonResult GetResponseList()
        {
            return Json(new Businesses.OperationBusiness().GetResponseList(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetResponseByID(int id)
        {
            return Json(new Businesses.OperationBusiness().GetResponseByID(id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetResponseDetailListByParentID(int parentId)
        {
            return Json(new Businesses.OperationBusiness().GetResponseDetailListByParentID(parentId), JsonRequestBehavior.AllowGet);
        }

        public ActionResult DynamicResponse()
        {
            var response = new Businesses.OperationBusiness().GetResponseContent(Constants.UrlConstant.ApiDynamicUrl);

            if (response == null)
                return HttpNotFound();
            else if (response.ContentRaw.StartsWith("base64,"))
                return File(Convert.FromBase64String(response.ContentRaw.Replace("base64,", "")), response.ContentType);
            else
                return Content(response.ContentRaw, response.ContentType);

        }

    }
}