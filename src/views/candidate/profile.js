import React, {Component, Fragment} from "react";
import {bindActionCreators} from "redux"
import {connect} from "react-redux";
import {Card, CardBody, CardTitle, Row, Col, Button, FormGroup, Label, Input, CustomInput} from "reactstrap";
import {toastr} from 'react-redux-toastr';
import {Formik, Field, Form} from "formik";
import * as Yup from "yup";
import "../../assets/scss/views/form/profile.scss";
import {
   fetchUserAction,
   updateUserAction,
} from "../../redux/actions/user";
import {getSubmitting, getSuccess, getUserData} from "../../redux/selectors/user";
import {cropImage} from "../employee/profile";
import {
   uploadFile,
   uploadImage,
} from "../../http/http-calls";
import config from "../../config";
import * as Icon from "react-feather";
import {endPoints} from "../../config/end-points";

const formSchema = Yup.object().shape({
   firstName: Yup.string()
	  .required("Required"),
   lastName: Yup.string()
	  .required("Required"),
   email: Yup.string()
	  .email("Invalid email")
	  .required("Required"),
   linkedInUrl: Yup.string()
	  .url()
	  .required("Required"),
   twitterUrl: Yup.string()
	  .url()
	  .required("Required"),
   dribbleUrl: Yup.string()
	  .url()
	  .required("Required"),
   githubUrl: Yup.string()
	  .url()
	  .required("Required"),
   kaggleUrl: Yup.string()
	  .url()
	  .required("Required")
});

class ProfileEdit extends Component {
   state = {
	  logoImg: (this.props.userData && this.props.userData.logoImg) || "",
	  userData: this.props.userData,
	  resumeLink: this.props.userData && this.props.userData.resumeLink,
   };

   componentDidMount() {
	  const {fetchUserAction} = this.props;

	  fetchUserAction();
   }

   componentDidUpdate(prevProps, prevState, snapshot) {
	  const {
		 userData,
		 submitting,
		 success,
	  } = this.props;
	  if (prevProps.userData !== userData) {
		 this.setState({
			logoImg: (userData.logoImg) || "",
			userData: userData,
			resumeLink: (userData.resumeLink) || ""
		 });
	  }

	  if (prevProps.submitting !== submitting) {
		 if (!submitting) {
			if (success) {
			   toastr.success(
				  "Success",
				  "Profile updated successfully",
				  {
					 position: "top-right",
					 timeOut: 1000
				  }
			   );
			} else {
			   toastr.error(
				  "Error",
				  "Something went wrong",
				  {
					 position: "top-right",
					 timeOut: 1000
				  }
			   );
			}
		 }
	  }
   }

   selectImage = (e, key) => {
	  const url = e.target.files && e.target.files[0];
	  if (url) {
		 const reader = new FileReader();
		 reader.onload = fileEvent => {
			cropImage(fileEvent.target.result, 200)
			   .then(croppedImg => {
				  uploadImage({base64: croppedImg})
					 .then(res => {
						this.setState({
						   [key]: res.path
						});
					 })
					 .catch(err => {
						toastr.error(
						   "Error",
						   "Image uploading error",
						   {
							  position: "top-right",
							  timeOut: 1000
						   }
						);
					 })
			   })
			   .catch(err => {
				  console.log(err);
			   });
		 };
		 reader.readAsDataURL(url);
	  }
   }

   onChange = (key, value) => {
	  this.setState({[key]: value});
   }

   onChangeFile = async (e) => {
	  const file = e.target.files[0];
	  let formData = new FormData();
	  formData.append('file', file, file.name);

	  try {
		 const ret = await uploadFile(formData);
		 this.setState({resumeLink: ret.path});
	  } catch (e) {
		 console.log(e);
	  }
   }

