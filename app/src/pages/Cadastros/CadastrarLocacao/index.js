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

export const CadastrarLocacaoView = () => {

    const history = useHistory();
    const [automoveis, setAutomoveis] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [isOpen, setOpen] = useState(true);
    const toggle = () => setOpen(!isOpen);

    useEffect((values)=>{
        api.get(eps.listarAutomovel, values).then((res)=>{
            console.log(res.data);
            if(res.data){
                setAutomoveis(res.data);
            }else{
                setAutomoveis([]);
            }
        })
    },[]);

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
                km:'',
                valor_calcao:'',
                valor_km:'',
                bonus:'',
                cliente: 0,
                automovel: 0
            }}

            onSubmit={(values) => {
                api.post(eps.cadastrarLocacao, values).then((res) => {
                    console.log(res.data)
                    if (res.data.success) {
                        displayAlert(res.data.message, typesAlert.success);
                        history.push('/visualizar/locacoes');
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
                km: Yup.number()
                    .required('KM é um campo obrigatório...'),
                valor_locacao: Yup.number()
                    .required('Valor locação é um campo obrigatório...'),
                valor_km: Yup.number()
                    .required('Valor KM é um campo obrigatório...'),
                bonus: Yup.number()
                    .notRequired(),
                valor_total: Yup.number()
                    .required('Valor total é um campo obrigatório...')
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
                                <h2>Cadastro de locações</h2>
                                <small className='text-muted font-weight-bold'>Campos obrigatórios possuem (*)</small>
                            </div>

                            <style>{'body { background-color: whitesmoke; }'}</style>
                            <div className='card'>
                                <Form onSubmit={handleSubmit}>
                                    <div className="card-body">
                                        <div className="col-md-12 col-sm-12 ">
                                            <div className="row">
                                                <FormGroup className="col-md-6 col-sm-12 text-left">
                                                    <Label className='font-weight-bold'>KM (*): </Label>
                                                    <Input name="km"
                                                           value= {values.km}
                                                           type="text"
                                                           placeholder="Insira o KM da locação..."
                                                           onChange={handleChange} />
                                                    {errors.km && touched.km && <small className='text-danger font-weight-bold'>{errors.km}</small>}
                                                </FormGroup>
                                                <FormGroup className="col-md-6 col-sm-12 text-left">
                                                    <Label className='font-weight-bold'>Valor Locação (*): </Label>
                                                    <Input name="valor_locacao"
                                                           value= {values.valor_locacao}
                                                           type="text" placeholder="Insira o valor da locação..."
                                                           onChange={handleChange}
                                                    />
                                                    {errors.valor_locacao && touched.valor_locacao && <small className='text-danger font-weight-bold'>{errors.valor_locacao}</small>}
                                                </FormGroup>
                                            </div>
                                            <div className="row">
                                                <FormGroup className="col-md-6 col-sm-12 text-left">
                                                    <Label className='font-weight-bold'>Valor KM (*): </Label>
                                                    <Input name="valor_km"
                                                           value= {values.valor_km}
                                                           type="text"
                                                           placeholder="Insira o valor de KM da locação..."
                                                           onChange={handleChange}
                                                    />
                                                    {errors.valor_km && touched.valor_km && <small className='text-danger font-weight-bold'>{errors.valor_km}</small>}
                                                </FormGroup>
                                                <FormGroup className="col-md-6 col-sm-12 text-left">
                                                    <Label className='font-weight-bold'>Bônus: </Label>
                                                    <Input name="bonus"
                                                           value= {values.bonus}
                                                           type="text"
                                                           placeholder="Insira o bonus da locação..."
                                                           onChange={handleChange}
                                                    />
                                                    {errors.bonus && touched.bonus && <small className='text-danger font-weight-bold'>{errors.bonus}</small>}
                                                </FormGroup>
                                            </div>
                                            <div className="row">
                                                <FormGroup className="col-md-6 col-sm-12 text-left">
                                                    <Label className='font-weight-bold'>Automóvel (*): </Label>
                                                    <select className="form-control col-sm-12" name="automovel">
                                                        <option value='default' onChange={handleChange}>Selecione o automóvel da locação...</option>
                                                        {automoveis.length > 0 ? automoveis.map : null}
                                                        {
                                                            automoveis.length > 0 ? automoveis.map((automovel) => (
                                                                <option name="automovel" key={automovel.id} value={automovel.id} onChange={handleChange}>{automovel.placa}</option>
                                                            )) : null
                                                        }
                                                    </select>
                                                </FormGroup>
                                                <FormGroup className="col-md-6 col-sm-12 text-left">
                                                    <Label className='font-weight-bold'>Cliente (*): </Label>
                                                    <select className="form-control col-sm-12">
                                                        <option value='default' name="cliente" onChange={handleChange}>Selecione o cliente da locação...</option>
                                                        {clientes.length > 0 ? clientes.map : null}
                                                        {
                                                            clientes.length > 0 ? clientes.map((cliente) => (
                                                                <option key={cliente.id} value={cliente.id} onChange={handleChange}>{cliente.nome}</option>
                                                            )) : null
                                                        }
                                                    </select>
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

export default withRouter(CadastrarLocacaoView)