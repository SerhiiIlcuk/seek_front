// import external modules
import React, { Component } from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import {
   Collapse,
   Navbar,
   Nav,
   NavItem
} from "reactstrap";
import {
   Menu,
   MoreVertical,
   LogIn,
   LogOut,
   Settings
} from "react-feather";
import "../../../assets/scss/components/navbar/topbar.scss";
import "../../../assets/scss/components/navbar/candidateNavbar.scss";
import imgJob from "../../../assets/img/svg/work-from-home.svg";
import imgCompany from "../../../assets/img/svg/organization.svg";
import imgNews from "../../../assets/img/svg/news.svg";
import imgTeam from "../../../assets/img/svg/team.svg"
import {logoutAction} from "../../../redux/actions/auth/logoutActions";
import {getToken} from "../../../redux/selectors/auth";

class ThemeEmployerNavbar extends Component {
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

   onClickNav = (page) => {
	  this.setState({activePage: page});
   }

   logout = () => {
	  localStorage.removeItem("token");
	  this.props.logout();
   }

   render() {
	  const {activePage} = this.state;
	  const {token} = this.props;

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
				  <img src={imgTeam} className="logo" alt="logo" />
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
						   <Link to="/job" className="nav-link" onClick={() => this.onClickNav('job')}>
							  <img src={imgJob} className="job-icon" alt="job icon" />
						   </Link>
						</NavItem>
						<NavItem className="pr-1">
						   <Link to="/company" className="nav-link" onClick={() => this.onClickNav('company')}>
							  <img src={imgCompany} className="company-icon" alt="company icon" />
						   </Link>
						</NavItem>
						<NavItem className="pr-1">
						   <Link to="/news" className="nav-link" onClick={() => this.onClickNav('news')}>
							  <img src={imgNews} className="news-icon" alt="news icon" />
						   </Link>
						</NavItem>
						<NavItem className="pr-1">
						   <Link to="/employer/company-profile/edit" className="nav-link" onClick={() => this.onClickNav('profile')}>
							  {/*<Settings size={40} />*/}
							  <span className="text-white text-bold-400">Company Profile</span>
						   </Link>
						</NavItem>
						<NavItem className="pr-1">
						   <Link to="/user/profile/edit" className="nav-link" onClick={() => this.onClickNav('profile')}>
							  <Settings size={40} />
						   </Link>
						</NavItem>
						<NavItem className="pr-1 mr-1">
						   {
							  token ? (
								 <Link to="" className="nav-link" onClick={() => this.logout()}>
									<LogOut size={40} />
								 </Link>
							  ) : (
								 <Link to="/login" className="nav-link" onClick={() => this.onClickNav('login')}>
									<LogIn size={40} />
								 </Link>
							  )
						   }
						</NavItem>
					 </Nav>
				  </Collapse>
			   </div>
			</div>
		 </Navbar>
	  );
   }
}

const mapStateToProps = state => ({
   token: getToken(state)
});

const mapDispatchToProps = (dispatch) =>
   bindActionCreators(
	  {
		 logout: logoutAction
	  },
	  dispatch,
   )

export default connect(mapStateToProps, mapDispatchToProps)(ThemeEmployerNavbar);
