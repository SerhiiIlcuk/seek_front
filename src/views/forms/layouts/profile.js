import React, { Component, Fragment } from "react";
import {Card, CardBody, CardTitle, Row, Col, Button, FormGroup, Label, Input} from "reactstrap";
import { Formik, Field, Form } from "formik";
import ImageUploading from "react-images-uploading";
import * as Yup from "yup";
import "../../../assets/scss/views/form/profile.scss"
import imgMan from "../../../assets/img/svg/fill-man.svg"
import {XCircle} from "react-feather";
import {cropImage} from "../../employee/profile";

const formSchema = Yup.object().shape({
   industryName: Yup.string()
	  .required("Required"),
   fullName: Yup.string()
	  .required("Required"),
   email: Yup.string()
	  .email("Invalid email")
	  .required("Required"),
   site:Yup.string()
	  .url()
	  .required("Required"),
   twitter: Yup.string()
	  .url()
	  .required("Required"),
   facebook: Yup.string()
	  .url()
	  .required("Required"),
   instagram: Yup.string()
	  .url()
	  .required("Required"),
   birthday: Yup.date()
	  .required("Required"),
});

class ProfileEdit extends Component {
   state = {
      uploadImg: "",
	  stats: "This is your stats",
	  description: "",
	  expectation: ""
   };

