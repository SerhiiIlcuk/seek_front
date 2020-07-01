import React, {Component, Fragment} from "react";
import {Button, Card, CardBody, Col, CustomInput, Row, Table} from "reactstrap";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {fetchAllNewsAction} from "../../redux/actions/news";
import {getAllNews} from "../../redux/selectors/news";
import moment from "moment";
import {Link} from "react-router-dom";
import {Edit, XSquare} from "react-feather";

class ManageNews extends Component {
	componentDidMount() {
		const {fetchAllNews} = this.props;

		fetchAllNews();
	}

	render() {
		const {allNews} = this.props;

		return (
			<Fragment>
				<Row>
					<Col md="12">
						<Card>
							<CardBody>
								<Row>
									<Col md="12">
										<Link to="/admin/news">
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
																<Edit size={20} color="#006d6d"/>
																<XSquare size={20} color="#ff8d69" />
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
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ManageNews);
