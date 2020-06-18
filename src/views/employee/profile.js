import React, {Component, Fragment} from "react";
import {bindActionCreators} from "redux"
import {Card, CardBody, CardTitle, Row, Col, Button, FormGroup, Label, Input, CustomInput} from "reactstrap";
import {Formik, Field, Form} from "formik";
import * as Yup from "yup";
import "../../assets/scss/views/form/profile.scss"
import {connect} from "react-redux";

const formSchema = Yup.object().shape({
   name: Yup.string()
	  .required("Required"),
   localEmployees: Yup.number()
	  .required("Required")
	  .typeError("Please input number"),
   totalEmployees: Yup.number()
	  .required("Required")
	  .typeError("Please input number"),
   website: Yup.string()
	  .url()
	  .required("Required"),
   streetAddressOne: Yup.string()
	  .required("Required"),
   streetAddressTwo: Yup.string(),
   city: Yup.string()
	  .required("Required"),
   zipCode: Yup.string()
	  .required("Required"),
   twitterUrl: Yup.string()
	  .url()
	  .required("Required"),
   facebookUrl: Yup.string()
	  .url()
	  .required("Required"),
   instagramUrl: Yup.string()
	  .url()
	  .required("Required"),
});

class ProfileEdit extends Component {
   state = {
	  logoImg: "",
	  splashImg: "",
	  birthYear: "2020",
	  neighborhood: "",
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
		 splashImg,
		 neighborhood,
		 birthYear,
	  } = this.state;
	  const logoImgUrl = logoImg ? logoImg : null;
	  const splashImgUrl = splashImg ? splashImg : null;

