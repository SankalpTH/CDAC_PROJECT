using System;
using System.Collections.Generic;

namespace p12_Transcations.Models
{
    public partial class Customer
    {
        public Customer()
        {
            Searches = new HashSet<Search>();
        }

        public int Cid { get; set; }
        public string? AdharcardNumber { get; set; }
        public DateOnly Dob { get; set; }
        public string? Type { get; set; }
        public int? Uid { get; set; }

        public virtual User? UidNavigation { get; set; }
        public virtual ICollection<Search> Searches { get; set; }
    }
}
