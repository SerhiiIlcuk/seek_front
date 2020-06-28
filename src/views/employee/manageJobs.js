// import external modules
import React, {Component, Fragment} from "react";
import {
	Card,
	CardBody,
	CardTitle,
	Row,
	Col,
	Button,
	TabContent,
	CardText,
	TabPane,
	Nav,
	NavItem,
	NavLink,
	Table, Input, Label, CustomInput
} from "reactstrap";
import classnames from "classnames";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getEmployeeJobs} from "../../redux/selectors/job";
import {fetchEmployeeJobsAction, updateJobSettingsAction} from "../../redux/actions/job";
import moment from 'moment';

class ManageJobsPage extends Component {
	state = {
		activeTab: "1"
	};

	componentDidMount() {
		const {fetchEmployeeJobs} = this.props;
		fetchEmployeeJobs();
	};

	toggle = tab => {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab
			});
		}
	};

	_updateJobSettings = (job, key, value) => {
		const {updateJobSettings} = this.props;
		const data = {
			id: job._id,
			[key]: value,
		};
		updateJobSettings(data);
	};

	navigateToEditPage = (jobId) => {
		const {history} = this.props;
		history.push("/employee/job-edit/" + jobId);
	}

	render() {
		const {employeeJobs} = this.props;
		const publishedJobs = employeeJobs && employeeJobs.filter(job => job.published);
		const unPublishedJobs = employeeJobs && employeeJobs.filter(job => !job.published);

		return (
			<Fragment>
				<Row>
					<Col md="12">
						<Card>
							<CardBody>
								<Row>
									<Col md="12">
										<div style={{height: "400px", textAlign: "center"}}>
											Analytics will be here.
										</div>
									</Col>
								</Row>
							</CardBody>
						</Card>

						<Card>
							<CardBody>
								<Row>
									<Col md="12" className="min-vh-100">
										<div>
											<Nav tabs className="nav-border-bottom">
												<NavItem>
													<NavLink
														className={classnames({
															active: this.state.activeTab === "1"
														})}
														onClick={() => {
															this.toggle("1");
														}}
													>
														PUBLISHED
													</NavLink>
												</NavItem>
												<NavItem>
													<NavLink
														className={classnames({
															active: this.state.activeTab === "2"
														})}
														onClick={() => {
															this.toggle("2");
														}}
													>
														UNPUBLISHED
													</NavLink>
												</NavItem>
											</Nav>
											<TabContent activeTab={this.state.activeTab}>
												<TabPane tabId="1">
													<Row>
														<Col md="12">
															<Table striped>
																<thead>
																<tr>
																	<th>Slot</th>
																	<th>Job Title</th>
																	<th>Posted</th>
																	<th>Expires</th>
																	<th>Views</th>
																	<th>Applies</th>
																	<th>Edit</th>
																	<th>Publishing</th>
																	<th>Auto-renew</th>
																</tr>
																</thead>
																<tbody>
																{
																	publishedJobs && publishedJobs.map((job, index) => {
																		return (
																			<tr key={index}>
																				<th scope="row">{index + 1}</th>
																				<td>{job.title}</td>
																				<td>{moment(job.createdAt).format('YYYY-MM-DD')}</td>
																				<td>X</td>
																				<td>34</td>
																				<td>{(job.applies && job.applies.length) || 0}</td>
																				<td
																					className="text-primary cursor-pointer"
																					onClick={() => this.navigateToEditPage(job._id)}
																				>
																					Edit
																				</td>
																				<td>
																					<Button
																						color="primary"
																						onClick={() => this._updateJobSettings(job, 'published', false)}
																					>
																						UnPublish
																					</Button>
																				</td>
																				<td className="text-center">
																					<CustomInput id={job._id} type="checkbox"/>
																				</td>
																			</tr>
																		)
																	})
																}
																</tbody>
															</Table>
														</Col>
													</Row>
												</TabPane>
												<TabPane tabId="2">
													<Row>
														<Col md="12">
															<Table striped>
																<thead>
																<tr>
																	<th>Slot</th>
																	<th>Job Title</th>
																	<th>Posted</th>
																	<th>Expires</th>
																	<th>Views</th>
																	<th>Applies</th>
																	<th>Edit</th>
																	<th>Publishing</th>
																	<th>Auto-renew</th>
																</tr>
																</thead>
																<tbody>
																{
																	unPublishedJobs && unPublishedJobs.map((job, index) => {
																		return (
																			<tr key={index}>
																				<th scope="row">{index + 1}</th>
																				<td>{job.title}</td>
																				<td>{moment(job.createdAt).format('YYYY-MM-DD')}</td>
																				<td>X</td>
																				<td>34</td>
																				<td>{(job.applies && job.applies.length) || 0}</td>
																				<td
																					className="text-primary cursor-pointer"
																					onClick={() => this.navigateToEditPage(job._id)}
																				>
																					Edit
																				</td>
																				<td>
																					<Button
																						color="primary"
																						onClick={() => this._updateJobSettings(job, 'published', true)}
																					>
																						Publish
																					</Button>
																				</td>
																				<td className="text-center">
																					<CustomInput id={job._id} type="checkbox"/>
																				</td>
																			</tr>
																		)
																	})
																}
																</tbody>
															</Table>
														</Col>
													</Row>
												</TabPane>
											</TabContent>
										</div>
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
	employeeJobs: getEmployeeJobs(state),
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			fetchEmployeeJobs: fetchEmployeeJobsAction,
			updateJobSettings: updateJobSettingsAction,
		},
		dispatch,
	)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ManageJobsPage);
