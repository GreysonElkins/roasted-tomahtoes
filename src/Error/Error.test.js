import { screen, render } from "@testing-library/react"
import React from "react"
import Main from "../Main/Main"
import Error from "./Error"
import "@testing-library/jest-dom"

describe("Error", () => {
  it('should render an error with a given message', () => {
    render (
      <Main 
        pageView='Not to put too fine a point on it'
        movies={[{lineTwo: 'Say Im the only bee in your bonnet'}]}
        error="Put a little birdhouse in your soul"
      />
    )
    expect(screen.getByText("Put a little birdhouse in your soul")).toBeInTheDocument()

  })
})