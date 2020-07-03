// import external modules
import React, {Component, Fragment} from "react";
import {Button, Card, CardBody, CardText, CardTitle, Col, Row} from "reactstrap";
import cardImgEle07 from "../../assets/img/elements/07.png";
import {getAllNews} from "../../redux/selectors/news";
import {bindActionCreators} from "redux";
import {fetchAllNewsAction} from "../../redux/actions/news";
import {fetchAllJobsAction} from "../../redux/actions/job";
import {connect} from "react-redux";
import {getAllJobs} from "../../redux/selectors/job";
import {truncateText} from "../../common";
import {EMPLOYEE, NEWS_PUBLISHED} from "../../config/constants";
import parse from 'html-react-parser';
import Link from "../../containers/todo/todoFilterLink";
import {withRouter} from "react-router";
import {getUserType} from "../../redux/selectors/auth";

class LandingPage extends Component {
	componentDidMount() {
		const {
			fetchAllJobs,
			fetchAllNews
		} = this.props;

		if (fetchAllNews) {
			fetchAllNews();
		}

		if (fetchAllJobs) {
			fetchAllJobs();
		}
	}

	navigateTo = (url) => {
		const {history} = this.props;
		history.push(url);
	}

	render() {
		const {
			allJobs,
			allNews,
			userType,
		} = this.props;

		const publishedNews = allNews && allNews.filter(news => news.status === NEWS_PUBLISHED);
		const publishedJobs = allJobs && allJobs.filter(job => job.published);

		console.log(publishedJobs);
		let companyJobs;
		if (userType === EMPLOYEE) {
			const userCompany = localStorage.getItem('userCompany') && JSON.parse(localStorage.getItem('userCompany'));
			const companyId = userCompany && userCompany.id;
			companyJobs = publishedJobs && publishedJobs.filter(job => job.company._id === companyId)
		} else {
			companyJobs = publishedJobs;
		}

		return (
			<Fragment>
				<Row>
					<Col md="12">

					</Col>
				</Row>

				<Row>
					<Col md="6">
						<h4 className="text-bold-600">Latest news</h4>
					</Col>
					<Col md="6" className="text-right">
						<Button color="primary" onClick={() => this.navigateTo('/candidate/news')}>See more news</Button>
					</Col>
					{
						publishedNews && publishedNews.map((news, index) => (
							<Col md="4" sm="6" className="bg-gray" key={index}>
								<Card className="card card-inverse bg-info text-center">
									<CardBody>
										<div className="row d-flex">
											<div className="col align-self-center">
												<img src={cardImgEle07} width="150" alt="Card cap 07" className=""/>
											</div>
											<div className="col align-self-center">
												<CardTitle className="mt-3">{truncateText(news.title, 20)}</CardTitle>
												{truncateText((news.content && parse(news.content)), 30)}
												<Button className="btn btn-raised btn-info btn-darken-3">See detail</Button>
											</div>
										</div>
									</CardBody>
								</Card>
							</Col>
						))
					}
				</Row>

				<Row className="mt-3">
					<Col md="6">
						<h4 className="text-bold-600">Latest job opportunities</h4>
					</Col>
					<Col md="6" className="text-right">
						<Button color="primary" onClick={() => this.navigateTo('/candidate/job')}>See more jobs</Button>
					</Col>
					{
						companyJobs && companyJobs.map((job, index) => (
							<Col key={index} sm="12" md="4">
								<Card className="text-left height-150">
									<CardBody>
										<CardTitle className="info">{truncateText(job.title, 30)}</CardTitle>
										<CardText>
											{truncateText(job.summary, 100)}
										</CardText>
										<Button className="position-absolute position-bottom-0" color="info">See detail</Button>
									</CardBody>
								</Card>
							</Col>
						))
					}
				</Row>
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	userType: getUserType(state),
	allNews: getAllNews(state),
	allJobs: getAllJobs(state),
})

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			fetchAllNews: fetchAllNewsAction,
			fetchAllJobs: fetchAllJobsAction,
		},
		dispatch
	)

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(withRouter(LandingPage));
