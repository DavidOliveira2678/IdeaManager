using backend.Services;
using backend.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsuarioController : ControllerBase
{
    private readonly IUsuarioService _usuarioService;

    public UsuarioController(IUsuarioService service)
    {
        _usuarioService = service;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<UsuarioResponseDto>> BuscarUsuarioPorId (int id)
    {
        var usuario = await _usuarioService.BuscarUsuarioPorId(id);
        return Ok(usuario);
    }

    [HttpPost("cadastrar")]
    public async Task<ActionResult<UsuarioResponseDto>> Cadastrar ([FromBody] UsuarioCreateDto dto)
    {
        var usuario = await _usuarioService.CriarUsuario(dto);
        return Created("", usuario);
    } 

    [HttpPost("login")]
    public async Task<ActionResult<UsuarioResponseDto>> LogarUsuario([FromBody] UsuarioLoginDto dto)
    {
        var usuarioLogado = await _usuarioService.LogarUsuario(dto);
        return Ok(usuarioLogado);
    }

}