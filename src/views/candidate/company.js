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
   Button
   , Label
} from "reactstrap";
import CarouselSliderCard from "../../components/cards/carouselSliderCard";
import {bindActionCreators} from "redux";
import {fetchAllCompaniesAction, fetchAllCompanyTypesAction} from "../../redux/actions/company";
import {getAllCompanies, getAllCompanyTypes} from "../../redux/selectors/company";
import config from "../../config";
import {companySizes, experienceLevels} from "../../config/constants";

class CompanyPage extends Component {
   state = {
      companyType: "-1",
	  companySize: "-1",
   };
   componentDidMount() {
	  const {
	     fetchAllCompanies,
		 fetchAllCompanyTypes,
	  } = this.props;

	  if (fetchAllCompanies) {
		 fetchAllCompanies();
	  }

	  if (fetchAllCompanyTypes) {
		 fetchAllCompanyTypes();
	  }
   }

   onChangeDropdown = (id, stateName) => {
	  this.setState({[stateName]: id});
   }

   render() {
	  const {
	     allCompanies,
		 allCompanyTypes,
	  } = this.props;
	  const {
	     companyType,
		 companySize,
	  } = this.state;

	  return (
		 <Fragment>
			<Row>
			   <Col md="12">
				  {/*<CarouselSliderCard
					 cardTitle=""
					 description=""
				  />*/}
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
								 <Label for="companyType">Company Type</Label>
								 <Input
									type="select"
									id="companyType"
									name="companyType"
									value={companyType}
									onChange={(e) => this.onChangeDropdown(e.target.value, 'companyType')}
								 >
									<option value="-1">Select company type</option>
									{
									   allCompanyTypes && allCompanyTypes.map(item => {
										  return (
											 <option key={item._id} value={item._id}>{item.typeName}</option>
										  )
									   })
									}
								 </Input>
							  </FormGroup>
						   </Col>
						   <Col md="3" sm="12">
							  <FormGroup>
								 <Label for="companySize">Company Size</Label>
								 <Input
									type="select"
									id="companySize"
									name="companySize"
									value={companySize}
									onChange={(e) => this.onChangeDropdown(e.target.value, 'companySize')}
								 >
									<option value="-1">Select company size</option>
									{
									   companySizes && companySizes.map(item => {
										  return (
											 <option key={item.id + "size"} value={item.id}>{item.title}</option>
										  )
									   })
									}
								 </Input>
							  </FormGroup>
						   </Col>
						   <Col md="3" sm="12">
							  <FormGroup>
								 <Label for="industry">Company Industry</Label>
								 <Input type="select" id="industry" name="industry">

								 </Input>
							  </FormGroup>
						   </Col>
						   <Col md="3" sm="12">
							  <FormGroup>
								 <Label for="role">Company Role</Label>
								 <Input type="select" id="role" name="role">

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
												<Button color="primary">View Jobs</Button>
											 </Col>
										  </Row>
									   </CardBody>
									</Card>
								 ))
							  }
						   </Col>
						</Row>
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
   allCompanyTypes: getAllCompanyTypes(state),
});

const mapDispatchToProps = (dispatch) =>
   bindActionCreators(
	  {
		 fetchAllCompanies: fetchAllCompaniesAction,
		 fetchAllCompanyTypes: fetchAllCompanyTypesAction,
	  },
	  dispatch,
   )

export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(CompanyPage);
