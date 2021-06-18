import React from "react"
import styled from "styled-components"

const Text = styled.h1`
  align-self: center;
  border-color: Sienna;
  border-style: solid;
  border-width: 2px 0 2px 0;
  color: Sienna;
  font-family: 'Benne', serif;
  text-align: center;
  width: 20%;
`

const Logo = () => (
  <Text>
    BLOGApp
  </Text>
)

export default Logo