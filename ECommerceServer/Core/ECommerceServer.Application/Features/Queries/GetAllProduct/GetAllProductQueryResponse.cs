using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerceServer.Application.Features.Queries.GetAllProduct
{
    public class GetAllProductQueryResponse
    {
        // Client tarafına yapılan işlemler sonucunda gönderilen nesneler property olarak burada tanımlanır.
        public int TotalCount { get; set; }
        public object Products { get; set; }
    }
}
