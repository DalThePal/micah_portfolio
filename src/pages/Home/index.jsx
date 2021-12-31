import React from 'react'
import styled from 'styled-components'

import Button from 'components/Button'
import ImageRipple from 'components/ImageRipple'

import MicahHome from 'images/micah_home.webp'

const Home = () => {
  return (
    <Wrapper>
      <Title>micah brown</Title>
      <Text>{`
        Director
        Cinematographer
        Editor
      `}</Text>
      <ButtonWrapper>
        <Button>view collection >></Button>
      </ButtonWrapper>
      <Img>
        <ImageRipple
          image={{
            src: MicahHome,
            width: 519,
            height: 730
          }}
        />
      </Img>
    </Wrapper>
  )
}

export default Home

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  height: 100vh;
`

const Img = styled.div`
  position: absolute;

  top: 120px;
  left: 260px;

  width: 519px;
  height: 730px;
`

const Title = styled.h1`
  font-family: Helvetica Roman;
  position: absolute;
  z-index: 2;
  letter-spacing: normal;
  
  font-size: 100px;
  width: 350px;
  top: 200px;
  right: 400px;

`

const ButtonWrapper = styled.div`
  position: absolute;
  z-index: 2;

  top: 465px;
  right: 467px;
`

const Text = styled.div`
  position: absolute;
  white-space: pre-wrap;
  font-family: courier;
  z-index: 2;

  font-size: 15px;
  right: 325px;
  top: 270px;
`
