import React from 'react'
import styled from 'styled-components'
import {CgMoon, CgSun} from 'react-icons/cg'

const ToggleContainer = styled.button`
  background: ${({ theme }) => theme.gradient};
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  font-size: 0.1rem;
  justify-content: flex-start;
  margin: auto;
  overflow: hidden;
  padding: 0.5rem;
  position: absolute;
  width: 1px;
  height: 2px;
  opacity: 0.1;

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


const Toggle = ({theme, toggleTheme}) => {
  return (
    <ToggleContainer onClick={toggleTheme}>
    <CgMoon/>
    </ToggleContainer>
  )
}

export default Toggle;