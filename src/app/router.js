// import external modules
import React, {Component, Suspense, lazy} from "react";
import {connect} from "react-redux"
import {BrowserRouter, Redirect, Switch} from "react-router-dom";
import Spinner from "../components/spinner/spinner";

// import internal(own) modules
import MainLayoutRoutes from "../layouts/routes/mainRoutes";
import FullPageLayout from "../layouts/routes/fullpageRoutes";
import {getToken, getUserType} from "../redux/selectors/auth";
// By Serhii
const LazyCompanyProfile = lazy(() => import("../views/employee/profile"));
const LazyCandidateProfile = lazy(() => import("../views/candidate/profile"));
const LazyJobPost = lazy(() => import("../views/employee/jobPost"));
const LazyManageJobs = lazy(() => import("../views/employee/manageJobs"));
const LazyManageUsers = lazy(() => import("../views/employee/manageUsers"));
// unSigned
const LazyLanding = lazy(() => import("../views/candidate/landing"));
const LazyJob = lazy(() => import("../views/candidate/job"));
const LazyCompany = lazy(() => import("../views/candidate/company"));
const LazyNews = lazy(() => import("../views/candidate/news"));
const LazyJobDetail = lazy(() => import("../views/common/jobDetail"));
const LazyNewsDetail = lazy(() => import("../views/common/newsDetail"));
const LazyCompanyDetail = lazy(() => import("../views/candidate/companyDetail"));

// admin
const LazyManageCompanies = lazy(() => import("../views/admin/manageCompanies"));
const LazyAdminManageUsers = lazy(() => import("../views/admin/manageUsers"));
const LazyAdminArticleEdit = lazy(() => import("../views/admin/editNews"));
const LazyAdminArticlePost = lazy(() => import("../views/admin/postNews"));
const LazyAdminManageNews = lazy(() => import("../views/admin/manageNews"));
const LazyAdminAnalytics = lazy(() => import("../views/admin/analytics"));

// Full Layout
const LazyForgotPassword = lazy(() => import("../views/pages/forgotPassword"));
const LazyLogin = lazy(() => import("../views/pages/login"));
const LazyRegister = lazy(() => import("../views/pages/register"));

const mapStateToProps = (state) => {
	return {
		token: getToken(state),
		useType: getUserType(state),
	}
};

class Router extends Component {

