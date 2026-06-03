namespace backend.Repositories;
using backend.Models;

public interface IUsuarioRepository
{
    public Task<Usuario?> BuscarUsuarioPorEmail(string email);
    public Task<Usuario> CriarUsuario(Usuario usuario);
    public Task<Usuario?> BuscarUsuarioPorId(int id);
}