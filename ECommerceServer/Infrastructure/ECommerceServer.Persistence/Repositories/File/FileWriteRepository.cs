﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerceServer.Application.Repositories;
using ECommerceServer.Domain.Entities;
using ECommerceServer.Persistence.Contexts;

namespace ECommerceServer.Persistence.Repositories
{
    public class FileWriteRepository : WriteRepository<FileTable>, IFileWriteRepository
    {
        public FileWriteRepository(ECommerceServerDbContext context) : base(context)
        {
        }
    }
}
    