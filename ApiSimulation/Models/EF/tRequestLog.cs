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
    
    public partial class tRequestLog
    {
        public int ID { get; set; }
        public int ResponseID { get; set; }
        public System.DateTime RequestDate { get; set; }
        public string RequestUserAgent { get; set; }
        public string RequestIP { get; set; }
        public string RequestMethod { get; set; }
        public string RequestHeader { get; set; }
        public string RequestRaw { get; set; }
    
        public virtual tResponse tResponse { get; set; }
    }
}
