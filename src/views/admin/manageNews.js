import React, {Component, Fragment} from "react";
import {Button, Card, CardBody, Col, CustomInput, Row, Table} from "reactstrap";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {deleteNewsAction, fetchAllNewsAction} from "../../redux/actions/news";
import {getAllNews} from "../../redux/selectors/news";
import moment from "moment";
import {Link} from "react-router-dom";
import {withRouter} from "react-router";
import {Edit, XSquare} from "react-feather";
import ModalDialog from "../../components/modal/modal";

class ManageNews extends Component {
	state = {
		showDeleteModal: false,
		deleteNewsId: null,
	};
	componentDidMount() {
		const {fetchAllNews} = this.props;

		fetchAllNews();
	}

	showDeleteModal = (id) => {
		this.setState({deleteNewsId: id, showDeleteModal: true});
	}

	editNews = (id) => {
		const {history} = this.props;
		history.push(`/admin/news-edit/${id}`)
	}

	onClickDelete = () => {
		const {
			deleteNewsId,
		} = this.state;
		const {deleteNews} = this.props;

		deleteNews(deleteNewsId);
		this.setState({showDeleteModal: false});
	}

	onClickCancel = () => {
		this.setState({showDeleteModal: false});
	}

	render() {
		const {showDeleteModal} = this.state;
		const {allNews} = this.props;

		return (
			<Fragment>
				<ModalDialog
					show={showDeleteModal}
					title="confirm"
					content="Are you sure you want to delete this news?"
					onClickOk={this.onClickDelete}
					onClickCancel={this.onClickCancel}
				/>
				<Row>
					<Col md="12">
						<Card className="min-vh-100">
							<CardBody>
								<Row>
									<Col md="12">
										<Link to="/admin/news-post">
											<Button
												size="lg"
												color="primary"
											>
												Add article
											</Button>
										</Link>
									</Col>

									<Col md="12">
										<Table striped>
											<thead>
											<tr>
												<th></th>
												<th>Date</th>
												<th>Status</th>
												<th>Title</th>
												<th>Featured</th>
												<th>Category</th>
												<th>Action</th>
											</tr>
											</thead>
											<tbody>
											{
												allNews && allNews.map((news, index) => {
													const featuredId = 'featured' + index;
													return (
														<tr key={index}>
															<th scope="row">{index + 1}</th>
															<td>{moment(news.createdAt).format('YYYY-MM-DD')}</td>
															<td>{news.status}</td>
															<td>{news.title}</td>
															<td>
																<CustomInput
																	id={featuredId}
																	type="checkbox"
																	disabled
																	defaultChecked={news.featured}
																/>
															</td>
															<td>{news.category}</td>
															<td>
																<Edit
																	size={30}
																	color="#006d6d"
																	className="cursor-pointer mr-2"
																	onClick={() => this.editNews(news._id)}
																/>
																<XSquare
																	size={30}
																	color="#ff8d69"
																	className="cursor-pointer"
																	onClick={() => this.showDeleteModal(news._id)}
																/>
															</td>
														</tr>
													)
												})
											}
											</tbody>
										</Table>
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

const mapStateToProps = state => ({
	allNews: getAllNews(state),
})

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			fetchAllNews: fetchAllNewsAction,
			deleteNews: deleteNewsAction,
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(ManageNews));
