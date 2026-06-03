namespace backend.DTOs;
using backend.Models;

public class IdeaResponseDto
{
    public int Id { get; set; }
    public string Titulo { get; set; } = string.Empty;
    public string Descricao { get; set; } = string.Empty;
    public bool EstaFavoritada { get; set; }
    public Categoria Categoria { get; set; }
    public DateTime CriadaEm { get; set; }
}