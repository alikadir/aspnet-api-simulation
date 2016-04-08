using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ApiSimulation.Businesses
{
    public class OperationBusiness : BusinessBase
    {
        public OperationBusiness() : base() { }

        public Models.DTO.ResponseDetailBasic GetResponseContent(string url)
        {

            var content = string.Empty;
            var contentType = string.Empty;
            var delay = 0;

            using (var db = new Models.EF.ApiSimulationEntities())
            {
                var response = db.tResponses.Where(x => !x.IsDelete && x.Url == url).SingleOrDefault();

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


    }
}