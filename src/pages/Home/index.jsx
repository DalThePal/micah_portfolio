import React from 'react'
import styled from 'styled-components'

import { desktop } from 'utils/media'

import Button from 'components/Button'

import MicahHome from 'images/micah_home.webp'

const Home = () => {
  return (
    <Wrapper>
      <MaxWidth>
        <Title>micah brown</Title>
        <Text>{`
          Director
          Cinematographer
          Editor
        `}</Text>
        <ButtonWrapper>
          <Button>view collection >></Button>
        </ButtonWrapper>
        <Img src={MicahHome} alt="Micah Brown" height="730" width="519"/>
      </MaxWidth>
    </Wrapper>
  )
}

export default Home

const Wrapper = styled.div`
  min-height: 100vh;
`

const MaxWidth = styled.div`
  position: relative;
  max-width: ${desktop}px;
  height: 100%;
  width: 100%;
  margin: 0 auto;
`

const Img = styled.img`
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

  font-size: 15px;
  right: 325px;
  top: 270px;
`
