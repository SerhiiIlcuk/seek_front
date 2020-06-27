import React, {Component, Fragment} from "react";
import {
   Card,
   CardBody,
   Row,
   Col,
   Button,
   FormGroup,
   Label,
   Input,
   CustomInput,
   CardHeader
} from "reactstrap";

import {Formik, Field, Form} from "formik";
import * as Yup from "yup";
import "../../assets/scss/views/form/profile.scss"
import {Editor} from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../../assets/scss/views/components/extra/editor.scss";
import {stateToHTML} from 'draft-js-export-html'
import {EditorState, convertFromHTML, ContentState} from 'draft-js';
import {getErrMessage, getSubmitting, getSuccess, getJob} from "../../redux/selectors/job";
import {bindActionCreators} from "redux";
import {createJobAction, fetchJobAction, updateJobAction} from "../../redux/actions/job";
import {experienceLevels} from "../../config/constants";
import {
   fetchAllJobCategoriesAction,
   fetchAllJobLocationsAction
} from "../../redux/actions/common";
import {getAllJobCategories, getAllJobLocations} from "../../redux/selectors/common";
import {connect} from "react-redux";
import {toastr} from "react-redux-toastr";

const formSchema = Yup.object().shape({
   title: Yup.string()
	  .required("Required")
});

class JobPost extends Component {
   state = {
	  postPage: true,
	  summary: "",
	  howToApply: "",
	  description: EditorState.createEmpty(),
	  published: false,
	  unpublished: true,
	  experienceLevel: "1",
	  jobLocation: this.props.allJobLocations && this.props.allJobLocations[0]._id, // selected job location by user
	  jobCategory: "", // selected job category by user
	  subCategories: [], // subcategories showed when job category change
	  jobSubCategories: [], // selected subcategories by user
	  errors: [],
   };

   componentDidMount() {
	  const {
		 location,
		 match,
		 fetchJob,
		 fetchAllJobCategories,
		 fetchAllJobLocations,
	  } = this.props;

	  // if job edit page
	  if (location.pathname.includes("job-edit") && location.pathname.includes("employee")) {
		 const jobId = match.params.id;
		 this.setState({postPage: false});
		 if (jobId) {
			fetchJob(jobId);
		 }
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
		 success,
		 submitting,
		 errMessage,
		 history,
		 job,
		 allJobCategories,
		 allJobLocations,
	  } = this.props;
	  const {postPage} = this.state;

	  if (prevProps.submitting !== submitting) {
		 if (!submitting) {
			if (!submitting) {
			   if (success) {
				  toastr.success(
					 "Success",
					 postPage ? "Job Created successfully" : "Job Updated successfully",
					 {
						position: "top-right",
						timeOut: 1000
					 }
				  );
				  if (postPage) {
					 history.push('/employee/manage-jobs');
				  }
			   } else {
				  toastr.error(
					 "Error",
					 errMessage,
					 {
						position: "top-right",
						timeOut: 1000
					 }
				  );
			   }
			}
		 }
	  }

	  if (job !== prevProps.job) {
		 if (job) {
			let descriptionState;
			if (job.description) {
			   const blocksFromHTML = convertFromHTML(job.description);
			   if (blocksFromHTML && blocksFromHTML.contentBlocks && blocksFromHTML.entityMap) {
				  descriptionState = ContentState.createFromBlockArray(
					 blocksFromHTML.contentBlocks,
					 blocksFromHTML.entityMap,
				  );
			   }
			}
			this.setState({
			   summary: job.summary,
			   howToApply: job.howToApply,
			   published: job.published,
			   unpublished: !job.published,
			   description: descriptionState && EditorState.createWithContent(descriptionState),
			   experienceLevel: job.experienceLevel || "1",
			   jobLocation: job.jobLocation || "",
			   jobCategory: (job.jobCategory && job.jobCategory._id) || "",
			   jobSubCategories: job.jobSubCategories || [],
			   subCategories: (job.jobCategory && job.jobCategory.subCategories) ||
				  (allJobCategories && allJobCategories[0] && allJobCategories.subCategories),
			});
		 }
	  }

	  if (allJobCategories !== prevProps.allJobCategories) {
		 if (allJobCategories && allJobCategories.length > 0) {
		    if (!(job && job.jobCategory)) {
			   this.setState({
				  jobCategory: allJobCategories[0]._id,
				  subCategories: allJobCategories[0].subCategories,
			   });
			}
		 }
	  }

	  if (allJobLocations !== prevProps.allJobLocations) {
		 if (allJobLocations && allJobLocations.length > 0) {
			if (!(job && job.jobLocation)) {
			   this.setState({
				  jobLocation: allJobLocations[0]._id,
			   });
			}
		 }
	  }
   }

