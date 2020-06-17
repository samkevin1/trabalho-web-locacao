import React, { Fragment } from 'react';
import classNames from 'classnames';
import { Container } from 'reactstrap';
import NavBar from './Navbar';
import "./Content.css";

export default props => (
  <Container fluid className={classNames('content', {'is-open': props.isOpen})}>
    <NavBar toggle={props.toggle}/>
    <Fragment>{props.children}</Fragment>
  </Container>
)
