import React, {Component, Fragment} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {fetchJobAction} from "../../redux/actions/job";
import {getJob} from "../../redux/selectors/job";
import {withRouter} from "react-router";
import {Button, Card, CardBody, Col, Label, Row} from "reactstrap";
import parse from 'html-react-parser';
import config from "../../config";

class JobDetail extends Component {
	componentDidMount() {
		const {
			match,
			fetchJob
		} = this.props;

		if (fetchJob) {
			if (match.params.id) {
				fetchJob(match.params.id);
			}
		}
	}

	render() {
		const {job} = this.props;
		return (
			<Fragment>
				<Row>
					<Col md="9">
						<Card className="min-vh-100">
							<CardBody>
								<Row>
									<Col md="12">
										<h3 className="font-weight-bold">{job && job.title}</h3>
									</Col>

									<Col md="12">
										<h5 className="text-secondary font-weight-normal">
											{job && job.company && job.company.name} | {job && job.jobLocation && job.jobLocation.name}
										</h5>
									</Col>

									<Col md="12">
										<p>
											{job && job.summary}
										</p>
									</Col>

									<Col md="12">
										{job && job.description && parse(job.description)}
									</Col>
								</Row>
							</CardBody>
						</Card>
					</Col>

					<Col md="3">
						<Card className="min-vh-100">
							<CardBody>
								<Row>
									<Col md="12" className="text-center">
										{
											job && job.company && job.company.logoImg &&
											<img
												src={config.baseUrl + job.company.logoImg}
												className="rounded-circle img-border gradient-summer width-50-per"
												alt="company logo"
											/>
										}
									</Col>

									<Col md="12" className="text-center mt-5">
										<Button color="primary" size="lg">
											<a href={job && job.howToApply} className="text-white" target="_blank">APPLY NOW</a>
										</Button>
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

const mapStateToProps = (state) => ({
	job: getJob(state),
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			fetchJob: fetchJobAction,
		},
		dispatch,
	)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(JobDetail));
