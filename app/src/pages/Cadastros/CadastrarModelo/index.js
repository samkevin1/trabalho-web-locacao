import React, {useEffect, useState} from 'react'
import { displayAlert, typesAlert }  from "../../../components/alert/DisplayAlert";
import api, { eps } from "../../../services/mainApi";
import Content from '../../../components/content/Content';
import { useHistory, withRouter } from "react-router-dom";
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup'
import {
    Button,
    Form, FormGroup,
    Label, Input
} from 'reactstrap';

export const CadastrarModeloView = () => {

    const history = useHistory();
    const [marcas, setMarcas] = useState([]);
    const [isOpen, setOpen] = useState(true);
    const toggle = () => setOpen(!isOpen);

    useEffect((values)=>{
        api.get(eps.listarMarca, values).then((res)=>{
            console.log(res.data);
            if(res.data){
                setMarcas(res.data);
            }else{
                setMarcas([]);
            }
        })
    },[]);

    return (
        <Formik
            initialValues = {{
                descricao:'',
                marca: 0
            }}

            onSubmit={(values) => {
                console.log(values)
                api.post(eps.cadastrarModelo, values).then((res) => {
                    console.log(res.data)
                    if (res.data.success) {
                        displayAlert(res.data.message, typesAlert.success);
                        history.push('/visualizar/modelos');
                    } else {
                        displayAlert(res.data.message, typesAlert.error);
                    }
                }).catch((err) => {
                    displayAlert("Ocorreu um erro de conexão. Tente novamente mais tarde.", typesAlert.error);
                });
            }}

            handleSubmit = {({ setSubmitting }) => {
                this.setState({ isLogged: true });
                setTimeout(() => {
                    displayAlert.success("Cadastrado com sucesso!")
                    setSubmitting(false)
                }, 1000)
            }}

            validationSchema = {Yup.object().shape({
                descricao: Yup.string()
                    .required('Descrição é um campo obrigatório...')
                    .max(45, 'Esse campo tem no máximo 45 caractéres...')
            })}

        >

            {props => {
                const {values,
                    touched,
                    errors,
                    handleChange,
                    onSubmit,
                    handleSubmit,
                    isSubmitting
                } = props;

                return(
                    <>
                        <Content toggle={toggle} isOpen={isOpen}>
                            <div className='mt-5 mb-3'>
                                <h2>Cadastro de modelos</h2>
                                <small className='text-muted font-weight-bold'>Campos obrigatórios possuem (*)</small>
                            </div>

                            <style>{'body { background-color: whitesmoke; }'}</style>
                            <div className='card'>
                                <Form onSubmit={handleSubmit}>
                                    <div className="card-body">
                                        <div className="col-md-12 col-sm-12 ">
                                            <div className="row">
                                                <FormGroup className="col-md-6 col-sm-12 text-left">
                                                    <Label className='font-weight-bold'>Descrição (*): </Label>
                                                    <Input name="descricao"
                                                           value= {values.descricao}
                                                           type="text"
                                                           placeholder="Insira o descrição do modelo..."
                                                           onChange={handleChange} />
                                                    {errors.descricao && touched.descricao && <small className='text-danger font-weight-bold'>{errors.descricao}</small>}
                                                </FormGroup>
                                                <FormGroup className="col-md-6 col-sm-12 text-left">
                                                    <Label className='font-weight-bold'>Marca (*): </Label>
                                                    <select className="form-control col-sm-12" name="marca">
                                                        <option value='default' onChange={handleChange}>Selecione a marca do modelo...</option>
                                                        {marcas.length > 0 ? marcas.map : null}
                                                        {
                                                            marcas.length > 0 ? marcas.map((marca) => (
                                                                <option key={marca.id} value={marca.id} onChange={handleChange}>{marca.descricao}</option>
                                                            )) : null
                                                        }
                                                    </select>
                                                </FormGroup>
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-sm-12 mt-20">
                                            <button className="btn btn-dark btn-block ml-0" type="submit" disabled={isSubmitting}>
                                                <h6 className='font-weight-bold pl-2'>Cadastrar</h6>
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </Content>
                    </>
                );
            }}
        </Formik>
    );
}

export default withRouter(CadastrarModeloView)