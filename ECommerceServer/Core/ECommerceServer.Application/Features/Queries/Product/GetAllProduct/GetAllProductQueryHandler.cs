using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerceServer.Application.Repositories;
using MediatR;

namespace ECommerceServer.Application.Features.Queries.Product.GetAllProduct
{
    // Burada hangi request sınıfına karşılık, hangi response nesnesini döndüreceğini belirtiyoruz.
    public class GetAllProductQueryHandler : IRequestHandler<GetAllProductQueryRequest, GetAllProductQueryResponse>
    {
        /*
        Burada bu repository'lere IoC yapılanması sayesinde ulaşıyoruz.
        Burada öncelikle biz Application katmanında yer alan interface'i çağırıyoruz.                  ==> (IProductReadRepository)
        Çağırmış olduğumuz interface IoC yapılanması aracılığyla bize concrete olan sınıfı getiriyor.  ==> (ProductReadRepository)
        */
        readonly IProductReadRepository _productReadRepository;

        public GetAllProductQueryHandler(IProductReadRepository productReadRepository)
        {
            _productReadRepository = productReadRepository;
        }


        // Interfac'in implemente edilmesi sonucunda gelen request nesnesine karşılık, geriye bir tane response nesnesi döndürüyor.
        public Task<GetAllProductQueryResponse> Handle(GetAllProductQueryRequest request, CancellationToken cancellationToken)
        {
            // Yapılacak olan operasyonlar burada yapılıyor.
            var totalCount = _productReadRepository.GetAll(false).Count();
            var products = _productReadRepository.GetAll(false).Skip(request.Page * request.Size).Take(request.Size).Select(p => new
            {
                p.Id,
                p.Name,
                p.Stock,
                p.Price,
                p.CreatedDate,
                p.UpdatedDate
            }).ToList();

            // Burada return ettiğimiz nesneler GetAllProductQueryResponse'a karşılık gelir.
            return Task.FromResult(new GetAllProductQueryResponse
            {
                Products = products,
                TotalCount = totalCount
            });
        }
    }
}
