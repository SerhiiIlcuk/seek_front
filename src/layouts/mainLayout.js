// import external modules
import React, {PureComponent} from "react";
import {connect} from "react-redux";
import classnames from "classnames";

// import internal(own) modules
import {FoldedContentConsumer, FoldedContentProvider} from "../utility/context/toggleContentContext";
import Sidebar from "./components/sidebar/sidebar";
import Navbar from "./components/navbar/navbar"
import CandidateNavbar from "./components/navbar/candidateNavbar"
import Footer from "./components/footer/footer";
import templateConfig from "../templateConfig";
import {getToken} from "../redux/selectors/auth";

class MainLayout extends PureComponent {
   state = {
	  width: window.innerWidth,
	  sidebarState: "close",
	  sidebarSize: '',
	  layout: ''
   };

   updateWidth = () => {
	  this.setState(prevState => ({
		 width: window.innerWidth
	  }));
   };

   handleSidebarSize = (sidebarSize) => {
	  this.setState({sidebarSize});
   }

   handleLayout = (layout) => {
	  this.setState({layout});
   }

   componentDidMount() {
	  if (window !== "undefined") {
		 window.addEventListener("resize", this.updateWidth, false);
	  }
   }

   componentWillUnmount() {
	  if (window !== "undefined") {
		 window.removeEventListener("resize", this.updateWidth, false);
	  }
   }

   toggleSidebarMenu(sidebarState) {
	  this.setState({sidebarState});
   }

   render() {
	  const {token} = this.props;
	  return (
		 <FoldedContentProvider>
			<FoldedContentConsumer>
			   {context => (

				  <div
					 className={classnames("wrapper ", {
						"menu-collapsed": context.foldedContent || this.state.width < 991,
						"main-layout": !context.foldedContent,
						[`${templateConfig.sidebar.size}`]: (this.state.sidebarSize === ''),
						[`${this.state.sidebarSize}`]: (this.state.sidebarSize !== ''),
						[`${templateConfig.layoutColor}`]: (this.state.layout === ''),
						[`${this.state.layout}`]: (this.state.layout !== '')
					 })}
				  >

					 <Sidebar
						toggleSidebarMenu={this.toggleSidebarMenu.bind(this)}
						sidebarState={this.state.sidebarState}
						handleSidebarSize={this.handleSidebarSize.bind(this)}
						handleLayout={this.handleLayout.bind(this)}
					 />
					 {
					    token ? (
						   <CandidateNavbar
							  toggleSidebarMenu={this.toggleSidebarMenu.bind(this)}
							  sidebarState={this.state.sidebarState}
						   />
						) : (
						   <CandidateNavbar
							  toggleSidebarMenu={this.toggleSidebarMenu.bind(this)}
							  sidebarState={this.state.sidebarState}
						   />
						)
					 }
					 <main className="top-margin">{this.props.children}</main>
					 <Footer/>
				  </div>
			   )}
			</FoldedContentConsumer>
		 </FoldedContentProvider>
	  );
   }
}


const mapStateToProps = state => ({
   token: getToken(state)
});

export default connect(mapStateToProps)(MainLayout);
