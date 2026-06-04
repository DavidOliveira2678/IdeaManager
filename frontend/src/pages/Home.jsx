import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listarIdeias, deletarIdeia } from '../services/ideiaService';
import './Home.css';

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
        <div className="home-container">
            <div className="home-header">
                <h1>Suas ideias</h1>
                <button onClick={() => navigate("/nova-ideia")}>+ Nova ideia</button>
            </div>

            {ideias.length === 0
                ? <p className="home-empty">Nenhuma ideia cadastrada ainda. Crie a sua primeira!</p>
                : ideias.map(ideia => (
                    <div key={ideia.id} className="ideia-card">

                        <h3>{ideia.titulo}</h3>
                        <p>{ideia.descricao}</p>
                        <div className="ideia-card-meta">

                            <span className="ideia-categoria">{categorias[ideia.categoria]}</span>
                            {ideia.estaFavoritada && <span className="ideia-favoritada">Favoritada</span>}

                        </div>
                        <div className="ideia-card-actions">
                            
                            <button className="btn-editar" onClick={() => navigate(`/editar-ideia/${ideia.id}`)}>Editar</button>
                            <button className="btn-deletar" onClick={() => deletar(ideia.id)}>Deletar</button>
                            
                        </div>

                    </div>
                ))
            }
        </div>
    )
}