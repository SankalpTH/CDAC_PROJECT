﻿using System;
using System.Collections.Generic;

namespace p12_Transcations.Models
{
    public partial class Role
    {
        public Role()
        {
            Users = new HashSet<User>();
        }

        public int Rid { get; set; }
        public string? Rname { get; set; }

        public virtual ICollection<User> Users { get; set; }
    }
}
