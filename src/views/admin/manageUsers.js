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
	CustomInput,
} from "reactstrap";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {PlusSquare, X, Check} from "react-feather";
import {
	getErrMessage,
	getSubmitting,
	getSuccess
} from '../../redux/selectors/common';
import {getAllAdmins} from "../../redux/selectors/user";
import {fetchAllAdminsAction} from "../../redux/actions/user";
import {ADMIN_ROLES, EMPLOYEE_ROLES} from "../../config/constants";
import config from "../../config/index";
import {updateAdminAction, deleteAdminAction} from "../../redux/actions/user";

class ManageUsersPage extends Component {
	state = {
		allAdmins: this.props.allAdmins,
		employees: this.props.company && this.props.company.employees,
	};

	componentDidMount() {
		const {fetchAllAdmins} = this.props;
		if (fetchAllAdmins) {
			fetchAllAdmins();
		}
	};

	componentDidUpdate(prevProps, prevState, snapshot) {
		const {allAdmins} = this.props;

		if (allAdmins !== prevProps.allAdmins) {
			this.setState({allAdmins});
		}
	}

	_updateAdminState = (index, value, role) => { // when check or uncheck role on admin
		const allAdmins = this.state.allAdmins;
		const data = JSON.parse(JSON.stringify(allAdmins));
		const adminIndex = data[index].roles.findIndex(item => item === role);

		if (value) {
			if (adminIndex === -1) {
				data[index].roles.push(role);
			}
		} else {
			if (adminIndex !== -1) {
				data[index].roles.splice(adminIndex, 1);
			}
		}

		this.setState({allAdmins: data});
	};

	// used to recognize admin's role changed
	compareStateAndProps = (stateAdmin, propsAdmin) => {
		const stateRoles = stateAdmin && stateAdmin.roles;
		const propsRoles = propsAdmin && propsAdmin.roles;
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

	_updateAdmin = (admin) => {
		const {
			updateAdmin
		} = this.props;

		console.log({
			id: admin._id,
			roles: admin.roles,
		});

		updateAdmin({
			id: admin._id,
			roles: admin.roles,
		});
	}

	_deleteAdmin = (employee) => {
		const {
			deleteAdmin
		} = this.props;

		deleteAdmin({
			id: employee.user._id,
		});
	}

	render() {
		const {allAdmins} = this.state;
		const propsAllAdmins = this.props.allAdmins;

		return (
			<Fragment>
				<Row>
					<Col md="12">
						<Card>
							<CardBody>
								<Row>
									<Col md="12" className="min-vh-100">
										<Table striped>
											<thead>
											<tr>
												<th></th>
												<th></th>
												<th>Admins</th>
												<th>Admin</th>
												<th>Manage Companies</th>
												<th>Manage News</th>
												<th></th>
												<th></th>
											</tr>
											</thead>
											<tbody>
											{
												allAdmins && allAdmins.map((admin, index) => {
													const hasAdminRole = (admin.roles.findIndex(role => role === ADMIN_ROLES.USER) !== -1);
													const hasCompanyRole = (admin.roles.findIndex(role => role === ADMIN_ROLES.COMPANY) !== -1);
													const hasNewsRole = (admin.roles.findIndex(role => role === ADMIN_ROLES.NEWS) !== -1);
													const adminRoleId = "admin" + admin._id;
													const companyRoleId = "profile" + admin._id;
													const newsRoleId = "job" + admin._id;

													let checkDisable = true;
													if (!this.compareStateAndProps((propsAllAdmins && propsAllAdmins[index]), admin)) {
														checkDisable = false;
													}

													return (
														<tr key={index}>
															<th scope="row">{index + 1}</th>
															<td>
																{
																	admin.logoImg &&
																	<img
																		src={config.baseUrl + admin.logoImg}
																		className="rounded-circle img-border gradient-summer width-50"
																		alt="user avatar"
																	/>
																}
															</td>
															<td>
																{
																	admin.firstName && admin.lastName ?
																		admin.firstName + ' ' + admin.lastName
																		: admin.email
																}
															</td>
															<td>
																<CustomInput
																	id={adminRoleId}
																	type="checkbox"
																	checked={hasAdminRole}
																	onChange={(e) => {
																		this._updateAdminState(index, e.target.checked, ADMIN_ROLES.USER)
																	}}
																/>
															</td>
															<td>
																<CustomInput
																	id={companyRoleId}
																	type="checkbox"
																	checked={hasCompanyRole}
																	onChange={(e) => {
																		this._updateAdminState(index, e.target.checked, ADMIN_ROLES.COMPANY)
																	}}
																/>
															</td>
															<td>
																<CustomInput
																	id={newsRoleId}
																	type="checkbox"
																	checked={hasNewsRole}
																	onChange={(e) => {
																		this._updateAdminState(index, e.target.checked, ADMIN_ROLES.NEWS)
																	}}
																/>
															</td>
															<td>
																<X
																	size={30}
																	onClick={() => this._deleteAdmin(admin)}
																/>
															</td>
															<td>
																<Check
																	size={30}
																	color={checkDisable ? "gray" : "green"}
																	className={checkDisable ? "cursor-not-allowed" : "cursor-pointer"}
																	onClick={() => this._updateAdmin(admin)}
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
													<Input
														type="email"
													/>
												</td>
												<td>

												</td>
												<td>
													<CustomInput id="adminRole" type="checkbox"/>
												</td>
												<td>
													<CustomInput id="companyRole" type="checkbox"/>
												</td>
												<td>
													<CustomInput id="newsRole" type="checkbox"/>
												</td>
												<td></td>
												<td>
													<PlusSquare size={30}/>
												</td>
											</tr>
											</tbody>
										</Table>
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
	allAdmins: getAllAdmins(state),
	success: getSuccess(state),
	errMessage: getErrMessage(state),
	submitting: getSubmitting(state),
})

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			fetchAllAdmins: fetchAllAdminsAction,
			updateAdmin: updateAdminAction,
			deleteAdmin: deleteAdminAction,
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ManageUsersPage);