   onChange = (key, value) => {
	  this.setState({[key]: value});
   }

   onInputChange = (value, key) => {
	  if (key === "published") {
		 this.setState({published: true});
		 this.setState({unpublished: false});
	  } else if (key === "unpublished") {
		 this.setState({published: false});
		 this.setState({unpublished: true});
	  }
   };

   convertStateToHtml = () => {
	  const {description} = this.state;
	  if (description) {
		 return stateToHTML(description.getCurrentContent());
	  } else {
	     return null;
	  }
   };

   onChangeDropdown = (id, stateName) => {
	  this.setState({[stateName]: id});
	  if (stateName === 'jobCategory') {
		 const category = this.props.allJobCategories.find(item => item._id === id);
	     this.setState({
			subCategories: category && category.subCategories, // change subcategories according to job category
			jobSubCategories: [], // initializing when change job category
		 });
	  }
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

   render() {
	  const {
		 summary,
		 howToApply,
		 description,
		 published,
		 unpublished,
		 postPage,
		 jobCategory,
		 jobLocation,
		 subCategories,
		 jobSubCategories,
		 experienceLevel,
		 errors,
	  } = this.state;
	  const {
		 job,
		 updateJob,
		 createJob,
		 allJobCategories,
		 allJobLocations,
	  } = this.props;
	  const jobSubCategoriesError = errors.indexOf('jobSubCategories') !== -1;
	  return (
		 <Fragment>
			{/*<ContentHeader>POST JOB</ContentHeader>*/}
			{/*<ContentSubHeader>
			   <p>Form Validation example.</p>
			   <a href="https://github.com/jaredpalmer/formik" target="_blank" rel="noopener noreferrer">
				  <img src="https://img.shields.io/github/stars/jaredpalmer/formik.svg?style=social" alt="Stars" />
				  <img src="https://img.shields.io/npm/dm/formik.svg" alt="Downloads"/>
			   </a>
			</ContentSubHeader>*/}
			<Row>
			   <Col sm="2"/>
			   <Col sm="8">
				  <Formik
					 initialValues={{
						title: (job && job.title) || "",
					 }}
					 validationSchema={formSchema}
					 onSubmit={values => {
					    if (!(jobSubCategories && jobSubCategories.length > 0)) {
						   const data = JSON.parse(JSON.stringify(this.state.errors));
						   if (data.indexOf('jobSubCategories') === -1) {
							  data.push('jobSubCategories');
						   }

						   this.setState({errors: data});
					       return;
						}

						const description = this.convertStateToHtml();
						const data = {
						   ...values,
						   published,
						   summary,
						   howToApply,
						   description,
						   jobSubCategories,
						   jobCategory,
						   jobLocation,
						   experienceLevel,
						};

						if (postPage) { // job post page
						   createJob(data);
						} else { // job edit page
						   const updateData = {
							  id: job._id,
							  ...data,
						   };
						   updateJob(updateData);
						}
					 }}
					 enableReinitialize
				  >
					 {({errors, touched}) => (
						<Form>
						   <Card>
							  <CardHeader>POST JOB</CardHeader>
							  <CardBody>
								 <Row>
									<Col md="6">
									   {/*<FormGroup>
										  <Label for="company">Company</Label>
										  <Field name="company" id="company"
												 className={`form-control ${errors.company && touched.company && 'is-invalid'}`}/>
										  {errors.company && touched.company ?
											 <div className="invalid-feedback">{errors.company}</div> : null}
									   </FormGroup>*/}
									</Col>
									<Col md="6">
									   <FormGroup>
										  <Label for="title">Job Title</Label>
										  <Field name="title" id="title"
												 className={`form-control ${errors.title && touched.title && 'is-invalid'}`}/>
										  {errors.title && touched.title ?
											 <div className="invalid-feedback">{errors.title}</div> : null}
									   </FormGroup>
									</Col>
								 </Row>

								 <Row>
									<Col md="4">
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
									<Col md="4">
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
									<Col md="4">
									   <FormGroup>
										  <Label for="jobCategories">Job Categories</Label>
										  <Input
											 type="select"
											 id="jobCategories"
											 name="jobCategories"
											 value={jobCategory}
											 onChange={(e) => this.onChangeDropdown(e.target.value, 'jobCategory')}
										  >
											 {
												allJobCategories && allJobCategories.map(item => {
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
									<Col md="12">
									   <Label>Select at least one subcategory</Label>
									</Col>
									{
									   subCategories && subCategories.map((item, key) => {
									      const id = key + item;
										  const checked = jobSubCategories.findIndex(ele => ele === item) !== -1;
										  return (
											 <Col md="4" key={key}>
												<CustomInput
												   type="checkbox"
												   label={item}
												   checked={checked}
												   id={id}
												   onChange={(e) => this.onChangeCheckbox(e.target.checked, item, 'jobSubCategories')}
												/>
											 </Col>
										  )
									   })
									}
									{
									   (jobSubCategoriesError && (!jobSubCategories || jobSubCategories.length === 0)) &&
									   <div className="font-small-2 text-danger">Please choose at least one item</div>
									}
								 </Row>

								 <Row className="mt-3">
									<Col md="12">
									   <FormGroup>
										  <Label for="summary">Summary (Hide summary)</Label>
										  <Input
											 type="textarea"
											 id="summary"
											 rows="5"
											 value={summary}
											 onChange={(e) => {
												this.onChange("summary", e.target.value)
											 }}
										  />
									   </FormGroup>
									</Col>
								 </Row>

								 <Row>
									<Col md="12">
									   <FormGroup>
										  <Label for="description">Description</Label>
										  <Editor
											 id="description"
											 editorClassName="demo-editor"
											 editorState={description}
											 onEditorStateChange={(e) => this.onChange('description', e)}
										  />
									   </FormGroup>
									</Col>
								 </Row>

								 <Row>
									<Col md="12">
									   <FormGroup>
										  <Label for="howToApply">How to apply</Label>
										  <Input
											 type="textarea"
											 id="howToApply"
											 rows="5"
											 value={howToApply}
											 onChange={(e) => {
												this.onChange("howToApply", e.target.value)
											 }}
										  />
									   </FormGroup>
									</Col>
								 </Row>

								 <Row>
									<Col md="12">
									   <FormGroup>
										  <Label for="remoteJob">Remote Job</Label>
										  <Input type="select" id="remoteJob" name="remoteJob">
											 <option value="1">- None -</option>
											 <option value="2">Part Time</option>
											 <option value="3">Full Time</option>
										  </Input>
									   </FormGroup>
									</Col>
								 </Row>
								 <Row>
									<Col md="12" className="ml-3">
									   <FormGroup tag="fieldset">
										  <Row>
											 <Col md="6">
												<Label check>
												   <Input
													  type="radio"
													  name="published"
													  checked={published}
													  onChange={(e) => this.onInputChange(e.target.checked, "published")}
												   />
												   Publish
												</Label>
											 </Col>
											 <Col md="6">
												<Label check>
												   <Input
													  type="radio"
													  name="unpublished"
													  checked={unpublished}
													  onChange={(e) => this.onInputChange(e.target.checked, "unpublished")}
												   />
												   UnPublish
												</Label>
											 </Col>
										  </Row>
									   </FormGroup>
									</Col>
								 </Row>
								 <Row>
									<Col md="12" className="text-center">
									   <Button type="submit" className="mr-2" color="success" size="lg">Submit</Button>
									</Col>
								 </Row>
							  </CardBody>
						   </Card>
						</Form>
					 )}
				  </Formik>
			   </Col>
			</Row>
		 </Fragment>
	  );
   }
}

const mapStateToProps = (state) => ({
   success: getSuccess(state),
   submitting: getSubmitting(state),
   errMessage: getErrMessage(state),
   job: getJob(state),
   allJobCategories: getAllJobCategories(state),
   allJobLocations: getAllJobLocations(state),
});

const mapDispatchToProps = (dispatch) =>
   bindActionCreators(
	  {
		 createJob: createJobAction,
		 updateJob: updateJobAction,
		 fetchJob: fetchJobAction,
		 fetchAllJobLocations: fetchAllJobLocationsAction,
		 fetchAllJobCategories: fetchAllJobCategoriesAction,
	  },
	  dispatch,
   )

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(JobPost);
