using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ApiSimulation.Controllers
{
    public class AdminController : Controller
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

        public ActionResult Detail()
        {
            return View();
        }
    }
}