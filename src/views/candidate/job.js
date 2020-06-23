// import external modules
import React, {Component, Fragment} from "react";
import {connect} from "react-redux"
import {
   Card,
   CardBody,
   Row,
   Col,
   Button,
   FormGroup,
   Input,
   CustomInput, Label,
} from "reactstrap";
import {experienceLevels} from "../../config/constants";
import config from "../../config"
import {bindActionCreators} from "redux";
import {fetchAllJobsAction} from "../../redux/actions/job";
import {getAllJobs} from "../../redux/selectors/job";
import parse from 'html-react-parser';
import {fetchAllJobCategoriesAction, fetchAllJobLocationsAction} from "../../redux/actions/common";
import {getAllJobCategories, getAllJobLocations} from "../../redux/selectors/common";

class JobPage extends Component {
   state = {
      jobCategories: [],
	  experienceLevel: "1",
	  jobLocation: "",
	  keyword: "",
   };

   componentDidMount() {
	  const {
	     fetchAllJobs,
		 fetchAllJobCategories,
		 fetchAllJobLocations,
	  } = this.props;

	  if (fetchAllJobs) {
		 fetchAllJobs();
	  }

	  if (fetchAllJobCategories) {
	     fetchAllJobCategories();
	  }

	  if (fetchAllJobLocations) {
		 fetchAllJobLocations();
	  }
   }

   componentDidUpdate(prevProps, prevState, snapshot) {
      const {allJobLocations} = this.props;
      if (prevProps.allJobLocations !== allJobLocations) {
         if (allJobLocations) {
            this.setState({jobLocation: allJobLocations && allJobLocations[0]._id});
		 }
	  }
   }

   onChangeDropdown = (id, stateName) => {
	  this.setState({[stateName]: id});
   }

   onChangeCheckbox = (checked, id, stateName) => {
	  const temp = this.state[stateName];
	  const data = JSON.parse(JSON.stringify(temp));
	  const index = data.findIndex(item => item === id);

	  if (index === -1) {
		 if (checked) {
			data.push(id);
		 }
	  } else {
		 if (!checked) {
			data.splice(index, 1);
		 }
	  }

	  this.setState({[stateName]: data});
   }

   onClickSearch = () => {

   }

   render() {
	  const {
	     allJobs,
		 allJobCategories,
		 allJobLocations,
	  } = this.props;
	  const {
	     jobLocation,
	     experienceLevel,
		 jobCategories,
	  } = this.state;

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
								 <Col md="12">
									<Label>Job Categories</Label>
								 </Col>
								 {
								    allJobCategories && allJobCategories.map(item => {
									   const id = item._id;
									   const checked = jobCategories.findIndex(ele => ele === item._id) !== -1;
								       return (
										  <Col key={item._id} md="3" sm="12" className="mb-2">
											 <CustomInput
												type="checkbox"
												id={id}
												label={item.name}
												checked={checked}
												onChange={(e) => this.onChangeCheckbox(e.target.checked, item._id, 'jobCategories')}
											 />
										  </Col>
									   )
									})
								 }
							  </Row>
						   </Col>
						</Row>
						<Row>
						   <Col md="6" sm="12">
							  <FormGroup>
								 <Label for="experienceLevel">Experience level</Label>
								 <Input
									type="select"
									id="experienceLevel"
									name="experienceLevel"
									value={experienceLevel}
									onChange={(e) => this.onChangeDropdown(e.target.value, 'experienceLevel')}
								 >
									{
									   experienceLevels && experienceLevels.map(item => {
										  return (
											 <option key={item.id} value={item.id}>{item.title}</option>
										  )
									   })
									}
								 </Input>
							  </FormGroup>
						   </Col>
						   <Col md="6" sm="12">
							  <FormGroup>
								 <Label for="location">Location</Label>
								 <Input
									type="select"
									id="location"
									name="location"
									value={jobLocation}
									onChange={(e) => this.onChangeDropdown(e.target.value, 'jobLocation')}
								 >
									{
									   allJobLocations && allJobLocations.map(item => {
										  return (
											 <option
												key={item._id}
												value={item._id}
											 >{item.name}
											 </option>
										  )
									   })
									}
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
							  <Button
								 color="primary"
								 onClick={this.onClickSearch}
							  >
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
   allJobCategories: getAllJobCategories(state),
   allJobLocations: getAllJobLocations(state),
});

const mapDispatchToProps = (dispatch) =>
   bindActionCreators(
	  {
		 fetchAllJobs: fetchAllJobsAction,
		 fetchAllJobCategories: fetchAllJobCategoriesAction,
		 fetchAllJobLocations: fetchAllJobLocationsAction,
	  },
	  dispatch,
   )

export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(JobPage);
