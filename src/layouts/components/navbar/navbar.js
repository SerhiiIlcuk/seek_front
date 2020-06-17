// import external modules
import React, { Component } from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import {
   Form,
   Media,
   Collapse,
   Navbar,
   Nav,
   NavItem,
   UncontrolledDropdown,
   DropdownToggle,
   DropdownMenu,
   DropdownItem
} from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
   // Moon,
   Mail,
   Menu,
   MoreVertical,
   Check,
   Bell,
   User,
   AlertTriangle,
   Inbox,
   Phone,
   Calendar,
   Lock,
   X,
   LogOut,
   Home,
   Moon,
   MessageSquare,
   Smile
} from "react-feather";
import NavbarSearch from "../../../components/search/Search";
import ReactCountryFlag from "react-country-flag";
import templateConfig from "../../../templateConfig";

import userImage from "../../../assets/img/portrait/small/avatar-s-1.png";
import userImage2 from "../../../assets/img/portrait/small/avatar-s-2.png";
import userImage3 from "../../../assets/img/portrait/small/avatar-s-3.png";
import userImage4 from "../../../assets/img/portrait/small/avatar-s-4.png";
import "../../../assets/scss/components/navbar/topbar.scss";
import {logoutAction} from "../../../redux/actions/auth/logoutActions";

const mapDispatchToProps = (dispatch) =>
   bindActionCreators(
      {
         logoutAction,
      },
      dispatch,
   )

class ThemeNavbar extends Component {
   handleClick = e => {
      this.props.toggleSidebarMenu("open");
   };
   constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.state = {
         isOpen: false,
         activePage: 'home'
      };
   }
   toggle() {
      this.setState({
         isOpen: !this.state.isOpen
      });
   }

   onLogout = () => {
      localStorage.removeItem('token');
      this.props.logoutAction();
   }

   onClickNav = (page) => {
      this.setState({activePage: page});
   }

   render() {
      const {activePage} = this.state;

      return (
         <Navbar className="navbar navbar-expand-lg navbar-light bg-faded fixed-top">
            <div className="container-fluid px-0">
               <div className="navbar-header">
                  <Menu
                     size={14}
                     className="navbar-toggle d-lg-none float-left"
                     onClick={this.handleClick.bind(this)}
                     data-toggle="collapse"
                  />
                   <Smile size={50} color="yellow" className="m-2 cursor-pointer"/>
                  <MoreVertical
                     className="mt-1 navbar-toggler black no-border float-right"
                     size={50}
                     onClick={this.toggle}
                  />
               </div>

               <div className="navbar-container">
                  <Collapse isOpen={this.state.isOpen} navbar>
                     <Nav className="ml-auto float-right" navbar>
                        <NavItem className="pr-1">
                           <Link to="/" className="nav-link" onClick={() => this.onClickNav('home')}>
                              <Home
                                 size={30}
                                 color={activePage === "home" ? "#FF8D60" : "#333"}
                              />
                           </Link>
                        </NavItem>
                        <NavItem className="pr-1">
                           <Link to="/chat" className="nav-link" onClick={() => this.onClickNav('chat')}>
                              <MessageSquare size={30} color={activePage === "chat" ? "#FF8D60" : "#333"} />
                           </Link>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar className="pr-1">
                           <DropdownToggle nav>
                              <ReactCountryFlag code="us" svg /> EN
                           </DropdownToggle>
                           <DropdownMenu right>
                              <DropdownItem>
                                 <ReactCountryFlag code="us" svg /> English
                              </DropdownItem>
                              <DropdownItem>
                                 <ReactCountryFlag code="fr" svg /> France
                              </DropdownItem>
                              <DropdownItem>
                                 <ReactCountryFlag code="es" svg /> Spanish
                              </DropdownItem>
                              <DropdownItem>
                                 <ReactCountryFlag code="cn" svg /> Chinese
                              </DropdownItem>
                           </DropdownMenu>
                        </UncontrolledDropdown>

                        <UncontrolledDropdown nav inNavbar className="pr-1">
                           <DropdownToggle nav>
                              <img src={userImage} alt="logged-in-user" className="rounded-circle width-35" />
                           </DropdownToggle>
                           <DropdownMenu right>
                              <DropdownItem>
                                 <span className="font-small-3">
                                    John Doe <span className="text-muted">(Guest)</span>
                                 </span>
                              </DropdownItem>
                              <DropdownItem divider />

                              <Link to="/profile/edit" className="p-0" onClick={() => this.onClickNav('profile')}>
                                 <DropdownItem>
                                    <User size={16} className="mr-1" /> My Profile
                                 </DropdownItem>
                              </Link>
                              <div to="" className="p-0" onClick={this.onLogout}>
                                 <DropdownItem>
                                    <LogOut size={16} className="mr-1" /> Logout
                                 </DropdownItem>
                              </div>
                           </DropdownMenu>
                        </UncontrolledDropdown>
                     </Nav>
                  </Collapse>
               </div>
            </div>
         </Navbar>
      );
   }
}

export default connect(null, mapDispatchToProps)(ThemeNavbar);
