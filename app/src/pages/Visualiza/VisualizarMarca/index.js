import React, {useState, useEffect} from 'react';
import { displayAlert, typesAlert }  from "../../../components/alert/DisplayAlert";
import api, { eps } from "../../../services/mainApi";
import Content from '../../../components/content/Content';
import { useHistory, withRouter } from "react-router-dom";

export const VisualizarMarcaView = () => {

    const [marcas, setMarcas] = useState([]);
    const [isOpen, setOpen] = useState(true);
    const toggle = () => setOpen(!isOpen);

    useEffect((values) => {
        api.get(eps.listarMarca, values). then((res)=>{
            console.log(res.data);
            if(res.data){
                setMarcas(res.data);
            }else{
                setMarcas([])
            }
        })
    }, []);

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
                            <table className='table'>
                                <thead>
                                   <tr>
                                       <th scope='col'>Descrição</th>
                                       <th scope='col'/>
                                       <th scope='col'/>
                                   </tr>
                                </thead>
                                <tbody>{
                                    marcas.length > 0 ? marcas.map((marca) => (
                                        <tr>
                                            <td>{marca.descricao}</td>
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

export default withRouter(VisualizarMarcaView);