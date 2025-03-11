using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace ECommerceServer.Application.Features.Queries.Product.GetAllProduct
{
    // Burada hangi sınıfın request sınıfı olduğunu ve bu request sınıfı sonucunda hangi sınıfın geriye response olarak döneceğini belirtmemiz gerekiyor.
    public class GetAllProductQueryRequest : IRequest<GetAllProductQueryResponse>
    {
        // İstek sürecinde gelen parametreler burada property olarak tanımlanır.
        //public Pagination Pagination { get; set; }
        public int Page { get; set; } = 0;
        public int Size { get; set; } = 5;
    }
}
