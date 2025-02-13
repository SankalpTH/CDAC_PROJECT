using System;
using System.Collections.Generic;

namespace p12_Transcations.Models
{
    public partial class Area
    {
        public Area()
        {
            Messes = new HashSet<Mess>();
            Pgs = new HashSet<Pg>();
            Searches = new HashSet<Search>();
        }

        public int AreaId { get; set; }
        public string? AreaName { get; set; }
        public int? CityId { get; set; }

        public virtual City? City { get; set; }
        public virtual ICollection<Mess> Messes { get; set; }
        public virtual ICollection<Pg> Pgs { get; set; }
        public virtual ICollection<Search> Searches { get; set; }
    }
}
