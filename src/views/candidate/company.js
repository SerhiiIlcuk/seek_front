// import external modules
import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {
   Row,
   Col,
   Card,
   CardBody,
   Input,
   FormGroup,
   Button,
   Pagination,
   PaginationItem,
   PaginationLink
} from "reactstrap";
import CarouselSliderCard from "../../components/cards/carouselSliderCard";
import {bindActionCreators} from "redux";
import {fetchAllCompaniesAction} from "../../redux/actions/company";
import {getAllCompanies} from "../../redux/selectors/company";
import config from "../../config";

class CompanyPage extends Component {
   componentDidMount() {
	  const {fetchAllCompanies} = this.props;

	  if (fetchAllCompanies) {
		 fetchAllCompanies();
	  }
   }

   render() {
	  const {allCompanies} = this.props;
	  const jobs = [
		 {
			id: 1,
			info: "IMB",
			description: "Our company is looking for a developer"
		 },
		 {
			id: 2,
			info: "IMB",
			description: "Our company is looking for a developer"
		 },
		 {
			id: 3,
			info: "IMB",
			description: "Our company is looking for a developer"
		 },
		 {
			id: 4,
			info: "IMB",
			description: "Our company is looking for a developer"
		 },
		 {
			id: 5,
			info: "IMB",
			description: "Our company is looking for a developer"
		 },
	  ];

	  return (
		 <Fragment>
			<Row>
			   <Col md="12">
				  <CarouselSliderCard
					 cardTitle=""
					 description=""
				  />
			   </Col>
			</Row>

			<Row>
			   <Col md="12">
				  <Card>
					 <CardBody>
						<Row>
						   <Col md="12">
							  <p className="text-dark">
								 Companies Hiring Right Now
							  </p>
						   </Col>
						</Row>

						<Row>
						   <Col md="3" sm="12">
							  <FormGroup>
								 <Input type="select" id="profession" name="profession">
									<option value="1">Sales</option>
									<option value="2">Marketing</option>
									<option value="3">Development</option>
								 </Input>
							  </FormGroup>
						   </Col>
						   <Col md="3" sm="12">
							  <FormGroup>
								 <Input type="select" id="profession" name="profession">
									<option value="1">Sales</option>
									<option value="2">Marketing</option>
									<option value="3">Development</option>
								 </Input>
							  </FormGroup>
						   </Col>
						   <Col md="3" sm="12">
							  <FormGroup>
								 <Input type="select" id="profession" name="profession">
									<option value="1">Sales</option>
									<option value="2">Marketing</option>
									<option value="3">Development</option>
								 </Input>
							  </FormGroup>
						   </Col>
						   <Col md="3" sm="12">
							  <FormGroup>
								 <Input type="select" id="profession" name="profession">
									<option value="1">Sales</option>
									<option value="2">Marketing</option>
									<option value="3">Development</option>
								 </Input>
							  </FormGroup>
						   </Col>
						</Row>

						<Row>
						   <Col md="12">
							  {
								 allCompanies && allCompanies.map((company, index) => (
									<Card color="secondary" key={index}>
									   <CardBody>
										  <Row>
											 <Col md="2" sm="12" className="text-center">
												{
												   company.logoImg &&
												   <img
													  src={config.baseUrl + company.logoImg}
													  className="rounded-circle img-border gradient-summer width-50"
													  alt="company logo"
												   />
												}
											 </Col>
											 <Col md="2" sm="12" className="text-center">
												{company.name}
											 </Col>
											 <Col md="6" sm="12" className="text-center">
												{company.streetAddressOne}
											 </Col>
											 <Col md="2" sm="12" className="text-center">
												<Button color="primary">Save</Button>
											 </Col>
										  </Row>
									   </CardBody>
									</Card>
								 ))
							  }
						   </Col>
						</Row>

						{/*<Row>
						   <Col md="1"></Col>
						   <Col md="10" className="d-none d-md-block">
							  <Pagination aria-label="Page navigation example">
								 <PaginationItem disabled>
									<PaginationLink previous href="#"/>
								 </PaginationItem>
								 <PaginationItem active>
									<PaginationLink href="#">1</PaginationLink>
								 </PaginationItem>
								 <PaginationItem>
									<PaginationLink href="#">2</PaginationLink>
								 </PaginationItem>
								 <PaginationItem>
									<PaginationLink href="#">3</PaginationLink>
								 </PaginationItem>
								 <PaginationItem>
									<PaginationLink href="#">4</PaginationLink>
								 </PaginationItem>
								 <PaginationItem>
									<PaginationLink href="#">5</PaginationLink>
								 </PaginationItem>
								 <PaginationItem>
									<PaginationLink next href="#"/>
								 </PaginationItem>
							  </Pagination>
						   </Col>

						   <Col md="10" className="d-lg-none d-md-none d-sm-block">
							  <Pagination aria-label="Page navigation example">
								 <PaginationItem disabled>
									<PaginationLink previous href="#"/>
								 </PaginationItem>
								 <PaginationItem>
									<PaginationLink next href="#"/>
								 </PaginationItem>
							  </Pagination>
						   </Col>
						</Row>*/}
					 </CardBody>
				  </Card>
			   </Col>
			</Row>
		 </Fragment>
	  );
   }
}

const mapStateToProps = (state) => ({
   allCompanies: getAllCompanies(state),
});

const mapDispatchToProps = (dispatch) =>
   bindActionCreators(
	  {
		 fetchAllCompanies: fetchAllCompaniesAction,
	  },
	  dispatch,
   )

export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(CompanyPage);
