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
import {XSquare, PlusSquare, X, Check} from "react-feather";
import {getCompany, getErrMessage, getSubmitting, getSuccess} from "../../redux/selectors/company";
import {
   fetchCompanyAction,
   updateEmployeeAction,
   deleteEmployeeAction,
} from "../../redux/actions/company";
import {EMPLOYEE_ROLES} from "../../config/constants";
import config from "../../config/index"

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
	  if (!Array.isArray(stateRoles) || ! Array.isArray(propsRoles) || stateRoles.length !== propsRoles.length)
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

   render() {
	  const {company} = this.props;
	  const {employees} = this.state;
	  const propsEmployees = company && company.employees;

	  return (
		 <Fragment>
			<Row>
			   <Col md="1"></Col>
			   <Col md="10">
				  <Card>
					 <CardBody>
						<Row>
						   <Col md="12">
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
												{employee.user.firstName + ' ' + employee.user.lastName}
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
												   onClick={() => this._deleteEmployee(employee)}
												/>
											 </td>
											 <td>
												<Check
												   size={30}
												   color={checkDisable ? "gray" : "green"}
												   className={checkDisable ? "cursor-not-allowed" : "cursor-pointer"}
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
									   <CustomInput id="profileRole" type="checkbox"/>
									</td>
									<td>
									   <CustomInput id="jobRole" type="checkbox"/>
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
	  },
	  dispatch
   );

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(ManageUsersPage);
