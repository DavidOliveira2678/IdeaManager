namespace backend.Services;
using backend.DTOs;

public interface IIdeiaService
{
    public Task<IdeaResponseDto> CriarIdeia(IdeaCreateDto ideia, int usuarioId);
    public Task<List<IdeaResponseDto>> ListarIdeiasPorUsuarioId (int usuarioId);
    public Task<IdeaResponseDto?> BuscarIdeiaPorId (int id);
    public Task<IdeaResponseDto> AtualizarIdeia (int id, IdeaUpdateDto ideia);
    public Task DeletarIdeiaPorId (int id);
}