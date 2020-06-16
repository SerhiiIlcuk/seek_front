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
import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../../assets/scss/views/components/extra/editor.scss";

const formSchema = Yup.object().shape({
   company: Yup.string()
	  .required("Required"),
   jobTitle: Yup.string()
	  .required("Required"),
   location: Yup.string()
	  .required("Required")
});

class JobPost extends Component {
   state = {
	  summary: "",
	  howToApply: ""
   };

   onChange = (key, value) => {
	  this.setState({[key]: value});
   }

   render() {
	  const {
		 summary,
		 howToApply
	  } = this.state;

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
			   <Col sm="12">
				  <Formik
					 initialValues={{
						company: "",
						jobTitle: "",
						location: ""
					 }}
					 validationSchema={formSchema}
					 onSubmit={values => {
						console.log(values);
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
										  <Label for="jobTitle">Job Title</Label>
										  <Field name="jobTitle" id="jobTitle"
												 className={`form-control ${errors.jobTitle && touched.jobTitle && 'is-invalid'}`}/>
										  {errors.jobTitle && touched.jobTitle ?
											 <div className="invalid-feedback">{errors.jobTitle}</div> : null}
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
										  <Editor id="description" editorClassName="demo-editor" />
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
									<Col md="12">
									   <Button className="mr-2" color="success" size="lg">Publish</Button>
									   <Button color="secondary" size="lg">UnPublish</Button>
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

export default JobPost;
