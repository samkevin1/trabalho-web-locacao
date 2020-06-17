import React, {useState, useEffect} from 'react';
import { displayAlert, typesAlert }  from "../../../components/alert/DisplayAlert";
import api, { eps } from "../../../services/mainApi";
import Content from '../../../components/content/Content';
import { useHistory, withRouter } from "react-router-dom";

export const VisualizarModeloView = () => {

    const [modelos, setModelos] = useState([]);
    const [isOpen, setOpen] = useState(true);
    const toggle = () => setOpen(!isOpen);

    useEffect((values) => {
        api.get(eps.listarModelo, values). then((res)=>{
            console.log(res.data);
            if(res.data){
                setModelos(res.data);
            }else{
                setModelos([])
            }
        })
    }, []);

    return(
        <>
            <Content toggle={toggle} isOpen={isOpen}>
                <div className='mb-3'>
                    <h2>Modelos Cadastrados</h2>
                </div>
                <style>{'body { background-color: whitesmoke; }'}</style>
                <div className='card'>
                    <div className='card-body'>
                        <div className='col-xl-12'>
                            <table className='table'>
                                <thead>
                                   <tr>
                                       <th scope='col'>Descrição</th>
                                       <th scope='col'/>
                                       <th scope='col'/>
                                   </tr>
                                </thead>
                                <tbody>{
                                    modelos.length > 0 ? modelos.map((modelo) => (
                                        <tr>
                                            <td>{modelo.descricao}</td>
                                            <td><button className='btn btn-secondary'>Update</button></td>
                                            <td><button className='btn btn-danger'
                                                        onClick={async () => {
                                                            const res = await api.delete(`${eps.deleteModelo}${modelo.id}`)
                                                            console.log(res);
                                                            if(res.status === 204 || res.status === "204"){
                                                                setModelos(modelo.filter(m => m.id !== modelo.id))
                                                            } else {
                                                                alert("Erro ao tentar deletar um modelo.")
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

export default withRouter(VisualizarModeloView);