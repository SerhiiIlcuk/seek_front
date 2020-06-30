// import external modules
import React, { Component, Fragment } from "react";
import {Button, Card, CardBody, CardImg, CardImgOverlay, CardLink, CardText, CardTitle, Col, Row} from "reactstrap";
import cardImgEle07 from "../../assets/img/elements/07.png";
import cardImg15 from "../../assets/img/photos/15.jpg";
import {Link} from "react-router-dom";
import {Plus} from "react-feather";
import cardImg03 from "../../assets/img/photos/03.jpg";

class NewsPage extends Component {
   render() {
	  return (
		 <Fragment>
			 <Row>
				 <Col md="8" className="bg-white">
					 <Row>
						 <Col md="8">
							 <Card className="text-left">
								 <div className="card-img">
									 <img width="100%" src={cardImg15} alt="Card cap 15" />
									 <Link to="/cards/extended-card" className="btn btn-floating halfway-fab bg-danger">
										 <Plus size={25} color="#FFF" />
									 </Link>
								 </div>
								 <CardBody>
									 <CardText>Bear claw sesame snaps gummies.</CardText>
								 </CardBody>
							 </Card>
						 </Col>
						 <Col md="4">
							 <Row>
								 <Col md="12">
									 <Card className="text-left">
										 <div className="card-img">
											 <img width="100%" src={cardImg15} alt="Card cap 15" />
											 <Link to="/cards/extended-card" className="btn btn-floating halfway-fab bg-danger">
												 <Plus size={25} color="#FFF" />
											 </Link>
										 </div>
										 <CardBody>
											 <CardText>Bear claw sesame snaps gummies.</CardText>
										 </CardBody>
									 </Card>
								 </Col>
							 </Row>

							 <Row>
								 <Col md="12">
									 <Card className="text-left">
										 <div className="card-img">
											 <img width="100%" src={cardImg15} alt="Card cap 15" />
											 <Link to="/cards/extended-card" className="btn btn-floating halfway-fab bg-danger">
												 <Plus size={25} color="#FFF" />
											 </Link>
										 </div>
										 <CardBody>
											 <CardText>Bear claw sesame snaps gummies.</CardText>
										 </CardBody>
									 </Card>
								 </Col>
							 </Row>
						 </Col>
					 </Row>

					 <Row>
						 <Col md="12">
							 <h4 className="text-bold-600">Los Angels startup guides</h4>
						 </Col>

						 <Col md="6">
							 <Card inverse>
								 <CardImg width="100%" src={cardImg03} alt="Card cap" />
								 <CardImgOverlay className="overlay-warning">
									 <CardTitle>article 3</CardTitle>
									 <CardText>
										 This is good.
									 </CardText>
								 </CardImgOverlay>
							 </Card>
						 </Col>

						 <Col md="6">
							 <Card inverse>
								 <CardImg width="100%" src={cardImg03} alt="Card cap" />
								 <CardImgOverlay className="overlay-primary">
									 <CardTitle>article 3</CardTitle>
									 <CardText>
										 This is good.
									 </CardText>
								 </CardImgOverlay>
							 </Card>
						 </Col>
					 </Row>
				 </Col>
				 <Col md="4">
					 <Row className="bg-white">
						 <Col md="2"></Col>
						 <Col md="6">
							 <Card inverse>
								 <CardImg width="100%" src={cardImg03} alt="Card cap" />
								 <CardImgOverlay className="overlay-success">
									 <CardTitle>article 1</CardTitle>
									 <CardText>
										 This is good.
									 </CardText>
								 </CardImgOverlay>
							 </Card>
						 </Col>
						 <Col md="4">

						 </Col>
					 </Row>
					 <Row className="bg-white">
						 <Col md="2"></Col>
						 <Col md="6">
							 <Card inverse>
								 <CardImg width="100%" src={cardImg03} alt="Card cap" />
								 <CardImgOverlay className="overlay-deep-orange">
									 <CardTitle>article 2</CardTitle>
									 <CardText>
										 This is good.
									 </CardText>
								 </CardImgOverlay>
							 </Card>
						 </Col>
						 <Col md="4">

						 </Col>
					 </Row>
					 <Row className="bg-white">
						 <Col md="2"></Col>
						 <Col md="6">
							 <Card inverse>
								 <CardImg width="100%" src={cardImg03} alt="Card cap" />
								 <CardImgOverlay className="overlay-shades">
									 <CardTitle>article 3</CardTitle>
									 <CardText>
										 This is good.
									 </CardText>
								 </CardImgOverlay>
							 </Card>
						 </Col>
						 <Col md="4">

						 </Col>
					 </Row>
				 </Col>
			 </Row>
		 </Fragment>
	  );
   }
}

export default NewsPage;
