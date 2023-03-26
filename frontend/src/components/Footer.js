import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="d-flex justify-content-center">
      <Container className='d-flex justify-content-center'>
        <Row >
          <Col >
            <Row className="mb-2">
              <Col xs={2} className="d-flex align-items-center justify-content-end">
              <a href="https://goo.gl/maps/QwyYmQ6mSwrLQnzdA" target="_blank" rel="noopener noreferrer">
                  <i className="fa-solid fa-location-dot mr-2"></i>
                </a>
              </Col>
              <Col xs={10} className="d-flex align-items-center">
                <p className="mb-0">5119 طريق مكة القديم، District, Madain Al Fahd, جدة 22343</p>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col xs={2} className="d-flex align-items-center justify-content-end">
                <i className="fa-regular fa-envelope mr-2"></i>
              </Col>
              <Col xs={10} className="d-flex align-items-center">
                <p className="mb-0">info@hydro-jed.com</p>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col xs={2} className="d-flex align-items-center justify-content-end">
                <i className="fa-solid fa-phone-volume mr-2"></i>
              </Col>
              <Col xs={10} className="d-flex align-items-center">
                <p className="mb-0">+966 50 461 7194</p>
              </Col>
            </Row>
            <Row className="py-3">
              <Col className="d-flex justify-content-center">
                <p className="mb-0">&copy; HydroJed</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer


