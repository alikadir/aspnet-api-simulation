﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class ApiSimulationEntities : DbContext
    {
        public ApiSimulationEntities()
            : base("name=ApiSimulationEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<tRequestLog> tRequestLogs { get; set; }
        public virtual DbSet<tResponse> tResponses { get; set; }
        public virtual DbSet<tResponseDetail> tResponseDetails { get; set; }
    }
}
