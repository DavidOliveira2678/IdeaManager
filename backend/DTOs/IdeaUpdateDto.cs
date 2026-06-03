namespace backend.DTOs;
using backend.Models;

public class IdeaUpdateDto
{
    public string Titulo { get; set; } = string.Empty;
    public string Descricao { get; set; } = string.Empty;
    public Categoria Categoria { get; set; }
    public bool Favoritada { get; set; }
}