   selectImage = (e) => {
      const url = e.target.files && e.target.files[0];
      if (url) {
		 const reader = new FileReader();
		 reader.onload = fileEvent => {
		 cropImage(fileEvent.target.result, 200)
			.then(croppedImg => {
			   this.setState({
				  uploadImg: croppedImg
			   });
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

   onImageChange = imageList => {
	  // data for submit
	  console.log(imageList);
   };

   render() {
	  const {
		 uploadImg,
		 stats,
		 description,
		 expectation
	  } = this.state;
      const imgUrl = uploadImg ? uploadImg : imgMan;

	  return (
		 <Fragment>
			{/*<ContentHeader>Form Validation</ContentHeader>
			<ContentSubHeader>
			   <p>Form Validation example.</p>
			   <a href="https://github.com/jaredpalmer/formik" target="_blank" rel="noopener noreferrer">
				  <img src="https://img.shields.io/github/stars/jaredpalmer/formik.svg?style=social" alt="Stars" />
				  <img src="https://img.shields.io/npm/dm/formik.svg" alt="Downloads"/>
			   </a>
			</ContentSubHeader>*/}
			<Row>
			   <Col sm="12">
				  <Card>
					 <CardBody>
						<CardTitle>Edit Profile</CardTitle>
						<Formik
						   initialValues={{
							  industryName: "",
							  fullName: "",
							  email: "",
							  site: "",
							  twitter: "",
							  facebook: "",
							  instagram: "",
							  birthday: ""
						   }}
						   validationSchema={formSchema}
						   onSubmit={values => {
							  // same shape as initial values
							  console.log(values);
						   }}
						>
						   {({ errors, touched }) => (
							  <Form>
								 <Row>
									<Col md="12">
									   <div className="profile-picture">
										  <label className="upload-button">
											 <img
												src={imgUrl}
												alt="user profile"
											 />
											 <input
												type="file"
												id="profile_picture"
												accept="image/*"
												onChange={(e) => this.selectImage(e)}
											 />
										  </label>
									   </div>
									</Col>
								 </Row>
								 <Row>
									<Col md="6">
									   <FormGroup>
										  <Label for="interest">Industry</Label>
										  <Input type="select" id="interest" name="interest" >
											 <option value="health">health</option>
											 <option value="beauty">beauty</option>
											 <option value="culinary">culinary</option>
											 <option value="entertainment">entertainment</option>
											 <option value="non-profit">non-profit</option>
											 <option value="etc">etc</option>
										  </Input>
									   </FormGroup>
									</Col>
									<Col md="6">
									   <FormGroup>
										  <Label for="industryName">Industry Name</Label>
										  <Field name="industryName" id="industryName" className={`form-control ${errors.industryName && touched.industryName && 'is-invalid'}`} />
										  {errors.industryName && touched.industryName ? <div className="invalid-feedback">{errors.industryName}</div> : null}
									   </FormGroup>
									</Col>
								 </Row>
								 <Row>
									<Col md="6">
									   <FormGroup>
										  <Label for="fullName">Full Name</Label>
										  <Field name="fullName" id="fullName" className={`form-control ${errors.fullName && touched.fullName && 'is-invalid'}`} />
										  {errors.fullName && touched.fullName ? <div className="invalid-feedback">{errors.fullName}</div> : null}
									   </FormGroup>
									</Col>
									<Col md="6">
									   <FormGroup>
										  <Label for="birthday">Birthday</Label>
										  <Field type="date" name="birthday" id="birthday" className={`form-control ${errors.birthday && touched.birthday && 'is-invalid'}`} />
										  {errors.birthday && touched.birthday ? <div className="invalid-feedback">{errors.birthday}</div> : null}
									   </FormGroup>
									</Col>
								 </Row>
								 <Row>
									<Col md="6">
									   <FormGroup>
										  <Label for="email">Email</Label>
										  <Field type="email" name="email" id="email" className={`form-control ${errors.email && touched.email && 'is-invalid'}`} />
										  {errors.email && touched.email ? <div className="invalid-feedback">{errors.email}</div> : null}
									   </FormGroup>
									</Col>
									<Col md="6">
									   <FormGroup>
										  <Label for="twitter">Twitter</Label>
										  <Field name="twitter" id="twitter" className={`form-control ${errors.twitter && touched.twitter && 'is-invalid'}`} />
										  {errors.twitter && touched.twitter ? <div className="invalid-feedback">{errors.twitter}</div> : null}
									   </FormGroup>
									</Col>
								 </Row>
								 <Row>
									<Col md="6">
									   <FormGroup>
										  <Label for="facebook">Facebook</Label>
										  <Field name="facebook" id="facebook" className={`form-control ${errors.facebook && touched.facebook && 'is-invalid'}`} />
										  {errors.facebook && touched.facebook ? <div className="invalid-feedback">{errors.facebook}</div> : null}
									   </FormGroup>
									</Col>
									<Col md="6">
									   <FormGroup>
										  <Label for="instagram">Instagram</Label>
										  <Field name="instagram" id="instagram" className={`form-control ${errors.instagram && touched.instagram && 'is-invalid'}`} />
										  {errors.instagram && touched.instagram ? <div className="invalid-feedback">{errors.instagram}</div> : null}
									   </FormGroup>
									</Col>
								 </Row>
								 <Row>
									<Col md="6">
									   <FormGroup>
										  <Label for="site">Web Site</Label>
										  <Field name="site" id="site" className={`form-control ${errors.site && touched.site && 'is-invalid'}`} />
										  {errors.site && touched.site ? <div className="invalid-feedback">{errors.site}</div> : null}
									   </FormGroup>
									</Col>
								 </Row>
								 <Row>
									<Col md="12">
									   <FormGroup>
										  <Label>Representation</Label>
										  <ImageUploading multiple onChange={this.onImageChange} maxNumber={3}>
											 {({ imageList, onImageUpload, onImageRemoveAll }) => (
												// write your building UI
												<div className="upload__image-wrapper">
												   <Row>
													  {imageList.map(image => (
														 <Col md="4" key={image.key}>
															<img src={image.dataURL} style={{border: "1px solid gray"}} alt="" width="100%" />
															<Row>
															   <Col md="12" className="image-item__btn-wrapper mt-1 mb-1 text-center">
																  <XCircle size={32} onClick={image.onRemove} style={{cursor: "pointer"}} />
															   </Col>
															</Row>
														 </Col>
													  ))}
												   </Row>
												   <Row>
													  <Col md="12" className="text-center">
														 <Button color="success" onClick={onImageUpload}>Add Image</Button>&nbsp;
														 <Button color="danger" onClick={onImageRemoveAll}>Remove All Images</Button>
													  </Col>
												   </Row>
												</div>
											 )}
										  </ImageUploading>
									   </FormGroup>
									</Col>
								 </Row>
								 <Row>
									<Col md="12">
									   <FormGroup>
										  <Label for="stats">Power Stats</Label>
										  <Input
											 type="textarea"
											 id="stats"
											 rows="5"
											 // name="stats"
											 value={stats}
											 onChange={(e) => {
												this.onChange("stats", e.target.value)
											 }}
										  />
									   </FormGroup>
									</Col>
								 </Row>
								 <Row>
									<Col md="12">
									   <FormGroup>
										  <Label for="description">Description</Label>
										  <Input
											 type="textarea"
											 id="description"
											 rows="5"
											 // name="description"
											 value={description}
											 onChange={(e) => {
												this.onChange("description", e.target.value)
											 }}
										  />
									   </FormGroup>
									</Col>
								 </Row>
								 <Row>
									<Col md="12">
									   <FormGroup>
										  <Label for="expectation">Expectation</Label>
										  <Input
											 type="textarea"
											 id="expectation"
											 rows="5"
											 // name="expectation"
											 value={expectation}
											 onChange={(e) => {
											    this.onChange("expectation", e.target.value)
											 }}
										  />
									   </FormGroup>
									</Col>
								 </Row>
								 <Row>
									<Col md="12" className="text-center">
									   <Button type="submit">Submit</Button>
									</Col>
								 </Row>
							  </Form>
						   )}
						</Formik>
					 </CardBody>
				  </Card>
			   </Col>
			</Row>
		 </Fragment>
	  );
   }
}

export default ProfileEdit;
