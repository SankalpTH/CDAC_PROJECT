using System;
using System.Collections.Generic;

namespace p12_Transcations.Models
{
    public partial class Mess
    {
        public Mess()
        {
            Favourites = new HashSet<Favourite>();
            Feedbacks = new HashSet<Feedback>();
        }

        public int MessId { get; set; }
        public string? MessName { get; set; }
        public string? MessAddress { get; set; }
        public string? Description { get; set; }
        public string? GmLink { get; set; }
        public string MessType { get; set; } = null!;
        public decimal? Pricing { get; set; }
        public int? Oid { get; set; }
        public int? AreaId { get; set; }
        public int? MimageId { get; set; }

        public virtual Area? Area { get; set; }
        public virtual Mimage? Mimage { get; set; }
        public virtual Owner? OidNavigation { get; set; }
        public virtual ICollection<Favourite> Favourites { get; set; }
        public virtual ICollection<Feedback> Feedbacks { get; set; }
    }
}
