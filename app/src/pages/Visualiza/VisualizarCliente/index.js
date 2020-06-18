import React, {useState, useEffect} from 'react';
import { displayAlert, typesAlert }  from "../../../components/alert/DisplayAlert";
import api, { eps } from "../../../services/mainApi";
import Content from '../../../components/content/Content';
import { withRouter } from "react-router-dom";
import DisplayError from '../../../components/displayError/index';
import DisplayLoading from '../../../components/displayLoading/index';

export const VisualizarClienteView = () => {
    const [isLoading, setLoading] = useState(true);
    const [isSuccess, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [clientes, setClientes] = useState([]);
    const [isOpen, setOpen] = useState(true);
    const toggle = () => setOpen(!isOpen);

    useEffect((values) => {
        api.get(eps.listarCliente, values).then((res)=>{
            if(res.data){
                setClientes(res.data);
                setLoading(false);
                setError(false);
                setSuccess(true);
            }else{
                setClientes([]);
                setLoading(false);
                setError(true);
                setSuccess(false);
            }
        }).catch((err) => {
            setLoading(false);
            setError(true);
            setSuccess(false)
        });
    }, []);

    const handleDelete = async (id) => {
        const res = await api.delete(`${eps.deleteCliente}${id}`)
        if(res.status === 204 || res.status === "204"){
            setClientes(clientes.filter(c => c.id !== id))
            displayAlert("Cliente deletado com sucesso.", typesAlert.success);
        } else {
            displayAlert("Erro ao tentar deletar o cliente.", typesAlert.error);
        }
    }  

    return(
        <>
            <Content toggle={toggle} isOpen={isOpen}>
                <div className='mb-3'>
                    <h2>Clientes cadastrados</h2>
                </div>
                <style>{'body { background-color: whitesmoke; }'}</style>
                <div className='card'>
                    <div className='card-body'>
                        <div className='col-xl-12'>
                            {isLoading && <DisplayLoading />}
                            {error && <DisplayError />}
                            {isSuccess && (
                            <table className='table'>
                                <thead>
                                   <tr>
                                       <th scope='col'>Nome</th>
                                       <th scope='col'>Sobrenome</th>
                                       <th scope='col'>CPF</th>
                                       <th scope='col'>CNH</th>
                                       <th scope='col'>Telefone</th>
                                       <th scope='col'>Ações</th>
                                   </tr>
                                </thead>
                                <tbody>{
                                    clientes.length > 0 ? clientes.map((cliente) => (
                                        <tr>
                                            <td>{cliente.nome}</td>
                                            <td>{cliente.sobrenome}</td>
                                            <td>{cliente.cpf}</td>
                                            <td>{cliente.cnh}</td>
                                            <td>{cliente.telefone}</td>
                                            <td>
                                                <button className='btn btn-danger' onClick={async () => await handleDelete(cliente.id)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )) : <h4 className="text-center">Não há nenhum registro para ser exibido.</h4>
                                }
                                </tbody>
                            </table>)}
                        </div>
                    </div>
                </div>
            </Content>
        </>
    )
}

export default withRouter(VisualizarClienteView);