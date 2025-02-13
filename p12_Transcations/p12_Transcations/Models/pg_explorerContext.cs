using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace p12_Transcations.Models
{
    public partial class pg_explorerContext : DbContext
    {
        public pg_explorerContext()
        {
        }

        public pg_explorerContext(DbContextOptions<pg_explorerContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Area> Areas { get; set; } = null!;
        public virtual DbSet<City> Cities { get; set; } = null!;
        public virtual DbSet<Customer> Customers { get; set; } = null!;
        public virtual DbSet<Favourite> Favourites { get; set; } = null!;
        public virtual DbSet<Feedback> Feedbacks { get; set; } = null!;
        public virtual DbSet<Image> Images { get; set; } = null!;
        public virtual DbSet<Mess> Messes { get; set; } = null!;
        public virtual DbSet<Mimage> Mimages { get; set; } = null!;
        public virtual DbSet<Owner> Owners { get; set; } = null!;
        public virtual DbSet<Pg> Pgs { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<Search> Searches { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseMySql("server=localhost;port=3306;user=root;password=Pass@123;database=pg_explorer", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.39-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("utf8mb4_0900_ai_ci")
                .HasCharSet("utf8mb4");

            modelBuilder.Entity<Area>(entity =>
            {
                entity.ToTable("area");

                entity.HasIndex(e => e.CityId, "city_id");

                entity.Property(e => e.AreaId).HasColumnName("area_id");

                entity.Property(e => e.AreaName)
                    .HasMaxLength(255)
                    .HasColumnName("area_name");

                entity.Property(e => e.CityId).HasColumnName("city_id");

                entity.HasOne(d => d.City)
                    .WithMany(p => p.Areas)
                    .HasForeignKey(d => d.CityId)
                    .HasConstraintName("area_ibfk_1");
            });

            modelBuilder.Entity<City>(entity =>
            {
                entity.ToTable("city");

                entity.Property(e => e.CityId).HasColumnName("city_id");

                entity.Property(e => e.CityName)
                    .HasMaxLength(255)
                    .HasColumnName("city_name");
            });

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.HasKey(e => e.Cid)
                    .HasName("PRIMARY");

                entity.ToTable("customer");

                entity.HasIndex(e => e.AdharcardNumber, "adharcard_number")
                    .IsUnique();

                entity.HasIndex(e => e.Uid, "uid");

                entity.Property(e => e.Cid).HasColumnName("cid");

                entity.Property(e => e.AdharcardNumber).HasColumnName("adharcard_number");

                entity.Property(e => e.Dob).HasColumnName("dob");

                entity.Property(e => e.Type)
                    .HasMaxLength(255)
                    .HasColumnName("type");

                entity.Property(e => e.Uid).HasColumnName("uid");

                entity.HasOne(d => d.UidNavigation)
                    .WithMany(p => p.Customers)
                    .HasForeignKey(d => d.Uid)
                    .HasConstraintName("customer_ibfk_1");
            });

            modelBuilder.Entity<Favourite>(entity =>
            {
                entity.ToTable("favourite");

                entity.HasIndex(e => e.MessId, "mess_id");

                entity.HasIndex(e => e.PgId, "pg_id");

                entity.HasIndex(e => e.Uid, "uid");

                entity.Property(e => e.FavouriteId).HasColumnName("Favourite_id");

                entity.Property(e => e.MessId).HasColumnName("mess_id");

                entity.Property(e => e.PgId).HasColumnName("pg_id");

                entity.Property(e => e.Uid).HasColumnName("uid");

                entity.HasOne(d => d.Mess)
                    .WithMany(p => p.Favourites)
                    .HasForeignKey(d => d.MessId)
                    .HasConstraintName("favourite_ibfk_3");

                entity.HasOne(d => d.Pg)
                    .WithMany(p => p.Favourites)
                    .HasForeignKey(d => d.PgId)
                    .HasConstraintName("favourite_ibfk_2");

                entity.HasOne(d => d.UidNavigation)
                    .WithMany(p => p.Favourites)
                    .HasForeignKey(d => d.Uid)
                    .HasConstraintName("favourite_ibfk_1");
            });

            modelBuilder.Entity<Feedback>(entity =>
            {
                entity.ToTable("feedback");

                entity.HasIndex(e => e.MessId, "mess_id");

                entity.HasIndex(e => e.PgId, "pg_id");

                entity.HasIndex(e => e.Uid, "uid");

                entity.Property(e => e.FeedbackId).HasColumnName("feedback_id");

                entity.Property(e => e.FeedbackDescription)
                    .HasColumnType("text")
                    .HasColumnName("feedback_description");

                entity.Property(e => e.MessId).HasColumnName("mess_id");

                entity.Property(e => e.PgId).HasColumnName("pg_id");

                entity.Property(e => e.Ratings)
                    .HasColumnType("enum('1','2','3','4','5')")
                    .HasColumnName("ratings");

                entity.Property(e => e.Uid).HasColumnName("uid");

                entity.HasOne(d => d.Mess)
                    .WithMany(p => p.Feedbacks)
                    .HasForeignKey(d => d.MessId)
                    .HasConstraintName("feedback_ibfk_3");

                entity.HasOne(d => d.Pg)
                    .WithMany(p => p.Feedbacks)
                    .HasForeignKey(d => d.PgId)
                    .HasConstraintName("feedback_ibfk_2");

                entity.HasOne(d => d.UidNavigation)
                    .WithMany(p => p.Feedbacks)
                    .HasForeignKey(d => d.Uid)
                    .HasConstraintName("feedback_ibfk_1");
            });

            modelBuilder.Entity<Image>(entity =>
            {
                entity.ToTable("images");

                entity.Property(e => e.ImageId).HasColumnName("image_id");

                entity.Property(e => e.Image1).HasColumnName("image1");

                entity.Property(e => e.Image2).HasColumnName("image2");

                entity.Property(e => e.Image3).HasColumnName("image3");

                entity.Property(e => e.Image4).HasColumnName("image4");
            });

            modelBuilder.Entity<Mess>(entity =>
            {
                entity.ToTable("mess");

                entity.HasIndex(e => e.AreaId, "area_id");

                entity.HasIndex(e => e.MimageId, "mimage_id")
                    .IsUnique();

                entity.HasIndex(e => e.Oid, "oid");

                entity.Property(e => e.MessId).HasColumnName("mess_id");

                entity.Property(e => e.AreaId).HasColumnName("area_id");

                entity.Property(e => e.Description)
                    .HasMaxLength(255)
                    .HasColumnName("description");

                entity.Property(e => e.GmLink)
                    .HasMaxLength(255)
                    .HasColumnName("gm_link");

                entity.Property(e => e.MessAddress)
                    .HasMaxLength(255)
                    .HasColumnName("mess_address");

                entity.Property(e => e.MessName)
                    .HasMaxLength(255)
                    .HasColumnName("mess_name");

                entity.Property(e => e.MessType)
                    .HasColumnType("enum('Veg','Non_Veg','Both')")
                    .HasColumnName("mess_type");

                entity.Property(e => e.MimageId).HasColumnName("mimage_id");

                entity.Property(e => e.Oid).HasColumnName("oid");

                entity.Property(e => e.Pricing)
                    .HasPrecision(38, 2)
                    .HasColumnName("pricing");

                entity.HasOne(d => d.Area)
                    .WithMany(p => p.Messes)
                    .HasForeignKey(d => d.AreaId)
                    .HasConstraintName("mess_ibfk_2");

                entity.HasOne(d => d.Mimage)
                    .WithOne(p => p.Mess)
                    .HasForeignKey<Mess>(d => d.MimageId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("fk_mess_images");

                entity.HasOne(d => d.OidNavigation)
                    .WithMany(p => p.Messes)
                    .HasForeignKey(d => d.Oid)
                    .HasConstraintName("mess_ibfk_1");
            });

            modelBuilder.Entity<Mimage>(entity =>
            {
                entity.ToTable("mimages");

                entity.Property(e => e.MimageId).HasColumnName("mimage_id");

                entity.Property(e => e.Image1).HasColumnName("image1");

                entity.Property(e => e.Image2).HasColumnName("image2");

                entity.Property(e => e.Image3).HasColumnName("image3");

                entity.Property(e => e.Image4).HasColumnName("image4");
            });

            modelBuilder.Entity<Owner>(entity =>
            {
                entity.HasKey(e => e.Oid)
                    .HasName("PRIMARY");

                entity.ToTable("owner");

                entity.HasIndex(e => e.AdharcardNumber, "adharcard_number")
                    .IsUnique();

                entity.HasIndex(e => e.Uid, "uid");

                entity.Property(e => e.Oid).HasColumnName("oid");

                entity.Property(e => e.AdharcardNumber).HasColumnName("adharcard_number");

                entity.Property(e => e.Type)
                    .HasColumnType("enum('PG_OWNER','MESS_OWNER')")
                    .HasColumnName("type");

                entity.Property(e => e.Uid).HasColumnName("uid");

                entity.HasOne(d => d.UidNavigation)
                    .WithMany(p => p.Owners)
                    .HasForeignKey(d => d.Uid)
                    .HasConstraintName("owner_ibfk_1");
            });

            modelBuilder.Entity<Pg>(entity =>
            {
                entity.ToTable("pg");

                entity.HasIndex(e => e.ImageId, "UK18r0g5onahhl36f64jdbmrdje")
                    .IsUnique();

                entity.HasIndex(e => e.AreaId, "area_id");

                entity.HasIndex(e => e.Oid, "oid");

                entity.Property(e => e.PgId).HasColumnName("pg_id");

                entity.Property(e => e.Ac)
                    .HasMaxLength(1)
                    .HasColumnName("ac")
                    .IsFixedLength();

                entity.Property(e => e.AreaId).HasColumnName("area_id");

                entity.Property(e => e.Description)
                    .HasMaxLength(255)
                    .HasColumnName("description");

                entity.Property(e => e.GLink)
                    .HasMaxLength(255)
                    .HasColumnName("g_link");

                entity.Property(e => e.ImageId).HasColumnName("image_id");

                entity.Property(e => e.Laundry)
                    .HasMaxLength(1)
                    .HasColumnName("laundry")
                    .IsFixedLength();

                entity.Property(e => e.Oid).HasColumnName("oid");

                entity.Property(e => e.PgAddress)
                    .HasMaxLength(255)
                    .HasColumnName("pg_address");

                entity.Property(e => e.PgName)
                    .HasMaxLength(255)
                    .HasColumnName("pg_name");

                entity.Property(e => e.Pricing)
                    .HasPrecision(38, 2)
                    .HasColumnName("pricing");

                entity.Property(e => e.Wifi)
                    .HasMaxLength(1)
                    .HasColumnName("wifi")
                    .IsFixedLength();

                entity.HasOne(d => d.Area)
                    .WithMany(p => p.Pgs)
                    .HasForeignKey(d => d.AreaId)
                    .HasConstraintName("pg_ibfk_2");

                entity.HasOne(d => d.Image)
                    .WithOne(p => p.Pg)
                    .HasForeignKey<Pg>(d => d.ImageId)
                    .HasConstraintName("fk_pg_image");

                entity.HasOne(d => d.OidNavigation)
                    .WithMany(p => p.Pgs)
                    .HasForeignKey(d => d.Oid)
                    .HasConstraintName("pg_ibfk_1");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.HasKey(e => e.Rid)
                    .HasName("PRIMARY");

                entity.ToTable("role");

                entity.Property(e => e.Rid).HasColumnName("rid");

                entity.Property(e => e.Rname)
                    .HasMaxLength(255)
                    .HasColumnName("rname");
            });

            modelBuilder.Entity<Search>(entity =>
            {
                entity.ToTable("search");

                entity.HasIndex(e => e.AreaId, "area_id");

                entity.HasIndex(e => e.Cid, "cid");

                entity.Property(e => e.SearchId).HasColumnName("search_id");

                entity.Property(e => e.AreaId).HasColumnName("area_id");

                entity.Property(e => e.Cid).HasColumnName("cid");

                entity.Property(e => e.SearchCriteria)
                    .HasColumnType("text")
                    .HasColumnName("search_criteria");

                entity.HasOne(d => d.Area)
                    .WithMany(p => p.Searches)
                    .HasForeignKey(d => d.AreaId)
                    .HasConstraintName("search_ibfk_2");

                entity.HasOne(d => d.CidNavigation)
                    .WithMany(p => p.Searches)
                    .HasForeignKey(d => d.Cid)
                    .HasConstraintName("search_ibfk_1");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Uid)
                    .HasName("PRIMARY");

                entity.ToTable("user");

                entity.HasIndex(e => e.Rid, "FK8079530ngl61ed971pmagese0");

                entity.HasIndex(e => e.Email, "email")
                    .IsUnique();

                entity.HasIndex(e => e.PhoneNumber, "phone_number")
                    .IsUnique();

                entity.HasIndex(e => e.PermanentAddress, "rid");

                entity.Property(e => e.Uid).HasColumnName("uid");

                entity.Property(e => e.Email).HasColumnName("email");

                entity.Property(e => e.Fname)
                    .HasMaxLength(255)
                    .HasColumnName("fname");

                entity.Property(e => e.Lname)
                    .HasMaxLength(255)
                    .HasColumnName("lname");

                entity.Property(e => e.Password)
                    .HasMaxLength(255)
                    .HasColumnName("password");

                entity.Property(e => e.PermanentAddress).HasColumnName("permanent_address");

                entity.Property(e => e.PhoneNumber).HasColumnName("phone_number");

                entity.Property(e => e.Rid).HasColumnName("rid");

                entity.HasOne(d => d.RidNavigation)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.Rid)
                    .HasConstraintName("FK8079530ngl61ed971pmagese0");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
