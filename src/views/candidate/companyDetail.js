import React, {Component, Fragment} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {fetchJobAction} from "../../redux/actions/job";
import {getJob} from "../../redux/selectors/job";
import {withRouter} from "react-router";
import {Button, Card, CardBody, Col, Label, Row} from "reactstrap";
import parse from 'html-react-parser';
import config from "../../config";

class CompanyDetail extends Component {
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

								</Row>
							</CardBody>
						</Card>
					</Col>

					<Col md="3">
						<Card className="min-vh-100">
							<CardBody>
								<Row>

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
)(withRouter(CompanyDetail));
