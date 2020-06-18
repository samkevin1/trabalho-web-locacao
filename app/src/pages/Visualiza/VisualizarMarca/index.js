import React, {useState, useEffect} from 'react';
import { displayAlert, typesAlert }  from "../../../components/alert/DisplayAlert";
import api, { eps } from "../../../services/mainApi";
import Content from '../../../components/content/Content';
import { useHistory, withRouter } from "react-router-dom";
import DisplayError from '../../../components/displayError/index';
import DisplayLoading from '../../../components/displayLoading/index';

export const VisualizarMarcaView = () => {
    const history = useHistory();
    const [isLoading, setLoading] = useState(true);
    const [isSuccess, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [marcas, setMarcas] = useState([]);
    const [isOpen, setOpen] = useState(true);
    const toggle = () => setOpen(!isOpen);

    useEffect((values) => {
        api.get(eps.listarMarca, values).then((res)=>{
            console.log(res.data);
            if(res.status === 200 || res.status === "204"){
                setMarcas(res.data);
                setLoading(false);
                setError(false);
                setSuccess(true);
            }else{
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

    const handleDelete = async (id) => {
        const res = await api.delete(`${eps.deleteMarca}${id}`);
        console.log(res);
        if(res.status === 204 || res.status === "204"){
            setMarcas(marcas.filter(m => m.id !== id));
            displayAlert("Marca deletada com sucesso.", typesAlert.success);
        } else {
            displayAlert("Ocorreu um erro ao tentar deletar a marca.", typesAlert.error);
        }
    }

    return(
        <>
            <Content toggle={toggle} isOpen={isOpen}>
                <div className='mb-3'>
                    <h2>Marcas Cadastradas</h2>
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
                                       <th scope='col'>Descrição</th>
                                       <th scope='col'>Ações</th>
                                   </tr>
                                </thead>
                                <tbody>{
                                    marcas.length > 0 ? marcas.map((marca) => (
                                        <tr>
                                            <td>{marca.descricao}</td>
                                            <td>
                                                <button className='btn btn-danger' onClick={async () => await handleDelete(marca.id)}>
                                                    Deletar
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

export default withRouter(VisualizarMarcaView);