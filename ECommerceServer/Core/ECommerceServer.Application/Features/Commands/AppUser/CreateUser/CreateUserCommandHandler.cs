using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerceServer.Application.Exceptions;
using MediatR;
using Microsoft.AspNetCore.Identity;
using U = ECommerceServer.Domain.Entities.Identity;

namespace ECommerceServer.Application.Features.Commands.AppUser.CreateUser
{
    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommandRequest, CreateUserCommandResponse>
    {
        readonly UserManager<U.AppUser> _userManager;

        public CreateUserCommandHandler(UserManager<U.AppUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<CreateUserCommandResponse> Handle(CreateUserCommandRequest request, CancellationToken cancellationToken)
        {
            IdentityResult result = await _userManager.CreateAsync(new()
            {
                Id = Guid.NewGuid().ToString(),
                UserName = request.Username,
                Email = request.Email,
                NameSurname = request.NameSurname
            }, request.Password);

            CreateUserCommandResponse createUserCommandResponse = new()
            {
                Succeeded = result.Succeeded
            };

            if (result.Succeeded)
            {
                createUserCommandResponse.Message = "Kullanıcı kaydı başarıyla oluşturuldu.";
            }
            else
            {
                foreach (var error in result.Errors)
                {
                    createUserCommandResponse.Message += $"{error.Code} --> {error.Description}\n";
                }
            }

            return createUserCommandResponse;

            //throw new UserCreateFailedException();
        }
    }
}
