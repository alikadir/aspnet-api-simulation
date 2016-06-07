using Newtonsoft.Json.Linq;
using PushSharp.Apple;
using PushSharp.Google;
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
            var config = new ApnsConfiguration(ApnsConfiguration.ApnsServerEnvironment.Production, localConfig.IosSenderCertificate, "");
            var broker = new ApnsServiceBroker(config);
            broker.Start();
            broker.QueueNotification(new ApnsNotification
            {
                DeviceToken = localConfig.IosDeviceToken,
                Payload = JObject.Parse(localConfig.IosDataModel)
            });
            broker.Stop();
        }

        public void SendAndroid()
        {
            var config = new GcmConfiguration(localConfig.AndroidSenderToken);
            var gcmBroker = new GcmServiceBroker(config);
            gcmBroker.Start();
            gcmBroker.QueueNotification(new GcmNotification
            {
                RegistrationIds = new List<string> { localConfig.AndroidDeviceToken },
                Data = JObject.Parse(localConfig.AndroidDataModel),
            });
            gcmBroker.Stop();
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

                    if (config.PostedFile == null)
                    {
                        newRecord.IosSenderCertificate = oldRecord.IosSenderCertificate;
                        newRecord.IosSenderCertificateName = oldRecord.IosSenderCertificateName;
                    }
                    else
                    {
                        var ms = new MemoryStream();
                        config.PostedFile.InputStream.CopyTo(ms);
                        newRecord.IosSenderCertificate = ms.ToArray();
                        newRecord.IosSenderCertificateName = config.PostedFile.FileName;
                    }

                    db.tNotificationConfigs.Add(newRecord);
                    db.SaveChanges();

                    localConfig = MapperConfig.Mapper.Map<Models.DTO.NotificationConfig>(newRecord);

                    dbTrans.Commit();

                    return true;
                }
                catch (Exception)
                {
                    dbTrans.Rollback();

                    return false;
                }


            }
        }

    }
}