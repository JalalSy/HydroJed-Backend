import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap';
import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { logout } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';


const Header = () => {

  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(logout())
    navigate('/login')
  }
  return (
    <header>
         <Navbar bg='primary' variant='dark' expand="lg">
      <Container>
        <LinkContainer to='/'><Navbar.Brand>HydroJed</Navbar.Brand></LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end flex-grow-1 pe-3">
          <LinkContainer to='/about'><Nav.Link>Who Are We?</Nav.Link></LinkContainer>
          <LinkContainer to='/cart'>
            <Nav.Link> <i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) :            
            (<LinkContainer to='/login'>
            <Nav.Link ><i className="fas fa-user"></i> Sign in</Nav.Link>
            </LinkContainer>
            )}
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title='Admin' id='adminmenu'>
              <LinkContainer to='/admin/userlist'>
                <NavDropdown.Item>Users</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/admin/productlist'>
                <NavDropdown.Item>Products</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  )
}

export default Header