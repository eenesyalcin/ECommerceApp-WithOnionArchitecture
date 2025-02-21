using ECommerceServer.Application.Repositories;
using ECommerceServer.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceServer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        readonly private IProductReadRepository _productReadRepository;
        readonly private IProductWriteRepository _productWriteRepository;

        readonly private IOrderReadRepository _orderReadRepository;
        readonly private IOrderWriteRepository _orderWriteRepository;

        readonly private ICustomerReadRepository _customerReadRepository;
        readonly private ICustomerWriteRepository _customerWriteRepository;

        public TestController(
            IProductReadRepository productReadRepository, 
            IProductWriteRepository productWriteRepository, 
            IOrderReadRepository orderReadRepository, 
            IOrderWriteRepository orderWriteRepository, 
            ICustomerReadRepository customerReadRepository, 
            ICustomerWriteRepository customerWriteRepository)
        {
            _productReadRepository = productReadRepository;
            _productWriteRepository = productWriteRepository;
            _orderReadRepository = orderReadRepository;
            _orderWriteRepository = orderWriteRepository;
            _customerReadRepository = customerReadRepository;
            _customerWriteRepository = customerWriteRepository;
        }

        [HttpGet("create")]
        public async Task Get()
        {
            var customerId = Guid.NewGuid();
            await _customerWriteRepository.AddAsync(new() { Id = customerId, Name = "Enes" });

            await _orderWriteRepository.AddAsync(new() { Description = "Açıklama 1", Address = "Çankaya, Ankara", CustomerId = customerId });
            await _orderWriteRepository.AddAsync(new() { Description = "Açıklama 2", Address = "Keçiören, Ankara", CustomerId = customerId });
            await _orderWriteRepository.SaveAsync();
        }

        [HttpPut("update")]
        public async Task Update()
        {
            Order order = await _orderReadRepository.GetByIdAsync("39B046D1-3029-413A-B48F-08DD525D8FD3");
            order.Address = "Beşiktaş, İstanbul";
            await _orderWriteRepository.SaveAsync();
        }
    }
}
