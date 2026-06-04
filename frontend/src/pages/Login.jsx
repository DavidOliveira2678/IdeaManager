import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as logarUsuario } from '../services/usuarioService';
import './Login.css';

export default function Login(){

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const logar = async () => {
        try{
            const dados = { email, senha };
            const usuarioLogado = await logarUsuario(dados);
            localStorage.setItem("usuario", JSON.stringify(usuarioLogado));
            alert("Login realizado com sucesso!");
            navigate("/home");
        } catch (error){
            alert(error.response?.data?.erro || "Erro ao fazer login");
        }
    }
    
    return(
        <div className="login-container">
            <div className="login-box">
                <h2>Entrar</h2>
                <div className="login-field">

                    <label htmlFor="login-email-input">Email</label>
                    <input
                    type="email"
                    id="login-email-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />

                </div>
                <div className="login-field">

                    <label htmlFor="login-senha-input">Senha</label>
                    <input
                    type="password"
                    id="login-senha-input"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    />
                    
                </div>
                <button className="login-btn" onClick={logar}>Entrar</button>
                <p className="login-footer">
                    Não possui conta? <a onClick={() => navigate("/cadastro")}>Cadastre-se</a>
                </p>
            </div>
        </div>
    )
}