import React, {useState, useEffect} from 'react';
import { displayAlert, typesAlert }  from "../../../components/alert/DisplayAlert";
import api, { eps } from "../../../services/mainApi";
import Content from '../../../components/content/Content';
import { useHistory, withRouter } from "react-router-dom";

export const VisualizarAutomovelView = () => {

    const [automoveis, setAutomoveis] = useState([]);
    const [isOpen, setOpen] = useState(true);
    const toggle = () => setOpen(!isOpen);

    useEffect((values) => {
        api.get(eps.listarAutomovel, values). then((res)=>{
            console.log(res.data);
            if(res.data){
                setAutomoveis(res.data);
            }else{
                setAutomoveis([])
            }
        })
    }, []);

    return(
        <>
            <Content toggle={toggle} isOpen={isOpen}>
                <div className='mb-3'>
                    <h2>Automóveis Cadastrados</h2>
                </div>
                <style>{'body { background-color: whitesmoke; }'}</style>
                <div className='card'>
                    <div className='card-body'>
                        <div className='col-xl-12'>
                            <table className='table'>
                                <thead>
                                   <tr>
                                       <th scope='col'>Placa</th>
                                       <th scope='col'>Renavam</th>
                                       <th scope='col'>Chassi</th>
                                       <th scope='col'>Valor Locação</th>
                                       <th scope='col'>Cor</th>
                                       <th scope='col'>Tipo Combustível</th>
                                       <th scope='col'></th>
                                       <th scope='col'></th>
                                   </tr>
                                </thead>
                                <tbody>{
                                    automoveis.length > 0 ? automoveis.map((automovel) => (
                                        <tr>
                                            <td>{automovel.placa}</td>
                                            <td>{automovel.renavam}</td>
                                            <td>{automovel.chassi}</td>
                                            <td>{automovel.valor_locacao}</td>
                                            <td>{automovel.cor}</td>
                                            <td>{automovel.tipo_combustivel}</td>
                                            <td><button className='btn btn-secondary'>Update</button></td>
                                            <td><button className='btn btn-danger'
                                                        onClick={async () => {
                                                            const res = await api.delete(`${eps.deleteAutomovel}${automovel.id}`)
                                                            console.log(res);
                                                            if(res.status === 204 || res.status === "204"){
                                                                setAutomoveis(automovel.filter(m => m.id !== automovel.id))
                                                            } else {
                                                                alert("Erro ao tentar deletar um automóvel.")
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

export default withRouter(VisualizarAutomovelView);