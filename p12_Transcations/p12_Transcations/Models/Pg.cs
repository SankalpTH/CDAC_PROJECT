using System;
using System.Collections.Generic;

namespace p12_Transcations.Models
{
    public partial class Pg
    {
        public Pg()
        {
            Favourites = new HashSet<Favourite>();
            Feedbacks = new HashSet<Feedback>();
        }

        public int PgId { get; set; }
        public string? PgName { get; set; }
        public string? PgAddress { get; set; }
        public decimal? Pricing { get; set; }
        public string? Description { get; set; }
        public string Wifi { get; set; } = null!;
        public string? GLink { get; set; }
        public string Ac { get; set; } = null!;
        public string Laundry { get; set; } = null!;
        public int? Oid { get; set; }
        public int? AreaId { get; set; }
        public uint? ImageId { get; set; }

        public virtual Area? Area { get; set; }
        public virtual Image? Image { get; set; }
        public virtual Owner? OidNavigation { get; set; }
        public virtual ICollection<Favourite> Favourites { get; set; }
        public virtual ICollection<Feedback> Feedbacks { get; set; }
    }
}
