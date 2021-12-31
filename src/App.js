import React, { useState, useEffect, createContext } from 'react'
import styled from 'styled-components'
import { Routes, Route } from 'react-router'

import { desktop, tablet, mobile } from 'utils/media'

import Scroll from 'components/Scroll'
import Nav from 'components/Nav'
import Home from 'pages/Home'
import Film from 'pages/Film'
import Self from 'pages/Self'

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

        <MaxWidth>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route path="/film" element={<Film/>}/>
            <Route path="/self" element={<Self/>}/>
          </Routes>
        </MaxWidth>

      </Wrapper>
    </ScreenContext.Provider>
  );
}

export default App;

const Wrapper = styled.main`
  overflow: hidden;
`

const MaxWidth = styled.div`
  max-width: ${desktop}px;
  height: 100%;
  width: 100%;
  margin: 0 auto;
`
