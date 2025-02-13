using System;
using System.Collections.Generic;

namespace p12_Transcations.Models
{
    public partial class Image
    {
        public uint ImageId { get; set; }
        public byte[]? Image1 { get; set; }
        public byte[]? Image2 { get; set; }
        public byte[]? Image3 { get; set; }
        public byte[]? Image4 { get; set; }

        public virtual Pg? Pg { get; set; }
    }
}
