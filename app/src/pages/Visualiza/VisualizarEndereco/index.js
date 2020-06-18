import React, {useState, useEffect} from 'react';
import { displayAlert, typesAlert }  from "../../../components/alert/DisplayAlert";
import api, { eps } from "../../../services/mainApi";
import Content from '../../../components/content/Content';
import { withRouter } from "react-router-dom";
import DisplayError from '../../../components/displayError/index';
import DisplayLoading from '../../../components/displayLoading/index';

export const VisualizarEnderecoView = () => {
    const [isLoading, setLoading] = useState(true);
    const [isSuccess, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [enderecos, setEnderecos] = useState([]);
    const [isOpen, setOpen] = useState(true);
    const toggle = () => setOpen(!isOpen);

    useEffect((values) => {
        api.get(eps.listarEndereco, values). then((res)=>{
            console.log(res.data);
            if(res.data){
                setEnderecos(res.data);
                setLoading(false);
                setError(false);
                setSuccess(true);
            }else{
                setEnderecos([])
                setLoading(false);
                setError(true);
                setSuccess(false);
            }
        }).catch((err) => {
            setLoading(false);
            setError(true);
            setSuccess(false)
        })
    }, []);

    const handleDelete = async(id) => {
        const res = await api.delete(`${eps.deleteEndereco}${id}`)
        console.log(res);
        if(res.status === 204 || res.status === "204"){
            setEnderecos(enderecos.filter(m => m.id !== id))
            displayAlert("Endereço deletado com sucesso.", typesAlert.success);
        } else {
            displayAlert("Erro ao tentar deletar o endereço.", typesAlert.error);
        }
    }

    return(
        <>
            <Content toggle={toggle} isOpen={isOpen}>
                <div className='mb-3'>
                    <h2>Endereços cadastrados</h2>
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
                                       <th scope='col'>País</th>
                                       <th scope='col'>Cidade</th>
                                       <th scope='col'>Bairro</th>
                                       <th scope='col'>Logradouro</th>
                                       <th scope='col'>Número</th>
                                       <th scope='col'>CEP</th>
                                       <th scope='col'>Ações</th>
                                   </tr>
                                </thead>
                                <tbody>{
                                    enderecos.length > 0 ? enderecos.map((endereco) => (
                                        <tr>
                                            <td>{endereco.pais}</td>
                                            <td>{endereco.cidade}</td>
                                            <td>{endereco.bairro}</td>
                                            <td>{endereco.logradouro}</td>
                                            <td>{endereco.numero}</td>
                                            <td>{endereco.cep}</td>
                                            <td>
                                                <button className='btn btn-danger' onClick={async () => await handleDelete(endereco.id)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )) : <p className="text-center">Não há nenhum registro para ser exibido.</p>
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

export default withRouter(VisualizarEnderecoView);