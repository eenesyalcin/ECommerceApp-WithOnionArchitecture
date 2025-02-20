using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerceServer.Domain.Entities.Common;
using Microsoft.EntityFrameworkCore;

namespace ECommerceServer.Application.Repositories
{
    public interface IRepository<T> where T : BaseEntity
    {
        // Sadece "get" olmasının sebebi tabloyu almamızdan kaynaklıdır.
        DbSet<T> Table {  get; }
    }
}
