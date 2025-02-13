﻿using System;
using System.Collections.Generic;

namespace p12_Transcations.Models
{
    public partial class Favourite
    {
        public int FavouriteId { get; set; }
        public int? Uid { get; set; }
        public int? PgId { get; set; }
        public int? MessId { get; set; }

        public virtual Mess? Mess { get; set; }
        public virtual Pg? Pg { get; set; }
        public virtual User? UidNavigation { get; set; }
    }
}
