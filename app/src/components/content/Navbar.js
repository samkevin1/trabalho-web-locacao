import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft, faCar, faUser, faAngleRight, faHome, faMoneyBill, faCarSide, faCarAlt } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Button, NavbarToggler} from 'reactstrap';
import { useHistory, withRouter } from "react-router-dom";

export default props => {
    const history = useHistory();
    const [isOpen, setOpen] = useState(true)
    const toggle = () => setOpen(!isOpen)
  
    function handleRedirect(route){
        console.log("oi", route)
        history.push(route);
    }

    return (
        <Navbar color="light" light className="navbar shadow-sm p-3 mb-5 bg-white rounded fluid" expand="md">
            <div className='dropdown'>
                <button color="light"
                    className="btn btn-light dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    <FontAwesomeIcon icon={faAlignLeft}/>
                    <small className='font-weight-bold pl-2'>Cadastros</small>
                </button>
                <div className="dropdown-menu">
                    <button type="button" className="dropdown-item" onClick={() => handleRedirect('/cadastrar/automovel')}>Automóvel</button>
                    <button className="dropdown-item" onClick={() => handleRedirect('/cadastrar/cliente')}>Cliente</button>
                    <button className="dropdown-item" onClick={() => handleRedirect('/cadastrar/endereco')}>Endereco</button>
                    <button className="dropdown-item" onClick={() => handleRedirect('/cadastrar/locacao')}>Locação</button>
                    <button className="dropdown-item" onClick={() => handleRedirect('/cadastrar/marca')}>Marca</button>
                    <button className="dropdown-item" onClick={() => handleRedirect('/cadastrar/modelo')}>Modelo</button>
                </div>
            </div>
            <div className='dropdown show pl-4'>
                <button color="light"
                        className="btn btn-light dropdown-toggle"
                        onClick={props.toggle}
                        type="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                >
                    <FontAwesomeIcon icon={faAlignLeft}/>
                    <small className='font-weight-bold pl-2'>Visualizar</small>
                </button>
                <div className="dropdown-menu">
                    <button type="button" className="dropdown-item" onClick={() => handleRedirect('/visualizar/automoveis')}>Automóveis</button>
                    <button className="dropdown-item" onClick={() => handleRedirect('/visualizar/clientes')}>Clientes</button>
                    <button className="dropdown-item" onClick={() => handleRedirect('/visualizar/enderecos')}>Endereços</button>
                    <button className="dropdown-item" onClick={() => handleRedirect('/visualizar/locacoes')}>Locações</button>
                    <button className="dropdown-item" onClick={() => handleRedirect('/visualizar/marcas')}>Marcas</button>
                    <button className="dropdown-item" onClick={() => handleRedirect('/visualizar/modelos')}>Modelos</button>
                </div>
            </div>
            <NavbarToggler onClick={toggle} />
        </Navbar>
    );
}
