import * as Yup from 'yup'

export default Yup.object().shape({
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
});