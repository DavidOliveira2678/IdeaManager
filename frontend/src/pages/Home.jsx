import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listarIdeias, deletarIdeia } from '../services/ideiaService';

export default function Home(){
    const navigate = useNavigate();
    const [ideias, setIdeias] = useState([]);
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const categorias = ["Jogos", "Livros", "Receitas", "Dia a dia", "Outro"];

    const deletar = async (id) => {
        await deletarIdeia(id);
        setIdeias(ideias.filter(i => i.id !== id));
    }
    
    useEffect(() => {

        if(!usuario) {
            navigate("/");
            return;
        }
        
        const carregarIdeias = async () => {
            const dados = await listarIdeias(usuario.id);
            setIdeias(dados);
        }
        
        carregarIdeias();
    }, []);

    return(
    <>
        <h1>Suas ideias, {usuario?.nome}</h1>
        
        <button onClick={() => navigate("/nova-ideia")}>+ Nova ideia</button>

        {ideias.length === 0 
            ? <p>Nenhuma ideia cadastrada ainda.</p>
            : ideias.map(ideia => (
                <div key={ideia.id}>
                    <h3>{ideia.titulo}</h3>
                    <p>{ideia.descricao}</p>
                    <span>Categoria: {categorias[ideia.categoria]}</span>
                    <span>{ideia.estaFavoritada ? "Favoritada" : ""}</span>
                    <button onClick={() => navigate(`/editar-ideia/${ideia.id}`)}>Editar</button>
                    <button onClick={() => deletar(ideia.id)}>Deletar</button>
                </div>
            ))
        }
    </>
)
}