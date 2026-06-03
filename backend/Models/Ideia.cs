namespace backend.Models;

public class Ideia
{
    public int Id { get; set; }
    public string Titulo { get; set; } = string.Empty;
    public string Descricao { get; set; } = string.Empty;
    public Categoria Categoria { get; set; }
    public bool Favoritada { get; set; } = false;
    public DateTime CriadaEm { get; set; } = DateTime.UtcNow;
    public int UsuarioId { get; set; }
    public Usuario Usuario { get; set; } = null!;
    
}