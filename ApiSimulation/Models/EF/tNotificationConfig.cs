//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ApiSimulation.Models.EF
{
    using System;
    using System.Collections.Generic;
    using System.Web;
    public partial class tNotificationConfig
    {
        public int ID { get; set; }
        public string IosDeviceToken { get; set; }
        public string AndroidDeviceToken { get; set; }
        public byte[] IosSenderCertificate { get; set; }
        public string AndroidSenderToken { get; set; }
        public string IosDataModel { get; set; }
        public string AndroidDataModel { get; set; }
    }
}
