import React, {useEffect, useState} from 'react'
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

export const CadastrarEnderecoView = () => {

    const history = useHistory();
    const [clientes, setClientes] = useState([]);
    const [isOpen, setOpen] = useState(true);
    const toggle = () => setOpen(!isOpen);

    useEffect((values)=>{
        api.get(eps.listarCliente, values).then((res)=>{
            console.log(res.data);
            if(res.data){
                setClientes(res.data);
            }else{
                setClientes([]);
            }
        })
    },[]);

    return (
        <Formik
            initialValues = {{
                logradouro:'',
                numero:'',
                cep:'',
                bairro:'',
                cidade:'',
                estado:'',
                pais:''
            }}

            onSubmit={(values) => {
                api.post(eps.cadastrarEndereco, values).then((res) => {
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
                    displayAlert.success("Cadastrado com sucesso!")
                    setSubmitting(false)
                }, 1000)
            }}

            validationSchema = {Yup.object().shape({
                logradouro: Yup.string()
                    .required('Logradouro é um campo obrigatório...')
                    .max(45, 'Esse campo tem no máximo 45 caractéres...'),
                numero: Yup.number()
                    .required('Número é um campo obrigatório...'),
                cep: Yup.number()
                    .required('CEP é um campo obrigatório...'),
                bairro: Yup.string()
                    .required('Bairro é um campo obrigatório...')
                    .max(45, 'Esse campo tem no máximo 45 caractéres...'),
                cidade: Yup.string()
                    .required('Cidade é um campo obrigatório...')
                    .max(45, 'Esse campo tem no máximo 45 caractéres...'),
                estado: Yup.string()
                    .required('Estado é um campo obrigatório...')
                    .max(45, 'Esse campo tem no máximo 45 caractéres...'),
                pais: Yup.string()
                    .required('País é um campo obrigatório...')
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
                                <h2>Cadastrar Endereço</h2>
                                <small className='text-muted font-weight-bold'>Campos obrigatórios (*)</small>
                            </div>

                            <style>{'body { background-color: whitesmoke; }'}</style>
                            <div className='card'>
                                <Form onSubmit={handleSubmit}>
                                    <div className="card-body">
                                        <div className="col-md-12 col-sm-12 ">
                                            <div className="row">
                                                <FormGroup className="col-md-6 col-sm-12">
                                                    <Label className='font-weight-bold'>Logradouro (*)</Label>
                                                    <Input name="nome"
                                                           value= {values.logradouro}
                                                           type="text"
                                                           placeholder="Insira o logradouro do endereço..."
                                                           onChange={handleChange} />
                                                    {errors.logradouro && touched.logradouro && <small className='text-danger font-weight-bold'>{errors.logradouro}</small>}
                                                </FormGroup>
                                                <FormGroup className="col-md-6 col-sm-12">
                                                    <Label className='font-weight-bold'>Número (*)</Label>
                                                    <Input name="numero"
                                                           value= {values.numero}
                                                           type="text" placeholder="Insira o número do endereço..."
                                                           onChange={handleChange}
                                                    />
                                                    {errors.numero && touched.numero && <small className='text-danger font-weight-bold'>{errors.numero}</small>}
                                                </FormGroup>
                                            </div>
                                            <div className="row">
                                                <FormGroup className="col-md-6 col-sm-12">
                                                    <Label className='font-weight-bold'>CEP (*)</Label>
                                                    <Input name="cpf"
                                                           value= {values.cep}
                                                           type="text"
                                                           placeholder="Insira o CEP do endereço..."
                                                           onChange={handleChange}
                                                    />
                                                    {errors.cep && touched.cep && <small className='text-danger font-weight-bold'>{errors.cep}</small>}
                                                </FormGroup>
                                                <FormGroup className="col-md-6 col-sm-12">
                                                    <Label className='font-weight-bold'>CEP (*)</Label>
                                                    <Input name="cep"
                                                           value= {values.CEP}
                                                           type="text"
                                                           placeholder="Insira o CEP do enderço..."
                                                           onChange={handleChange}
                                                    />
                                                    {errors.cep && touched.cep && <small className='text-danger font-weight-bold'>{errors.cep}</small>}
                                                </FormGroup>
                                            </div>
                                            <div className="row">
                                                <FormGroup className="col-md-6 col-sm-12">
                                                    <Label className='font-weight-bold'>Bairro (*)</Label>
                                                    <Input name="bairro"
                                                           value= {values.cep}
                                                           type="text"
                                                           placeholder="Insira o bairro do endereço..."
                                                           onChange={handleChange}
                                                    />
                                                    {errors.bairro && touched.bairro && <small className='text-danger font-weight-bold'>{errors.bairro}</small>}
                                                </FormGroup>
                                                <FormGroup className="col-md-6 col-sm-12">
                                                    <Label className='font-weight-bold'>Cidade (*)</Label>
                                                    <Input name="cidade"
                                                           value= {values.cidade}
                                                           type="text"
                                                           placeholder="Insira a cidade do endereço..."
                                                           onChange={handleChange}
                                                    />
                                                    {errors.cidade && touched.cidade && <small className='text-danger font-weight-bold'>{errors.cidade}</small>}
                                                </FormGroup>
                                            </div>
                                            <div className="row">
                                                <FormGroup className="col-md-6 col-sm-12">
                                                    <Label className='font-weight-bold'>Estado (*)</Label>
                                                    <Input name="estado"
                                                           value= {values.estado}
                                                           type="text"
                                                           placeholder="Insira o estado do endereço..."
                                                           onChange={handleChange}
                                                    />
                                                    {errors.estado && touched.estado && <small className='text-danger font-weight-bold'>{errors.estado}</small>}
                                                </FormGroup>
                                                <FormGroup className="col-md-6 col-sm-12">
                                                    <Label className='font-weight-bold'>País (*)</Label>
                                                    <Input name="pais"
                                                           value= {values.pais}
                                                           type="text"
                                                           placeholder="Insira o país do endereço..."
                                                           onChange={handleChange}
                                                    />
                                                    {errors.pais && touched.pais && <small className='text-danger font-weight-bold'>{errors.pais}</small>}
                                                </FormGroup>
                                            </div>
                                            <div className='row'>
                                                <FormGroup className="col-md-6 col-sm-12">
                                                    <Label className='font-weight-bold'>Cliente (*)</Label>
                                                    <select className="form-control col-sm-12">
                                                        <option value='default' onChange={handleChange}>Selecione o cliente da locação...</option>
                                                        {clientes.length > 0 ? clientes.map : null}
                                                        {
                                                            clientes.length > 0 ? clientes.map((cliente) => (
                                                                <option key={cliente.id} value={cliente} onChange={handleChange}>{cliente.cpf}</option>
                                                            )) : null
                                                        }
                                                    </select>
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

export default withRouter(CadastrarEnderecoView)