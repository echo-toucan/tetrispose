import React from 'react'
import Carousel from 'semantic-ui-carousel-react'
import {Image} from 'semantic-ui-react'

const ControlledCarousel = () => {
  let elements = [
    {
      render: () => {
        return <Image centered width="1000px" src="/assets/showgame.gif" />
      }
    },
    {
      render: () => {
        return <Image centered width="1000px" src="/assets/showgame.gif" />
      }
    },
    {
      render: () => {
        return <Image centered width="1000px" src="/assets/showgame.gif" />
      }
    }
  ]
  return (
    <div style={{width: 1000}}>
      <Carousel
        elements={elements}
        // duration={3000}
        // animation="slide left"
        showNextPrev={true}
        showIndicators={true}
      />
    </div>
  )
}

export default ControlledCarousel
