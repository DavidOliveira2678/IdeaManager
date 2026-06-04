using backend.DTOs;
using backend.Repositories;
using backend.Models;
using backend.Exceptions;
namespace backend.Services;

public class IdeiaService : IIdeiaService
{
    private readonly IIdeaRepository _ideiaRepo;

    public IdeiaService(IIdeaRepository ideiaRepo)
    {
        _ideiaRepo = ideiaRepo;
    }
    public async Task<IdeaResponseDto> AtualizarIdeia(int id, IdeaUpdateDto ideia)
    {
        var ideiaId = await _ideiaRepo.BuscarIdeiaPorId(id);

        if (ideiaId == null) throw new NotFoundException("Ideia não encontrada");

        ideiaId.Titulo = ideia.Titulo;
        ideiaId.Descricao = ideia.Descricao;
        ideiaId.Categoria = ideia.Categoria;
        ideiaId.Favoritada = ideia.Favoritada;

        var ideiaAtualizada = await _ideiaRepo.AtualizarIdeia(ideiaId);

        return new IdeaResponseDto
        {
            Id = ideiaAtualizada.Id,
            Titulo = ideiaAtualizada.Titulo,
            Descricao = ideiaAtualizada.Descricao,
            Categoria = ideiaAtualizada.Categoria,
            CriadaEm = ideiaAtualizada.CriadaEm,
            EstaFavoritada = ideiaAtualizada.Favoritada
        };
    }

    public async Task<IdeaResponseDto?> BuscarIdeiaPorId(int id)
    {
        var ideiaBuscada = await _ideiaRepo.BuscarIdeiaPorId(id);

        if(ideiaBuscada == null) throw new NotFoundException("Ideia não encontrada");

        return new IdeaResponseDto
        {
            Id = ideiaBuscada.Id,
            Titulo = ideiaBuscada.Titulo,
            Descricao = ideiaBuscada.Descricao,
            Categoria = ideiaBuscada.Categoria,
            CriadaEm = ideiaBuscada.CriadaEm,
            EstaFavoritada = ideiaBuscada.Favoritada
        };
    }

    public async Task<IdeaResponseDto> CriarIdeia(IdeaCreateDto ideia, int usuarioId)
    {
        var ideiaCriada = new Ideia
        {
            Titulo = ideia.Titulo,
            Descricao = ideia.Descricao,
            Categoria = ideia.Categoria,
            UsuarioId = usuarioId
        };

        await _ideiaRepo.CriarIdeia(ideiaCriada);

        return new IdeaResponseDto
        {
            Id = ideiaCriada.Id,
            Titulo = ideiaCriada.Titulo,
            Descricao = ideiaCriada.Descricao,
            Categoria = ideiaCriada.Categoria,
            CriadaEm = ideiaCriada.CriadaEm,
            EstaFavoritada = ideiaCriada.Favoritada
        };
    }

    public async Task DeletarIdeiaPorId(int id)
    {
        var ideiaBuscada = await _ideiaRepo.BuscarIdeiaPorId(id);
        
        if(ideiaBuscada == null) throw new NotFoundException("Ideia não encontrada");
        
        await _ideiaRepo.DeletarIdeia(ideiaBuscada);
    }

    public async Task<List<IdeaResponseDto>> ListarIdeiasPorUsuarioId(int usuarioId)
    {
        var ideiasList = await _ideiaRepo.ListarIdeiasPorUsuarioId(usuarioId);

        return ideiasList.Select(i => new IdeaResponseDto
        {
            Id = i.Id,
            Titulo = i.Titulo,
            Descricao = i.Descricao,
            Categoria = i.Categoria,
            CriadaEm = i.CriadaEm,
            EstaFavoritada = i.Favoritada
        }).ToList();

    }
}