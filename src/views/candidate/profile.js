import React, {Component, Fragment} from "react";
import {Card, CardBody, CardTitle, Row, Col, Button, FormGroup, Label, Input, CustomInput} from "reactstrap";
import {Formik, Field, Form} from "formik";
import * as Yup from "yup";
import "../../assets/scss/views/form/profile.scss"

const formSchema = Yup.object().shape({
   firstName: Yup.string()
	  .required("Required"),
   lastName: Yup.string()
	  .required("Required"),
   email: Yup.string()
	  .email("Invalid email")
	  .required("Required"),
   linkedIn: Yup.string()
	  .url()
	  .required("Required"),
   twitter: Yup.string()
	  .url()
	  .required("Required"),
   dribble: Yup.string()
	  .url()
	  .required("Required"),
   github: Yup.string()
	  .url()
	  .required("Required"),
   kaggle: Yup.string()
	  .url()
	  .required("Required")
});

class ProfileEdit extends Component {
   state = {
	  logoImg: "",
	  neighborhood: "",
	  description: "",
	  expectation: ""
   };

   cropImage = (url, size) => {
	  return new Promise(resolve => {
		 // this image will hold our source image data
		 const inputImage = new Image();

		 // we want to wait for our image to load
		 inputImage.onload = () => {
			// let's store the width and height of our image
			const minLength = Math.min(inputImage.naturalWidth, inputImage.naturalHeight);

			// calculate the position to draw the image at
			const offsetX = (inputImage.naturalWidth - minLength) / 2;
			const offsetY = (inputImage.naturalHeight - minLength) / 2;

			// create a canvas that will present the output image
			const outputImage = document.createElement('canvas');

			// set it to the same size as the image
			outputImage.width = size;
			outputImage.height = size;

			// draw our image at position 0, 0 on the canvas
			const ctx = outputImage.getContext('2d');
			ctx.drawImage(inputImage, offsetX, offsetY, minLength, minLength, 0, 0, size, size);
			resolve(outputImage.toDataURL('image/jpeg', 0.4));
		 };
		 // start cropping
		 inputImage.src = url;
	  })
   };


   selectImage = (e, key) => {
	  const url = e.target.files && e.target.files[0];
	  if (url) {
		 const reader = new FileReader();
		 reader.onload = fileEvent => {
			this.cropImage(fileEvent.target.result, 200)
			   .then(croppedImg => {
				  this.setState({
					 [key]: croppedImg
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

   render() {
	  const {
		 logoImg,
		 neighborhood,
	  } = this.state;
	  const logoImgUrl = logoImg ? logoImg : null;

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
			   <Col sm="2">

			   </Col>
			   <Col sm="8">
				  <Formik
					 initialValues={{
						firstName: "",
						lastName: "",
						email: "",
						linkedIn: "",
						twitter: "",
						dribble: "",
						github: "",
						kaggle: ""
					 }}
					 validationSchema={formSchema}
					 onSubmit={values => {
						console.log(values);
					 }}
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
									<Col md="12">
									   <Label>Resume</Label>
									</Col>
									<Col md="12" className="text-center">
									   <Button id="resume" name="resume" size="lg">
										  Upload Resume
									   </Button>
									</Col>
								 </Row>
							  </CardBody>
						   </Card>

						   <Card>
							  <CardBody>
								 <Row>
									<Col md="12">
									   <FormGroup>
										  <Label for="linkedIn">LinkedIn Url</Label>
										  <Field name="linkedIn" id="linkedIn"
												 className={`form-control ${errors.linkedIn && touched.linkedIn && 'is-invalid'}`}/>
										  {errors.linkedIn && touched.linkedIn ?
											 <div className="invalid-feedback">{errors.linkedIn}</div> : null}
									   </FormGroup>
									</Col>
									<Col md="12">
									   <FormGroup>
										  <Label for="twitter">Twitter</Label>
										  <Field name="twitter" id="twitter"
												 className={`form-control ${errors.twitter && touched.twitter && 'is-invalid'}`}/>
										  {errors.twitter && touched.twitter ?
											 <div className="invalid-feedback">{errors.twitter}</div> : null}
									   </FormGroup>
									</Col>
									<Col md="12">
									   <FormGroup>
										  <Label for="dribble">Dribble</Label>
										  <Field name="dribble" id="dribble"
												 className={`form-control ${errors.dribble && touched.dribble && 'is-invalid'}`}/>
										  {errors.dribble && touched.dribble ?
											 <div className="invalid-feedback">{errors.dribble}</div> : null}
									   </FormGroup>
									</Col>
									<Col md="12">
									   <FormGroup>
										  <Label for="github">Github</Label>
										  <Field name="github" id="github"
												 className={`form-control ${errors.github && touched.github && 'is-invalid'}`}/>
										  {errors.github && touched.github ?
											 <div className="invalid-feedback">{errors.github}</div> : null}
									   </FormGroup>
									</Col>
									<Col md="12">
									   <FormGroup>
										  <Label for="kaggle">Kaggle</Label>
										  <Field name="kaggle" id="kaggle"
												 className={`form-control ${errors.kaggle && touched.kaggle && 'is-invalid'}`}/>
										  {errors.kaggle && touched.kaggle ?
											 <div className="invalid-feedback">{errors.kaggle}</div> : null}
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

export default ProfileEdit;
