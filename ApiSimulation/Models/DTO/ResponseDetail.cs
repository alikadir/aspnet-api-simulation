using System.ComponentModel.DataAnnotations;

namespace ApiSimulation.Models.DTO
{
    public sealed class ResponseDetail
    {
        public int ID { get; set; }

        [Required]
        public int ResponseID { get; set; }
        [Required]
        public string ContentType { get; set; }
        [Required]
        public string ContentRaw { get; set; }
        public System.DateTime CreateDate { get; set; }
        [Required]
        public int Delay { get; set; }
        public short Hit { get; set; }
        public bool UseTemplateEngine { get; set; }
    }
}