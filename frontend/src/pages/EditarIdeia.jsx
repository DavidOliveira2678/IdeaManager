import { useState, useEffect } from "react";
import { atualizarIdeia as atualizar, buscarIdeia as buscar } from "../services/ideiaService";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

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
            alert("Ideia criada com sucesso!");
            navigate("/home");
        } catch (error){
            alert(error.response?.data?.erro || "Erro ao criar ideia");
        }
        
    }
    
    return(
        <>
            <p onClick={() => navigate("/home")}>Cancelar</p>
            <form action="" method="put">
                
                <label htmlFor="titulo-novaIdeia-input">Digite o novo título da sua ideia!</label>
                <input
                type="text"
                name="titulo-novaIdeia-input"
                id="titulo-novaIdeia-input"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                />

                <label htmlFor="descricao-novaIdeia-input">Digite a nova descrição da sua ideia</label>
                <textarea
                id="descricao-novaIdeia-input"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                />
                
                <label htmlFor="categoria-novaIdeia">Selecione a nova categoria da sua ideia</label>
                <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                id="categoria-novaIdeia">
                    <option value={0}>Jogos</option>
                    <option value={1}>Livros</option>
                    <option value={2}>Receitas</option>
                    <option value={3}>Dia a dia</option>
                    <option value={4}>Outro</option>
                </select>

                <label htmlFor="favoritada-input">Favoritar ideia?</label>
                <input
                    type="checkbox"
                    id="favoritada-input"
                    checked={favoritada}
                    onChange={(e) => setFavoritada(e.target.checked)}
                />
            </form>

            <p id="criar-ideia-btn" onClick={editarIdeia}>Finalizar edição!</p>
        </>
    )
    
}