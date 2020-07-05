// import external modules
import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
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
	Settings,
	Edit,
	PlusSquare,
	List,
	Users,
} from "react-feather";
import "../../../assets/scss/components/navbar/topbar.scss";
import "../../../assets/scss/components/navbar/candidateNavbar.scss";
import imgTeam from "../../../assets/img/svg/team.svg"
import {logoutAction} from "../../../redux/actions/auth/logoutActions";
import {getToken} from "../../../redux/selectors/auth";
import {getUserCompany} from "../../../redux/selectors/user";
import {EMPLOYEE_ROLES} from "../../../config/constants";
import {fetchCompanyAction} from "../../../redux/actions/company";

class ThemeEmployeeNavbar extends Component {
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

	componentDidMount() {
		const {fetchCompany} = this.props;

		fetchCompany();
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
		localStorage.removeItem('userCompany');
		localStorage.removeItem('userType');
		this.props.logout();
	}

	render() {
		const {activePage} = this.state;
		const {token, company} = this.props;
		const roles = company && company.roles;
		const hasJobRole = (roles && roles.findIndex(role => role === EMPLOYEE_ROLES.JOB) !== -1);
		const hasUserRole = (roles && roles.findIndex(role => role === EMPLOYEE_ROLES.USER) !== -1);
		const hasNewsRole = (roles && roles.findIndex(role => role === EMPLOYEE_ROLES.NEWS) !== -1);
		const hasProfileRole = (roles && roles.findIndex(role => role === EMPLOYEE_ROLES.PROFILE) !== -1);

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
						<Link to="/">
							<img src={imgTeam} className="logo" alt="logo"/>
						</Link>
						<MoreVertical
							className="mt-1 navbar-toggler black no-border float-right"
							size={50}
							onClick={this.toggle}
						/>
					</div>

					<div className="navbar-container">
						<Collapse isOpen={this.state.isOpen} navbar>
							<Nav className="ml-auto float-right" navbar>
								{
									hasJobRole &&
									<NavItem className="pr-1">
										<Link to="/employee/manage-jobs" className="nav-link" onClick={() => this.onClickNav('company')}>
											<List size={40}/>
										</Link>
									</NavItem>
								}
								{
									hasJobRole &&
									<NavItem className="pr-1">
										<Link to="/employee/job-post" className="nav-link" onClick={() => this.onClickNav('news')}>
											<PlusSquare size={40}/>
										</Link>
									</NavItem>
								}
								{
									hasUserRole &&
									<NavItem className="pr-1">
										<Link to="/employee/manage-users" className="nav-link" onClick={() => this.onClickNav('users')}>
											<Users size={40}/>
										</Link>
									</NavItem>
								}
								<NavItem className="pr-1">
									<Link to="/employee/company-profile/edit" className="nav-link"
												onClick={() => this.onClickNav('profile')}>
										<Edit size={40}/>
									</Link>
								</NavItem>
								<NavItem className="pr-1">
									<Link to="/user/profile/edit" className="nav-link"
												onClick={() => this.onClickNav('profile')}>
										<Settings size={40}/>
									</Link>
								</NavItem>
								<NavItem className="pr-1 mr-1">
									{
										token ? (
											<Link to="" className="nav-link" onClick={() => this.logout()}>
												<LogOut size={40}/>
											</Link>
										) : (
											<Link to="/login" className="nav-link" onClick={() => this.onClickNav('login')}>
												<LogIn size={40}/>
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
	token: getToken(state),
	company: getUserCompany(state)
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			logout: logoutAction,
			fetchCompany: fetchCompanyAction,
		},
		dispatch,
	)

export default connect(mapStateToProps, mapDispatchToProps)(ThemeEmployeeNavbar);
