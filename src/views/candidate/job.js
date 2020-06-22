// import external modules
import React, {Component, Fragment} from "react";
import {connect} from "react-redux"
import {
   Card,
   CardBody,
   CardTitle,
   Row,
   Col,
   Button,
   FormGroup,
   Label,
   Input,
   CustomInput,
   Pagination,
   PaginationItem,
   PaginationLink
} from "reactstrap";
import config from "../../config"
import {bindActionCreators} from "redux";
import {fetchAllJobsAction} from "../../redux/actions/job";
import {getAllJobs} from "../../redux/selectors/job";
import parse from 'html-react-parser';

class JobPage extends Component {
   componentDidMount() {
	  const {fetchAllJobs} = this.props;

	  if (fetchAllJobs) {
		 fetchAllJobs();
	  }
   }

   render() {
	  const {allJobs} = this.props;

	  return (
		 <Fragment>
			<Row>
			   <Col md="1"></Col>
			   <Col md="10">
				  <Card>
					 <CardBody>
						<Row>
						   <Col md="12">
							  <Row>
								 <Col md="3" sm="12">
									<FormGroup>
									   <CustomInput type="checkbox" id="checkbox1" label="Category 1"/>
									</FormGroup>
								 </Col>
								 <Col md="3" sm="12">
									<FormGroup>
									   <CustomInput type="checkbox" id="checkbox2" label="Category 2"/>
									</FormGroup>
								 </Col>
								 <Col md="3" sm="12">
									<FormGroup>
									   <CustomInput type="checkbox" id="checkbox3" label="Category 3"/>
									</FormGroup>
								 </Col>
								 <Col md="3" sm="12">
									<FormGroup>
									   <CustomInput type="checkbox" id="checkbox4" label="Category 4"/>
									</FormGroup>
								 </Col>
								 <Col md="3" sm="12">
									<FormGroup>
									   <CustomInput type="checkbox" id="checkbox5" label="Category 5"/>
									</FormGroup>
								 </Col>
								 <Col md="3" sm="12">
									<FormGroup>
									   <CustomInput type="checkbox" id="checkbox6" label="Category 6"/>
									</FormGroup>
								 </Col>
								 <Col md="3" sm="12">
									<FormGroup>
									   <CustomInput type="checkbox" id="checkbox7" label="Category 7"/>
									</FormGroup>
								 </Col>
								 <Col md="3" sm="12">
									<FormGroup>
									   <CustomInput type="checkbox" id="checkbox8" label="Category 8"/>
									</FormGroup>
								 </Col>
							  </Row>
						   </Col>
						</Row>
						<Row>
						   <Col md="6" sm="12">
							  <FormGroup>
								 <Input type="select" id="profession" name="profession">
									<option value="1">Sales</option>
									<option value="2">Marketing</option>
									<option value="3">Development</option>
								 </Input>
							  </FormGroup>
						   </Col>
						   <Col md="6" sm="12">
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
						   <Col md="9" sm="12">
							  <FormGroup>
								 <div className="position-relative has-icon-left">
									<Input type="text" id="iconLeft" name="iconLeft" className="round"/>
								 </div>
							  </FormGroup>
						   </Col>
						   <Col md="3" sm="12" className="text-center">
							  <Button color="primary">
								 Search
							  </Button>
						   </Col>
						</Row>
					 </CardBody>
				  </Card>

				  <Card>
					 <CardBody>
						<Row>
						   <Col md="12">
							  {
								 allJobs && allJobs.map((job, index) => {
								    const companyLogo = job.company && job.company.logoImg;
									return (
									   <Card color="secondary" key={index}>
										  <CardBody>
											 <Row>
												<Col md="2" sm="12" className="text-center">
												   {
												      companyLogo &&
														 <img
															src={config.baseUrl + companyLogo}
															className="rounded-circle img-border gradient-summer width-50"
															alt="company logo"
														 />

												   }
												</Col>
												<Col md="2" sm="12" className="text-center">
												   {job.title}
												</Col>
												<Col md="6" sm="12" className="text-center">
												   {parse(job.description)}
												</Col>
												<Col md="2" sm="12" className="text-center">
												   <Button color="primary">Save</Button>
												</Col>
											 </Row>
										  </CardBody>
									   </Card>
									)
								 })
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
   allJobs: getAllJobs(state),
});

const mapDispatchToProps = (dispatch) =>
   bindActionCreators(
	  {
		 fetchAllJobs: fetchAllJobsAction,
	  },
	  dispatch,
   )

export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(JobPage);
