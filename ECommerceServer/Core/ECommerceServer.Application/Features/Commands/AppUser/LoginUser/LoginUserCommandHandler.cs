﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerceServer.Application.Exceptions;
using MediatR;
using Microsoft.AspNetCore.Identity;
using U = ECommerceServer.Domain.Entities.Identity;

namespace ECommerceServer.Application.Features.Commands.AppUser.LoginUser
{
    public class LoginUserCommandHandler : IRequestHandler<LoginUserCommandRequest, LoginUserCommandResponse>
    {
        readonly UserManager<U.AppUser> _userManager;
        readonly SignInManager<U.AppUser> _signInManager;

        public LoginUserCommandHandler(UserManager<U.AppUser> userManager, SignInManager<U.AppUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public async Task<LoginUserCommandResponse> Handle(LoginUserCommandRequest request, CancellationToken cancellationToken)
        {
            U.AppUser user = await _userManager.FindByNameAsync(request.UsernameOrEmail);
            if (user == null)
            {
                user = await _userManager.FindByNameAsync(request.UsernameOrEmail);
            }

            if (user == null)
            {
                throw new NotFoundUserException("Kullanıcı adı veya şifre hatalı!");
            }

            SignInResult result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

            if (result.Succeeded)  // Authentication başarılı olursa bu if bloğuna girer.
            {
                // Yetkileri belirlememiz gerekiyor, yani Authorization işlemlerini yapmamız gerekiyor.
            }

            return new();
        }
    }
}
