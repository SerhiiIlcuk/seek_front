// import external modules
import React, { Component, Fragment } from "react";
import ContentHeader from "../../components/contentHead/contentHeader";
import ContentSubHeader from "../../components/contentHead/contentSubHeader";

class blankPage extends Component {
   render() {
      return (
         <Fragment>
            <ContentHeader></ContentHeader>
            <ContentSubHeader></ContentSubHeader>
         </Fragment>
      );
   }
}

export default blankPage;
