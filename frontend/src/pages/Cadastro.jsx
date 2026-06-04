import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cadastrar as cadastrarUsuario } from '../services/usuarioService';

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
        <>
            <form action="" method="post">
                <label htmlFor="nome-cadastro-input">Nome de usuário:</label>
                <input
                type="text"
                name="nome-cadastro-input"
                id="nome-cadastro-input"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                />

                <label htmlFor="email-cadastro-input">Seu e-mail:</label>
                <input
                type="email"
                name="email-cadastro-input"
                id="email-cadastro-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="nascimento-cadastro-input">Sua data de nascimento:</label>
                <input
                type="date"
                name="nascimento-cadastro-input"
                id="nascimento-cadastro-input"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
                />

                <label htmlFor="senha-cadastro-input">Sua senha:</label>
                <input
                type="password"
                name="senha-cadastro-input"
                id="senha-cadastro-input"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                />

                <label htmlFor="senha-cadastro-input">Confirme sua senha:</label>
                <input
                type="password"
                name="confirmaSenha-cadastro-input"
                id="confirmaSenha-cadastro-input"
                value={senhaConfirmacao}
                onChange={(e) => setSenhaConfirmacao(e.target.value)}
                />
            </form>

            <p onClick={cadastrar} id="cadastro-button">Realizar cadastro!</p>
            <span>Já possui uma conta? <a onClick={() => navigate("/")}>Faça login!</a></span>
        </>
    )

}