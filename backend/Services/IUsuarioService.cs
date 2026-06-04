namespace backend.Services;
using backend.DTOs;

public interface IUsuarioService
{
    public Task<UsuarioResponseDto?> BuscarUsuarioPorEmail (string email);
    public Task<UsuarioResponseDto> CriarUsuario (UsuarioCreateDto usuario);
    public Task<UsuarioResponseDto?> BuscarUsuarioPorId (int id);
    public Task<UsuarioResponseDto?> LogarUsuario (UsuarioLoginDto login);
}
