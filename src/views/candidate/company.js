// import external modules
import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {
	Row,
	Col,
	Card,
	CardBody,
	Input,
	FormGroup,
	Button
	, Label
} from "reactstrap";
import {bindActionCreators} from "redux";
import {fetchVerifiedCompaniesAction, fetchAllCompanyTypesAction} from "../../redux/actions/company";
import {getVerifiedCompanies, getAllCompanyTypes} from "../../redux/selectors/company";
import config from "../../config";
import {companySizes} from "../../config/constants";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
	superLargeDesktop: {
		// the naming can be any, depends on you.
		breakpoint: { max: 4000, min: 3000 },
		items: 3
	},
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 3
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 2
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1
	}
};

class CompanyPage extends Component {
	state = {
		companyType: "-1",
		companySize: "-1",
	};

	componentDidMount() {
		const {
			fetchVerifiedCompanies,
			fetchAllCompanyTypes,
		} = this.props;

		if (fetchVerifiedCompanies) {
			fetchVerifiedCompanies();
		}

		if (fetchAllCompanyTypes) {
			fetchAllCompanyTypes();
		}
	}

	onChangeDropdown = (id, stateName) => {
		this.setState({[stateName]: id});
	}

	filterCompanies = (verifiedCompanies) => {
		const {
			companyType,
			companySize,
		} = this.state;
		const filteredCompanies = verifiedCompanies && verifiedCompanies.filter(company => {
			let typeFlag = false;
			let sizeFlag = false;

			if (companyType === "-1") {
				typeFlag = true;
			} else {
				const index = company.companyTypes && company.companyTypes.findIndex(type => type === companyType);
				typeFlag = index !== -1;
			}

			if (companySize === "-1") {
				sizeFlag = true;
			} else {
				const element = companySizes && companySizes.find(item => item.id === companySize);
				if (element) {
					const lowLimit = element.value.low;
					const highLimit = element.value.high;

					if (company.totalEmployees > lowLimit && company.totalEmployees <= highLimit) {
						sizeFlag = true;
					}
				} else {
					sizeFlag = true;
				}
			}

			return typeFlag && sizeFlag;
		});

		return filteredCompanies;
	}

	render() {
		const {
			verifiedCompanies,
			allCompanyTypes,
		} = this.props;
		const {
			companyType,
			companySize,
		} = this.state;
		const filteredCompanies = this.filterCompanies(verifiedCompanies);
		/*const logoImages = verifiedCompanies && verifiedCompanies.map(company => {
			return company.logoImg;
		});*/

		return (
			<Fragment>
				<Row>
					<Col md="12">
						{/*<CarouselSliderCard
					 cardTitle=""
					 description=""
				  />*/}
						{
							verifiedCompanies && verifiedCompanies.length > 0 &&
							<Carousel
								ssr={true}
								partialVisbile
								itemClass="image-item"
								responsive={responsive}
								autoPlay={true}
								infinite
								deviceType={this.props.deviceType}
								removeArrowOnDeviceType={["mobile"]}
							>
								{
									verifiedCompanies && verifiedCompanies.map((item, key) =>{
										return (
											item.logoImg && item.logoImg !== undefined ? (
												<div key={key} className="position-relative">
													<img className="position-absolute bottom-right" src={config.baseUrl + item.logoImg}/>
													<Label className="position-absolute text-warning">{item.name}</Label>
													<br/>
													<Label className="position-absolute text-warning">{item.city}</Label>
												</div>
											) : null
										)
									})
								}
								<div>
									<img width={400} height={400} src="https://i.postimg.cc/qBGQNc37/ro-slider.jpg"/>
								</div>
								<div>
									<img width={400} height={400} src="https://i.postimg.cc/NfzMDVHP/willie-mosconi-slider.jpg"/>
								</div>
								<div>
									<img width={400} height={400} src="https://i.postimg.cc/C12h7nZn/ms-1.jpg"/>
								</div>
							</Carousel>
						}
					</Col>
				</Row>

				<Row>
					<Col md="12">
						<Card>
							<CardBody>
								<Row>
									<Col md="12">
										<p className="text-dark">
											Companies Hiring Right Now
										</p>
									</Col>
								</Row>

								<Row>
									<Col md="6" sm="12">
										<FormGroup>
											<Label for="companyType">Company Type</Label>
											<Input
												type="select"
												id="companyType"
												name="companyType"
												value={companyType}
												onChange={(e) => this.onChangeDropdown(e.target.value, 'companyType')}
											>
												<option value="-1">Select company type</option>
												{
													allCompanyTypes && allCompanyTypes.map(item => {
														return (
															<option key={item._id} value={item._id}>{item.typeName}</option>
														)
													})
												}
											</Input>
										</FormGroup>
									</Col>
									<Col md="6" sm="12">
										<FormGroup>
											<Label for="companySize">Company Size</Label>
											<Input
												type="select"
												id="companySize"
												name="companySize"
												value={companySize}
												onChange={(e) => this.onChangeDropdown(e.target.value, 'companySize')}
											>
												<option value="-1">Select company size</option>
												{
													companySizes && companySizes.map(item => {
														return (
															<option key={item.id + "size"} value={item.id}>{item.title}</option>
														)
													})
												}
											</Input>
										</FormGroup>
									</Col>
									{/*<Col md="3" sm="12">
										<FormGroup>
											<Label for="industry">Company Industry</Label>
											<Input type="select" id="industry" name="industry">

											</Input>
										</FormGroup>
									</Col>
									<Col md="3" sm="12">
										<FormGroup>
											<Label for="role">Company Role</Label>
											<Input type="select" id="role" name="role">

											</Input>
										</FormGroup>
									</Col>*/}
								</Row>

								<Row className="bg-secondary">
									<Col md="12" className="min-vh-100">
										{
											filteredCompanies && filteredCompanies.map((company, index) => (
												<Card color="bg-light" key={index}>
													<CardBody>
														<Row>
															<Col md="2" sm="12" className="text-center">
																{
																	company.logoImg &&
																	<img
																		src={config.baseUrl + company.logoImg}
																		className="rounded-circle img-border gradient-summer width-50"
																		alt="company logo"
																	/>
																}
															</Col>
															<Col md="2" sm="12" className="text-center">
																{company.name}
															</Col>
															<Col md="6" sm="12" className="text-center">
																{company.streetAddressOne}
															</Col>
															<Col md="2" sm="12" className="text-center">
																<Button color="primary">View Jobs</Button>
															</Col>
														</Row>
													</CardBody>
												</Card>
											))
										}
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
	verifiedCompanies: getVerifiedCompanies(state),
	allCompanyTypes: getAllCompanyTypes(state),
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			fetchVerifiedCompanies: fetchVerifiedCompaniesAction,
			fetchAllCompanyTypes: fetchAllCompanyTypesAction,
		},
		dispatch,
	)

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CompanyPage);
