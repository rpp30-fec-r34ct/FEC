// /* eslint-disable */
import styled from 'styled-components'

export const CardSkeleton = styled.div`
  display: inline-block;
  align-items: flex-start;
  float: left;
  width: 200px;
  height: 302px;
  margin: 7px;
  object-fit: cover;
  border: 1px solid lightgray;
  box-shadow: 0 10px 45px rgba(0, 0, 0, .1);
  background-repeat: no-repeat;
  background:lightgray;

  background-image:
  linear-gradient(
    90deg,
    rgba(lightgrey, 0) 0,
    rgba(lightgray, .8) 50%,
    rgba(lightgrey, 0) 100%
  )
  }
  `
