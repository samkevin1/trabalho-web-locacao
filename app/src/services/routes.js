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
                <Route exact path={'/visualizar/automoveis'} component={VisualizarAutomovel} />
                <Route exact path={'/visualizar/clientes'} component={VisualizarCliente} />
                <Route exact path={'/visualizar/enderecos'} component={VisualizarEndereco} />
                <Route exact path={'/visualizar/locacoes'} component={VisualizarLocacao} />
                <Route exact path={'/visualizar/marcas'} component={VisualizarMarca} />
                <Route exact path={'/visualizar/modelos'} component={VisualizarModelo} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;