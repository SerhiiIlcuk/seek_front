// import external modules
import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {Formik, Field, Form} from "formik";
import * as Yup from "yup";
import {
	Row,
	Col,
	Card,
	CardBody,
	Input,
	FormGroup,
	Button,
	Label,
} from "reactstrap";
import {bindActionCreators} from "redux";
import {
	adminCreateCompanyAction,
	fetchAllCompaniesAction,
	fetchAllCompanyTypesAction
} from "../../redux/actions/company";
import {getAllCompanies, getAllCompanyTypes} from "../../redux/selectors/company";
import config from "../../config";
import {getErrMessage, getSubmitting, getSuccess} from "../../redux/selectors/common";
import {toastr} from "react-redux-toastr";

const formSchema = Yup.object().shape({
	name: Yup.string()
		.required("Required"),
	employeeEmail: Yup.string()
		.email()
		.required("Required"),
	website: Yup.string()
		.url()
		.required("Required"),
	city: Yup.string()
		.required("Required"),
});

class ManageCompanies extends Component {
	state = {
		primaryIndustry: "",
		secondaryIndustry: "",
		secondaryIndustryError: false,
	};

	componentDidMount() {
		const {
			fetchAllCompanies,
			fetchAllCompanyTypes,
		} = this.props;

		if (fetchAllCompanies) {
			fetchAllCompanies();
		}

		if (fetchAllCompanyTypes) {
			fetchAllCompanyTypes();
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const {
			submitting,
			success,
			errMessage,
			allCompanyTypes,
		} = this.props;

		if (allCompanyTypes !== prevProps.allCompanyTypes) {
			if (allCompanyTypes && allCompanyTypes.length > 0) {
				this.setState({primaryIndustry: allCompanyTypes[0]._id});
			}

			if (allCompanyTypes && allCompanyTypes.length > 1) {
				this.setState({secondaryIndustry: allCompanyTypes[1]._id});
			}
		}

		if (prevProps.submitting !== submitting) {
			if (!submitting) {
				if (!submitting) {
					if (success) {
						toastr.success(
							"Success",
							"company created successfully",
							{
								position: "top-right",
								timeOut: 2000
							}
						);
					} else {
						toastr.error(
							"Error",
							errMessage,
							{
								position: "top-right",
								timeOut: 2000
							}
						);
					}
				}
			}
		}
	}

	onChange = (id, stateName) => {
		this.setState({[stateName]: id});
	}

	getCompanyIndustry = (companyTypes) => {
		const {allCompanyTypes} = this.props;
		if (companyTypes && companyTypes.length > 0) {
			if (companyTypes.length > 1) {
				const primaryCompanyType = allCompanyTypes && allCompanyTypes.find(item => {
					return item._id === companyTypes[0];
				});

				const secondaryCompanyType = allCompanyTypes && allCompanyTypes.find(item => {
					return item._id === companyTypes[1];
				});

				return (primaryCompanyType && primaryCompanyType.typeName) + ' - ' + (secondaryCompanyType && secondaryCompanyType.typeName);
			} else {
				const companyType = allCompanyTypes && allCompanyTypes.find(item => {
					return item._id === companyTypes[0];
				});

				return companyType && companyType.typeName;
			}
		} else {
			return null;
		}
	}

	render() {
		const {
			allCompanies,
			allCompanyTypes,
			adminCreateCompany,
		} = this.props;
		const {
			primaryIndustry,
			secondaryIndustry,
			keyword,
			secondaryIndustryError,
		} = this.state;

		return (
			<Fragment>
				<Row>
					<Col md="12">
						<Card>
							<CardBody>
								<Row>
									<Col md="12">
										<h5 className="text-dark text-bold-600">
											Lookup company..
										</h5>
									</Col>
									<Col md="9" sm="12">
										<FormGroup>
											<div className="position-relative has-icon-left">
												<Input
													type="text"
													id="iconLeft"
													name="iconLeft"
													className="round"
													value={keyword}
													onChange={(e) => this.onChange(e.target.value, 'keyword')}
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

								<Row className="mb-3">
									<Col md="12">
										<h5 className="text-bold-600">Add company...</h5>
									</Col>
									<Col md="12">
										<Formik
											initialValues={{
												name: "",
												website: "",
												city: "",
												employeeEmail: ""
											}}
											validationSchema={formSchema}
											onSubmit={values => {
												let companyTypes;
												if (primaryIndustry === secondaryIndustry) {
													this.setState({secondaryIndustryError: true});
												} else {
													companyTypes = [primaryIndustry, secondaryIndustry];
												}
												const data ={
													...values,
													companyTypes,
												};

												adminCreateCompany(data);
											}}
											enableReinitialize
										>
											{({errors, touched}) => (
												<Form>
													<Card>
														<CardBody>
															<Row>
																<Col md="4">
																	<FormGroup>
																		<Label for="name">Company Name</Label>
																		<Field
																			name="name"
																			id="name"
																			className={`form-control ${errors.name && touched.name && 'is-invalid'}`}/>
																		{errors.name && touched.name ?
																			<div className="invalid-feedback">{errors.name}</div> : null}
																	</FormGroup>
																</Col>
																<Col md="4">
																	<FormGroup>
																		<Label for="employeeEmail">Employee Email</Label>
																		<Field
																			name="employeeEmail"
																			id="employeeEmail"
																			className={`form-control ${errors.employeeEmail && touched.employeeEmail && 'is-invalid'}`}/>
																		{errors.employeeEmail && touched.employeeEmail ?
																			<div className="invalid-feedback">{errors.employeeEmail}</div> : null}
																	</FormGroup>
																</Col>
																<Col md="4">
																	<FormGroup>
																		<Label for="city">Company Location</Label>
																		<Field
																			name="city"
																			id="city"
																			className={`form-control ${errors.city && touched.city && 'is-invalid'}`}/>
																		{errors.city && touched.city ?
																			<div className="invalid-feedback">{errors.city}</div> : null}
																	</FormGroup>
																</Col>
																<Col md="4">
																	<FormGroup>
																		<Label for="website">Web site</Label>
																		<Field
																			name="website"
																			id="website"
																			className={`form-control ${errors.website && touched.website && 'is-invalid'}`}/>
																		{errors.website && touched.website ?
																			<div className="invalid-feedback">{errors.website}</div> : null}
																	</FormGroup>
																</Col>
																<Col md="4">
																	<FormGroup>
																		<Label for="primaryIndustry">Primary Industry</Label>
																		<Input
																			type="select"
																			id="primaryIndustry"
																			name="primaryIndustry"
																			value={primaryIndustry}
																			onChange={(e) => this.onChange(e.target.value, "primaryIndustry")}
																		>
																			{
																				allCompanyTypes && allCompanyTypes.map(item => {
																					return (
																						<option
																							key={item._id}
																							value={item._id}
																						>
																							{item.typeName}
																						</option>
																					)
																				})
																			}
																		</Input>
																	</FormGroup>
																</Col>
																<Col md="4">
																	<FormGroup>
																		<Label for="secondaryIndustry">Secondary Industry</Label>
																		<Input
																			type="select"
																			id="secondaryIndustry"
																			name="secondaryIndustry"
																			value={secondaryIndustry}
																			onChange={(e) => this.onChange(e.target.value, "secondaryIndustry")}
																		>
																			{
																				allCompanyTypes && allCompanyTypes.map(item => {
																					return (
																						<option
																							key={item._id}
																							value={item._id}
																						>
																							{item.typeName}
																						</option>
																					)
																				})
																			}
																		</Input>
																		{secondaryIndustryError ?
																			<div className="invalid-feedback">select another industry</div> : null}
																	</FormGroup>
																</Col>

																<Col md="12" className="text-center">
																	<Button
																		size="lg"
																		color="primary"
																		type="submit"
																	>
																		Add Company
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

								<Row className="bg-secondary">
									<Col md="12" className="min-vh-100">
										{
											allCompanies && allCompanies.map((company, index) => (
												<Card color="bg-light" key={index}>
													<CardBody>
														<Row>
															<Col md="2" sm="12" className="text-center">
																{
																	company.logoImg &&
																	<img
																		src={config.baseUrl + company.logoImg}
																		className="rounded-circle img-border gradient-summer width-50"
																		alt="company logo"
																	/>
																}
															</Col>

															<Col md="8">
																<Row>
																	<Col md="12" sm="12">
																		{company.name}
																	</Col>
																	<Col md="12" sm="12">
																		{this.getCompanyIndustry(company && company.companyTypes)}
																	</Col>
																	<Col md="12" sm="12">
																		{company.city || "NA"} - {company.totalEmployees || "NA"}
																	</Col>
																</Row>
															</Col>

															<Col md="2" sm="12" className="text-center">
																<Button color="primary">Edit</Button>
																<br/>
																<Button color="warning">UnPublish</Button>
															</Col>
														</Row>
													</CardBody>
												</Card>
											))
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
	submitting: getSubmitting(state),
	success: getSuccess(state),
	allCompanies: getAllCompanies(state),
	allCompanyTypes: getAllCompanyTypes(state),
	errMessage: getErrMessage(state),
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			fetchAllCompanies: fetchAllCompaniesAction,
			fetchAllCompanyTypes: fetchAllCompanyTypesAction,
			adminCreateCompany: adminCreateCompanyAction,
		},
		dispatch,
	)

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ManageCompanies);