	render() {
		return (
			// Set the directory path if you are deplying in sub-folder
			<BrowserRouter basename="/">
				{
					this.props.token ? (
						<Switch>
							{/* Dashboard Views */}
							<MainLayoutRoutes
								exact
								path="/"
								render={matchprops => (
									<Suspense fallback={<Spinner/>}>
										<LazyLanding {...matchprops} />
									</Suspense>
								)}
							/>
							<MainLayoutRoutes
								exact
								path="/candidate/job"
								render={matchprops => (
									<Suspense fallback={<Spinner/>}>
										<LazyJob {...matchprops} />
									</Suspense>
								)}
							/>
							<MainLayoutRoutes
								exact
								path="/candidate/news"
								render={matchprops => (
									<Suspense fallback={<Spinner/>}>
										<LazyNews {...matchprops} />
									</Suspense>
								)}
							/>
							<MainLayoutRoutes
								exact
								path="/candidate/company"
								render={matchprops => (
									<Suspense fallback={<Spinner/>}>
										<LazyCompany {...matchprops} />
									</Suspense>
								)}
							/>
							<MainLayoutRoutes
								exact
								path="/job-detail/:id"
								render={matchprops => (
									<Suspense fallback={<Spinner/>}>
										<LazyJobDetail {...matchprops} />
									</Suspense>
								)}
							/>
							<MainLayoutRoutes
								exact
								path="/news-detail/:id"
								render={matchprops => (
									<Suspense fallback={<Spinner/>}>
										<LazyNewsDetail {...matchprops} />
									</Suspense>
								)}
							/>
							<MainLayoutRoutes
								exact
								path="/company-detail/:id"
								render={matchprops => (
									<Suspense fallback={<Spinner/>}>
										<LazyCompanyDetail {...matchprops} />
									</Suspense>
								)}
							/>
							<MainLayoutRoutes
								exact
								path="/employee/company-profile/edit"
								render={matchprops => (
									<Suspense fallback={<Spinner/>}>
										<LazyCompanyProfile {...matchprops} />
									</Suspense>
								)}
							/>
							<MainLayoutRoutes
								exact
								path="/employee/job-post"
								render={matchprops => (
									<Suspense fallback={<Spinner/>}>
										<LazyJobPost {...matchprops} />
									</Suspense>
								)}
							/>
							<MainLayoutRoutes
								exact
								path="/employee/job-edit/:id"
								render={matchprops => (
									<Suspense fallback={<Spinner/>}>
										<LazyJobPost {...matchprops} />
									</Suspense>
								)}
							/>
							<MainLayoutRoutes
								exact
								path="/employee/manage-jobs"
								render={matchprops => (
									<Suspense fallback={<Spinner/>}>
										<LazyManageJobs {...matchprops} />
									</Suspense>
								)}
							/>
							<MainLayoutRoutes
								exact
								path="/employee/manage-users"
								render={matchprops => (
									<Suspense fallback={<Spinner/>}>
										<LazyManageUsers {...matchprops} />
									</Suspense>
								)}
							/>
							<MainLayoutRoutes
								exact
								path="/user/profile/edit"
								render={matchprops => (
									<Suspense fallback={<Spinner/>}>
										<LazyCandidateProfile {...matchprops} />
									</Suspense>
								)}
							/>
							<MainLayoutRoutes
								exact
								path="/admin/manage-companies"
								render={matchprops => (
									<Suspense fallback={<Spinner/>}>
										<LazyManageCompanies {...matchprops} />
									</Suspense>
								)}
							/>
							<MainLayoutRoutes
								exact
								path="/admin/manage-users"
								render={matchprops => (
									<Suspense fallback={<Spinner/>}>
										<LazyAdminManageUsers {...matchprops} />
									</Suspense>
								)}
							/>
							<MainLayoutRoutes
								exact
								path="/admin/manage-news"
								render={matchprops => (
									<Suspense fallback={<Spinner/>}>
										<LazyAdminManageNews {...matchprops} />
									</Suspense>
								)}
							/>
							<MainLayoutRoutes
								exact
								path="/admin/news-post"
								render={matchprops => (
									<Suspense fallback={<Spinner/>}>
										<LazyAdminArticlePost {...matchprops} />
									</Suspense>
								)}
							/>
							<MainLayoutRoutes
								exact
								path="/admin/news-edit/:id"
								render={matchprops => (
									<Suspense fallback={<Spinner/>}>
										<LazyAdminArticleEdit {...matchprops} />
									</Suspense>
								)}
							/>
							<MainLayoutRoutes
								exact
								path="/admin/analytics"
								render={matchprops => (
									<Suspense fallback={<Spinner/>}>
										<LazyAdminAnalytics {...matchprops} />
									</Suspense>
								)}
							/>
							<Redirect
								exact
								to="/"
							/>
						</Switch>
					) : (
						<Switch>
							<MainLayoutRoutes
								exact
								path="/"
								render={matchprops => (
									<Suspense fallback={<Spinner/>}>
										<LazyLanding {...matchprops} />
									</Suspense>
								)}
							/>
							<MainLayoutRoutes
								exact
								path="/candidate/job"
								render={matchprops => (
									<Suspense fallback={<Spinner/>}>
										<LazyJob {...matchprops} />
									</Suspense>
								)}
							/>
							<MainLayoutRoutes
								exact
								path="/candidate/news"
								render={matchprops => (
									<Suspense fallback={<Spinner/>}>
										<LazyNews {...matchprops} />
									</Suspense>
								)}
							/>
							<MainLayoutRoutes
								exact
								path="/candidate/company"
								render={matchprops => (
									<Suspense fallback={<Spinner/>}>
										<LazyCompany {...matchprops} />
									</Suspense>
								)}
							/>
							<MainLayoutRoutes
								exact
								path="/job-detail/:id"
								render={matchprops => (
									<Suspense fallback={<Spinner/>}>
										<LazyJobDetail {...matchprops} />
									</Suspense>
								)}
							/>
							<MainLayoutRoutes
								exact
								path="/news-detail/:id"
								render={matchprops => (
									<Suspense fallback={<Spinner/>}>
										<LazyNewsDetail {...matchprops} />
									</Suspense>
								)}
							/>
							<MainLayoutRoutes
								exact
								path="/company-detail/:id"
								render={matchprops => (
									<Suspense fallback={<Spinner/>}>
										<LazyCompanyDetail {...matchprops} />
									</Suspense>
								)}
							/>
							<FullPageLayout
								exact
								path="/login"
								render={matchprops => (
									<Suspense fallback={<Spinner/>}>
										<LazyLogin {...matchprops} />
									</Suspense>
								)}
							/>
							<FullPageLayout
								exact
								path="/register"
								render={matchprops => (
									<Suspense fallback={<Spinner/>}>
										<LazyRegister {...matchprops} />
									</Suspense>
								)}
							/>
							<FullPageLayout
								exact
								path="/forgot-password"
								render={matchprops => (
									<Suspense fallback={<Spinner/>}>
										<LazyForgotPassword {...matchprops} />
									</Suspense>
								)}
							/>
							<Redirect
								exact
								to="/"
							/>
						</Switch>
					)
				}
			</BrowserRouter>
		);
	}
}

export default connect(mapStateToProps)(Router);
