using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ApiSimulation.Controllers
{
    public class AdminController : ControllerBase
    {
        // GET: Admin
        public ActionResult List()
        {
            if (!HttpContext.User.Identity.IsAuthenticated)
                HttpContext.Response.StatusCode = 401;
            else
                ViewBag.UserName = HttpContext.User.Identity.Name;


            var model = new List<Models.DTO.Response>();

            using (var db = new Models.EF.ApiSimulationEntities())
            {
                var result = db.tResponses.Where(x => !x.IsDelete).OrderByDescending(x => x.CreateDate).ToList();

                model = MapperConfig.Mapper.Map<List<Models.DTO.Response>>(result);
            }

            return View(model);
        }
        public ActionResult LogDetail(int responseId)
        {

            var model = new List<Models.DTO.RequestLog>();

            using (var db = new Models.EF.ApiSimulationEntities())
            {
                var result = db.tRequestLogs.Where(x => x.ResponseID == responseId).OrderByDescending(x => x.RequestDate).ToList();

                model = MapperConfig.Mapper.Map<List<Models.DTO.RequestLog>>(result);
            }

            return View(model);

        }

        public ActionResult NotificationList()
        {
            return View(new Businesses.NotificationBusiness().GetConfiguration());
        }
        /*
        public ActionResult NotificationSendAndUpdate(Models.DTO.NotificationConfig config, string selectedContentTitle, bool isSendIos = false, bool isSendAndroid = false)
        {
            var business = new Businesses.NotificationBusiness();
            business.UpdateConfiguration(config);

            if (isSendAndroid)
                business.SendAndroid();

            if (isSendIos)
                business.SendIos();

            return RedirectToAction("NotificationList");
        }
        */

    }
}