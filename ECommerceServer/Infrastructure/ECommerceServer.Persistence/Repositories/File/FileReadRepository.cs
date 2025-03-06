using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerceServer.Application.Repositories;
using ECommerceServer.Domain.Entities;
using ECommerceServer.Persistence.Contexts;

namespace ECommerceServer.Persistence.Repositories
{
    public class FileReadRepository : ReadRepository<FileTable>, IFileReadRepository
    {
        public FileReadRepository(ECommerceServerDbContext context) : base(context)
        {
        }
    }
}
