using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerceServer.Domain.Entities
{
    public class InvoiceFile : FileTable
    {
        public decimal Price { get; set; }
    }
}
