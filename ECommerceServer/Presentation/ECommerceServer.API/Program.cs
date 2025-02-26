
using ECommerceServer.Persistence;

namespace ECommerceServer.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddPersistanceServices();
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                    policy => policy
                        .WithOrigins("http://localhost:4200")  // ✅ Angular uygulamanızın URL'sini tanımlıyoruz.
                        .AllowAnyMethod()  // ✅ GET, POST, PUT, DELETE gibi tüm metodlara izin veriyoruz.
                        .AllowAnyHeader()  // ✅ Her türlü HTTP başlığına (headers) izin veriyoruz.
                        .AllowCredentials());  // ✅ Kimlik doğrulama (Authentication) destekliyoruz.
            });
            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors("AllowAll");
            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
