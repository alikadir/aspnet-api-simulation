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
    
    public partial class IosDeviceToken
    {
        public int ID { get; set; }
        public string DeviceToke { get; set; }
        public Nullable<System.DateTime> RecordDate { get; set; }
        public int UnReadBadge { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Unique { get; set; }
        public string Site { get; set; }
        public Nullable<int> Kampanya { get; set; }
        public bool Read { get; set; }
        public string Error { get; set; }
        public Nullable<System.DateTime> SendDate { get; set; }
        public bool History { get; set; }
        public Nullable<int> MobileApplicationID { get; set; }
    
        public virtual MobileApplication MobileApplication { get; set; }
    }
}
