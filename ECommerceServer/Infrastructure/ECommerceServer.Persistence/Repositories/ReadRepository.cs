using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using ECommerceServer.Application.Repositories;
using ECommerceServer.Domain.Entities.Common;
using ECommerceServer.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace ECommerceServer.Persistence.Repositories
{
    public class ReadRepository<T> : IReadRepository<T> where T : BaseEntity
    {
        // Burada DbContext tanımlanıyor.
        private readonly ECommerceServerDbContext _context;

        // Burada bir nesne alınır ve _context değişkenine atanmış olur.
        // Constructor içinde yapmamızın sebebi ise sınıfın ihtiyaç duyduğu verileri hazır hale getirmektir. Çünkü constructor nesne oluşturulduğunda ilk tetiklenen metottur.
        public ReadRepository(ECommerceServerDbContext context)
        {
            _context = context;
        }

        // Burada ise _context değişkeni ile alınan tablo "Table" içerisine geliyor ve "Table aracılığı ile okuma işlemlerini yapıyoruz."
        public DbSet<T> Table => _context.Set<T>();

        public IQueryable<T> GetAll()
            => Table;

        public IQueryable<T> GetWhere(Expression<Func<T, bool>> method)
            => Table.Where(method);

        public async Task<T> GetSingleAsync(Expression<Func<T, bool>> method)
            => await Table.FirstOrDefaultAsync(method);

        public async Task<T> GetByIdAsync(string id)
            //=> await Table.FirstOrDefaultAsync(data => data.Id == Guid.Parse(id));
            => await Table.FindAsync(Guid.Parse(id));
    }
}
