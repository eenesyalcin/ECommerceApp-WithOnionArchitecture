using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerceServer.Domain.Entities
{
    public class ProductImageFile : FileTable
    {
        public ICollection<Product> Products { get; set; }
    }
}
