using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ApiSimulation.Controllers
{
    public class OperationController : Controller
    {
        // GET: Operation
        public JsonResult GetResponseList()
        {
            var result = new List<Models.DTO.Response>();


            using (var db = new Models.EF.ApiSimulationEntities())
            {
                var responseList = db.tResponses.Where(x => !x.IsDelete).OrderByDescending(x => x.CreateDate).ToList();
                result.AddRange(MapperConfig.Mapper.Map<List<Models.DTO.Response>>(responseList));
            }

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetResponseDetailListByParentID(int responseId)
        {
            var result = new List<Models.DTO.ResponseDetail>();

            using (var db = new Models.EF.ApiSimulationEntities())
            {
                var responseDetailList = db.tResponseDetails.Where(x => !x.IsDelete && x.ResponseID == responseId).OrderByDescending(x => x.CreateDate).ToList();
                result.AddRange(MapperConfig.Mapper.Map<List<Models.DTO.ResponseDetail>>(responseDetailList));
            }

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public ActionResult DynamicResponse()
        {

            return Content("dynamic - " + HttpContext.Request.Url.ToString());
        }


    }
}