	  return (
		 <Fragment>
			<Row>
			   <Col sm="2">

			   </Col>
			   <Col sm="8">
				  <Formik
					 initialValues={{
						companyName: "",
						localEmployees: 0,
						totalEmployees: 0,
						website: "",
						streetAddressOne: "",
						streetAddressTwo: "",
						city: "",
						zipCode: "",
						twitterUrl: "",
						facebookUrl: "",
						instagramUrl: ""
					 }}
					 validationSchema={formSchema}
					 onSubmit={values => {
					    const data = {
					       ...values,
						   ...this.state
						};
						console.log(data);
					 }}
				  >
					 {({errors, touched}) => (
						<Form>
						   <Card>
							  <CardBody>
								 <Row>
									<Col md="9">
									   <Row>
										  <Col md="12">
											 <FormGroup>
												<Label for="companyName">Company Name</Label>
												<Field
												   name="companyName"
												   id="companyName"
												   className={`form-control ${errors.companyName && touched.companyName && 'is-invalid'}`}/>
												{errors.companyName && touched.companyName ?
												   <div className="invalid-feedback">{errors.companyName}</div> : null}
											 </FormGroup>
										  </Col>
									   </Row>
									   <Row>
										  <Col md="4">
											 <FormGroup>
												<Label for="year">Year</Label>
												<Input
												   type="select"
												   value={birthYear}
												   id="year" name="year"
												   onChange={(e) => this.onChange("birthYear", e.target.value)}
												>
												   <option value="2015">2015</option>
												   <option value="2016">2016</option>
												   <option value="2017">2017</option>
												   <option value="2018">2018</option>
												   <option value="2019">2019</option>
												   <option value="2020">2020</option>
												</Input>
											 </FormGroup>
										  </Col>
										  <Col md="4">
											 <FormGroup>
												<Label for="localEmployees">Local Employees</Label>
												<Field name="localEmployees" id="localEmployees"
													   className={`form-control ${errors.localEmployees && touched.localEmployees && 'is-invalid'}`}/>
												{errors.localEmployees && touched.localEmployees ?
												   <div
													  className="invalid-feedback">{errors.localEmployees}</div> : null}
											 </FormGroup>
										  </Col>
										  <Col md="4">
											 <FormGroup>
												<Label for="totalEmployees">Total Employees</Label>
												<Field name="totalEmployees" id="totalEmployees"
													   className={`form-control ${errors.totalEmployees && touched.totalEmployees && 'is-invalid'}`}/>
												{errors.totalEmployees && touched.totalEmployees ?
												   <div
													  className="invalid-feedback">{errors.totalEmployees}</div> : null}
											 </FormGroup>
										  </Col>
									   </Row>
									   <Row>
										  <Col md="12">
											 <FormGroup>
												<Label for="website">Website</Label>
												<Field name="website" id="website"
													   className={`form-control ${errors.website && touched.website && 'is-invalid'}`}/>
												{errors.website && touched.website ?
												   <div className="invalid-feedback">{errors.website}</div> : null}
											 </FormGroup>
										  </Col>
									   </Row>
									</Col>
									<Col md="3">
									   <Row>
										  <Col md="12">
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
										  <Col md="12">
											 <div className="splash-wrapper">
												<label className="splash-upload-button">
												   <img
													  src={splashImgUrl}
													  alt=""
												   />
												   <input
													  type="file"
													  accept="image/*"
													  onChange={(e) => this.selectImage(e, "splashImg")}
												   />
												</label>
											 </div>
										  </Col>
									   </Row>
									</Col>
								 </Row>
							  </CardBody>
						   </Card>

						   <Card>
							  <CardBody>
								 <Row>
									<Col md="12">
									   <Label>Company Type</Label>
									</Col>
									<Col md="4">
									   <FormGroup check className="px-0">
										  <CustomInput type="checkbox" id="111" label="type 1"/>
										  <CustomInput type="checkbox" id="222" label="type 2"/>
									   </FormGroup>
									</Col>
									<Col md="4">
									   <FormGroup check className="px-0">
										  <CustomInput type="checkbox" id="555" label="type 5"/>
										  <CustomInput type="checkbox" id="666" label="type 6"/>
									   </FormGroup>
									</Col>
									<Col md="4">
									   <FormGroup check className="px-0">
										  <CustomInput type="checkbox" id="333" label="type 3"/>
										  <CustomInput type="checkbox" id="444" label="type 4"/>
									   </FormGroup>
									</Col>
								 </Row>
							  </CardBody>
						   </Card>

						   <Card>
							  <CardBody>
								 <Row>
									<Col md="12">
									   <FormGroup>
										  <Label for="streetAddressOne">Street address</Label>
										  <Field name="streetAddressOne" id="streetAddressOne"
												 className={`form-control ${errors.streetAddressOne && touched.streetAddressOne && 'is-invalid'}`}/>
										  {errors.streetAddressOne && touched.streetAddressOne ?
											 <div className="invalid-feedback">{errors.streetAddressOne}</div> : null}
									   </FormGroup>
									</Col>
									<Col md="12">
									   <FormGroup>
										  <Field name="streetAddressTwo" id="streetAddressTwo"
												 className={`form-control ${errors.streetAddressTwo && touched.streetAddressTwo && 'is-invalid'}`}/>
									   </FormGroup>
									</Col>
								 </Row>
								 <Row>
									<Col md="4">
									   <FormGroup>
										  <Label for="city">City</Label>
										  <Field name="city" id="city"
												 className={`form-control ${errors.city && touched.city && 'is-invalid'}`}/>
										  {errors.city && touched.city ?
											 <div className="invalid-feedback">{errors.city}</div> : null}
									   </FormGroup>
									</Col>
									<Col md="4">
									   <FormGroup>
										  <Label for="state">State</Label>
										  <Input type="select" id="state" name="state">
											 <option value="state1">State 1</option>
											 <option value="state2">State 2</option>
										  </Input>
									   </FormGroup>
									</Col>
									<Col md="4">
									   <FormGroup>
										  <Label for="zipCode">Zip code</Label>
										  <Field name="zipCode" id="zipCode"
												 className={`form-control ${errors.zipCode && touched.zipCode && 'is-invalid'}`}/>
										  {errors.zipCode && touched.zipCode ?
											 <div className="invalid-feedback">{errors.zipCode}</div> : null}
									   </FormGroup>
									</Col>
								 </Row>
								 <Row>
									<Col md="12">
									   <FormGroup>
										  <Label for="neighborhood">Describe your neighborhood</Label>
										  <Input
											 type="textarea"
											 id="neighborhood"
											 rows="5"
											 value={neighborhood}
											 onChange={(e) => {
												this.onChange("neighborhood", e.target.value)
											 }}
										  />
									   </FormGroup>
									</Col>
								 </Row>
							  </CardBody>
						   </Card>

						   <Card>
							  <CardBody>
								 <Row>
									<Col md="12">
									   <FormGroup>
										  <Label for="facebookUrl">facebookUrl</Label>
										  <Field name="facebookUrl" id="facebookUrl"
												 className={`form-control ${errors.facebookUrl && touched.facebookUrl && 'is-invalid'}`}/>
										  {errors.facebookUrl && touched.facebookUrl ?
											 <div className="invalid-feedback">{errors.facebookUrl}</div> : null}
									   </FormGroup>
									</Col>
									<Col md="12">
									   <FormGroup>
										  <Label for="instagramUrl">instagramUrl</Label>
										  <Field name="instagramUrl" id="instagramUrl"
												 className={`form-control ${errors.instagramUrl && touched.instagramUrl && 'is-invalid'}`}/>
										  {errors.instagramUrl && touched.instagramUrl ?
											 <div className="invalid-feedback">{errors.instagramUrl}</div> : null}
									   </FormGroup>
									</Col>
									<Col md="12">
									   <FormGroup>
										  <Label for="twitterUrl">twitterUrl</Label>
										  <Field name="twitterUrl" id="twitterUrl"
												 className={`form-control ${errors.twitterUrl && touched.twitterUrl && 'is-invalid'}`}/>
										  {errors.twitterUrl && touched.twitterUrl ?
											 <div className="invalid-feedback">{errors.twitterUrl}</div> : null}
									   </FormGroup>
									</Col>
									<Col md="12" className="text-center">
									   <Button type="submit" color="success" size="lg">success</Button>
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

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch =>
   bindActionCreators(
	  {

	  },
	  dispatch
   );

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(ProfileEdit);
