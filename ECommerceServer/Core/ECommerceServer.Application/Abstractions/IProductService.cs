using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerceServer.Domain.Entities;

namespace ECommerceServer.Application.Abstractions
{
    public interface IProductService
    {
        List<Product> GetProducts();
    }
}
