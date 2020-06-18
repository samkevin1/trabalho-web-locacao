import React, { Fragment } from 'react';

export default function(props) {
    return(
        <Fragment>
            <h3 class="text-center">
                { props.title ? props.title : "Ocorreu um erro ao tentar executar a ação" }
            </h3>
            <div class="alert alert-card alert-danger" role="alert">
                <h5 class="text-center">
                    { props.message ? props.message : "Ocorreu um erro interno no servidor, tente novamente e caso o erro persista, contate um administrador do sistema."}
                </h5>
            </div>
        </Fragment>
    );
}