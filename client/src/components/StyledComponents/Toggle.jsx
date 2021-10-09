import React from 'react'
import styled from 'styled-components'
import {CgMoon, CgSun} from 'react-icons/cg'

const ToggleContainer = styled.button`
  background: ${({ theme }) => theme.gradient};
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  font-size: 0.5rem;
  justify-content: space-between;
  margin: auto;
  overflow: hidden;
  padding: 0.5rem;
  position: relative;
  width: 8em;
  height: 4em;


  svg {
    height: auto;
    width: 2.5rem;
    transition: all 0.3s linear;

    // sun icon
    &:first-child {
      transform: ${({ lightTheme }) => lightTheme ? 'translateY(0)' : 'translateY(100px)'};
    }

    // moon icon
    &:nth-child(2) {
      transform: ${({ lightTheme }) => lightTheme ? 'translateY(-100px)' : 'translateY(0)'};
    }
  }
`;


const Toggle = ({ theme, toggleTheme }) => {
  const icon = theme === 'light' ? <CgSun/> : <CgMoon/>
  return (
    <div id='toggle-button'>
      <ToggleContainer onClick={toggleTheme}>
      </ToggleContainer>
      {icon}
    </div>
  )
}

export default Toggle;