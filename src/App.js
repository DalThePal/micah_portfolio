import React, { useState, useEffect, createContext } from 'react'
import styled from 'styled-components'
import { Routes, Route } from 'react-router'

import { desktop, tablet, mobile } from 'utils/media'

import Scroll from 'components/Scroll'
import Nav from 'components/Nav'
import Home from 'pages/Home'
import Film from 'pages/Film'

export const ScreenContext = createContext({fullWidth: false, desktop: false, tablet: false, mobile: false})

const App = () => {

  const [screen, setScreen] = useState({
    fullWidth: false,
    desktop: false,
    tablet: false,
    mobile: false
  })
 
  useEffect(() => {
    const updateScreen = () => {
      let { innerWidth } = window

      setScreen({
        fullWidth: innerWidth > desktop,
        desktop: innerWidth <= desktop && innerWidth > tablet,
        tablet: innerWidth <= tablet && innerWidth > mobile,
        mobile: innerWidth <= mobile
      })
    }

    updateScreen()

    window.addEventListener('resize', updateScreen)

    return () => {
      window.removeEventListener('resize', updateScreen)
    }
  }, [])

  return (
    <ScreenContext.Provider value={screen}>
      <Wrapper data-scroll-container className="smooth-scroll">
        <Scroll/>
        <Nav/>

        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/film" element={<Film/>}/>
        </Routes>

      </Wrapper>
    </ScreenContext.Provider>
  );
}

export default App;

const Wrapper = styled.main`
  overflow: hidden;
`
