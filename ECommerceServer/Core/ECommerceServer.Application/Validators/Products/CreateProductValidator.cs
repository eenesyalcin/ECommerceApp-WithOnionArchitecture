using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerceServer.Application.Features.Commands.Product.CreateProduct;
using FluentValidation;

namespace ECommerceServer.Application.Validators.Products
{
    public class CreateProductValidator : AbstractValidator<CreateProductCommandRequest>
    {
        public CreateProductValidator()
        {
            RuleFor(n => n.Name)
                .NotEmpty()
                .NotNull()
                    .WithMessage("Ürün adı boş bırakılamaz!")
                .MaximumLength(150)
                    .WithMessage("Ürün adı 150 karakterden fazla olamaz!")
                .MinimumLength(5)
                    .WithMessage("Ürün adı 5 karakterden az olamaz!");

            RuleFor(s => s.Stock)
                .NotEmpty()
                .NotNull()
                    .WithMessage("Stok bilgisi boş bırakılamaz!")
                .Must(s => s >= 0)
                    .WithMessage("Stok bilgisi negatif olamaz!");

            RuleFor(p => p.Price)
                .NotEmpty()
                .NotNull()
                    .WithMessage("Fiyat bilgisi boş bırakılamz!")
                .Must(p => p >= 0)
                    .WithMessage("Fiyat bilgisi negatif olamaz!");
        }
    }
}
