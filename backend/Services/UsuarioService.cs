using backend.DTOs;
using backend.Repositories;
using backend.Models;
using backend.Exceptions;
namespace backend.Services;

public class UsuarioService : IUsuarioService
{
    private readonly IUsuarioRepository _usuarioRepo;

    public UsuarioService(IUsuarioRepository usuarioRepo)
    {
        _usuarioRepo = usuarioRepo;
    }
    public async Task<UsuarioResponseDto?> BuscarUsuarioPorEmail(string email)
    {
        var usuario = await _usuarioRepo.BuscarUsuarioPorEmail(email);

        if(usuario == null) throw new NotFoundException("E-mail não encontrado");
        
        return new UsuarioResponseDto
        {
            Id = usuario.Id,
            Nome = usuario.Nome,
            Email = usuario.Email
        };

    }

    public async Task<UsuarioResponseDto?> BuscarUsuarioPorId(int id)
    {
        var usuario = await _usuarioRepo.BuscarUsuarioPorId(id);

        if(usuario == null) return null;
        
        return new UsuarioResponseDto
        {
            Id = usuario.Id,
            Nome = usuario.Nome,
            Email = usuario.Email
        };
    }

    public async Task<UsuarioResponseDto> CriarUsuario(UsuarioCreateDto usuario)
    {
        var usuarioEntity = new Usuario
        {
            Nome = usuario.Nome,
            Email = usuario.Email,
            DataNascimento = usuario.DataNascimento,
            SenhaHash = BCrypt.Net.BCrypt.HashPassword(usuario.Senha)
        };

        await _usuarioRepo.CriarUsuario(usuarioEntity);

        return new UsuarioResponseDto
        {
            Nome = usuarioEntity.Nome,
            Email = usuarioEntity.Email,
            Id = usuarioEntity.Id
        };
    }

    public async Task<UsuarioResponseDto?> LogarUsuario(UsuarioLoginDto login)
    {
        var usuarioLogin = await _usuarioRepo.BuscarUsuarioPorEmail(login.Email);

        if(usuarioLogin == null) throw new NotFoundException("E-mail não encontrado");

        bool senhaIgual = BCrypt.Net.BCrypt.Verify(login.Senha, usuarioLogin.SenhaHash);

        if (!senhaIgual) throw new UnauthorizedException("Senha incorreta");

        return new UsuarioResponseDto
        {
            Id = usuarioLogin.Id,
            Nome = usuarioLogin.Nome,
            Email = usuarioLogin.Email
        };

    }
}