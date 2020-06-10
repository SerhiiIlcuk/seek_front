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
      this.state = { activeIndex1: 0, activeIndex2: 1, activeIndex3: 2, activeIndex4: 2, activeIndex5: 2, activeIndex6: 0, activeIndex7: 2, activeIndex8: 1, activeIndex9: 0 };
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
      const businesses = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      let slides = [];

      businesses.map((business, index) => {
         slides[index + 1] = items.map(item => {
            return (
               <CarouselItem onExiting={() => this.onExiting(index + 1)} onExited={() => this.onExited(index + 1)} key={item.src}>
                  <img src={item.src} alt={item.altText} />
                  <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
               </CarouselItem>
            );
         });
      });

      return (
         <Fragment>
            <Row className="row-eq-height">
               {
                  businesses.map((business, key) => {
                     const activeSlideIndex = `activeIndex${key + 1}`;
                     return (
                        <Col sm="12" md="4">
                           <Card className="text-left">
                              <CardBody>
                                 <CardTitle>Business {key + 1}</CardTitle>
                                 <CardText>Business Introduction {key + 1}</CardText>
                              </CardBody>
                              <Carousel activeIndex={this.state[activeSlideIndex]} next={() => this.next(key + 1)} previous={() => this.previous(key + 1)}>
                                 <CarouselIndicators items={items} activeIndex={this.state[activeSlideIndex]} onClickHandler={(index) => this.goToIndex(index, key + 1)} />
                                 {slides[key + 1]}
                                 <CarouselControl direction="prev" directionText="Previous" onClickHandler={() => this.previous(key + 1)} />
                                 <CarouselControl direction="next" directionText="Next" onClickHandler={() => this.next(key + 1)} />
                              </Carousel>
                              <CardBody>
                                 <CardText>
                                    Details of Business {key + 1}
                                 </CardText>
                                 <CardLink href="#">Link 1</CardLink>
                                 <CardLink href="#">Link 2</CardLink>
                              </CardBody>
                              <CardFooter>
                                 2 day ago{" "}
                                 <Badge className="float-right" color="success">
                                    Feature 2
                                 </Badge>
                                 <Badge className="float-right mr-1" color="danger">
                                    Feature 1
                                 </Badge>
                              </CardFooter>
                           </Card>
                        </Col>
                     )
                  })
               }
            </Row>

         </Fragment>
      );
   }
}
export default Home;
