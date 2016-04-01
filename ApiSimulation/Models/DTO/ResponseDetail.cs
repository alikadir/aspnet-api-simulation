namespace ApiSimulation.Models.DTO
{
    public sealed class ResponseDetail
    {
        public int ID { get; set; }
        public int ResponseID { get; set; }
        public string ContentType { get; set; }
        public string ContentRaw { get; set; }
        public System.DateTime CreateDate { get; set; }
        public int Delay { get; set; }
        public short Hit { get; set; }
    }
}