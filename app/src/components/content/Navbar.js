import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Button, NavbarToggler} from 'reactstrap';

export default props => {

  const [isOpen, setOpen] = useState(true)
  const toggle = () => setOpen(!isOpen)
  
  return (
    <Navbar color="light" light className="navbar shadow-sm p-3 mb-5 bg-white rounded fluid" expand="md">
        <div className='dropdown'>
            <button color="light"
                  className=" btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
            >
                <FontAwesomeIcon icon={faAlignLeft}/>
                <small className='font-weight-bold pl-2'>Cadastros</small>
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <a className="dropdown-item" href="#">Something else here</a>
            </div>
        </div>
        <div className='dropdown show pl-4'>
            <Button color="light"
                    className=""
                    onClick={props.toggle}
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
            >
                <FontAwesomeIcon icon={faAlignLeft}/>
                <small className='font-weight-bold pl-2'>Visualizar</small>
            </Button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <a className="dropdown-item" href="#">Something else here</a>
            </div>
        </div>
        <NavbarToggler onClick={toggle} />
    </Navbar>
  );
}
