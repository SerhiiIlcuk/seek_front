import React, {Component, Fragment} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {Button, Card, CardBody, Col, Label, Row} from "reactstrap";
import parse from 'html-react-parser';
import {fetchNewsAction} from "../../redux/actions/news";
import {getNews} from "../../redux/selectors/news";

class NewsDetail extends Component {
	componentDidMount() {
		const {
			match,
			fetchNews,
		} = this.props;

		if (fetchNews) {
			if (match.params.id) {
				fetchNews(match.params.id);
			}
		}
	}

	render() {
		const {news} = this.props;
		return (
			<Fragment>
				<Row>
					<Col md="12">
						<Card className="min-vh-100">
							<CardBody>
								<Row>
									<Col md="12">
										<h3 className="font-weight-bold">{news && news.title}</h3>
									</Col>

									<Col md="12">
										<h5 className="text-secondary font-weight-normal">
											{news && news.category}
										</h5>
									</Col>

									<Col md="12">
										{news && news.content && parse(news.content)}
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
	news: getNews(state),
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			fetchNews: fetchNewsAction,
		},
		dispatch,
	)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(NewsDetail));
