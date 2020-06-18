import React, {useState, useEffect} from 'react';
import { displayAlert, typesAlert }  from "../../../components/alert/DisplayAlert";
import api, { eps } from "../../../services/mainApi";
import Content from '../../../components/content/Content';
import { withRouter } from "react-router-dom";
import DisplayError from '../../../components/displayError/index';
import DisplayLoading from '../../../components/displayLoading/index';

export const VisualizarLocacaoView = () => {
    const [isLoading, setLoading] = useState(true);
    const [isSuccess, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [locacoes, setLocacoes] = useState([]);
    const [cliente, setCliente] = useState([]);
    const [automovel, setAutomovel] = useState([]);
    const [isOpen, setOpen] = useState(true);
    const toggle = () => setOpen(!isOpen);

    useEffect((values) => {
        api.get(eps.listarLocacao, values). then((res)=>{
            console.log(res.data);
            if(res.status === 200 || res.status === "200"){
                setLocacoes(res.data);
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

    useEffect((values) => {
        api.get(eps.listarCliente, values). then((res)=>{
            console.log(res.data);
            if(res.data){
                setCliente(res.data);
            }else{
                setCliente([])
            }
        })
    }, []);

    useEffect((values) => {
        api.get(eps.listarAutomovel, values).then((res)=>{
            console.log(res.data);
            if(res.status === 200 || res.status === "200"){
                setAutomovel(res.data);
            }else{
                alert('Nenhum automóvel encontrado')
            }
        })
    }, []);

    const handleDelete = async (id) => {
        const res = await api.delete(`${eps.deleteMarca}${id}`)
        console.log(res);
        if(res.status === 204 || res.status === "204"){
            setLocacoes(locacoes.filter(l => l.id !== id))
            displayAlert("Locação deletada com sucesso.", typesAlert.success);
        } else {
            displayAlert("Ocorreu um erro ao tentar deletar a locação.", typesAlert.error);
        }
    }

    return(
        <>
            <Content toggle={toggle} isOpen={isOpen}>
                <div className='mb-3'>
                    <h2>Locações</h2>
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
                                       <th scope='col'>Data locação</th>
                                       <th scope='col'>Valor locação</th>
                                       <th scope='col'>KM</th>
                                       <th scope='col'>Valor KM</th>
                                       <th scope='col'>Valor total</th>
                                       <th scope='col'>Bônus</th>
                                       <th scope='col'>Ações</th>
                                   </tr>
                                </thead>
                                <tbody class="text-center">
                                    {locacoes.length > 0 ? locacoes.map((locacao) => (
                                        <tr>
                                            <td>{locacao.dt_locacao}</td>
                                            <td>{locacao.valor_locacao}</td>
                                            <td>{locacao.km}</td>
                                            <td>{locacao.valor_km}</td>
                                            <td>{locacao.valor_km * locacao.km}</td>
                                            <td>{locacao.bonus}</td>
                                            <td>
                                                <button className='btn btn-danger' onClick={async () => await handleDelete(locacao.id)}>
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

export default withRouter(VisualizarLocacaoView);