import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cadastrar as cadastrarUsuario } from '../services/usuarioService';
import './Cadastro.css';

export default function Cadastro(){

    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [senha, setSenha] = useState("");
    const [senhaConfirmacao, setSenhaConfirmacao] = useState("");

    const cadastrar = async () => {
        if(senha !== senhaConfirmacao){
            alert("As senhas não coincidem!");
            return;
        }

        try{
            const dados = { nome, email, senha, dataNascimento };
            const usuario = await cadastrarUsuario(dados);
            alert("Cadastro realizado com sucesso!");
            navigate("/");
        } catch (error){
            alert(error.response?.data?.erro || "Erro ao cadastrar");
        }
    }

    return(
        <div className="cadastro-container">
            <div className="cadastro-box">
                
                <h2>Criar conta</h2>
                <div className="cadastro-field">

                    <label>Nome</label>
                    <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    />

                </div>
                <div className="cadastro-field">
                    <label>Email</label>
                    <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="cadastro-field">
                    <label>Data de nascimento</label>
                    <input
                    type="date"
                    value={dataNascimento}
                    onChange={(e) => setDataNascimento(e.target.value)}
                    />
                </div>
                <div className="cadastro-field">
                    <label>Senha</label>
                    <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    />
                </div>
                <div className="cadastro-field">
                    <label>Confirme a senha</label>
                    <input
                    type="password"
                    value={senhaConfirmacao}
                    onChange={(e) => setSenhaConfirmacao(e.target.value)}
                    />
                </div>
                <button className="cadastro-btn" onClick={cadastrar}>Criar conta</button>
                <p className="cadastro-footer">
                    Já possui conta? <a onClick={() => navigate("/")}>Faça login</a>
                </p>
            </div>
        </div>
    )

}