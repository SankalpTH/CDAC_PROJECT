using System;
using System.Collections.Generic;

namespace p12_Transcations.Models
{
    public partial class Search
    {
        public int SearchId { get; set; }
        public string SearchCriteria { get; set; } = null!;
        public int? Cid { get; set; }
        public int? AreaId { get; set; }

        public virtual Area? Area { get; set; }
        public virtual Customer? CidNavigation { get; set; }
    }
}
