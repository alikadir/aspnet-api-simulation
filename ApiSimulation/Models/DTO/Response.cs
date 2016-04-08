﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ApiSimulation.Models.DTO
{
    public sealed class Response
    {
        public int ID { get; set; }
        public string Url { get; set; }
        public DateTime CreateDate { get; set; }
        public short Hit { get; set; }
        public DateTime LastRequestDate { get; set; }

    }
}