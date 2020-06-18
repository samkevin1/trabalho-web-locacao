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

export const CadastrarMarcaView = () => {

    const history = useHistory();
    const [isLogged, setIsLogged] = useState();
    const [isOpen, setOpen] = useState(true);
    const toggle = () => setOpen(!isOpen);

    return (
        <Formik
            initialValues = {{
                descricao:''
            }}

            onSubmit={(values) => {
                api.post(eps.cadastrarMarca, values).then((res) => {
                    console.log(res.data)
                    if (res.data.success) {
                        displayAlert(res.data.message, typesAlert.success);
                        history.push('/visualizar/marcas');
                    } else {
                        displayAlert(res.data.message, typesAlert.error);
                    }
                })
            }}

            handleSubmit = {({ setSubmitting }) => {
                this.setState({ isLogged: true });
                setTimeout(() => {
                    alert("Cadastrado com sucesso!");
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
                                <h2>Cadastro de marcas</h2>
                                <small className='text-muted font-weight-bold'>Campos obrigatórios possuem (*)</small>
                            </div>

                            <style>{'body { background-color: whitesmoke; }'}</style>
                            <div className='card'>
                                <Form onSubmit={handleSubmit}>
                                    <div className="card-body">
                                        <div className="col-md-12 col-sm-12 ">
                                            <div className="row">
                                                <FormGroup className="col-md-12 col-sm-12 text-left">
                                                    <Label className='font-weight-bold'>Descrição (*): </Label>
                                                    <Input name="descricao"
                                                           value= {values.descricao}
                                                           type="text"
                                                           placeholder="Insira o descrição da marca..."
                                                           onChange={handleChange} />
                                                    {errors.descricao && touched.descricao && <small className='text-danger font-weight-bold'>{errors.descricao}</small>}
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

export default withRouter(CadastrarMarcaView)