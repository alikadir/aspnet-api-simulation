using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ApiSimulation.Models.DTO
{
    public sealed class NotificationConfig
    {
        public int ID { get; set; }
        public string IosDeviceToken { get; set; }
        public string AndroidDeviceToken { get; set; }
        public byte[] IosSenderCertificate { get; set; }
        public HttpPostedFileBase? PostedFile { get; set; }
        public string AndroidSenderToken { get; set; }
        public string IosDataModel { get; set; }
        public string AndroidDataModel { get; set; }

    }
}