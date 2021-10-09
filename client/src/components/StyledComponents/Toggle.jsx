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
  background-color: #c5cae9;
  justify-content: space-between;
  margin: 0 auto;
  margin-bottom: 10px;
  overflow: hidden;
  padding: 0.5rem;
  position: relative;
  width: 6rem;
  height: 3.5rem;


  svg {
    height: auto;
    width: 2.5rem;
    transition: all 0.3s linear;

    //sun
    &:first-child {
      transform: ${({ lightTheme }) => lightTheme ? 'translateX(0)' : 'translateX(100px)'};
    }

    // moon
    &:nth-child(2) {
      transform: ${({ lightTheme }) => lightTheme ? 'translateX(-100px)' : 'translateX(0)'};
    }
  }
`;


const Toggle = ({theme, toggleTheme}) => {
  const isLight = theme === 'light';
  return (
    <ToggleContainer lightTheme={isLight }onClick={toggleTheme}>
   <CgSun/>
   <CgMoon/>
    </ToggleContainer>
  )
}

export default Toggle