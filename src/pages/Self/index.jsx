import React from 'react'
import styled from 'styled-components'

import ImageRipple from 'components/ImageRipple'

import MicahSelf from 'images/micah_self.webp'

const Self = () => {
  return (
    <Wrapper>
      <Img>
        <ImageRipple 
          image={{
            src: MicahSelf,
            width: 400,
            height: 493
          }}
        />
      </Img>
    </Wrapper>
  )
}

export default Self

const Wrapper = styled.div`
  height: 100vh;
  min-height: 100vh;
  width: 100%;
  position: relative;
`

const Img = styled.div`
  position: absolute;

  top: 120px;
  left: 220px;

  width: 400px;
  height: 493px;
`
