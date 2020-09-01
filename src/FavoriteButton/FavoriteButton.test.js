import {
  render,
  getByText,
  screen,
  fireEvent
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import FavoriteButton from "./FavoriteButton";
import "@testing-library/jest-dom";

describe('Favorite buttons', () => {
  
  let mockToggleFavorite

  beforeEach(() => {
    mockToggleFavorite = jest.fn()
  })

  it('should render with an empty heart if not a favorite', () => {
    render(
      <FavoriteButton
        toggleFavorite={mockToggleFavorite}
        isFavorite={false}
      />
    )
    const icon = screen.getByText("🤍");
    expect(icon).toBeInTheDocument()
  })

  it("should render with an selected heart if a favorite", () => {
    render(
      <FavoriteButton
        toggleFavorite={mockToggleFavorite}
        isFavorite={true}
      />
    )
    const icon = screen.getByText("❤️")
    expect(icon).toBeInTheDocument()
  })

  it('should call toggleFavorite when clicked', () => {
    render(
      <FavoriteButton
        toggleFavorite={mockToggleFavorite}
        isFavorite={true}
        movie={{id: 1}}
      />
    )
    const icon = screen.getByText("❤️");
    fireEvent.click(icon)
    expect(mockToggleFavorite).toBeCalledTimes(1)
  })

})