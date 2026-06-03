namespace backend.Repositories;
using backend.Models;

public interface IIdeaRepository
{
    public Task<Ideia> CriarIdeia(Ideia ideia);
    public Task<List<Ideia>> ListarIdeiasPorUsuarioId(int usuarioId);
    public Task<Ideia?> BuscarIdeiaPorId(int id);
    public Task<Ideia> AtualizarIdeia(Ideia ideia);
    public Task DeletarIdeia(Ideia ideia);
}
