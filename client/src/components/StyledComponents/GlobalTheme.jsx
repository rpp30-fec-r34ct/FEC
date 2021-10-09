import {createGlobalStyle} from 'styled-components'
import React, {useState, useEffect} from 'react'


export const GlobalTheme = createGlobalStyle`
body {
  background: ${({theme}) => theme.body};
  color: ${({theme}) => theme.text};
  font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
  transition: all 0.50s linear;
}
`