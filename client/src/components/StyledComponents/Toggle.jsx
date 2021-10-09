import React from 'react'
import styled from 'styled-components'
import {CgMoon, CgSun} from 'react-icons/cg'

const ToggleContainer = styled.button`
  background: ${({ theme }) => theme.gradient};
  border: 2px solid  ${({ theme }) => theme.toggleBorder};
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  font-size: 0.5rem;
  background-color: ${({ lightTheme }) => lightTheme ? '#4da6f3' : '#3d3d3d'};
  justify-content: space-between;
  margin: 0 auto;
  overflow: hidden;
  width: 12em;
  height: 5em;

  svg {
    height: auto;
    width: 4em;
    transition: all 0.3s linear;

    //sun
    &:first-child {
      transform: ${({ lightTheme }) => lightTheme ? 'translateX(0)' : 'translateX(100px)'};
      color: #f5ce44;
    }

    // moon
    &:nth-child(2) {
      transform: ${({ lightTheme }) => lightTheme ? 'translateX(-100px)' : 'translateX(0)'};
      color: #ffe000;
    }
  }
`;


const Toggle = ({theme, toggleTheme}) => {
  const isLight = theme === 'light';
  return (
    <ToggleContainer aria-label='toggle-theme' lightTheme={isLight }onClick={toggleTheme}>
   <CgSun/>
   <CgMoon/>
    </ToggleContainer>
  )
}

export default Toggle