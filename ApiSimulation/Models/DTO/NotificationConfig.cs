using System.Collections.Generic;

namespace ApiSimulation.Models.DTO
{
    public sealed class NotificationConfig
    {
        public int PushNotificationID { get; set; }
        public int ID { get; set; }
        public string IosDeviceToken { get; set; }
        public string AndroidDeviceToken { get; set; }
        public string IosSenderCertificate { get; set; }
        public string AndroidSenderToken { get; set; }
        public List<NotificationContent> ContentModelList { get; set; }

    }
}