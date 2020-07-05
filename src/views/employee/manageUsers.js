// import external modules
import React, {Component, Fragment} from "react";
import {
	Card,
	CardBody,
	CardTitle,
	Row,
	Col,
	Table,
	Input,
	Label,
	Button,
	CustomInput, FormGroup,
} from "reactstrap";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {PlusSquare, X, Check} from "react-feather";
import {getCompany} from "../../redux/selectors/company";
import {getErrMessage, getSubmitting, getSuccess} from '../../redux/selectors/common';
import {
	fetchCompanyAction,
	updateEmployeeAction,
	deleteEmployeeAction, addEmployeeAction,
} from "../../redux/actions/company";
import {EMPLOYEE_ROLES} from "../../config/constants";
import config from "../../config/index";
import * as Yup from "yup";
import {Formik, Form, Field} from "formik";
import {toastr} from "react-redux-toastr";

const formSchema = Yup.object().shape({
	email: Yup.string()
		.required('Required')
		.email("Invalid email"),
	adminRole: Yup.boolean(),
	profileRole: Yup.boolean(),
	jobRole: Yup.boolean(),
});

class ManageUsersPage extends Component {
	state = {
		employees: this.props.company && this.props.company.employees,
	};

	componentDidMount() {
		const {fetchCompany} = this.props;
		if (fetchCompany) {
			fetchCompany();
		}
	};

