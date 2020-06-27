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
import {applyToJobAction, fetchAllJobsAction} from "../../redux/actions/job";
import {getAllJobs} from "../../redux/selectors/job";
import parse from 'html-react-parser';
import {fetchAllJobCategoriesAction, fetchAllJobLocationsAction} from "../../redux/actions/common";
import {getAllJobCategories, getAllJobLocations} from "../../redux/selectors/common";
import {getToken} from "../../redux/selectors/auth";
import {withRouter} from "react-router";
import {fetchUserAction} from "../../redux/actions/user";
import {getUserData} from "../../redux/selectors/user";

class JobPage extends Component {
   state = {
      user: null,
      jobCategories: [],
	  experienceLevel: "-1",
	  jobLocation: "-1",
	  keyword: "",
	  filteredJobs: [],
   };

   componentDidMount() {
	  const {
	     fetchUser,
	     fetchAllJobs,
		 fetchAllJobCategories,
		 fetchAllJobLocations,
	  } = this.props;

	  if (fetchUser) {
	     fetchUser();
	  }

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
      const {
         allJobLocations,
		 allJobs,
      } = this.props;
      /*if (prevProps.allJobLocations !== allJobLocations) {
         if (allJobLocations) {
            this.setState({jobLocation: allJobLocations && allJobLocations[0]._id});
            this.onClickSearch();
		 }
	  }*/

      if (allJobs !== prevProps.allJobs) {
         this.onClickSearch();
	  }
   }

   onChangeInput = (value, stateName) => {
      this.setState({[stateName]: value});
   }

   onClickEnter = (e) => {
      if (e.keyCode === 13) {
         this.onClickSearch();
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
	  const {allJobs} = this.props;
	  const {
	     jobCategories,
		 jobLocation,
		 experienceLevel,
		 keyword,
	  } = this.state;
	  const filtered = allJobs && allJobs.filter(job => {
	     const jobLocationFlag = jobLocation === "-1" ? true: jobLocation === job.jobLocation;
		 const experienceLevelFlag = experienceLevel === "-1" ? true : experienceLevel === job.experienceLevel;
		 const keywordFlag = keyword.trim() === "" ? true: (
		    job.title && job.title.toLowerCase()
			   .indexOf(keyword.toLowerCase())
		 ) !== -1;

	     if (jobLocationFlag && experienceLevelFlag && keywordFlag && job.published) {
			if (jobCategories && jobCategories.length > 0) {
			   const index = jobCategories.findIndex(category => category === job.jobCategory);
			   return index !== -1;
			}
			return true;
		 } else {
	        return false;
		 }
	  });

	  this.setState({filteredJobs: filtered});
   }

   applyToJob = (jobId) => {
      const {
         token,
		 history,
		 applyToJob,
      } = this.props;
      if (token) {
         const data = {
            id: jobId,
		 }
		 applyToJob(data);
	  } else {
         history.push('/login');
	  }
   }

   render() {
	  const {
	     userData,
		 allJobCategories,
		 allJobLocations,
	  } = this.props;
	  const {
	     keyword,
	     jobLocation,
	     experienceLevel,
		 jobCategories,
		 filteredJobs,
	  } = this.state;
	  const userId = userData && userData._id;

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
									<option value="-1">Select experience level</option>
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
									<option value="-1">Select location</option>
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
									<Input
									   type="text"
									   id="iconLeft"
									   name="iconLeft"
									   className="round"
									   value={keyword}
									   onChange={(e) => this.onChangeInput(e.target.value, 'keyword')}
									   onKeyDown={(e) => this.onClickEnter(e)}
									/>
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
								 filteredJobs && filteredJobs.map((job, index) => {
								    const companyLogo = job.company && job.company.logoImg;
									const applied = job.applies.findIndex(applicant => applicant.candidate === userId) !== -1;
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
												   {job.description && parse(job.description)}
												</Col>
												<Col md="2" sm="12" className="text-center">
												   {
												      !applied ? (
														 <Button
															color="primary"
															onClick={() => this.applyToJob(job._id)}
														 >
															Apply
														 </Button>
													  ) : (
													     <Label>applied</Label>
													  )
												   }
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
   userData: getUserData(state),
   token: getToken(state),
   allJobs: getAllJobs(state),
   allJobCategories: getAllJobCategories(state),
   allJobLocations: getAllJobLocations(state),
});

const mapDispatchToProps = (dispatch) =>
   bindActionCreators(
	  {
		 fetchUser: fetchUserAction,
		 fetchAllJobs: fetchAllJobsAction,
		 fetchAllJobCategories: fetchAllJobCategoriesAction,
		 fetchAllJobLocations: fetchAllJobLocationsAction,
		 applyToJob: applyToJobAction,
	  },
	  dispatch,
   )

export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(withRouter(JobPage));
