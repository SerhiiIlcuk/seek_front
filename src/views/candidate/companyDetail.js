import React, {Component, Fragment} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {Button, Card, CardBody, Col, Row} from "reactstrap";
import parse from 'html-react-parser';
import config from "../../config";
import {fetchCompanyByIdAction} from "../../redux/actions/company";
import {getCompanyDetail} from "../../redux/selectors/company";
import {fetchCompanyJobsAction} from "../../redux/actions/job";
import {getCompanyJobs} from "../../redux/selectors/job";

class CompanyDetail extends Component {
	componentDidMount() {
		const {
			match,
			fetchCompanyById,
			fetchCompanyJobs,
		} = this.props;

		if (match.params.id) {
			if (fetchCompanyById) {
				fetchCompanyById(match.params.id);
			}
			if (fetchCompanyJobs) {
				fetchCompanyJobs(match.params.id);
			}
		}
	}

	navigateToUrl = (url) => {
		const {history} = this.props;

		history.push(url);
	}

	render() {
		const {
			companyDetail,
			companyJobs,
		} = this.props;

		const publishedJobs = companyJobs && companyJobs.filter(item => item.published === true);

		return (
			<Fragment>
				<Row>
					<Col md="12">
						<Card>
							<CardBody>
								<Row>
									<Col md="4" className="text-center">
										{
											companyDetail &&
											companyDetail.logoImg &&
											<img
												src={config.baseUrl + (companyDetail && companyDetail.logoImg)}
												className="width-80-per"
											/>
										}
									</Col>
									<Col md="8">
										{companyDetail && companyDetail.neighborhood}
									</Col>
								</Row>
							</CardBody>
						</Card>
					</Col>

					<Col md="12">
						<Card>
							<CardBody>
								<Row>
									<Col md="12">
										<h4 className="text-bold-600">Open jobs for {companyDetail && companyDetail.name}...</h4>
									</Col>
								</Row>

								{
									publishedJobs &&
									publishedJobs.map((job, index) => (
										<Row key={index} className="mt-1 bg-secondary p-2">
											<Col md="3">
												<Row>
													<Col md="12" className="text-center">
														{job.title}
													</Col>
												</Row>
												<Row>
													<Col md="12" className="text-center">
														{job.jobLocation && job.jobLocation.name}
													</Col>
												</Row>
											</Col>

											<Col md="6" className="text-center">
												{job.description && parse(job.description)}
											</Col>

											<Col md="3" className="text-right">
												<Button
													color="primary"
													onClick={() => this.navigateToUrl(`/job-detail/${job._id}`)}
												>
													See Details
												</Button>
											</Col>
										</Row>
									))
								}
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	companyDetail: getCompanyDetail(state),
	companyJobs: getCompanyJobs(state),
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			fetchCompanyById: fetchCompanyByIdAction,
			fetchCompanyJobs: fetchCompanyJobsAction,
		},
		dispatch,
	)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(CompanyDetail));
