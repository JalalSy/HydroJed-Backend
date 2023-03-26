import React from 'react'
import {useNavigate} from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form, ListGroupItem } from "react-bootstrap";
//import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions';


// import React, { useEffect } from 'react'
// import { useParams, useNavigate, useLocation} from "react-router-dom";
const CartScreen = () => {
  // const params = useParams()
  // const location = useLocation();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //const productId = params.id
  //const qty = location.search ? Number(location.search.split('=')[1]) : 1// check after the question mark in the link bar and take only the quantity
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  console.log(cartItems)

  // useEffect(() => {
  //   if (productId) {
  //     dispatch(addToCart(productId, qty))
  //   }
  // }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }
  
  const checkoutHandler = () => {
    navigate.to('/login?redirect=shipping')
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ?
        <LinkContainer to='/'>
        <Button variant="info rounded"> Your Cart Is Empty, Go Back</Button>
        </LinkContainer> : (
        <ListGroup variant='flush'>
          {cartItems.map(item => (
            <ListGroupItem key={item.product}>
              <Row>
                <Col md={2}>
                  <Image src={item.image} alt={item.name} fluid rounded />
                </Col>
                <Col md={4}>
                <LinkContainer to={`/product/${item.product}`}>
                <Button variant="light rounded">{item.name}</Button>
                </LinkContainer>
                </Col>
                <Col md={2}>
                  ${item.price}
                </Col>
                <Col md={3}>
                <Form.Select as='select' value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}> {x + 1} </option>
                      ))}
                    </Form.Select>
                </Col>
                <Col md={1}>
                <Button type='button' variant="light rounded" onClick={() => removeFromCartHandler(item.product)}> 
                <i className='fas fa-trash'></i>
                </Button>
                </Col>
              </Row>
            </ListGroupItem>
          ))}
        </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card border="light">
          <ListGroup variant='flush' >
            <ListGroupItem>
              <h2>Subtotal ({cartItems.reduce((acc, curit) => acc + curit.qty, 0)}) items</h2> {/* curit = Current item */}
              ${cartItems.reduce((acc, curit) => acc + curit.qty * curit.price, 0).toFixed(2)}
            </ListGroupItem>
            <ListGroupItem>
              <Button type='button' className='btn-block' disabled={cartItems.leng === 0} onClick={checkoutHandler}>
              Proceed to Checkout
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen