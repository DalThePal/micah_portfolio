import React from 'react'
import styled from 'styled-components'

import ImageRipple from 'components/ImageRipple'

const Film = () => {
  return (
    <Wrapper>
      <ImageRipple/>
    </Wrapper>
  )
}

export default Film

const Wrapper = styled.div`
  min-width: 100vh;
  height: 100%;
  width: 100%;
`
