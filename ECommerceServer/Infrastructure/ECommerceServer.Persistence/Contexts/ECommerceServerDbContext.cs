using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerceServer.Domain.Entities;
using ECommerceServer.Domain.Entities.Common;
using Microsoft.EntityFrameworkCore;

namespace ECommerceServer.Persistence.Contexts
{
    public class ECommerceServerDbContext : DbContext
    {
        public ECommerceServerDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Customer> Customers { get; set; }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            // Change Tracker: Entity'ler üzerinden yapılan değişikliklerin ya da eklenen verilerin yakalanmasını sağlayan property'dir. Update operasyonlarında Track edilen verileri yakalyıp elde etmemizi sağlar.

            var datas = ChangeTracker.Entries<BaseEntity>();

            foreach (var data in datas)
            {
                _ = data.State switch
                {
                    EntityState.Added => data.Entity.CreatedDate = DateTime.UtcNow,
                    EntityState.Modified => data.Entity.UpdatedDate = DateTime.UtcNow
                };
            }

            return base.SaveChangesAsync(cancellationToken);
        }
    }
}
