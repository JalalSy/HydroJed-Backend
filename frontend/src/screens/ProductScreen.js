import React, { useState, useEffect} from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap';
import { Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap";
import Rating from "../components/Rating";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProductsDetails } from '../actions/productActions';
import {addToCart} from '../actions/cartActions'

const ProductScreen = ( ) => {
  const [qty, setQty] = useState(0)
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {
   dispatch(listProductsDetails(params.id))
  },[dispatch, params.id]
  )

  const addToCartHandler = () => {
    //navigate(`/cart/${params.id}?qty=${qty ===  0 ? '1' : qty }`)
    dispatch(addToCart(product._id, qty))
    navigate('/cart')
  }

  return (
    <>
    <LinkContainer to='/'>
      <Button variant="light rounded">Go Back</Button>
    </LinkContainer>
    {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
          <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid/>
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h4>{product.name}</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
              </ListGroup.Item>
              <ListGroup.Item>
                Price: ₺{product.price}
              </ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>
                  Price:
                  </Col>
                  <Col>
                  <strong>₺{product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                  Status:
                  </Col>
                  <Col>
                  <strong>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
             {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>
                    Qty
                    </Col>
                    <Col>
                    <Form.Select as='select' onChange={(e) => setQty(e.target.value)}>
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}> {x + 1} </option>
                      ))}
                    </Form.Select>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )} 
              <ListGroup.Item>
              <div className='d-grid gap-2'>
              <Button onClick={addToCartHandler} variant="primary rounded" disabled={product.countInStock === 0}>
              Add To Cart
              </Button>
              </div>
              </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
    )}

    </>
  )
}

export default ProductScreen