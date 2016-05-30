using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;

namespace ApiSimulation
{
    public class MapperConfig
    {
        private static IMapper mapper;
        private static MapperConfiguration mapperConfiguration;

        public static void Configure()
        {
            mapperConfiguration = new MapperConfiguration(cfg =>
            {

                #region Response

                // DTO to EF
                cfg.CreateMap<Models.DTO.Response, Models.EF.tResponse>()
                                 .ForMember(x => x.IsDelete,
                                            opts => opts.UseValue<bool>(false));

                // EF to DTO
                cfg.CreateMap<Models.EF.tResponse, Models.DTO.Response>();

                #endregion

                #region ResponseDetail

                //Response Detail DTO to EF
                cfg.CreateMap<Models.DTO.ResponseDetail, Models.EF.tResponseDetail>()
                                 .ForMember(x => x.IsDelete,
                                            opts => opts.UseValue<bool>(false));

                //Response Detail EF to DTO
                cfg.CreateMap<Models.EF.tResponseDetail, Models.DTO.ResponseDetail>();

                #endregion

                #region RequestLog

                // DTO to EF
                cfg.CreateMap<Models.DTO.RequestLog, Models.EF.tRequestLog>();

                // EF to DTO
                cfg.CreateMap<Models.EF.tRequestLog, Models.DTO.RequestLog>();

                #endregion
                
                #region NotificationConfig

                // DTO to EF
                cfg.CreateMap<Models.DTO.NotificationConfig, Models.EF.tNotificationConfig>();

                // EF to DTO
                cfg.CreateMap<Models.EF.tNotificationConfig, Models.DTO.NotificationConfig>();

                #endregion



            });
        }

        public static void Validate()
        {
            mapperConfiguration.AssertConfigurationIsValid();
        }

        public static IMapper Mapper
        {
            get
            {
                if (mapper == null)
                    mapper = mapperConfiguration.CreateMapper();

                return mapper;
            }
        }


    }
}