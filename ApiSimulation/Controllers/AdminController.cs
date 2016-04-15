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

        public ActionResult Deneme(List<Log> data)
        { 
            return new EmptyResult();
        }

        public class Log
        {
            public string User { get; set; }
            public string Platform { get; set; }
            public string Location { get; set; }
            public string LogText { get; set; }
            public string AppVersion { get; set; }
            public string Type { get; set; }
            public string AppID { get; set; }
            public string OsVersion { get; set; }
            public string UserLanguage { get; set; }
            public string DeviceModel { get; set; }
            public string TimeStamp { get; set; }
        }

    }
}