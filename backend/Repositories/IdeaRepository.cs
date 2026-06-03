using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories;

public class IdeaRepository : IIdeaRepository
{
    private readonly AppDbContext _context;

    public IdeaRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Ideia> AtualizarIdeia(Ideia ideia)
    {
        _context.Ideias.Update(ideia);
        await _context.SaveChangesAsync();
        return ideia;
    }

    public async Task<Ideia?> BuscarIdeiaPorId(int id)
    {
        return await _context.Ideias.FirstOrDefaultAsync(i => i.Id == id);
    }

    public async Task<Ideia> CriarIdeia(Ideia ideia)
    {
        _context.Ideias.Add(ideia);
        await _context.SaveChangesAsync();
        return ideia;
    }

    public async Task DeletarIdeia(Ideia ideia)
    {
        _context.Ideias.Remove(ideia);
        await _context.SaveChangesAsync();
    }

    public async Task<List<Ideia>> ListarIdeiasPorUsuarioId(int usuarioId)
    {
        return await _context.Ideias.Where(i => i.UsuarioId == usuarioId).ToListAsync();
    }
}