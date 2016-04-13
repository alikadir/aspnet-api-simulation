using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ApiSimulation.Businesses
{
    public class OperationBusiness : BusinessBase
    {
        public OperationBusiness() : base()
        {
            // System.Threading.Thread.Sleep(1500);
        }

        #region Response

        public Models.DTO.Response GetResponseByID(int id)
        {
            Models.DTO.Response result = null;

            using (var db = new Models.EF.ApiSimulationEntities())
            {
                var response = db.tResponses.FirstOrDefault(x => !x.IsDelete && x.ID == id);
                result = MapperConfig.Mapper.Map<Models.DTO.Response>(response);
            }

            return result;
        }

        public List<Models.DTO.Response> GetResponseList()
        {
            var result = new List<Models.DTO.Response>();

            using (var db = new Models.EF.ApiSimulationEntities())
            {
                var responseList = db.tResponses.Where(x => !x.IsDelete).OrderByDescending(x => x.CreateDate).ToList();
                result.AddRange(MapperConfig.Mapper.Map<List<Models.DTO.Response>>(responseList));
            }

            return result;
        }

        public void DeleteResponse(int id)
        {
            using (var db = new Models.EF.ApiSimulationEntities())
            {
                var result = db.tResponses.Where(x => !x.IsDelete && x.ID == id).FirstOrDefault();

                if (result != null)
                {
                    result.IsDelete = true;
                    result.tResponseDetails.Where(x => !x.IsDelete).ToList().ForEach(x =>
                    {
                        x.IsDelete = true;
                    });

                    db.SaveChanges();
                }
            }
        }

        public int SaveResponse(Models.DTO.Response response)
        {
            Models.EF.tResponse responseEF;

            using (var db = new Models.EF.ApiSimulationEntities())
            {

                responseEF = MapperConfig.Mapper.Map<Models.EF.tResponse>(response);

                if (response.ID == 0) // create  
                {
                    if (db.tResponses.Any(x => !x.IsDelete && x.Url == responseEF.Url))
                        return 0;

                    responseEF.CreateDate = DateTime.Now;
                    db.tResponses.Add(responseEF);
                }
                else // update                
                {
                    if (db.tResponses.Any(x => !x.IsDelete && x.Url == responseEF.Url && x.ID != responseEF.ID))
                        return 0;

                    db.Entry(responseEF).State = System.Data.Entity.EntityState.Modified;
                }
                db.SaveChanges();

            }

            return responseEF.ID;
        }

        #endregion

        #region ResponseDetail

        public Models.DTO.ResponseDetail GetResponseDetailByID(int id)
        {
            Models.DTO.ResponseDetail result = null;

            using (var db = new Models.EF.ApiSimulationEntities())
            {
                var response = db.tResponseDetails.FirstOrDefault(x => !x.IsDelete && x.ID == id);
                result = MapperConfig.Mapper.Map<Models.DTO.ResponseDetail>(response);
            }

            return result;
        }

        public List<Models.DTO.ResponseDetail> GetResponseDetailListByParentID(int parentId)
        {
            var result = new List<Models.DTO.ResponseDetail>();

            using (var db = new Models.EF.ApiSimulationEntities())
            {
                var responseDetailList = db.tResponseDetails.Where(x => !x.IsDelete && x.ResponseID == parentId).OrderByDescending(x => x.CreateDate).ToList();
                result.AddRange(MapperConfig.Mapper.Map<List<Models.DTO.ResponseDetail>>(responseDetailList));
            }

            return result;
        }

        public void DeleteResponseDetail(int id)
        {
            using (var db = new Models.EF.ApiSimulationEntities())
            {
                var result = db.tResponseDetails.Where(x => !x.IsDelete && x.ID == id).FirstOrDefault();

                if (result != null)
                {
                    result.IsDelete = true;
                    db.SaveChanges();
                }
            }
        }

        public int SaveResponseDetail(Models.DTO.ResponseDetail responseDetail)
        {
            Models.EF.tResponseDetail responseDetailEF;

            using (var db = new Models.EF.ApiSimulationEntities())
            {

                responseDetailEF = MapperConfig.Mapper.Map<Models.EF.tResponseDetail>(responseDetail);

                if (responseDetail.ID == 0) // create               
                {
                    responseDetailEF.CreateDate = DateTime.Now;
                    db.tResponseDetails.Add(responseDetailEF);
                }
                else // update                
                    db.Entry(responseDetailEF).State = System.Data.Entity.EntityState.Modified;

                db.SaveChanges();

            }

            return responseDetailEF.ID;

        }

        #endregion

        #region Other

        public Models.DTO.ResponseDetailBasic GetResponseContent(string url)
        {

            var content = string.Empty;
            var contentType = string.Empty;
            var delay = 0;

            using (var db = new Models.EF.ApiSimulationEntities())
            {
                var response = db.tResponses.Where(x => !x.IsDelete && x.Url == url).SingleOrDefault();

                if (response == null)
                    response = db.tResponses.Where(x => !x.IsDelete && url.StartsWith(x.Url)).SingleOrDefault();

                if (response == null)
                    return null;

                var responseDetail = response.tResponseDetails.Where(x => !x.IsDelete).OrderBy(x => Guid.NewGuid()).FirstOrDefault();

                if (responseDetail == null)
                    return null;


                content = responseDetail.ContentRaw;
                contentType = responseDetail.ContentType;
                delay = responseDetail.Delay;

                response.Hit++;
                response.LastRequestDate = DateTime.Now;
                responseDetail.Hit++;

                db.SaveChanges();

            }

            System.Threading.Thread.Sleep(delay);

            return new Models.DTO.ResponseDetailBasic { ContentRaw = content, ContentType = contentType };

        }

        #endregion
    }
}