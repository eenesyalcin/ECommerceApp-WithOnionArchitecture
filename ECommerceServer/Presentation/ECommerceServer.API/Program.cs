
using System.Text;
using ECommerceServer.Application;
using ECommerceServer.Application.Validators.Products;
using ECommerceServer.Infrastructure;
using ECommerceServer.Infrastructure.Filters;
using ECommerceServer.Infrastructure.Services.Storage.Azure;
using ECommerceServer.Infrastructure.Services.Storage.Local;
using ECommerceServer.Persistence;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace ECommerceServer.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddPersistanceServices();
            builder.Services.AddInfrastructureServices();
            builder.Services.AddApplicationServices();

            //builder.Services.AddStorage(StorageType.Azure);
            //builder.Services.AddStorage<LocalStorage>();
            builder.Services.AddStorage<AzureStorage>();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                    policy => policy
                        .WithOrigins("http://localhost:4200")  // ✅ Angular uygulamanızın URL'sini tanımlıyoruz.
                        .AllowAnyMethod()  // ✅ GET, POST, PUT, DELETE gibi tüm metodlara izin veriyoruz.
                        .AllowAnyHeader()  // ✅ Her türlü HTTP başlığına (headers) izin veriyoruz.
                        .AllowCredentials());  // ✅ Kimlik doğrulama (Authentication) destekliyoruz.
            });

            builder.Services.AddControllers(options =>
            {
                options.Filters.Add<ValidationFilter>(); // Validation filter'ı ekle
            })
            .ConfigureApiBehaviorOptions(options =>
            {
                options.SuppressModelStateInvalidFilter = true; // ModelState doğrulama hatalarını otomatik olarak döndürmesini engelle
            });

            // FluentValidation güncellenmiş versiyon
            builder.Services.AddValidatorsFromAssemblyContaining<CreateProductValidator>();

            builder.Services.AddFluentValidationAutoValidation()
                            .AddFluentValidationClientsideAdapters();


            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer("Admin", options =>
            {
                options.TokenValidationParameters = new()
                {
                    ValidateAudience = true,            // Oluşturulacak token değerini kimlerin, hangi sitelerin kullanacağını belirlediğimiz değerdir. ==> www.ornek.com 
                    ValidateIssuer = true,              // Oluşturulacak token değerini kimin dağıttığını ifade eden değerdir.                           ==> www.myapi.com
                    ValidateLifetime = true,            // Oluşturulan token değerinin süresini kontrol edecek olan doğrulamadır.
                    ValidateIssuerSigningKey = true,    // Üretilecek token değerinin uygulamamıza ait bir değer olduğunu ifade eden security key verisinin doğrulanmasıdır.

                    ValidAudience = builder.Configuration["Token:Audience"],
                    ValidIssuer = builder.Configuration["Token:Issuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Token:SecurityKey"]))
                };
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseStaticFiles();
            app.UseCors("AllowAll");
            app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
