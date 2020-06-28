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
import {fetchAllCompaniesAction, fetchAllCompanyTypesAction} from "../../redux/actions/company";
import {getAllCompanies, getAllCompanyTypes} from "../../redux/selectors/company";
import config from "../../config";
import {companySizes, experienceLevels} from "../../config/constants";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
	superLargeDesktop: {
		// the naming can be any, depends on you.
		breakpoint: { max: 4000, min: 3000 },
		items: 5
	},
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 4
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 3
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
			fetchAllCompanies,
			fetchAllCompanyTypes,
		} = this.props;

		if (fetchAllCompanies) {
			fetchAllCompanies();
		}

		if (fetchAllCompanyTypes) {
			fetchAllCompanyTypes();
		}
	}

	onChangeDropdown = (id, stateName) => {
		this.setState({[stateName]: id});
	}

	filterCompanies = (allCompanies) => {
		const {
			companyType,
			companySize,
		} = this.state;
		const filteredCompanies = allCompanies && allCompanies.filter(company => {
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
			allCompanies,
			allCompanyTypes,
		} = this.props;
		const {
			companyType,
			companySize,
		} = this.state;
		const filteredCompanies = this.filterCompanies(allCompanies);
		const logoImages = allCompanies && allCompanies.map(company => {
			return company.logoImg;
		});

		return (
			<Fragment>
				<Row>
					<Col md="12">
						{/*<CarouselSliderCard
					 cardTitle=""
					 description=""
				  />*/}
						{
							logoImages && logoImages.length > 0 &&
							<Carousel
								ssr={true}
								partialVisbile
								itemClass="image-item"
								responsive={responsive}
								autoPlay={false}
								infinite
								deviceType={this.props.deviceType}
								removeArrowOnDeviceType={["mobile"]}
							>
								{
									logoImages && logoImages.map((item, key) =>{
										return (
											<div key={key}>
												<img src={config.baseUrl + item}/>
											</div>
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
									<Col md="3" sm="12">
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
									<Col md="3" sm="12">
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
									<Col md="3" sm="12">
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
									</Col>
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
	allCompanies: getAllCompanies(state),
	allCompanyTypes: getAllCompanyTypes(state),
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			fetchAllCompanies: fetchAllCompaniesAction,
			fetchAllCompanyTypes: fetchAllCompanyTypesAction,
		},
		dispatch,
	)

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CompanyPage);
