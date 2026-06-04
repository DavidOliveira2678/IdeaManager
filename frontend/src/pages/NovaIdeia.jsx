import { useState } from "react";
import { criarIdeia as criar } from "../services/ideiaService";
import { useNavigate } from "react-router-dom";

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
        <>
            <p onClick={() => navigate("/home")}>Voltar</p>
            <form action="" method="post">
                
                <label htmlFor="titulo-novaIdeia-input">Digite o título da sua nova ideia!</label>
                <input
                type="text"
                name="titulo-novaIdeia-input"
                id="titulo-novaIdeia-input"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                />

                <label htmlFor="descricao-novaIdeia-input">Digite a descrição da sua ideia</label>
                <textarea
                id="descricao-novaIdeia-input"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                />
                
                <label htmlFor="categoria-novaIdeia">Selecione a categoria da sua ideia</label>
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
            </form>

            <p id="criar-ideia-btn" onClick={criarIdeia}>Criar ideia!</p>
        </>
    )
    
}