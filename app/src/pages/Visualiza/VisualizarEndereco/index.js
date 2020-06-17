import React, {useState, useEffect} from 'react';
import { displayAlert, typesAlert }  from "../../../components/alert/DisplayAlert";
import api, { eps } from "../../../services/mainApi";
import Content from '../../../components/content/Content';
import { useHistory, withRouter } from "react-router-dom";

export const VisualizarEnderecoView = () => {

    const [enderecos, setEnderecos] = useState([]);
    const [isOpen, setOpen] = useState(true);
    const toggle = () => setOpen(!isOpen);

    useEffect((values) => {
        api.get(eps.listarEndereco, values). then((res)=>{
            console.log(res.data);
            if(res.data){
                setEnderecos(res.data);
            }else{
                setEnderecos([])
            }
        })
    }, []);

    return(
        <>
            <Content toggle={toggle} isOpen={isOpen}>
                <div className='mb-3'>
                    <h2>Endereços Cadastrados</h2>
                </div>
                <style>{'body { background-color: whitesmoke; }'}</style>
                <div className='card'>
                    <div className='card-body'>
                        <div className='col-xl-12'>
                            <table className='table'>
                                <thead>
                                   <tr>
                                       <th scope='col'>País</th>
                                       <th scope='col'>Cidade</th>
                                       <th scope='col'>Bairro</th>
                                       <th scope='col'>Logradouro</th>
                                       <th scope='col'>Número</th>
                                       <th scope='col'>CEP</th>
                                       <th scope='col'/>
                                       <th scope='col'/>
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
                                            <td><button className='btn btn-secondary'>Update</button></td>
                                            <td><button className='btn btn-danger'
                                                        onClick={async () => {
                                                            const res = await api.delete(`${eps.deleteEndereco}${endereco.id}`)
                                                            console.log(res);
                                                            if(res.status === 204 || res.status === "204"){
                                                                setEnderecos(endereco.filter(m => m.id !== endereco.id))
                                                            } else {
                                                                alert("Erro ao tentar deletar um endereço.")
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

export default withRouter(VisualizarEnderecoView);