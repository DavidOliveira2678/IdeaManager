import { useNavigate } from "react-router-dom";
import './Header.css';

export default function Header(){
    const navigate = useNavigate();
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    const sair = () => {
        localStorage.removeItem("usuario");
        navigate("/");
    }

    return(
        <header className="header">
            <h1 className="header-logo" onClick={() => navigate("/home")}>IdeaManager</h1>
            {usuario && (
                <div className="header-right">
                    <span>Olá, {usuario.nome}</span>
                    <button onClick={sair}>Sair</button>
                </div>
            )}
        </header>
    )
}