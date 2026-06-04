import { useState, useEffect } from "react";
import { atualizarIdeia as atualizar, buscarIdeia as buscar } from "../services/ideiaService";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import './FormIdeia.css';

export default function EditarIdeia(){
    
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [categoria, setCategoria] = useState("");
    const [favoritada, setFavoritada] = useState(false);

    const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));

    useEffect(() => {
        const carregar = async () => {
            const ideia = await buscar(id);
            setTitulo(ideia.titulo);
            setDescricao(ideia.descricao);
            setCategoria(ideia.categoria);
            setFavoritada(ideia.estaFavoritada);
        }
        carregar();
    }, []);

    const editarIdeia = async () =>{
        if(titulo == "" || descricao == "" || categoria == "") {
            alert("Campos obrigatórios não preenchidos.")
            return;
        }

        try{
            const dados = { titulo, descricao, categoria, favoritada };
            await atualizar(id, dados);
            alert("Ideia editada com sucesso!");
            navigate("/home");
        } catch (error){
            alert(error.response?.data?.erro || "Erro ao criar ideia");
        }
        
    }

    return(
        <div className="form-container">
            <div className="form-box">
                <h2>Editar ideia</h2>
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
                    <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} />

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
                <div className="form-checkbox">

                    <input
                    type="checkbox"
                    id="favoritada-input"
                    checked={favoritada}
                    onChange={(e) => setFavoritada(e.target.checked)}
                    />
                    <label htmlFor="favoritada-input">Favoritar ideia</label>

                </div>
                <div className="form-actions">

                    <button className="btn-secondary" onClick={() => navigate("/home")}>Cancelar</button>
                    <button className="btn-primary" onClick={editarIdeia}>Salvar alterações</button>
                    
                </div>
            </div>
        </div>
    )
    
}