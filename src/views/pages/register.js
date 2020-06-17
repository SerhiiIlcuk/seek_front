// import external modules
import React, { Component } from "react";
import {connect} from "react-redux"
import {toastr} from 'react-redux-toastr';
import { NavLink } from "react-router-dom";
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
import {registerAction} from "../../redux/actions/auth";
import {bindActionCreators} from "redux";
import {getErrMessage, getSubmitting, getSuccess} from "../../redux/selectors/auth";

class Register extends Component {
   state = {
      email: "",
      password: "",
      company: true,
      candidate: false,
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
               if (success) {
                  toastr.success(
                     "Success",
                     "Registered successfully",
                     {
                        position: "top-right",
                        timeOut: 1000
                     }
                  );
               } else {
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

   onRegister = async e => {
      e.preventDefault();
      const {registerAction} = this.props;
      const {
         email,
         password,
         company
      } = this.state;
      const userType = company ? "employer" : "candidate";
      const data = {
         email,
         password,
         userType
      };

      registerAction(data);
   };

   onInputChange = (value, key) => {
      if (key === "candidate") {
         this.setState({company: false});
      } else if (key === "company") {
         this.setState({candidate: false});
      }
      this.setState({[key]: value});
   };

   render() {
      const {
         email,
         password,
         company,
         candidate,
      } = this.state;

      return (
         <>
            <div className="container">
               <Row className="full-height-vh">
                  <Col xs="12" className="d-flex align-items-center justify-content-center">
                     <Card className="gradient-indigo-purple text-center width-400">
                        <CardBody>
                           <h2 className="white py-4">Register</h2>
                           <Form onSubmit={e => this.onRegister(e)} className="pt-2">
                              <FormGroup>
                                 <Col md="12">
                                    <Input
                                       type="email"
                                       className="form-control"
                                       name="inputEmail"
                                       id="inputEmail"
                                       placeholder="Email"
                                       value={email}
                                       onChange={(e) => this.onInputChange(e.target.value, "email")}
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
                                       placeholder="Password"
                                       value={password}
                                       onChange={(e) => this.onInputChange(e.target.value, "password")}
                                       required
                                    />
                                 </Col>
                              </FormGroup>

                              <FormGroup tag="fieldset">
                                 <Row>
                                    <Col md="6">
                                       <Label check>
                                          <Input
                                             type="radio"
                                             name="company"
                                             checked={company}
                                             onChange={(e) => this.onInputChange(e.target.checked, "company")}
                                          />
                                          Company
                                       </Label>
                                    </Col>
                                    <Col md="6">
                                       <Label check>
                                          <Input
                                             type="radio"
                                             name="candidate"
                                             checked={candidate}
                                             onChange={(e) => this.onInputChange(e.target.checked, "candidate")}
                                          />
                                          Candidate
                                       </Label>
                                    </Col>
                                 </Row>
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
                                             I agree terms and conditions.
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
                                       block
                                       className="btn-pink btn-raised"
                                    >
                                       Register
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
                              <NavLink to="/login" className="text-white">
                                 Login
                              </NavLink>
                           </div>
                        </CardFooter>
                     </Card>
                  </Col>
               </Row>
            </div>
         </>
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
         registerAction,
      },
      dispatch,
   )

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Register);
