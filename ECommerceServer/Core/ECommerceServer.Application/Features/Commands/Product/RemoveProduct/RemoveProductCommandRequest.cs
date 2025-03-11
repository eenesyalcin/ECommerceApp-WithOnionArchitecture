using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace ECommerceServer.Application.Features.Commands.Product.RemoveProduct
{
    public class RemoveProductCommandRequest : IRequest<RemoveProductCommandResponse>
    {
        public string Id { get; set; }
    }
}
