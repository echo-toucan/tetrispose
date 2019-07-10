import React from 'react'
import Carousel from 'semantic-ui-carousel-react'
import {Image, Container} from 'semantic-ui-react'

const ControlledCarousel = () => {
  let elements = [
    {
      render: () => {
        return <Image width="1000" src="/assets/showgame.gif" />
      }
    },
    {
      render: () => {
        return (
          <Image width="1000" src="/assets/StickFigures/stickfigure1.jpg" />
        )
      }
    },
    {
      render: () => {
        return (
          <Image width="1000" src="/assets/StickFigures/stickfigure2.jpg" />
        )
      }
    },
    {
      render: () => {
        return (
          <Image width="1000px" src="/assets/StickFigures/stickfigure3.jpg" />
        )
      }
    }
  ]
  return (
    <Container style={{width: 1000}}>
      <Carousel
        elements={elements}
        // duration={3000}
        // animation="slide left"
        showNextPrev={true}
        showIndicators={true}
      />
    </Container>
  )
}

export default ControlledCarousel
