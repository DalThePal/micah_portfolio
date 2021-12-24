import React, { useRef } from 'react'
import styled from 'styled-components'
import gsap from 'gsap'

import colors from 'utils/colors'

const Button = ({ children, onClick }) => {

  const wrapperRef = useRef(null)

  const mouseEnter = () => {
    gsap.to(wrapperRef.current, {
      color: colors.white,
      backgroundColor: colors.black
    })
  }

  const mouseLeave = () => {
    gsap.to(wrapperRef.current, {
      color: colors.black,
      backgroundColor: colors.white
    })
  }

  return (
    <Wrapper ref={wrapperRef} onClick={onClick} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
      {children}
    </Wrapper>  
  )
}

export default Button

const Wrapper = styled.span`
  border: 1px solid ${colors.black};
  font-family: Helvetica;
  cursor: pointer;

  font-size: 16px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 5px;
  padding-right: 5px;
`
