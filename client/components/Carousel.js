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
        return (
          <Image
            centered
            width="800px"
            src="https://images.unsplash.com/photo-1485742217969-f1e4cd444fe8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2557&q=80"
          />
        )
      }
    },
    {
      render: () => {
        return (
          <Image
            centered
            width="800px"
            src="https://images.unsplash.com/photo-1485742217969-f1e4cd444fe8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2557&q=80"
          />
        )
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
