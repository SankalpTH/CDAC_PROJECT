using System;
using System.Collections.Generic;

namespace p12_Transcations.Models
{
    public partial class Mimage
    {
        public int MimageId { get; set; }
        public byte[]? Image1 { get; set; }
        public byte[]? Image2 { get; set; }
        public byte[]? Image3 { get; set; }
        public byte[]? Image4 { get; set; }

        public virtual Mess? Mess { get; set; }
    }
}
