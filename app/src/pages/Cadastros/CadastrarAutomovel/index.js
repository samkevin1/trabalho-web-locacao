import React, {useEffect, useState} from 'react'
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

export const CadastrarAutomovelView = () => {
    const history = useHistory();
    const [modelos, setModelos] = useState([]);
    const [isOpen, setOpen] = useState(true);
    const toggle = () => setOpen(!isOpen);

    useEffect((values)=>{
        api.get(eps.listarModelo, values).then((res)=>{
            console.log(res.data);
            if(res.data){
                setModelos(res.data);
            }else{
                setModelos([]);
            }
        })
    },[]);

    return (
        <Formik
            initialValues = {{
                placa:'',
                renavam:'',
                chassi:'',
                valor_locacao:'',
                cor:'',
                tipo_combustivel:'',
                modelo: 0
            }}

            onSubmit={(values) => {
                api.post(eps.cadastrarAutomovel, values).then((res) => {
                    if (res.data.success) {
                        displayAlert(res.data.message, typesAlert.success);
                        history.push('/visualizar/automoveis', { user: res.data.user });
                    } else {
                        displayAlert(res.data.message, typesAlert.error);
                    }
                }).catch((err) => {
                    displayAlert("Ocorreu um erro de conexão. Tente novamente mais tarde.", typesAlert.error);
                });
            }}

            handleSubmit = {({ setSubmitting } ) => {
                setTimeout(() => {
                    displayAlert.handleSuccess("Cadastrado com sucesso!")
                    setSubmitting(false)
                }, 1000)
            }}
            validationSchema={validacaoForm}
        >
            {props => {
                const {
                    values,
                    touched,
                    errors,
                    handleChange,
                    onSubmit,
                    handleSubmit,
                    isSubmitting
                } = props;

                return(
                <>
                    <style>{'body { background-color: whitesmoke; }'}</style>
                    <Content toggle={toggle} isOpen={isOpen}>
                        <div className='mt-5 mb-3'>
                            <h2>Cadastro de automóveis</h2>
                            <small className='text-muted font-weight-bold'>Campos obrigatórios possuem (*)</small>
                        </div>
                        <div className='card'>
                            <Form onSubmit={handleSubmit}>
                                <div className="card-body">
                                    <div className="col-md-12 col-sm-12 ">
                                        <div className="row">
                                            <FormGroup className="col-md-6 col-sm-12 text-left">
                                                <Label className='font-weight-bold text-left'>Placa (*): </Label>
                                                <Input name="placa"
                                                       value= {values.placa}
                                                       type="text"
                                                       placeholder="Insira a placa do automóvel..."
                                                       onChange={handleChange} />
                                                {props.errors.placa && props.touched.placa && <small className='text-danger font-weight-bold text-left'>{props.errors.placa}</small>}
                                            </FormGroup>
                                            <FormGroup className="col-md-6 col-sm-12 text-left">
                                                <Label className='font-weight-bold'>RENAVAM (*):</Label>
                                                <Input name="renavam"
                                                       value= {values.renavam}
                                                       type="text" placeholder="Insira o renavam do automóvel..."
                                                       onChange={handleChange}
                                                />
                                                {errors.renavam && touched.renavam && <small className='text-danger font-weight-bold'>{errors.renavam}</small>}
                                            </FormGroup>
                                        </div>
                                        <div className="row">
                                            <FormGroup className="col-md-6 col-sm-12  text-left">
                                                <Label className='font-weight-bold'>Chassi (*): </Label>
                                                <Input name="chassi"
                                                       value= {values.chassi}
                                                       type="text"
                                                       placeholder="Insira o chassi do automóvel..."
                                                       onChange={handleChange}
                                                />
                                                {errors.chassi && touched.chassi && <small className='text-danger font-weight-bold'>{errors.chassi}</small>}
                                            </FormGroup>
                                            <FormGroup className="col-md-6 col-sm-12  text-left">
                                                <Label className='font-weight-bold'>Valor da locação do automóvel (*):</Label>
                                                <Input name="valor_locacao"
                                                       value= {values.valor_locacao}
                                                       type="text"
                                                       placeholder="Insira o valor da locação..."
                                                       onChange={handleChange}
                                                />
                                                {errors.valor_locacao && touched.valor_locacao && <small className='text-danger font-weight-bold'>{errors.valor_locacao}</small>}
                                            </FormGroup>
                                        </div>
                                        <div className="row">
                                            <FormGroup className="col-md-6 col-sm-12 text-left">
                                                <Label className='font-weight-bold'>Cor do automóvel (*):</Label>
                                                <Input name="cor"
                                                       value= {values.cor}
                                                       type="text"
                                                       placeholder="Insira o cor do automóvel..."
                                                       onChange={handleChange}
                                                />
                                                {errors.cor && touched.cor && <small className='text-danger font-weight-bold'>{errors.cor}</small>}
                                            </FormGroup>
                                            <FormGroup className="col-md-6 col-sm-12 text-left">
                                                <Label className='font-weight-bold'>Tipo de combustível: </Label>
                                                <Input name="tipo_combustivel"
                                                       value= {values.tipo_combustivel}
                                                       type="text"
                                                       placeholder="Insira o tipo de combustível..."
                                                       onChange={handleChange}
                                                />
                                                {errors.tipo_combustivel && touched.tipo_combustivel && <small className='text-danger font-weight-bold'>{errors.tipo_combustivel}</small>}
                                            </FormGroup>
                                        </div>
                                        <div className="row">
                                            <FormGroup className="col-md-12 col-sm-12 text-left">
                                                <Label className='font-weight-bold'>Modelo do automóvel (*):</Label>
                                                <select className="form-control col-sm-12" value="modelo">
                                                    <option value='default' onChange={handleChange}>Selecione a modelo do automóvel...</option>
                                                    {
                                                        modelos.length > 0 ? modelos.map((modelo) => (
                                                            <option key={modelo.id} value={modelo.id} onChange={handleChange}>{modelo.descricao}</option>
                                                        )) : null
                                                    }
                                                </select>
                                            </FormGroup>
                                        </div>
                                    </div>
                                    <div className="col-md-12 col-sm-12 mt-2">
                                        <button className="btn btn-dark btn-block" type="submit" disabled={isSubmitting}> 
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

export default withRouter(CadastrarAutomovelView);