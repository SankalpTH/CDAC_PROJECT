using System;
using System.Collections.Generic;

namespace p12_Transcations.Models
{
    public partial class User
    {
        public User()
        {
            Customers = new HashSet<Customer>();
            Favourites = new HashSet<Favourite>();
            Feedbacks = new HashSet<Feedback>();
            Owners = new HashSet<Owner>();
        }

        public int Uid { get; set; }
        public string? Fname { get; set; }
        public string? Lname { get; set; }
        public string? Email { get; set; }
        public string Password { get; set; } = null!;
        public string? PhoneNumber { get; set; }
        public string? PermanentAddress { get; set; }
        public int? Rid { get; set; }

        public virtual Role? RidNavigation { get; set; }
        public virtual ICollection<Customer> Customers { get; set; }
        public virtual ICollection<Favourite> Favourites { get; set; }
        public virtual ICollection<Feedback> Feedbacks { get; set; }
        public virtual ICollection<Owner> Owners { get; set; }
    }
}
