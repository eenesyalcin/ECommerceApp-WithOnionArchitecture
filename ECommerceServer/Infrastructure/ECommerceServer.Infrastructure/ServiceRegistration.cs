using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerceServer.Application.Abstractions.Storage;
using ECommerceServer.Application.Abstractions.Token;
using ECommerceServer.Infrastructure.Enums;
using ECommerceServer.Infrastructure.Services;
using ECommerceServer.Infrastructure.Services.Storage;
using ECommerceServer.Infrastructure.Services.Storage.Azure;
using ECommerceServer.Infrastructure.Services.Storage.Local;
using ECommerceServer.Infrastructure.Services.Token;
using Microsoft.Extensions.DependencyInjection;

namespace ECommerceServer.Infrastructure
{
    public static class ServiceRegistration
    {
        public static void AddInfrastructureServices(this IServiceCollection serviceCollection)
        {
            serviceCollection.AddScoped<IStorageService, StorageService>();
            serviceCollection.AddScoped<ITokenHandler, TokenHandler>();
        }

        //public static void AddStorage<T>(this IServiceCollection serviceCollection, StorageType storageType)
        //{
        //    switch (storageType)
        //    {
        //        case StorageType.Local:
        //            serviceCollection.AddScoped<IStorage, LocalStorage>();
        //            break;
        //        case StorageType.Azure:
        //            serviceCollection.AddScoped<IStorage, AzureStorage>();
        //            break;
        //        default:
        //            serviceCollection.AddScoped<IStorage, LocalStorage>();
        //            break;
        //    }
        //}

        public static void AddStorage<T>(this IServiceCollection serviceCollection) where T : Storage, IStorage
        {
            serviceCollection.AddScoped<IStorage, T>();
        }
    }
}
