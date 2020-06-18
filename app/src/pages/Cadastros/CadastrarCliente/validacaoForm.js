import * as Yup from 'yup';

export default Yup.object().shape({
    nome: Yup.string()
        .required('Preencha este campo...')
        .max(45, 'Esse campo tem no máximo 45 caractéres...'),
    sobrenome: Yup.string()
        .required('Preencha este campo...')
        .max(45, 'Esse campo tem no máximo 45 caractéres...'),
    cpf: Yup.string()
        .required('Preencha este campo...')
        .max(14, 'Esse campo tem no máximo 14 caractéres...')
        .min(11,'Esse campo tem no mínimo 11 caratéres...'),
    telefone: Yup.string()
        .notRequired()
        .max(45, 'Esse campo tem no máximo 45 caractéres...'),
    cnh: Yup.string()
        .required('Preencha este campo...')
        .max(45, 'Esse campo tem no máximo 45 caractéres...')
});