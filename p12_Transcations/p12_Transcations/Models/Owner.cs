using System;
using System.Collections.Generic;

namespace p12_Transcations.Models
{
    public partial class Owner
    {
        public Owner()
        {
            Messes = new HashSet<Mess>();
            Pgs = new HashSet<Pg>();
        }

        public int Oid { get; set; }
        public string? AdharcardNumber { get; set; }
        public string Type { get; set; } = null!;
        public int? Uid { get; set; }

        public virtual User? UidNavigation { get; set; }
        public virtual ICollection<Mess> Messes { get; set; }
        public virtual ICollection<Pg> Pgs { get; set; }
    }
}
