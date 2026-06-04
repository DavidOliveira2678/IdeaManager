import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as logarUsuario } from '../services/usuarioService';

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
        <>
            <form action="" method="post">
                <label htmlFor="login-email-input">Seu email:</label>
                <input 
                type="email"
                name="login-email-input"
                id="login-email-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="login-senha-input">Sua senha:</label>
                <input
                type="password"
                name="login-senha-input"
                id="login-senha-input"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                />
            </form>

            <p onClick={logar} id="login-button">Realizar login!</p>
            <span>Não possui uma conta? <a onClick={() => navigate("/cadastro")}>Cadastre-se!</a></span>
        </>
    )
}