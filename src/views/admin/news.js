// import external modules
import React, {Component, Fragment} from "react";
import {Col, FormGroup, Label, Row, Button, Input, CustomInput} from 'reactstrap';
import {bindActionCreators} from "redux";
import * as Yup from "yup";
import {connect} from "react-redux";
import {Editor} from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../../assets/scss/views/components/extra/editor.scss";
import {Field, Formik, Form} from "formik";
import {articleCategories, articleStatus} from "../../config/constants";
import {EditorState} from "draft-js";
import {stateToHTML} from "draft-js-export-html";
import {createNewsAction} from "../../redux/actions/news";

const formSchema = Yup.object().shape({
	title: Yup.string()
		.required('Required')
		.min(5, 'input more than 5 letters')
		.max(255, 'input less than 255 letters'),
	author: Yup.string()
		.required("Required"),
});

class News extends Component {
	state = {
		category: articleCategories && articleCategories[0].id,
		status: articleStatus && articleStatus[0].id,
		featured: false,
		content: EditorState.createEmpty(),
	};

	onChangeState = (value, key) => {
		this.setState({[key]: value});
	}

	convertStateToHtml = () => {
		const {content} = this.state;
		if (content) {
			return stateToHTML(content.getCurrentContent());
		} else {
			return null;
		}
	};

	render() {
		const {
			category,
			status,
			featured,
			content,
		} = this.state;
		const {createNews} = this.props;

		return (
			<Fragment>
				<Formik
					initialValues={{
						title: '',
						author: '',
					}}
					onSubmit={(values) => {
						const content = this.convertStateToHtml();
						const data = {
							content,
							status,
							category,
							featured,
							...values,
						};

						console.log(data);
						createNews(data);
					}}
					validationSchema={formSchema}
					enableReinitialize
				>
					{({errors, touched}) => (
						<Form>
							<Row>
								<Col md="4">
									<FormGroup>
										<Label for="title">Title</Label>
										<Field name="title" id="title"
													 className={`form-control ${errors.title && touched.title && 'is-invalid'}`}/>
										{errors.title && touched.title ?
											<div className="invalid-feedback">{errors.title}</div> : null}
									</FormGroup>
								</Col>

								<Col md="4">
									<FormGroup>
										<Label for="author">Author</Label>
										<Field name="author" id="author"
													 className={`form-control ${errors.author && touched.author && 'is-invalid'}`}/>
										{errors.author && touched.author ?
											<div className="invalid-feedback">{errors.author}</div> : null}
									</FormGroup>
								</Col>
							</Row>

							<Row>
								<Col md="4">
									<FormGroup>
										<Label for="category">Category</Label>
										<Input
											type="select"
											id="category"
											name="category"
											value={category}
											onChange={(e) => this.onChangeState(e.target.value, 'category')}
										>
											{
												articleCategories && articleCategories.map((category, key) => (
													<option
														key={key}
														value={category.id}
													>
														{category.value}
													</option>
												))
											}
										</Input>
									</FormGroup>
								</Col>
								<Col md="4">
									<FormGroup>
										<Label for="status">Status</Label>
										<Input
											type="select"
											id="status"
											name="status"
											value={status}
											onChange={(e) => this.onChangeState(e.target.value, 'status')}
										>
											<option value="draft">Draft</option>
											<option value="publish">Publish</option>
										</Input>
									</FormGroup>
								</Col>
								<Col md="4">
									<FormGroup>
										<Label for="feature">Featured</Label>
										<CustomInput
											type="checkbox"
											checked={featured}
											id="feature"
											onChange={(e) => this.onChangeState(e.target.checked, 'featured')}
										/>
									</FormGroup>
								</Col>
							</Row>

							<Row>
								<Col md="12">
									<FormGroup>
										<Editor
											id="content"
											editorClassName="demo-editor"
											editorState={content}
											onEditorStateChange={(e) => this.onChangeState(e, 'content')}
										/>
									</FormGroup>
								</Col>
							</Row>

							<Row>
								<Col md="12" className="text-center">
									<Button
										size="lg"
										type="submit"
										color="success"
									>
										Save
									</Button>
								</Col>
							</Row>
						</Form>
					)}
				</Formik>
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			createNews: createNewsAction,
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(News);
