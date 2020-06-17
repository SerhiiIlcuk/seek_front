// import external modules
import React, {Component} from "react";
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {NavLink, Redirect} from "react-router-dom";
import {loginAction} from "../../redux/actions/auth/loginActions";
import {
   Row,
   Col,
   Input,
   Form,
   FormGroup,
   Button,
   Label,
   Card,
   CardBody,
   CardFooter
} from "reactstrap";
import {getErrMessage, getSubmitting, getSuccess} from "../../redux/selectors/auth";
import {toastr} from "react-redux-toastr";

class Login extends Component {

   state = {
	  email: '',
	  password: '',
	  isChecked: true
   };

   componentDidUpdate(prevProps, prevState, snapshot) {
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
						timeOut: 1000
					 }
				  );
			   }
			}
		 }
	  }
   }

   handleChecked = e => {
	  this.setState(prevState => ({
		 isChecked: !prevState.isChecked
	  }));
   };

   onChangeInput = (value, key) => {
	  this.setState({[key]: value});
   }

   onLogin = async e => {
	  e.preventDefault();

	  const {
		 email,
		 password
	  } = this.state;

	  const data = {
		 email,
		 password
	  };

	  this.props.loginAction(data);
   };

   render() {
	  const {
		 email,
		 password
	  } = this.state;

	  return (
		 <div className="container">
			<Row className="full-height-vh">
			   <Col xs="12" className="d-flex align-items-center justify-content-center">
				  <Card className="gradient-indigo-purple text-center width-400">
					 <CardBody>
						<h2 className="white py-4">Login</h2>
						<Form onSubmit={e => this.onLogin(e)} className="pt-2">
						   <FormGroup>
							  <Col md="12">
								 <Input
									type="email"
									className="form-control"
									name="inputEmail"
									id="inputEmail"
									value={email}
									onChange={(e) => this.onChangeInput(e.target.value, 'email')}
									placeholder="Email"
									required
								 />
							  </Col>
						   </FormGroup>

						   <FormGroup>
							  <Col md="12">
								 <Input
									type="password"
									className="form-control"
									name="inputPass"
									id="inputPass"
									value={password}
									onChange={(e) => this.onChangeInput(e.target.value, 'password')}
									placeholder="Password"
									required
								 />
							  </Col>
						   </FormGroup>

						   <FormGroup>
							  <Row>
								 <Col md="12">
									<div className="custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0 ml-3">
									   <Input
										  type="checkbox"
										  className="custom-control-input"
										  checked={this.state.isChecked}
										  onChange={this.handleChecked}
										  id="rememberme"
									   />
									   <Label className="custom-control-label float-left white" for="rememberme">
										  Remember Me
									   </Label>
									</div>
								 </Col>
							  </Row>
						   </FormGroup>
						   <FormGroup>
							  <Col md="12">
								 <Button
									type="submit"
									color="danger"
									block className="btn-pink btn-raised"
								 >
									Login
								 </Button>
							  </Col>
						   </FormGroup>
						</Form>
					 </CardBody>
					 <CardFooter>
						<div className="float-left">
						   <NavLink to="/forgot-password" className="text-white">
							  Forgot Password?
						   </NavLink>
						</div>
						<div className="float-right">
						   <NavLink to="/register" className="text-white">
							  Register Now
						   </NavLink>
						</div>
					 </CardFooter>
				  </Card>
			   </Col>
			</Row>
		 </div>
	  );
   }
}

const mapStateToProps = (state) => ({
   success: getSuccess(state),
   submitting: getSubmitting(state),
   errMessage: getErrMessage(state),
});

const mapDispatchToProps = (dispatch) =>
   bindActionCreators(
	  {
		 loginAction,
	  },
	  dispatch,
   )

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Login);
