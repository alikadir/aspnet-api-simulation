﻿using RazorEngine;
using RazorEngine.Templating;
using System;
using System.Web.Mvc;

namespace ApiSimulation.Controllers
{
    public class OperationController : ControllerBase
    {
        #region Response

        public JsonResult GetResponseList()
        {
            return Json(new Businesses.OperationBusiness().GetResponseList(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetResponseByID(int id)
        {
            return Json(new Businesses.OperationBusiness().GetResponseByID(id), JsonRequestBehavior.AllowGet);
        }
        public ActionResult DeleteResponse(int id)
        {
            new Businesses.OperationBusiness().DeleteResponse(id);

            return new EmptyResult();
        }

        [ValidateInput(false)]
        public ActionResult SaveResponse(Models.DTO.Response response)
        {
            int result = 0;

            if (ModelState.IsValid)
            {
                result = new Businesses.OperationBusiness().SaveResponse(response);
            }

            return Json(result, JsonRequestBehavior.AllowGet);

        }

        #endregion

        #region ResponseDetail

        public JsonResult GetResponseDetailByID(int id)
        {
            return Json(new Businesses.OperationBusiness().GetResponseDetailByID(id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetResponseDetailListByParentID(int parentId)
        {
            var result = Json(new Businesses.OperationBusiness().GetResponseDetailListByParentID(parentId), JsonRequestBehavior.AllowGet);
            result.MaxJsonLength = int.MaxValue;
            return result;
        }
        public ActionResult DeleteResponseDetail(int id)
        {
            new Businesses.OperationBusiness().DeleteResponseDetail(id);

            return new EmptyResult();
        }

        [ValidateInput(false)]
        public ActionResult SaveResponseDetail(Models.DTO.ResponseDetail responseDetail)
        {
            int result = 0;

            if (ModelState.IsValid)
            {
                result = new Businesses.OperationBusiness().SaveResponseDetail(responseDetail);
            }

            return Json(result, JsonRequestBehavior.AllowGet);

        }

        #endregion

        #region Other

     
        public ActionResult DynamicResponse()
        {

            Response.Headers.Add("Access-Control-Allow-Origin", "*"); // cross domain için eklendi. 

            var response = new Businesses.OperationBusiness().GetResponseContent(Constants.UrlConstant.ApiDynamicUrl);

            if (response == null)
                return HttpNotFound();
            else if (response.ContentRaw.StartsWith("base64,"))
                return File(Convert.FromBase64String(response.ContentRaw.Replace("base64,", "")), response.ContentType);
            else
            {
                string result;

                if (response.UseTemplateEngine)
                    result = Razor.Parse(response.ContentRaw, HttpContext);
                else
                    result = response.ContentRaw;

                return Content(result, response.ContentType);

            }

        }

        #endregion

    }
}