   render() {
	  const {
		 logoImg,
		 userData,
		 resumeLink
	  } = this.state;
	  const logoImgUrl = logoImg ? config.baseUrl + logoImg : null;

	  return (
		 <Fragment>
			<Row>
			   <Col sm="2">

			   </Col>
			   <Col sm="8">
				  <Formik
					 initialValues={{
						firstName: (userData && userData.firstName) || "",
						lastName: (userData && userData.lastName) || "",
						email: (userData && userData.email) || "",
						linkedInUrl: (userData && userData.linkedInUrl) || "",
						twitterUrl: (userData && userData.twitterUrl) || "",
						dribbleUrl: (userData && userData.dribbleUrl) || "",
						githubUrl: (userData && userData.githubUrl) || "",
						kaggleUrl: (userData && userData.kaggleUrl) || ""
					 }}
					 validationSchema={formSchema}
					 onSubmit={values => {
						this.props.updateUserAction({
						   ...values,
						   logoImg,
						   resumeLink,
						});
					 }}
					 enableReinitialize
				  >
					 {({errors, touched}) => (
						<Form>
						   <Card>
							  <CardBody>
								 <Row>
									<Col md="9"></Col>
									<Col md="3">
									   <div className="logo-wrapper">
										  <label className="logo-upload-button">
											 <img
												src={logoImgUrl}
												alt=""
											 />
											 <input
												type="file"
												accept="image/*"
												onChange={(e) => this.selectImage(e, "logoImg")}
											 />
										  </label>
									   </div>
									</Col>
								 </Row>
								 <Row>
									<Col md="6">
									   <FormGroup>
										  <Label for="firstName">First Name</Label>
										  <Field name="firstName" id="firstName"
												 className={`form-control ${errors.firstName && touched.firstName && 'is-invalid'}`}/>
										  {errors.firstName && touched.firstName ?
											 <div className="invalid-feedback">{errors.firstName}</div> : null}
									   </FormGroup>
									</Col>
									<Col md="6">
									   <FormGroup>
										  <Label for="lastName">Last Name</Label>
										  <Field name="lastName" id="lastName"
												 className={`form-control ${errors.lastName && touched.lastName && 'is-invalid'}`}/>
										  {errors.lastName && touched.lastName ?
											 <div className="invalid-feedback">{errors.lastName}</div> : null}
									   </FormGroup>
									</Col>
								 </Row>

								 <Row>
									<Col md="6">
									   <FormGroup>
										  <Label for="email">Email</Label>
										  <Field name="email" id="email"
												 className={`form-control ${errors.email && touched.email && 'is-invalid'}`}/>
										  {errors.email && touched.email ?
											 <div className="invalid-feedback">{errors.email}</div> : null}
									   </FormGroup>
									</Col>
									<Col md="6">
									   <FormGroup>
										  <Label for="dropdown">Where do you call home?</Label>
										  <Input type="select" id="dropdown" name="dropdown">
											 <option value="1">Value 1</option>
											 <option value="2">Value 2</option>
										  </Input>
									   </FormGroup>
									</Col>
								 </Row>

								 <Row>
									<Col md="12">
									   <Label>Why are you here?</Label>
									</Col>
									<Col md="4">
									   <FormGroup>
										  <CustomInput type="checkbox" id="checkbox1" label="Find companies ..."/>
										  <CustomInput type="checkbox" id="checkbox2" label="Find jobs ..."/>
									   </FormGroup>
									</Col>
								 </Row>

								 <Row>
									<Col md="3"/>
									<Col md="9">
									   {
									      !resumeLink ? (
											 <FormGroup>
												<Label for="resume">Upload Resume</Label>
												<Input
												   type="file"
												   name="resume"
												   id="resume"
												   onChange={e => this.onChangeFile(e)}
												/>
											 </FormGroup>
										  ) : (
										     <>
												<Icon.FileText size={50}/>
												<Icon.XCircle
												   style={{cursor: 'pointer'}}
												   size={15}
												   onClick={() => this.setState({resumeLink: ""})}
												/>
											 </>
										  )
									   }
									</Col>
								 </Row>
							  </CardBody>
						   </Card>

						   <Card>
							  <CardBody>
								 <Row>
									<Col md="12">
									   <FormGroup>
										  <Label for="linkedInUrl">LinkedIn Url</Label>
										  <Field name="linkedInUrl" id="linkedInUrl"
												 className={`form-control ${errors.linkedInUrl && touched.linkedInUrl && 'is-invalid'}`}/>
										  {errors.linkedInUrl && touched.linkedInUrl ?
											 <div className="invalid-feedback">{errors.linkedInUrl}</div> : null}
									   </FormGroup>
									</Col>
									<Col md="12">
									   <FormGroup>
										  <Label for="twitterUrl">Twitter</Label>
										  <Field name="twitterUrl" id="twitterUrl"
												 className={`form-control ${errors.twitterUrl && touched.twitterUrl && 'is-invalid'}`}/>
										  {errors.twitterUrl && touched.twitterUrl ?
											 <div className="invalid-feedback">{errors.twitterUrl}</div> : null}
									   </FormGroup>
									</Col>
									<Col md="12">
									   <FormGroup>
										  <Label for="dribbleUrl">Dribble</Label>
										  <Field name="dribbleUrl" id="dribbleUrl"
												 className={`form-control ${errors.dribbleUrl && touched.dribbleUrl && 'is-invalid'}`}/>
										  {errors.dribbleUrl && touched.dribbleUrl ?
											 <div className="invalid-feedback">{errors.dribbleUrl}</div> : null}
									   </FormGroup>
									</Col>
									<Col md="12">
									   <FormGroup>
										  <Label for="githubUrl">Github</Label>
										  <Field name="githubUrl" id="githubUrl"
												 className={`form-control ${errors.githubUrl && touched.githubUrl && 'is-invalid'}`}/>
										  {errors.githubUrl && touched.githubUrl ?
											 <div className="invalid-feedback">{errors.githubUrl}</div> : null}
									   </FormGroup>
									</Col>
									<Col md="12">
									   <FormGroup>
										  <Label for="kaggleUrl">Kaggle</Label>
										  <Field name="kaggleUrl" id="kaggleUrl"
												 className={`form-control ${errors.kaggleUrl && touched.kaggleUrl && 'is-invalid'}`}/>
										  {errors.kaggleUrl && touched.kaggleUrl ?
											 <div className="invalid-feedback">{errors.kaggleUrl}</div> : null}
									   </FormGroup>
									</Col>
								 </Row>
							  </CardBody>
						   </Card>

						   <Card>
							  <CardBody>
								 <Row>
									<Col md="6">
									   <FormGroup>
										  <Label for="profession">Profession</Label>
										  <Input type="select" id="profession" name="profession">
											 <option value="1">Sales</option>
											 <option value="2">Marketing</option>
											 <option value="3">Development</option>
										  </Input>
									   </FormGroup>
									</Col>
									<Col md="6">
									   <FormGroup>
										  <Label for="experience">Years of Experiences</Label>
										  <Input type="select" id="experience" name="experience">
											 <option value="1">1-3 Years</option>
											 <option value="2">3-5 Years</option>
											 <option value="3">5++ Years</option>
										  </Input>
									   </FormGroup>
									</Col>
								 </Row>

								 <Row>
									<Col md="12">
									   <Label>Select all skills that apply</Label>
									</Col>
									<Col md="4">
									   <FormGroup check className="px-0">
										  <CustomInput type="checkbox" id="111" label="skill 1"/>
										  <CustomInput type="checkbox" id="222" label="skill 4"/>
									   </FormGroup>
									</Col>
									<Col md="4">
									   <FormGroup check className="px-0">
										  <CustomInput type="checkbox" id="555" label="skill 2"/>
										  <CustomInput type="checkbox" id="666" label="skill 5"/>
									   </FormGroup>
									</Col>
									<Col md="4">
									   <FormGroup check className="px-0">
										  <CustomInput type="checkbox" id="333" label="skill 3"/>
										  <CustomInput type="checkbox" id="444" label="skill 6"/>
									   </FormGroup>
									</Col>
								 </Row>

							  </CardBody>
						   </Card>
						   <Card>
							  <CardBody>
								 <Row>
									<Col md="12">
									   <Label>Job locations</Label>
									</Col>
									<Col md="4">
									   <FormGroup>
										  <CustomInput type="checkbox" id="l1" label="location 1"/>
										  <CustomInput type="checkbox" id="l4" label="location 4"/>
									   </FormGroup>
									</Col>
									<Col md="4">
									   <FormGroup>
										  <CustomInput type="checkbox" id="l2" label="location 2"/>
										  <CustomInput type="checkbox" id="l5" label="location 5"/>
									   </FormGroup>
									</Col>
									<Col md="4">
									   <FormGroup>
										  <CustomInput type="checkbox" id="l3" label="location 3"/>
										  <CustomInput type="checkbox" id="l6" label="location 6"/>
									   </FormGroup>
									</Col>
								 </Row>
								 <Row>
									<Col md="12" className="text-center">
									   <Button color="success" type="submit" size="lg">
										  Save
									   </Button>
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
   userData: getUserData(state),
   submitting: getSubmitting(state),
   success: getSuccess(state),
});

const mapDispatchToProps = (dispatch) =>
   bindActionCreators(
	  {
		 fetchUserAction,
		 updateUserAction,
	  },
	  dispatch,
   );

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(ProfileEdit);