	componentDidUpdate(prevProps, prevState, snapshot) {
		const {company} = this.props;

		if (company !== prevProps.company) {
			this.setState({employees: company.employees});
		}

		const {
			success,
			submitting,
			errMessage
		} = this.props;

		if (prevProps.submitting !== submitting) {
			if (!submitting) {
				if (!submitting) {
					if (!success) {
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

	_updateEmployeeState = (index, value, role) => {
		const employees = this.state.employees;
		const data = JSON.parse(JSON.stringify(employees));
		const employeeIndex = data[index].roles.findIndex(item => item === role);

		if (value) {
			if (employeeIndex === -1) {
				data[index].roles.push(role);
			}
		} else {
			if (employeeIndex !== -1) {
				data[index].roles.splice(employeeIndex, 1);
			}
		}

		this.setState({employees: data});
	};

	// used to recognize user's role changed
	compareStateAndProps = (stateEmployee, propsEmployee) => {
		const stateRoles = stateEmployee && stateEmployee.roles;
		const propsRoles = propsEmployee && propsEmployee.roles;
		if (!Array.isArray(stateRoles) || !Array.isArray(propsRoles) || stateRoles.length !== propsRoles.length)
			return false;

		const arr1 = stateRoles.concat().sort();
		const arr2 = propsRoles.concat().sort();

		for (let i = 0; i < arr1.length; i++) {
			if (arr1[i] !== arr2[i])
				return false;
		}

		return true;
	}

	_updateEmployee = (employee) => {
		const {
			company,
			updateEmployee
		} = this.props;

		updateEmployee({
			id: company._id,
			employee: {
				user: employee.user._id,
				roles: employee.roles
			}
		});
	}

	_deleteEmployee = (employee) => {
		const {
			company,
			deleteEmployee
		} = this.props;

		deleteEmployee({
			id: company._id,
			userId: employee.user._id
		});
	}

	makeRoles = (values) => {
		const {
			jobRole,
			adminRole,
			profileRole,
		} = values;

		let roles = [];

		if (adminRole) {
			roles.push(EMPLOYEE_ROLES.USER)
		}

		if (profileRole) {
			roles.push(EMPLOYEE_ROLES.PROFILE)
		}

		if (jobRole) {
			roles.push(EMPLOYEE_ROLES.JOB)
		}

		return roles;
	}

	render() {
		const {
			company,
			addEmployee,
			submitting,
		} = this.props;
		const {
			employees,
		} = this.state;

		const propsEmployees = company && company.employees;

		return (
			<Fragment>
				<Row>
					<Col md="12">
						<Card>
							<CardBody>
								<Row>
									<Col md="12" className="min-vh-100">
										<Formik
											onSubmit={(values, {resetForm}) => {
												const roles = this.makeRoles(values);
												const data = {
													email: values.email,
													roles,
												};
												addEmployee(data);
												resetForm({
													email: '',
													profileRole: false,
													adminRole: false,
													jobRole: false,
												});
											}}
											initialValues={{
												email: '',
												profileRole: false,
												adminRole: false,
												jobRole: false,
											}}
											validationSchema={formSchema}
										>
											{({
													errors,
													touched,
													values,
													setFieldValue,
												}) => (
												<Form>
													<Table striped>
														<thead>
														<tr>
															<th></th>
															<th></th>
															<th>Employees</th>
															<th>Admin</th>
															<th>Edit Company Profile</th>
															<th>Post Jobs</th>
															<th></th>
															<th></th>
														</tr>
														</thead>
														<tbody>
														{
															employees && employees.map((employee, index) => {
																const hasAdminRole = (employee.roles.findIndex(role => role === EMPLOYEE_ROLES.USER) !== -1);
																const hasCompanyProfileRole = (employee.roles.findIndex(role => role === EMPLOYEE_ROLES.PROFILE) !== -1);
																const hasJobRole = (employee.roles.findIndex(role => role === EMPLOYEE_ROLES.JOB) !== -1);
																const adminRoleId = "admin" + employee.user._id;
																const profileRoleId = "profile" + employee.user._id;
																const jobRoleId = "job" + employee.user._id;

																let checkDisable = true;
																if (!this.compareStateAndProps((propsEmployees && propsEmployees[index]), employee)) {
																	checkDisable = false;
																}

																return (
																	<tr key={index}>
																		<th scope="row">{index + 1}</th>
																		<td>
																			{
																				employee.user.logoImg &&
																				<img
																					src={config.baseUrl + employee.user.logoImg}
																					className="rounded-circle img-border gradient-summer width-50"
																					alt="user avatar"
																				/>
																			}
																		</td>
																		<td>
																			{
																				employee.user.firstName && employee.user.lastName ?
																					employee.user.firstName + ' ' + employee.user.lastName
																					: employee.user.email
																			}
																		</td>
																		<td>
																			<CustomInput
																				id={adminRoleId}
																				type="checkbox"
																				checked={hasAdminRole}
																				onChange={(e) => {
																					this._updateEmployeeState(index, e.target.checked, EMPLOYEE_ROLES.USER)
																				}}
																			/>
																		</td>
																		<td>
																			<CustomInput
																				id={profileRoleId}
																				type="checkbox"
																				checked={hasCompanyProfileRole}
																				onChange={(e) => {
																					this._updateEmployeeState(index, e.target.checked, EMPLOYEE_ROLES.PROFILE)
																				}}
																			/>
																		</td>
																		<td>
																			<CustomInput
																				id={jobRoleId}
																				type="checkbox"
																				checked={hasJobRole}
																				onChange={(e) => {
																					this._updateEmployeeState(index, e.target.checked, EMPLOYEE_ROLES.JOB)
																				}}
																			/>
																		</td>
																		<td>
																			<X
																				size={30}
																				className="cursor-pointer"
																				onClick={() => this._deleteEmployee(employee)}
																			/>
																		</td>
																		<td>
																			<Check
																				size={30}
																				color={checkDisable ? "gray" : "green"}
																				className={checkDisable ? "cursor-not-allowed" : "cursor-pointer"}
																				disabled={submitting}
																				onClick={() => this._updateEmployee(employee)}
																			/>
																		</td>
																	</tr>
																)
															})
														}
														<tr>
															<td colSpan={8}>

															</td>
														</tr>

														<tr>
															<th scope="row"></th>
															<td>
																<Field name="email" id="email"
																			 className={`form-control ${errors.email && touched.email && 'is-invalid'}`}/>
																{errors.email && touched.email ?
																	<div className="invalid-feedback">{errors.email}</div> : null}
															</td>
															<td>

															</td>
															<td>
																<CustomInput
																	id="adminRole"
																	type="checkbox"
																	checked={values['adminRole']}
																	onChange={(e) => setFieldValue('adminRole', e.target.checked)}
																/>
															</td>
															<td>
																<CustomInput
																	id="profileRole"
																	type="checkbox"
																	checked={values['profileRole']}
																	onChange={(e) => setFieldValue('profileRole', e.target.checked)}
																/>
															</td>
															<td>
																<CustomInput
																	id="jobRole"
																	type="checkbox"
																	checked={values['jobRole']}
																	onChange={(e) => setFieldValue('jobRole', e.target.checked)}
																/>
															</td>
															<td></td>
															<td>
																<Button
																	type="submit"
																	disabled={submitting}
																>
																	Add
																</Button>
															</td>
														</tr>
														</tbody>
													</Table>
												</Form>
											)}
										</Formik>
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

const mapStateToProps = state => ({
	company: getCompany(state),
	success: getSuccess(state),
	errMessage: getErrMessage(state),
	submitting: getSubmitting(state),
})

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			fetchCompany: fetchCompanyAction,
			updateEmployee: updateEmployeeAction,
			deleteEmployee: deleteEmployeeAction,
			addEmployee: addEmployeeAction,
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ManageUsersPage);
