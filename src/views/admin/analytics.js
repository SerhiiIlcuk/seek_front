// import external modules
import React, {Component, Fragment} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {Col, Row} from "reactstrap";

class Analytics extends Component {

	render() {
		return (
			<Fragment>
				<Row className="min-vh-100">
					<Col md="12">
						Analytics Page
					</Col>
				</Row>
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(Analytics));
