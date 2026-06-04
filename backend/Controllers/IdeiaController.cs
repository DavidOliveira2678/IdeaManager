using backend.Services;
using backend.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class IdeiaController : ControllerBase
{
    private readonly IIdeiaService _ideiaService;

    public IdeiaController(IIdeiaService service)
    {
        _ideiaService = service;
    }

    [HttpPost("usuario/{usuarioId}")]
    public async Task<ActionResult<IdeaResponseDto>> CriarIdeia([FromBody] IdeaCreateDto ideia, int usuarioId)
    {
        var ideiaCriada = await _ideiaService.CriarIdeia(ideia, usuarioId);
        return Created("", ideiaCriada);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<IdeaResponseDto>> BuscarIdeiaPorId(int id)
    {
        var ideiaBuscada = await _ideiaService.BuscarIdeiaPorId(id);
        return Ok(ideiaBuscada);
    }

    [HttpGet("usuario/{usuarioId}")]
    public async Task<ActionResult<List<IdeaResponseDto>>> ListarIdeiasPorUsuarioId(int usuarioId)
    {
        var ideiasList = await _ideiaService.ListarIdeiasPorUsuarioId(usuarioId);
        return Ok(ideiasList);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<IdeaResponseDto>> AtualizarIdeia(int id, [FromBody] IdeaUpdateDto ideia)
    {
        var ideiaAtualizada = await _ideiaService.AtualizarIdeia(id, ideia);
        return Ok(ideiaAtualizada);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeletarIdeiaPorId(int id)
    {
        await _ideiaService.DeletarIdeiaPorId(id);
        return NoContent();
    } 

}