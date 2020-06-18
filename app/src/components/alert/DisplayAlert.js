import Alert from 'react-s-alert';

export const typesAlert = {
    warning: "warning",
    success: "success",
    error: "error"
}

export const displayAlert = (type) => {

    if (type === typesAlert.warning) {
        Alert.warning('Warning.', {
            position: 'top-right',
            effect: 'slide'
        });
    }

    if (type === typesAlert.success) {
        Alert.success('Sucesso!', {
            position: 'top-right',
            effect: 'slide'
        });
    }

    if (type === typesAlert.error) {
        Alert.error('Erro.', {
            position: 'top-right',
            effect: 'slide'
        });
    }
}