import React, {useState, useEffect} from 'react';
import { displayAlert, typesAlert }  from "../../../components/alert/DisplayAlert";
import api, { eps } from "../../../services/mainApi";
import Content from '../../../components/content/Content';
import { useHistory, withRouter } from "react-router-dom";

export const VisualizarClienteView = () => {

    const [clientes, setClientes] = useState([]);
    const [isOpen, setOpen] = useState(true);
    const toggle = () => setOpen(!isOpen);

    useEffect((values) => {
        api.get(eps.listarCliente, values). then((res)=>{
            console.log(res.data);
            if(res.data){
                setClientes(res.data);
            }else{
                setClientes([])
            }
        })
    }, []);

    return(
        <>
            <Content toggle={toggle} isOpen={isOpen}>
                <div className='mb-3'>
                    <h2>Clientes Cadastrados</h2>
                </div>
                <style>{'body { background-color: whitesmoke; }'}</style>
                <div className='card'>
                    <div className='card-body'>
                        <div className='col-xl-12'>
                            <table className='table'>
                                <thead>
                                   <tr>
                                       <th scope='col'>Nome</th>
                                       <th scope='col'>Sobrenome</th>
                                       <th scope='col'>CPF</th>
                                       <th scope='col'>CNH</th>
                                       <th scope='col'>Telefone</th>
                                       <th scope='col'/>
                                       <th scope='col'/>
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
                                            <td><button className='btn btn-secondary'>Update</button></td>
                                            <td><button className='btn btn-danger'
                                                        onClick={async () => {
                                                            const res = await api.delete(`${eps.deleteCliente}${cliente.id}`)
                                                            console.log(res);
                                                            if(res.status === 204 || res.status === "204"){
                                                                setClientes(cliente.filter(m => m.id !== setClientes.id))
                                                            } else {
                                                                alert("Erro ao tentar deletar um cliente.")
                                                            }
                                                        }}
                                            >Delete</button></td>
                                        </tr>
                                    )) : null
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Content>
        </>
    )
}

export default withRouter(VisualizarClienteView);