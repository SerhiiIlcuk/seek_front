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
      this.state = { activeIndex: 0 };
      this.next = this.next.bind(this);
      this.previous = this.previous.bind(this);
      this.goToIndex = this.goToIndex.bind(this);
      this.onExiting = this.onExiting.bind(this);
      this.onExited = this.onExited.bind(this);
   }

   onExiting() {
      this.animating = true;
   }

   onExited() {
      this.animating = false;
   }

   next() {
      if (this.animating) return;
      const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
      this.setState({ activeIndex: nextIndex });
   }

   previous() {
      if (this.animating) return;
      const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
      this.setState({ activeIndex: nextIndex });
   }

   goToIndex(newIndex) {
      if (this.animating) return;
      this.setState({ activeIndex: newIndex });
   }

   render() {
      const { activeIndex } = this.state;

      const slides = items.map(item => {
         return (
            <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={item.src}>
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
                        <CardTitle>Carousel</CardTitle>
                        <CardText>Carousel Card With Header & Footer</CardText>
                     </CardBody>
                     <Carousel activeIndex={activeIndex} next={this.next} previous={this.previous}>
                        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                        {slides}
                        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                     </Carousel>
                     <CardBody>
                        <CardText>
                           Some quick example text to build on the card title and make up the bulk of the card's content.
                        </CardText>
                        <CardLink href="#">Card Link</CardLink>
                        <CardLink href="#">Another Link</CardLink>
                     </CardBody>
                     <CardFooter>
                        2 day ago{" "}
                        <Badge className="float-right" color="success">
                           Branding
                        </Badge>
                        <Badge className="float-right mr-1" color="danger">
                           Design
                        </Badge>
                     </CardFooter>
                  </Card>
               </Col>
               <Col sm="12" md="4">
                  <Card className="text-left">
                     <CardBody>
                        <CardTitle>Carousel</CardTitle>
                        <CardText>Carousel Card With Header & Footer</CardText>
                     </CardBody>
                     <Carousel activeIndex={activeIndex} next={this.next} previous={this.previous}>
                        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                        {slides}
                        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                     </Carousel>
                     <CardBody>
                        <CardText>
                           Some quick example text to build on the card title and make up the bulk of the card's content.
                        </CardText>
                        <CardLink href="#">Card Link</CardLink>
                        <CardLink href="#">Another Link</CardLink>
                     </CardBody>
                     <CardFooter>
                        2 day ago{" "}
                        <Badge className="float-right" color="success">
                           Branding
                        </Badge>
                        <Badge className="float-right mr-1" color="danger">
                           Design
                        </Badge>
                     </CardFooter>
                  </Card>
               </Col>
               <Col sm="12" md="4">
                  <Card className="text-left">
                     <CardBody>
                        <CardTitle>Carousel</CardTitle>
                        <CardText>Carousel Card With Header & Footer</CardText>
                     </CardBody>
                     <Carousel activeIndex={activeIndex} next={this.next} previous={this.previous}>
                        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                        {slides}
                        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                     </Carousel>
                     <CardBody>
                        <CardText>
                           Some quick example text to build on the card title and make up the bulk of the card's content.
                        </CardText>
                        <CardLink href="#">Card Link</CardLink>
                        <CardLink href="#">Another Link</CardLink>
                     </CardBody>
                     <CardFooter>
                        2 day ago{" "}
                        <Badge className="float-right" color="success">
                           Branding
                        </Badge>
                        <Badge className="float-right mr-1" color="danger">
                           Design
                        </Badge>
                     </CardFooter>
                  </Card>
               </Col>
               <Col sm="12" md="4">
                  <Card className="text-left">
                     <CardBody>
                        <CardTitle>Carousel</CardTitle>
                        <CardText>Carousel Card With Header & Footer</CardText>
                     </CardBody>
                     <Carousel activeIndex={activeIndex} next={this.next} previous={this.previous}>
                        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                        {slides}
                        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                     </Carousel>
                     <CardBody>
                        <CardText>
                           Some quick example text to build on the card title and make up the bulk of the card's content.
                        </CardText>
                        <CardLink href="#">Card Link</CardLink>
                        <CardLink href="#">Another Link</CardLink>
                     </CardBody>
                     <CardFooter>
                        2 day ago{" "}
                        <Badge className="float-right" color="success">
                           Branding
                        </Badge>
                        <Badge className="float-right mr-1" color="danger">
                           Design
                        </Badge>
                     </CardFooter>
                  </Card>
               </Col>
               <Col sm="12" md="4">
                  <Card className="text-left">
                     <CardBody>
                        <CardTitle>Carousel</CardTitle>
                        <CardText>Carousel Card With Header & Footer</CardText>
                     </CardBody>
                     <Carousel activeIndex={activeIndex} next={this.next} previous={this.previous}>
                        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                        {slides}
                        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                     </Carousel>
                     <CardBody>
                        <CardText>
                           Some quick example text to build on the card title and make up the bulk of the card's content.
                        </CardText>
                        <CardLink href="#">Card Link</CardLink>
                        <CardLink href="#">Another Link</CardLink>
                     </CardBody>
                     <CardFooter>
                        2 day ago{" "}
                        <Badge className="float-right" color="success">
                           Branding
                        </Badge>
                        <Badge className="float-right mr-1" color="danger">
                           Design
                        </Badge>
                     </CardFooter>
                  </Card>
               </Col>
               <Col sm="12" md="4">
                  <Card className="text-left">
                     <CardBody>
                        <CardTitle>Carousel</CardTitle>
                        <CardText>Carousel Card With Header & Footer</CardText>
                     </CardBody>
                     <Carousel activeIndex={activeIndex} next={this.next} previous={this.previous}>
                        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                        {slides}
                        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                     </Carousel>
                     <CardBody>
                        <CardText>
                           Some quick example text to build on the card title and make up the bulk of the card's content.
                        </CardText>
                        <CardLink href="#">Card Link</CardLink>
                        <CardLink href="#">Another Link</CardLink>
                     </CardBody>
                     <CardFooter>
                        2 day ago{" "}
                        <Badge className="float-right" color="success">
                           Branding
                        </Badge>
                        <Badge className="float-right mr-1" color="danger">
                           Design
                        </Badge>
                     </CardFooter>
                  </Card>
               </Col>
               <Col sm="12" md="4">
                  <Card className="text-left">
                     <CardBody>
                        <CardTitle>Carousel</CardTitle>
                        <CardText>Carousel Card With Header & Footer</CardText>
                     </CardBody>
                     <Carousel activeIndex={activeIndex} next={this.next} previous={this.previous}>
                        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                        {slides}
                        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                     </Carousel>
                     <CardBody>
                        <CardText>
                           Some quick example text to build on the card title and make up the bulk of the card's content.
                        </CardText>
                        <CardLink href="#">Card Link</CardLink>
                        <CardLink href="#">Another Link</CardLink>
                     </CardBody>
                     <CardFooter>
                        2 day ago{" "}
                        <Badge className="float-right" color="success">
                           Branding
                        </Badge>
                        <Badge className="float-right mr-1" color="danger">
                           Design
                        </Badge>
                     </CardFooter>
                  </Card>
               </Col>
               <Col sm="12" md="4">
                  <Card className="text-left">
                     <CardBody>
                        <CardTitle>Carousel</CardTitle>
                        <CardText>Carousel Card With Header & Footer</CardText>
                     </CardBody>
                     <Carousel activeIndex={activeIndex} next={this.next} previous={this.previous}>
                        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                        {slides}
                        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                     </Carousel>
                     <CardBody>
                        <CardText>
                           Some quick example text to build on the card title and make up the bulk of the card's content.
                        </CardText>
                        <CardLink href="#">Card Link</CardLink>
                        <CardLink href="#">Another Link</CardLink>
                     </CardBody>
                     <CardFooter>
                        2 day ago{" "}
                        <Badge className="float-right" color="success">
                           Branding
                        </Badge>
                        <Badge className="float-right mr-1" color="danger">
                           Design
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
