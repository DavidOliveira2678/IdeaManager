namespace backend.Models;

public class Usuario
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string SenhaHash { get; set; } = string.Empty;
    public DateTime DataNascimento { get; set; }
    public List<Ideia> Ideias { get; set; } = new List<Ideia>();

}