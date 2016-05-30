using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace ApiSimulation.Businesses
{
    public class NotificationBusiness : BusinessBase
    {

        public Models.DTO.NotificationConfig localConfig;

        public NotificationBusiness() : base()
        {
            using (var db = new Models.EF.ApiSimulationEntities())
            {
                var result = db.tNotificationConfigs.FirstOrDefault();
                localConfig = MapperConfig.Mapper.Map<Models.DTO.NotificationConfig>(result);
            }
        }

        public Models.DTO.NotificationConfig GetConfiguration()
        {
            return localConfig;
        }

        public void SendIos()
        {
            
        }

        public void SendAndroid()
        {

        }

        public bool UpdateConfiguration(Models.DTO.NotificationConfig config)
        {

            using (var db = new Models.EF.ApiSimulationEntities())
            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {

                    var oldRecord = db.tNotificationConfigs.First();

                    db.tNotificationConfigs.Remove(oldRecord);

                    db.SaveChanges();

                    var newRecord = MapperConfig.Mapper.Map<Models.EF.tNotificationConfig>(config);

                    if (!config.PostedFile.HasValue)
                        newRecord.IosSenderCertificate = oldRecord.IosSenderCertificate;
                    else
                    {
                        var ms = new MemoryStream();
                        config.PostedFile.Value.InputStream.CopyTo(ms);
                        newRecord.IosSenderCertificate = ms.ToArray();
                    }

                    db.tNotificationConfigs.Add(newRecord);
                    db.SaveChanges();

                    dbTrans.Commit();

                    return true;
                }
                catch (Exception ex)
                {
                    dbTrans.Rollback();

                    return false;
                }


            }
        }

    }
}