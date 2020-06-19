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
import {EditorState} from 'draft-js';
import {getErrMessage, getSubmitting, getSuccess} from "../../redux/selectors/job";
import {bindActionCreators} from "redux";
import {createJobAction} from "../../redux/actions/job";
import {connect} from "react-redux";
import {toastr} from "react-redux-toastr";

const formSchema = Yup.object().shape({
   company: Yup.string(),
   title: Yup.string()
	  .required("Required"),
   location: Yup.string()
	  .required("Required")
});

class JobPost extends Component {
   state = {
	  summary: "",
	  howToApply: "",
	  description: EditorState.createEmpty(),
	  published: false,
	  unpublished: true,
   };

   componentDidUpdate(prevProps, prevState, snapshot) {
	  const {
		 success,
		 submitting,
		 errMessage
	  } = this.props;

	  if (prevProps.submitting !== submitting) {
		 if (!submitting) {
			if (!submitting) {
			   if (success) {
				  toastr.success(
					 "Success",
					 "Job Created successfully",
					 {
						position: "top-right",
						timeOut: 1000
					 }
				  );
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
	  return stateToHTML(description.getCurrentContent());
   };

   render() {
	  const {
		 summary,
		 howToApply,
		 description,
		 published,
		 unpublished,
	  } = this.state;
	  const {createJob} = this.props;

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
						company: "",
						title: "",
						location: ""
					 }}
					 validationSchema={formSchema}
					 onSubmit={values => {
						const description = this.convertStateToHtml();
						const data = {
						   ...values,
						   published,
						   summary,
						   howToApply,
						   description
						};

						createJob(data);
					 }}
				  >
					 {({errors, touched}) => (
						<Form>
						   <Card>
							  <CardHeader>POST JOB</CardHeader>
							  <CardBody>
								 <Row>
									<Col md="6">
									   <FormGroup>
										  <Label for="company">Company</Label>
										  <Field name="company" id="company"
												 className={`form-control ${errors.company && touched.company && 'is-invalid'}`}/>
										  {errors.company && touched.company ?
											 <div className="invalid-feedback">{errors.company}</div> : null}
									   </FormGroup>
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
										  <Input type="select" id="experienceLevel" name="experienceLevel">
											 <option value="1">1-3 Years</option>
											 <option value="2">3-5 Years</option>
											 <option value="3">5++ Years</option>
										  </Input>
									   </FormGroup>
									</Col>
									<Col md="4">
									   <FormGroup>
										  <Label for="location">Location</Label>
										  <Field name="location" id="location"
												 className={`form-control ${errors.location && touched.location && 'is-invalid'}`}/>
										  {errors.location && touched.location ?
											 <div
												className="invalid-feedback">{errors.location}</div> : null}
									   </FormGroup>
									</Col>
									<Col md="4">
									   <FormGroup>
										  <Label for="jobCategories">Job Categories</Label>
										  <Input type="select" id="jobCategories" name="jobCategories">
											 <option value="1">Sales</option>
											 <option value="2">Marketing</option>
											 <option value="3">Development</option>
										  </Input>
									   </FormGroup>
									</Col>
								 </Row>

								 <Row>
									<Col md="12">
									   <Label>Select at least one subcategory</Label>
									</Col>
									<Col md="4">
									   <FormGroup>
										  <CustomInput type="checkbox" id="111" label="Customer Success"/>
										  <CustomInput type="checkbox" id="222" label="Operation"/>
									   </FormGroup>
									</Col>
									<Col md="4">
									   <FormGroup>
										  <CustomInput type="checkbox" id="555" label="Account Executive"/>
										  <CustomInput type="checkbox" id="666" label="Sales Development"/>
									   </FormGroup>
									</Col>
									<Col md="4">
									   <FormGroup>
										  <CustomInput type="checkbox" id="333" label="Account Management"/>
										  <CustomInput type="checkbox" id="444" label="Leadership"/>
									   </FormGroup>
									</Col>
								 </Row>

								 <Row>
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
});

const mapDispatchToProps = (dispatch) =>
   bindActionCreators(
	  {
		 createJob: createJobAction,
	  },
	  dispatch,
   )

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(JobPost);
