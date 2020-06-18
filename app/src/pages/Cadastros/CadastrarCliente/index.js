import React, { useState} from 'react'
import { displayAlert, typesAlert }  from "../../../components/alert/DisplayAlert";
import api, { eps } from "../../../services/mainApi";
import Content from '../../../components/content/Content';
import { useHistory, withRouter } from "react-router-dom";
import { Formik } from 'formik';
import validacaoForm from './validacaoForm';

import {
    Button,
    Form, FormGroup,
    Label, Input
} from 'reactstrap';

export const CadastrarClienteView = () => {
    const history = useHistory();
    const [isOpen, setOpen] = useState(true);
    const toggle = () => setOpen(!isOpen);

    return (
        <Formik
            initialValues = {{
                nome:'',
                sobrenome:'',
                cpf:'',
                cnh:'',
                telefone:''
            }}
            onSubmit={(values) => {
                api.post(eps.cadastrarCliente, values).then((res) => {
                    if (res.data.success) {
                        displayAlert(res.data.message, typesAlert.success);
                        history.push('/visualizar/clientes', { user: res.data.user });
                    } else {
                        displayAlert(res.data.message, typesAlert.error);
                    }
                }).catch((err) => {
                    displayAlert("Ocorreu um erro de conexão. Tente novamente mais tarde.", typesAlert.error);
                });
            }}

            handleSubmit={({ setSubmitting }) => {
                setTimeout(() => {
                    displayAlert.handleSuccess("Cadastrado com sucesso!")
                    setSubmitting(false)
                }, 1000)
            }}
            validationSchema={validacaoForm}
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
                            <h2>Cadastro de clientes </h2>
                            <small className='text-muted font-weight-bold'>Campos obrigatórios possuem (*)</small>
                        </div>

                        <style>{'body { background-color: whitesmoke; }'}</style>
                        <div className='card'>
                            <Form onSubmit={handleSubmit}>
                                <div className="card-body">
                                    <div className="col-md-12 col-sm-12 ">
                                        <div className="row">
                                            <FormGroup className="col-md-6 col-sm-12 text-left">
                                                <Label className='font-weight-bold'>Nome (*):</Label>
                                                <Input name="nome"
                                                       value= {values.nome}
                                                       type="text"
                                                       placeholder="Insira o nome do cliente..."
                                                       onChange={handleChange} />
                                                {errors.nome && touched.nome && <small className='text-danger font-weight-bold text-left'>{errors.nome}</small>}
                                            </FormGroup>
                                            <FormGroup className="col-md-6 col-sm-12 text-left">
                                                <Label className='font-weight-bold'>Sobrenome (*):</Label>
                                                <Input name="sobrenome"
                                                       value= {values.sobrenome}
                                                       type="text" placeholder="Insira o sobrenome do cliente..."
                                                       onChange={handleChange}
                                                />
                                                {errors.sobrenome && touched.sobrenome && <small className='text-danger font-weight-bold text-left'>{errors.sobrenome}</small>}
                                            </FormGroup>
                                        </div>
                                        <div className="row">
                                            <FormGroup className="col-md-6 col-sm-12 text-left">
                                                <Label className='font-weight-bold'>CPF (*): </Label>
                                                <Input name="cpf"
                                                       value= {values.cpf}
                                                       type="text"
                                                       placeholder="Insira o CPF do cliente..."
                                                       onChange={handleChange}
                                                />
                                                {errors.cpf && touched.cpf && <small className='text-danger font-weight-bold text-left'>{errors.cpf}</small>}
                                            </FormGroup>
                                            <FormGroup className="col-md-6 col-sm-12 text-left">
                                                <Label className='font-weight-bold'>CNH (*)</Label>
                                                <Input name="cnh"
                                                       value= {values.cnh}
                                                       type="text"
                                                       placeholder="Insira o CNH do cliente..."
                                                       onChange={handleChange}
                                                />
                                                {errors.cnh && touched.cnh && <small className='text-danger font-weight-bold text-left'>{errors.cnh}</small>}
                                            </FormGroup>
                                        </div>
                                        <div className="row">
                                            <FormGroup className="col-md-12 col-sm-12 text-left">
                                                <Label className='font-weight-bold '>Telefone</Label>
                                                <Input name="telefone"
                                                       value= {values.telefone}
                                                       type="text"
                                                       placeholder="Insira o cor do automóvel..."
                                                       onChange={handleChange}
                                                />
                                                {errors.telefone && touched.telefone && <small className='text-danger font-weight-bold text-left'>{errors.telefone}</small>}
                                            </FormGroup>
                                        </div>
                                    </div>
                                    <div className="col-md-12 col-sm-12 mt-2">
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

export default withRouter(CadastrarClienteView)