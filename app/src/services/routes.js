import React from 'react';
import {
    CadastrarAutomovel, CadastrarCliente,
    CadastrarEndereco, CadastrarLocacao,
    CadastrarMarca, CadastrarModelo,
    VisualizarAutomovel, VisualizarCliente,
    VisualizarEndereco, VisualizarLocacao,
    VisualizarMarca, VisualizarModelo
} from '../pages/index';
import { BrowserRouter,Route, Switch } from 'react-router-dom';

const Routes = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={'/cadastrar/automovel'} component={CadastrarAutomovel} />
                <Route exact path={'/cadastrar/cliente'} component={CadastrarCliente} />
                <Route exact path={'/cadastrar/endereco'} component={CadastrarEndereco} />
                <Route exact path={'/cadastrar/locacao'} component={CadastrarLocacao} />
                <Route exact path={'/cadastrar/marca'} component={CadastrarMarca} />
                <Route exact path={'/cadastrar/modelo'} component={CadastrarModelo} />
                <Route exact path={'/visualizar/automovel'} component={VisualizarAutomovel} />
                <Route exact path={'/visualizar/cliente'} component={VisualizarCliente} />
                <Route exact path={'/visualizar/endereco'} component={VisualizarEndereco} />
                <Route exact path={'/visualizar/locacao'} component={VisualizarLocacao} />
                <Route exact path={'/visualizar/marca'} component={VisualizarMarca} />
                <Route exact path={'/visualizar/modelo'} component={VisualizarModelo} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;