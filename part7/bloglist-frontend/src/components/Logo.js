import React from "react"
import styled from "styled-components"

const Text = styled.h1`
  border-color: Sienna;
  border-style: solid;
  border-width: 2px 0 2px 0;
  color: Sienna;
  font-family: 'Benne', serif;
`

const Logo = () => (
  <Text>
    BlogApp
  </Text>
)

export default Logo