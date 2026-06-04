import api from './api';

export const listarIdeias = async (usuarioId) => {
    const response = await api.get(`/ideia/usuario/${usuarioId}`);
    return response.data;
}

export const criarIdeia = async (usuarioId, dados) => {
    const response = await api.post(`/ideia/usuario/${usuarioId}`, dados);
    return response.data;
}

export const atualizarIdeia = async (id, dados) => {
    const response = await api.put(`/ideia/${id}`, dados);
    return response.data;
}

export const deletarIdeia = async (id) => {
    await api.delete(`/ideia/${id}`);
}

export const buscarIdeia = async (id) => {
    const response = await api.get(`/ideia/${id}`);
    return response.data;
}