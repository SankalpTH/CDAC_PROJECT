using Microsoft.EntityFrameworkCore;
using p12_Transcations.Models;
using Steeltoe.Discovery.Client;

namespace p12_Transcations
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // ✅ Register DbContext
            builder.Services.AddDbContext<pg_explorerContext>(options =>
                options.UseMySql(
                    "server=localhost;port=3306;user=root;password=Pass@123;database=pg_explorer",
                    new MySqlServerVersion(new Version(8, 0, 30))
                )
            );

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // ✅ Enable CORS Policy
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp",
                    policy => policy
                        .WithOrigins("http://localhost:3000") // Allow React app
                        .AllowAnyMethod() // Allow all HTTP methods
                        .AllowAnyHeader() // Allow all headers
                        .AllowCredentials()); // Allow cookies and authentication headers
            });

            // ✅ Add Steeltoe Discovery Client
            builder.Services.AddDiscoveryClient(builder.Configuration);

            var app = builder.Build();

            // ✅ Apply CORS Middleware (Before Authorization)
            app.UseCors("AllowReactApp");

            app.UseDiscoveryClient();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            // app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
