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
import {
   fetchAllProfessionsAction,
   fetchAllJobLocationsAction,
   fetchAllSkillsAction,
} from "../../redux/actions/common";
import {getUserData} from "../../redux/selectors/user";
import {getSubmitting, getSuccess} from '../../redux/selectors/common';
import {cropImage} from "../employee/profile";
import {
   uploadFile,
   uploadImage,
} from "../../http/http-calls";
import config from "../../config";
import * as Icon from "react-feather";
import {whyHereTexts} from "../../config/constants";
import {getAllJobLocations, getAllProfessions, getAllSkills} from "../../redux/selectors/common";

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
	  resumeLink: (this.props.userData && this.props.userData.resumeLink) || "",
	  whyHere: (this.props.userData && this.props.userData.whyHere) || [],
	  profession: (this.props.userData && this.props.userData.profession) || "",
	  skills: (this.props.userData && this.props.userData.skills) || [],
	  jobLocations: (this.props.userData && this.props.userData.jobLocations) || [],
	  errors: []
   };

   componentDidMount() {
	  const {
	     fetchUser,
		 fetchAllSkills,
		 fetchAllProfessions,
		 fetchAllJobLocations,
	  } = this.props;

	  if (fetchUser) {
		 fetchUser();
	  }

	  if (fetchAllSkills) {
	     fetchAllSkills();
	  }

	  if (fetchAllProfessions) {
		 fetchAllProfessions();
	  }

	  if (fetchAllJobLocations) {
		 fetchAllJobLocations();
	  }
   }

   componentDidUpdate(prevProps, prevState, snapshot) {
	  const {
		 userData,
		 submitting,
		 success,
		 allProfessions,
	  } = this.props;
	  if (prevProps.userData !== userData) {
		 this.setState({
			logoImg: (userData.logoImg) || "",
			userData: userData,
			resumeLink: (userData.resumeLink) || "",
			whyHere: (userData.whyHere) || [],
			profession: (userData.profession) || (allProfessions && allProfessions[0]._id) || "",
			skills: (userData.skills) || [],
			jobLocations: (userData.jobLocations) || [],
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

   onChangeDropdown = (id, stateName) => {
      this.setState({[stateName]: id});
   }

   render() {
	  const {
		 logoImg,
		 userData,
		 resumeLink,
		 whyHere,
		 errors,
		 profession,
		 skills,
		 jobLocations,
	  } = this.state;
	  const {
	     allSkills,
		 allJobLocations,
		 allProfessions,
	  } = this.props;

	  const logoImgUrl = logoImg ? config.baseUrl + logoImg : null;
	  const showWhyHereError = errors.indexOf('whyHere') !== -1;
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
					    if (!(whyHere && whyHere.length)) {
					       const data = JSON.parse(JSON.stringify(this.state.errors));
					       if (data.indexOf('whyHere') === -1) {
					          data.push('whyHere');
						   }

					       this.setState({errors: data});
						   return;
						}
						this.props.updateUser({
						   ...values,
						   logoImg,
						   resumeLink,
						   whyHere,
						   jobLocations,
						   skills,
						   profession,
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
									<Col md="6">
									   <FormGroup>
										  {
										     whyHereTexts && whyHereTexts.map(item => {
										        const id = `whyHere${item.id}`;
										        const checked = whyHere.findIndex(ele => ele === item.id) !== -1;
										        return (
												   <CustomInput
													  type="checkbox"
													  value={item.id}
													  id={id}
													  key={id}
													  checked={checked}
													  label={item.title}
													  onChange={(e) => this.onChangeCheckbox(e.target.checked, item.id, 'whyHere')}
												   />
												)
											 })
										  }
										  {
										     (showWhyHereError && (!whyHere || whyHere.length === 0)) &&
											 <div className="font-small-2 text-danger">Please choose at least one item</div>
										  }
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
										  <Input
											 type="select"
											 id="profession"
											 name="profession"
											 value={profession}
											 onChange={(e) => this.onChangeDropdown(e.target.value, 'profession')}
										  >
											 {
											    allProfessions && allProfessions.map(item => {
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
									{
									   allSkills && allSkills.map(skill => {
									      const checked = skills &&
											 skills.findIndex(item => item === skill._id) !== -1;
									      return (
											 <Col md="4" key={skill._id}>
												<CustomInput
												   type="checkbox"
												   id={skill._id}
												   checked={checked}
												   label={skill.name}
												   onChange={(e) => this.onChangeCheckbox(e.target.checked, skill._id, 'skills')}
												/>
											 </Col>
										  )
									   })
									}
								 </Row>

							  </CardBody>
						   </Card>
						   <Card>
							  <CardBody>
								 <Row>
									<Col md="12">
									   <Label>Job locations</Label>
									</Col>
									{
									   allJobLocations && allJobLocations.map(item => {
									      const checked = jobLocations &&
											 jobLocations.findIndex(ele => ele === item._id) !== -1;
									      return (
											 <Col md="4" key={item._id}>
												<CustomInput
												   type="checkbox"
												   id={item._id}
												   label={item.name}
												   checked={checked}
												   onChange={(e) => this.onChangeCheckbox(e.target.checked, item._id, 'jobLocations')}
												/>
											 </Col>
										  )
									   })
									}
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
   allSkills: getAllSkills(state),
   allJobLocations: getAllJobLocations(state),
   allProfessions: getAllProfessions(state),
});

const mapDispatchToProps = (dispatch) =>
   bindActionCreators(
	  {
		 fetchUser: fetchUserAction,
		 updateUser: updateUserAction,
		 fetchAllJobLocations: fetchAllJobLocationsAction,
		 fetchAllSkills: fetchAllSkillsAction,
		 fetchAllProfessions: fetchAllProfessionsAction,
	  },
	  dispatch,
   );

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(ProfileEdit);
