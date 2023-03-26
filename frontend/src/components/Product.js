import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
//import { Row, Col } from 'react-bootstrap';
import Rating from './Rating'
import '../index.css'

const product = ({product}) => {
  return (
    <Card className='my-3 p-3 rounded' style={{width: '24rem'}}>
        <Link to={`/product/${product._id}`}>
            <Card.Img src={product.image} variant='top'/>
        </Link>
        <Card.Body >
        <Link to={`/product/${product._id}`}>
            <Card.Title as='div' style={{paddingBottom:'1rem'}}> <strong>{product.name}</strong> </Card.Title>
        </Link>

            <Card.Text as='div'>
                <Rating value={product.rating} text={`${product.numReviews} reviwes`}/>
            </Card.Text>
            <Card.Text as='h3'>
            ₺{product.price}
            </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default product