import React from 'react'
import Trailer from './Trailer'
import "@testing-library/jest-dom";
import { render, screen, getAllByText} from "@testing-library/react";

describe('Trailer', () => {
  beforeEach(() => {
    render(<Trailer 
      trailer={{id: 1, movie_id: 1, key: "SUXWAEX2jlg", site: "YouTube", type: "Trailer"}}
    />)
  })

  it('should render a Youtube movie trailer', () => {
    const trailer = screen.getByAltText('movie trailer')
    expect(trailer).toBeInTheDocument()
  })

})