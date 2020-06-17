import React, {useState, useEffect} from 'react';
import { displayAlert, typesAlert }  from "../../../components/alert/DisplayAlert";
import api, { eps } from "../../../services/mainApi";
import Content from '../../../components/content/Content';
import { useHistory, withRouter } from "react-router-dom";

export const VisualizarLocacaoView = () => {

    const [locacoes, setLocacoes] = useState([]);
    const [cliente, setCliente] = useState([]);
    const [automovel, setAutomovel] = useState([]);
    const [isOpen, setOpen] = useState(true);
    const toggle = () => setOpen(!isOpen);

    useEffect((values) => {
        api.get(eps.listarLocacao, values). then((res)=>{
            console.log(res.data);
            if(res.data){
                setLocacoes(res.data);
            }else{
                setLocacoes([])
            }
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
            if(res.data){
                setAutomovel(res.data);
            }else{
                setAutomovel([])
            }
        })
    }, []);

    function clienteId(id) {
        cliente.map((cliente)=>(
            cliente.id === id
        ))
    }

    function automovelId(id) {
        automovel.map((automovel)=>(
            automovel.id === id
        ))
    }

    return(
        <>
            <Content toggle={toggle} isOpen={isOpen}>
                <div className='mb-3'>
                    <h2>Locações Cadastrados</h2>
                </div>
                <style>{'body { background-color: whitesmoke; }'}</style>
                <div className='card'>
                    <div className='card-body'>
                        <div className='col-xl-12'>
                            <table className='table'>
                                <thead>
                                   <tr>

                                       <th scope='col'>Data Locação</th>
                                       <th scope='col'>Valor Locação</th>
                                       <th scope='col'>KM</th>
                                       <th scope='col'>Valor KM</th>
                                       <th scope='col'>ValorTotal</th>
                                       <th scope='col'>Bônus</th>
                                       <th scope='col'/>
                                       <th scope='col'/>
                                   </tr>
                                </thead>
                                <tbody>{
                                    locacoes.length > 0 ? locacoes.map((locacoes) => (
                                        <tr>
                                            <td>{locacoes.dt_locacao}</td>
                                            <td>{locacoes.valor_locacao}</td>
                                            <td>{locacoes.km}</td>
                                            <td>{locacoes.valor_km}</td>
                                            <td>{locacoes.valor_total}</td>
                                            <td>{locacoes.bonus}</td>
                                            <td><button className='btn btn-secondary'>Update</button></td>
                                            <td><button className='btn btn-danger'>Delete</button></td>
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

export default withRouter(VisualizarLocacaoView);