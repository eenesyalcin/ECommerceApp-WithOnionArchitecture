using System.Net;
using ECommerceServer.Application.Abstractions.Storage;
using ECommerceServer.Application.Features.Commands.Product.CreateProduct;
using ECommerceServer.Application.Features.Commands.Product.RemoveProduct;
using ECommerceServer.Application.Features.Commands.Product.UpdateProduct;
using ECommerceServer.Application.Features.Commands.ProductImageFile.RemoveProductImage;
using ECommerceServer.Application.Features.Commands.ProductImageFile.UploadProductImage;
using ECommerceServer.Application.Features.Queries.Product.GetAllProduct;
using ECommerceServer.Application.Features.Queries.Product.GetByIdProduct;
using ECommerceServer.Application.Features.Queries.ProductImageFile.GetProductImage;
using ECommerceServer.Application.Repositories;
using ECommerceServer.Application.RequestParameters;
using ECommerceServer.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client.Extensions.Msal;

namespace ECommerceServer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = "Admin")]
    public class TestController : ControllerBase
    {
        readonly private IMediator _mediator;

        public TestController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] GetAllProductQueryRequest getAllProductQueryRequest)
        {
            // MediatR kütüphanesi aracılığı ile getAllProductQueryRequest'i Handler kısmına gönderiliyor ve GetAllProductQueryResponse türünde bir değer dönüyor. Dönen sonucu da return ediyoruz.
            GetAllProductQueryResponse getAllProductQueryResponse = await _mediator.Send(getAllProductQueryRequest);
            return Ok(getAllProductQueryResponse);
        }

        //// Burada FromRoute sadece değişkenlerden değer alabilir. GetByIdProductQueryRequest bir nesne olduğu için biz değişken olarak parametreyi aldık ve nesneyi manuel oluşturarak içerisindeki değere eşitledik.
        //[HttpGet("{id}")]
        //public async Task<IActionResult> Get([FromRoute] string id)
        //{
        //    // Burada diğerlerinden fark; paramtere ile aldığımız string id değerini GetByIdProductQueryRequest sınıfından nesne üreterek içerisindeki Id değerine atadık ve işlem yaptık.
        //    var getByIdProductQueryRequest = new GetByIdProductQueryRequest
        //    {
        //        Id = id
        //    };
        //    GetByIdProductQueryResponse getByIdProductQueryResponse = await _mediator.Send(getByIdProductQueryRequest);
        //    return Ok(getByIdProductQueryResponse);
        //}

        // Burada bildirilen Id değerinin property ile bind(bağlanmak) olabilmesi için aynı isme sahip olması gerkemektedir.
        [HttpGet("{Id}")]
        public async Task<IActionResult> Get([FromRoute] GetByIdProductQueryRequest getByIdProductQueryRequest)
        {
            GetByIdProductQueryResponse getByIdProductQueryResponse = await _mediator.Send(getByIdProductQueryRequest);
            return Ok(getByIdProductQueryResponse);
        }


        [HttpPost]
        public async Task<IActionResult> Post(CreateProductCommandRequest createProductCommandRequest)
        {
            CreateProductCommandResponse createProductCommandResponse =  await _mediator.Send(createProductCommandRequest);
            return Ok((int)HttpStatusCode.Created);
        }   

        [HttpPut]
        public async Task<IActionResult> Put([FromBody]UpdateProductCommandRequest updateProductCommandRequest)
        {
            UpdateProductCommandResponse updateProductCommandResponse = await _mediator.Send(updateProductCommandRequest);
            return Ok();
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> Delete([FromRoute] RemoveProductCommandRequest removeProductCommandRequest)
        {
            RemoveProductCommandResponse removeProductCommandResponse = await _mediator.Send(removeProductCommandRequest);
            return Ok();
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Upload([FromQuery] UploadProductImageCommandRequest uploadProductImageCommandRequest)
        {
            uploadProductImageCommandRequest.Files = Request.Form.Files;
            UploadProductImageCommandResponse uploadProductImageCommandResponse = await _mediator.Send(uploadProductImageCommandRequest);
            return Ok();
        }

        [HttpGet("[action]/{id}")]
        public async Task<IActionResult> GetProductImages([FromRoute] GetProductImageQueryRequest getProductImageQueryRequest)
        {
           List<GetProductImageQueryResponse> getProductImageQueryResponse = await _mediator.Send(getProductImageQueryRequest);
            return Ok(getProductImageQueryResponse);
        }

        [HttpDelete("[action]/{Id}")]
        public async Task<IActionResult> DeleteProductImage([FromRoute] RemoveProductImageCommandRequest removeProductImageCommandRequest, [FromQuery] string imageId)
        {
            removeProductImageCommandRequest.ImageId = imageId;
            RemoveProductImageCommandResponse removeProductImageCommandResponse = await _mediator.Send(removeProductImageCommandRequest);
            return Ok();
        }
    }
}
