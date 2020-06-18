import React, {useState, useEffect} from 'react';
import { displayAlert, typesAlert }  from "../../../components/alert/DisplayAlert";
import api, { eps } from "../../../services/mainApi";
import Content from '../../../components/content/Content';
import { useHistory, withRouter } from "react-router-dom";
import DisplayError from '../../../components/displayError/index';
import DisplayLoading from '../../../components/displayLoading/index';

export const VisualizarAutomovelView = () => {

    const [isLoading, setLoading] = useState(true);
    const [isSuccess, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [automoveis, setAutomoveis] = useState([]);
    const [isOpen, setOpen] = useState(true);
    const toggle = () => setOpen(!isOpen);

    useEffect((values) => {
        api.get(eps.listarAutomovel, values). then((res)=>{
            if(res.data){
                setAutomoveis(res.data);
                setLoading(false);
                setError(false);
                setSuccess(true);
            }else{
                setAutomoveis([])
                setLoading(false);
                setError(true);
                setSuccess(false);
            }
        }).catch((err) => {
            setLoading(false);
            setError(true);
            setSuccess(false);
        })
    }, []);

    const handleDelete = async (id) => {
        const res = await api.delete(`${eps.deleteAutomovel}${id}`);
        if(res.status === 204 || res.status === "204"){
            setAutomoveis(automoveis.filter(a => a.id !== id))
            displayAlert("Automóvel deletado com sucesso.", typesAlert.success);
        } else {
            displayAlert("Erro ao tentar deletar o automóvel.", typesAlert.error);
        }
    }

    return(
        <>
            <Content toggle={toggle} isOpen={isOpen}>
                
                <div className='mb-3'>
                    <h2>Automóveis cadastrados</h2>
                </div>
                <style>{'body { background-color: whitesmoke; }'}</style>
                <div className='card'>
                    <div className='card-body'>
                        <div className='col-xl-12'>
                            {isLoading && <DisplayLoading />}
                            {error && <DisplayError />}
                            {isSuccess && (<table className='table'>
                                <thead>
                                   <tr>
                                       <th scope='col'>Placa</th>
                                       <th scope='col'>Renavam</th>
                                       <th scope='col'>Chassi</th>
                                       <th scope='col'>Valor locação</th>
                                       <th scope='col'>Cor</th>
                                       <th scope='col'>Tipo Combustível</th>
                                       <th scope="col">Ações</th>
                                   </tr>
                                </thead>
                                <tbody>{
                                    automoveis.length > 0 ? automoveis.map((automovel) => (
                                        <tr>
                                            <td>{automovel.placa}</td>
                                            <td>{automovel.renavam}</td>
                                            <td>{automovel.chassi}</td>
                                            <td>R$: {automovel.valor_locacao}</td>
                                            <td>{automovel.cor}</td>
                                            <td>{automovel.tipo_combustivel}</td>
                                            <td >
                                                <button className='btn btn-danger' onClick={async () => await handleDelete(automovel.id)}>
                                                    Deletar
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

export default withRouter(VisualizarAutomovelView);