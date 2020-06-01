// import external modules
import React, { Component } from "react";
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
import {register} from "../../http/http-calls";

class Register extends Component {
   state = {
      isChecked: true
   };

   handleChecked = e => {
      this.setState(prevState => ({
         isChecked: !prevState.isChecked
      }));
   };

   onRegister = async e => {
      e.preventDefault();

      try {
         const registerResult = await register({});
         console.log('register success: ', JSON.stringify(registerResult));
      } catch (e) {
         console.log('register error: ', JSON.stringify(e));
      }

   };

   render() {
      return (
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
                                    type="text"
                                    className="form-control"
                                    name="inputName"
                                    id="inputName"
                                    placeholder="Name"
                                    required
                                 />
                              </Col>
                           </FormGroup>
                           <FormGroup>
                              <Col md="12">
                                 <Input
                                    type="email"
                                    className="form-control"
                                    name="inputEmail"
                                    id="inputEmail"
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
                                    placeholder="Password"
                                    required
                                 />
                              </Col>
                           </FormGroup>

                           <FormGroup tag="fieldset">
                              <Row>
                                 <Col md="6">
                                    <Label check>
                                       <Input type="radio" name="business" defaultChecked />
                                       Business
                                    </Label>
                                 </Col>
                                 <Col md="6">
                                    <Label check>
                                       <Input type="radio" name="business" />
                                       Influencer
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
                                 <Button type="submit" color="danger" block className="btn-pink btn-raised">
                                    Register
                                 </Button>
                                 {/*<Button type="button" color="secondary" block className="btn-raised">*/}
                                 {/*   Cancel*/}
                                 {/*</Button>*/}
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
      );
   }
}

export default Register;
