import React from "react";
import {ShoppingCart} from "react-feather";

import templateConfig from "../../../templateConfig";
import {Card, CardBody, Col, Row} from "reactstrap";

const Footer = props => (
   templateConfig.footer.visible ? (
	  <footer>
		 {templateConfig.buyNow ? (
			<a
			   href="https://pixinvent.com/demo/apex-react-redux-bootstrap-admin-dashboard-template/landing-page/"
			   className="btn btn-floating btn-buynow gradient-pomegranate btn-round shadow-z-3 px-3 white"
			   target="_blank"
			   rel="noopener noreferrer"
			>
			   <ShoppingCart size={16}/>
			   {"  "}Buy Now
			</a>
		 ) : (
			""
		 )}
		 <div className="container-fluid bg-dark">
			<Row>
			   <Col md="9">
				  <p className="text-center text-white">
					 © 2020
				  </p>
			   </Col>
			   <Col md="3" className="d-flex flex-column">
				  <p className="text-white">
					 ABOUT
				  </p>
				  <p className="text-white">
					 Our Story
				  </p>
				  <p className="text-white">
					 Careers
				  </p>
				  <p className="text-white">
					 Contact Us
				  </p>
			   </Col>
			</Row>
		 </div>
	  </footer>
   ) : null
);

export default Footer;
