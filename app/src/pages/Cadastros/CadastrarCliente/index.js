import React, { useState} from 'react'
import { displayAlert, typesAlert }  from "../../../components/alert/DisplayAlert";
import api, { eps } from "../../../services/mainApi";
import Content from '../../../components/content/Content';
import { useHistory, withRouter } from "react-router-dom";
import { Formik } from 'formik';
import * as Yup from 'yup'
import {
    Button,
    Form, FormGroup,
    Label, Input
} from 'reactstrap';

export const CadastrarClienteView = () => {

    const history = useHistory();
    const [isLogged, setIsLogged] = useState();
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
                    console.log(res.data)
                    if (res.data.success) {
                        displayAlert(res.data.message, typesAlert.success);
                        history.push('/', { user: res.data.user });
                    } else {
                        displayAlert(res.data.message, typesAlert.error);
                    }
                })
            }}

            handleSubmit = {({ setSubmitting }) => {
                this.setState({ isLoggedIn: true });
                setTimeout(() => {
                    displayAlert.handleSuccess("Cadastrado com sucesso!")
                    setSubmitting(false)
                }, 1000)
            }}

            validationSchema = {Yup.object().shape({
                nome: Yup.string()
                    .required('Nome é um campo obrigatório...')
                    .max(45, 'Esse campo tem no máximo 45 caractéres...'),
                sobrenome: Yup.string()
                    .required('Sobrenome é um campo obrigatório...')
                    .max(45, 'Esse campo tem no máximo 45 caractéres...'),
                cpf: Yup.string()
                    .required('CPF é um campo obrigatório...')
                    .max(14, 'Esse campo tem no máximo 14 caractéres...')
                    .min('Esse campo tem no mínimo 11 caratéres...'),
                telefone: Yup.string()
                    .notRequired()
                    .max(45, 'Esse campo tem no máximo 45 caractéres...'),
                cnh: Yup.string()
                    .required('CNH é um campo obrigatório...')
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
                            <h2>Cadastrar Cliente</h2>
                            <small className='text-muted font-weight-bold'>Campos obrigatórios (*)</small>
                        </div>

                        <style>{'body { background-color: whitesmoke; }'}</style>
                        <div className='card'>
                            <Form onSubmit={handleSubmit}>
                                <div className="card-body">
                                    <div className="col-md-12 col-sm-12 ">
                                        <div className="row">
                                            <FormGroup className="col-md-6 col-sm-12">
                                                <Label className='font-weight-bold'>Nome (*)</Label>
                                                <Input name="nome"
                                                       value= {values.nome}
                                                       type="text"
                                                       placeholder="Insira o nome do cliente..."
                                                       onChange={handleChange} />
                                                {errors.nome && touched.nome && <small className='text-danger font-weight-bold'>{errors.nome}</small>}
                                            </FormGroup>
                                            <FormGroup className="col-md-6 col-sm-12">
                                                <Label className='font-weight-bold'>Sobrenome (*)</Label>
                                                <Input name="sobrenome"
                                                       value= {values.sobrenome}
                                                       type="text" placeholder="Insira o sobrenome do cliente..."
                                                       onChange={handleChange}
                                                />
                                                {errors.sobrenome && touched.sobrenome && <small className='text-danger font-weight-bold'>{errors.sobrenome}</small>}
                                            </FormGroup>
                                        </div>
                                        <div className="row">
                                            <FormGroup className="col-md-6 col-sm-12">
                                                <Label className='font-weight-bold'>CPF (*)</Label>
                                                <Input name="cpf"
                                                       value= {values.cpf}
                                                       type="text"
                                                       placeholder="Insira o CPF do cliente..."
                                                       onChange={handleChange}
                                                />
                                                {errors.cpf && touched.cpf && <small className='text-danger font-weight-bold'>{errors.cpf}</small>}
                                            </FormGroup>
                                            <FormGroup className="col-md-6 col-sm-12">
                                                <Label className='font-weight-bold'>CNH (*)</Label>
                                                <Input name="cnh"
                                                       value= {values.cnh}
                                                       type="text"
                                                       placeholder="Insira o CNH do cliente..."
                                                       onChange={handleChange}
                                                />
                                                {errors.cnh && touched.cnh && <small className='text-danger font-weight-bold'>{errors.cnh}</small>}
                                            </FormGroup>
                                        </div>
                                        <div className="row">
                                            <FormGroup className="col-md-6 col-sm-12">
                                                <Label className='font-weight-bold'>Telefone</Label>
                                                <Input name="telefone"
                                                       value= {values.telefone}
                                                       type="text"
                                                       placeholder="Insira o cor do automóvel..."
                                                       onChange={handleChange}
                                                />
                                                {errors.telefone && touched.telefone && <small className='text-danger font-weight-bold'>{errors.telefone}</small>}
                                            </FormGroup>
                                        </div>
                                    </div>
                                    <div className="col-md-12 col-sm-12pd-t-50">
                                        <Button className="btn btn-primary btn-login ml-0" type="submit" disabled={isSubmitting}>Cadastrar</Button>
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