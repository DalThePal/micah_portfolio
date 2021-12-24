import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { useLocation } from 'react-router-dom'

import colors from 'utils/colors'

const Nav = () => {

  const location = useLocation()

  console.log(location)

  return (
    <>
      <Email href="mailto:micahbode@gmail.com">micahbode@gmail.com</Email>
      <Location data-scroll>Salt Lake City, Utah</Location>
      <Socials>
        <Social href="https://www.instagram.com/micahbode/" target="_blank">Instagram</Social>
        <Social href="https://www.youtube.com/c/MicahBrownfilm" target="_blank">Youtube</Social>
      </Socials>
      <Routes>
        <Home to="/">MICAH BROWN</Home>
        <Route to="/film" $color={(location.pathname === "/film") ? colors.red : ""}>film</Route>
        <Route to="/self" $color={(location.pathname === "/self") ? colors.red : ""}>self</Route>
      </Routes>
    </>
  )
}

export default Nav

const Font = `
  font-family: Helvetica;
  color: ${colors.black};
  font-size: 16px;
`

const Routes = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  top: 30px;
  left: 30px;
`

const Home = styled(Link)`
  ${Font}
  font-weight: bold;
  text-decoration: none;

  margin-bottom: 10px;
`

const Route = styled(Link)`
  ${Font}
  text-decoration: none;
  color: ${props => props.$color};

  &:hover {
    color: ${colors.gray};
  }

  height: 24px;
`

const Email = styled.a`
  ${Font}
  text-decoration: none;
  position: absolute;

  top: 30px;
  right: 30px;
`

const Socials = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;

  left: 30px;
  bottom: 35px;
`

const Social = styled.a`
  ${Font}
  display: flex;
  align-items: flex-end;
  
  height: 32px;
`

const Location = styled.p`
  ${Font}
  position: absolute;
  bottom: 35px;
  right: 30px;
`
