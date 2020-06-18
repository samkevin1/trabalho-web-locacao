import * as Yup from 'yup'

export default Yup.object().shape({
    placa: Yup.string()
        .required('Preencha este campo...')
        .max(45, 'Esse campo tem no máximo 45 caractéres...')
        .min(3, 'Plava deve ter no mínimo 3 caractéres'),
    renavam: Yup.string()
        .required('Preencha este campo...')
        .max(45, 'Esse campo tem no máximo 45 caractéres...')
        .min(3, 'Plava deve ter no mínimo 3 caractéres'),
    chassi: Yup.string()
        .required('Preencha este campo...')
        .max(45, 'Esse campo tem no máximo 45 caractéres...')
        .min(3, 'Plava deve ter no mínimo 3 caractéres'),
    valor_locacao: Yup.number()
        .required('Preencha este campo...'),
    cor: Yup.string()
        .required('Preencha este campo...')
        .max(45, 'Esse campo tem no máximo 45 caractéres...')
        .min(3, 'Plava deve ter no mínimo 3 caractéres'),
    tipo_combustivel: Yup.string()
        .notRequired()
        .max(45, 'Esse campo tem no máximo 45 caractéres...')
        .min(3, 'Plava deve ter no mínimo 3 caractéres')
})