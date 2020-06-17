import axios from 'axios';

const END_POINT = "http://localhost:8000";

//endpoints
export const eps = {
    cadastrarAutomovel: '/api/automovel/create/',
    listarAutomovel: '/api/automovel/list/',
    editarAutomovel: '/api/automovel/update/',
    deleteAutomovel: '/api/automovel/delete/',

    cadastrarCliente: '/api/cliente/create/',
    listarCliente: '/api/cliente/list/',
    editarCliente: '/api/cliente/update/',
    deleteCliente: '/api/cliente/delete/',

    cadastrarMarca: '/api/marca/create/',
    listarMarca: '/api/marca/list/',
    editarMarca: '/api/marca/update/',
    deleteMarca: '/api/marca/delete/',

    cadastrarModelo: '/api/modelo/create/',
    listarModelo: '/api/modelo/list/',
    editarModelo: '/api/modelo/update/',
    deleteModelo: '/api/modelo/delete/',

    cadastrarEndereco: '/api/endereco/create/',
    listarEndereco: '/api/endereco/list/',
    editarEndereco: '/api/endereco/update/',
    deleteEndereco: '/api/endereco/delete/',

    cadastrarLocacao: '/api/locacao/create/',
    listarLocacao: '/api/locacao/list/',
    editarLocacao: '/api/locacao/update/',
    deleteLocacao: '/api/locacao/delete/',
}

const mainApi = axios.create({
    baseURL: END_POINT
});

export default mainApi;