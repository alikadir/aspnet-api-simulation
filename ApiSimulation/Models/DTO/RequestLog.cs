using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ApiSimulation.Models.DTO
{
    public sealed class RequestLog
    {
        public int ID { get; set; }
        public int ResponseID { get; set; }
        public DateTime RequestDate { get; set; }
        public string RequestUserAgent { get; set; }
        public string RequestIP { get; set; }
        public string RequestMethod { get; set; }
        public string RequestHeader { get; set; }
        public string RequestRaw { get; set; }

    }
}