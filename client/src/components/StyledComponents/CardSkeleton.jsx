/* eslint-disable */
import React from 'react'
import styled from 'styled-components'


const CardSkeleton = styled.div`
display: inline-block;
height: 100%;
width: 100;
background: ${props =>
  props.translucent
  ? css`linear-gradient(-90deg, #C1C1C1 0%, #F8F8F8 50%, #C1C1C1 100%)`
  : css`linear-gradient(-90deg, #f0f0f0 0%, #f8f8f8 50%, #f0f0f0 100%)`};
  background-size: 400% 400%;
  animation: pulse 1.2s ease-in-out infinite;
  @keyframes pulse {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: -135% 0%;
    }
  }
  `;

  export const CardSkeleton = () => (
    <CardSkeleton translucent={true} />
  );