import api from './api';

export const cadastrar = async (dados) => {
    const response = await api.post('/usuario/cadastrar', dados);
    return response.data;
}

export const login = async (dados) => {
    const response = await api.post('/usuario/login', dados);
    return response.data;
}