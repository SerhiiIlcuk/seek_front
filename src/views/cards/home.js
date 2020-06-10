import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import {
   Card,
   CardTitle,
   CardText,
   CardBody,
   CardLink,
   CardFooter,
   Badge,
   Carousel,
   CarouselItem,
   CarouselControl,
   CarouselIndicators,
   CarouselCaption,
   Row,
   Col
} from "reactstrap";
import cardImg12 from "../../assets/img/photos/12.jpg";
import cardImg13 from "../../assets/img/photos/13.jpg";
import cardImg17 from "../../assets/img/photos/17.jpg";

const items = [
   {
      src: cardImg12,
      altText: "Slide 1",
      caption: "Slide 1"
   },
   {
      src: cardImg13,
      altText: "Slide 2",
      caption: "Slide 2"
   },
   {
      src: cardImg17,
      altText: "Slide 3",
      caption: "Slide 3"
   }
];

class Home extends Component {
   constructor(props) {
      super(props);
      this.state = { activeIndex1: 0, activeIndex2: 0 };
      this.next = this.next.bind(this);
      this.previous = this.previous.bind(this);
      this.goToIndex = this.goToIndex.bind(this);
      this.onExiting = this.onExiting.bind(this);
      this.onExited = this.onExited.bind(this);
   }

   onExiting(slideIndex) {
      const animatingIndex = `animating${slideIndex}`;
      this[animatingIndex] = true;
   }

   onExited(slideIndex) {
      const animatingIndex = `animating${slideIndex}`;
      this[animatingIndex] = false;
   }

   next(slideIndex) {
      const animatingIndex = `animating${slideIndex}`;
      if (this[animatingIndex]) return;

      const indexName = `activeIndex${slideIndex}`;

      const nextIndex = this.state[indexName] === items.length - 1 ? 0 : this.state[indexName] + 1;
      this.setState({ [indexName]: nextIndex });
   }

   previous(slideIndex) {
      const animatingIndex = `animating${slideIndex}`;
      if (this[animatingIndex]) return;

      const indexName = `activeIndex${slideIndex}`;

      const nextIndex = this.state[indexName] === 0 ? items.length - 1 : this.state[indexName] - 1;
      this.setState({ [indexName]: nextIndex });
   }

   goToIndex(newIndex, slideIndex) {
      const animatingIndex = `animating${slideIndex}`;
      if (this[animatingIndex]) return;

      const indexName = `activeIndex${slideIndex}`;
      this.setState({ [indexName]: newIndex });
   }

   render() {
      const { activeIndex1, activeIndex2 } = this.state;

      const slides1 = items.map(item => {
         return (
            <CarouselItem onExiting={() => this.onExiting(1)} onExited={() => this.onExited(1)} key={item.src}>
               <img src={item.src} alt={item.altText} />
               <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
            </CarouselItem>
         );
      });

      const slides2 = items.map(item => {
         return (
            <CarouselItem onExiting={() => this.onExiting(2)} onExited={() => this.onExited(2)} key={item.src}>
               <img src={item.src} alt={item.altText} />
               <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
            </CarouselItem>
         );
      });

      return (
         <Fragment>
            <Row className="row-eq-height">
               <Col sm="12" md="4">
                  <Card className="text-left">
                     <CardBody>
                        <CardTitle>Business 1</CardTitle>
                        <CardText>Business Introduction 1</CardText>
                     </CardBody>
                     <Carousel activeIndex={activeIndex1} next={() => this.next(1)} previous={() => this.previous(1)}>
                        <CarouselIndicators items={items} activeIndex={activeIndex1} onClickHandler={(index) => this.goToIndex(index, 1)} />
                        {slides1}
                        <CarouselControl direction="prev" directionText="Previous" onClickHandler={() => this.previous(1)} />
                        <CarouselControl direction="next" directionText="Next" onClickHandler={() => this.next(1)} />
                     </Carousel>
                     <CardBody>
                        <CardText>
                           Details of Business 1
                        </CardText>
                        <CardLink href="#">Link 1</CardLink>
                        <CardLink href="#">Link 2</CardLink>
                     </CardBody>
                     <CardFooter>
                        2 day ago{" "}
                        <Badge className="float-right" color="success">
                           Feature 1
                        </Badge>
                        <Badge className="float-right mr-1" color="danger">
                           Feature 2
                        </Badge>
                     </CardFooter>
                  </Card>
               </Col>
               <Col sm="12" md="4">
                  <Card className="text-left">
                     <CardBody>
                        <CardTitle>Business 2</CardTitle>
                        <CardText>Business Introduction 2</CardText>
                     </CardBody>
                     <Carousel activeIndex={activeIndex2} next={() => this.next(2)} previous={() => this.previous(2)}>
                        <CarouselIndicators items={items} activeIndex={activeIndex2} onClickHandler={(index) => this.goToIndex(index, 2)} />
                        {slides2}
                        <CarouselControl direction="prev" directionText="Previous" onClickHandler={() => this.previous(2)} />
                        <CarouselControl direction="next" directionText="Next" onClickHandler={() => this.next(2)} />
                     </Carousel>
                     <CardBody>
                        <CardText>
                           Details of Business 2
                        </CardText>
                        <CardLink href="#">Link 1</CardLink>
                        <CardLink href="#">Link 2</CardLink>
                     </CardBody>
                     <CardFooter>
                        2 day ago{" "}
                        <Badge className="float-right" color="success">
                           Feature 1
                        </Badge>
                        <Badge className="float-right mr-1" color="danger">
                           Feature 2
                        </Badge>
                     </CardFooter>
                  </Card>
               </Col>
            </Row>

         </Fragment>
      );
   }
}
export default Home;
