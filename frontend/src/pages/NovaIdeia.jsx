import { useState } from "react";
import { criarIdeia as criar } from "../services/ideiaService";
import { useNavigate } from "react-router-dom";
import './FormIdeia.css';

export default function NovaIdeia(){

    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [categoria, setCategoria] = useState(0);
    const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));
    const navigate = useNavigate();

    const criarIdeia = async () =>{
        if(titulo == "" || descricao == "") {
            alert("Campos obrigatórios não preenchidos.")
            return;
        }

        try{
            const dados = { titulo, descricao, categoria: parseInt(categoria) };
            await criar(usuarioLogado.id, dados);
            alert("Ideia criada com sucesso!");
            navigate("/home");
        } catch (error){
            alert(error.response?.data?.erro || "Erro ao criar ideia");
        }
        
    }

    return(
        <div className="form-container">
            <div className="form-box">

                <h2>Nova ideia</h2>

                <div className="form-field">

                    <label>Título</label>
                    <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    />

                </div>
                <div className="form-field">

                    <label>Descrição</label>
                    <textarea
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    />

                </div>
                <div className="form-field">

                    <label>Categoria</label>
                    <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                        <option value={0}>Jogos</option>
                        <option value={1}>Livros</option>
                        <option value={2}>Receitas</option>
                        <option value={3}>Dia a dia</option>
                        <option value={4}>Outro</option>
                    </select>
                    
                </div>
                <div className="form-actions">
                    <button className="btn-secondary" onClick={() => navigate("/home")}>Cancelar</button>
                    <button className="btn-primary" onClick={criarIdeia}>Criar ideia</button>
                </div>
            </div>
        </div>
    )
    
}