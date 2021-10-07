// /* eslint-disable */
import React from 'react'
import styled from 'styled-components'

const StyledSkeleton = styled.div`
  display: inline-block;
  align-items: flex-start;
  float: left;
  width: 200px;
  height: 302px;
  margin: 7px;
  border: 1px solid lightgray;
  box-shadow: 0 5px 35px rgba(0, 0, 0, .2);
  background-repeat: no-repeat;
  background: linear-gradient(-90deg, #f0f0f0 0%, #F8F8F8 50%, #F0F0F0 100%);
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

  const CardSkeleton = styled(StyledSkeleton)`
    width: 5.5em;
    border-radius: 5px;

    &::before {
      content: "\00a0";
    }
    `;

  export default CardSkeleton

