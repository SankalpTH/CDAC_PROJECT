using System;
using System.Collections.Generic;

namespace p12_Transcations.Models
{
    public partial class City
    {
        public City()
        {
            Areas = new HashSet<Area>();
        }

        public int CityId { get; set; }
        public string? CityName { get; set; }

        public virtual ICollection<Area> Areas { get; set; }
    }
}
