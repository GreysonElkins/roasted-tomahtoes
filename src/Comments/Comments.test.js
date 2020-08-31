import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Comments from "./Comments";

describe('Comments', () => {
  let mockSubmitMovieComment
  beforeEach(() => {
    mockSubmitMovieComment = jest.fn()
   render(
    <Comments
     isLoggedIn={true}
     user={{ name: "Charlie", email: "charlie@turing.io"}}
     submitMovieComment={mockSubmitMovieComment}
     userComments={[
      { comment: "great movie", author: "Charlie", movieId: 149, id: 123456 },
      { comment: "loved it", author: "Charlie", movieId: 149, id: 654321 },
      { comment: "the best", author: "Charlie", movieId: 149, id: 111111 },
     ]}
     movie={{name: 'Akira', id: 149}}
    />
   );
  });

  it('should render comment form', () => {
    expect(screen.getByPlaceholderText('Add movie comment (140 chars)')).toBeInTheDocument()
    expect(screen.getByText('Submit')).toBeInTheDocument()
  })

  it('should render 3 comments', () => {
    expect(screen.getAllByText('-Charlie')).toHaveLength(3)
  })

   it("should fire event when Submit button is clicked", () => {
    const submitBtn = screen.getByRole("button");
    expect(submitBtn).toBeInTheDocument();
    fireEvent.click(submitBtn);
    expect(mockSubmitMovieComment).toBeCalledTimes(1);
   });

})
