import React from 'react';
import {MemoryRouter} from 'react-router-dom'
import { render, screen, getByPlaceholderText, getByText, waitFor, getByAltText, fireEvent } from '@testing-library/react'
import App from './App'
import '@testing-library/jest-dom'
import API from '../API/API'
jest.mock('../API/API.js')



describe('App', () => {
  // let router
  // beforeEach(() => {
  //   // render(<App/>)
  // })
  // it('should start with default state', () => {       
  //   const defaultApp = new App()
  //   expect(defaultApp.state.movies).toStrictEqual([])
  //   expect(defaultApp.state.error).toBe('')
  //   expect(defaultApp.state.userRatings).toStrictEqual([])
  //   expect(defaultApp.state.singleMovie).toStrictEqual({})
  //   expect(defaultApp.state.singleMovieUserRating).toStrictEqual({})
  //   expect(defaultApp.state.trailers).toStrictEqual([])
  //   expect(defaultApp.state.user).toStrictEqual({id: '', email: '', name: ''})
  //   expect(defaultApp.state.isLoggedIn).toBe(false)
  // })
  
  it('should render header on load', async () => {
   const {getByText, getByPlaceholderText} = render(<MemoryRouter><App/></MemoryRouter>)
    const homeBtn = screen.getByText("Home");
    expect(homeBtn).toBeInTheDocument()
    const ratingsBtn = screen.getByText("Your Ratings");
    expect(ratingsBtn).toBeInTheDocument();
    const loginBtn = screen.getByText('Login')
    expect(loginBtn).toBeInTheDocument()
    const logoutBtn = screen.getByText("Logout");
    expect((logoutBtn).className).toBe('nav-btn hidden active');
    expect(screen.getByPlaceholderText('Search by title, genre, year')).toBeInTheDocument()
  })


  it("should render fetched movies on load", async () => {
   API.getData.mockResolvedValueOnce([
    {
     id: 1,
     title: "Donkey Kong",
     poster_path: "someURL",
     backdrop_path: "someURL",
     release_date: "2019-12-04",
     overview: "Some overview",
     average_rating: 6,
    },
    {
     id: 2,
     title: "Godzilla",
     poster_path: "someURL",
     backdrop_path: "someURL",
     release_date: "2019-12-04",
     overview: "Some overview",
     average_rating: 4,
    },
    {
     id: 3,
     title: "Signs",
     poster_path: "someURL",
     backdrop_path: "someURL",
     release_date: "2018-12-04",
     overview: "Some overview",
     average_rating: 8,
    },
   ]);

   const { getByText } = render(
    <MemoryRouter>
     <App />
    </MemoryRouter>
   );
   const movie1 = await waitFor(() => getByText("Donkey Kong"));
   const movie2 = await waitFor(() => getByText("Godzilla"));
   const movie3 = await waitFor(() => getByText("Signs"));

   expect(movie1).toBeInTheDocument();
   expect(movie2).toBeInTheDocument();
   expect(movie3).toBeInTheDocument();
  });
  
  it('should render login form page on button click', async () => {
    const { getByText } = render(<MemoryRouter><App/></MemoryRouter>)
    const loginNavBtn = screen.getByRole("link", { name: "Login" });
    expect(loginNavBtn).toBeInTheDocument();
    fireEvent.click(loginNavBtn);
    // go to log in form page
    // render login form
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    const loginFormBtn = screen.getByRole('button', {name:'Login'})
    // mock signing in
    // get the user
    API.postData.mockResolvedValueOnce(Promise.resolve({json: () => ({ id: 1, email: 'charlie@turing.io', name: "Charlie" })}))
    fireEvent.click(loginFormBtn)
    
    // go back to home page, but with new elements rendered bc login is true
    // welcome user's name in header

    // const welcomeCharlie = await waitFor(() => screen.getByText('Welcome, Charlie!'))
    // expect(welcomeCharlie).toBeInTheDocument()
    // expect(screen.getByText('Logout')).toBeInTheDocument()
    // expect(screen.getByText('Your Ratings')).toBeInTheDocument()
    // expect(screen.getByText('Login').className).toBe('nav-btn ')
  })

  // test for rendered stars

  describe('Fetch Successful', () => {

    it.skip('should display user ratings on each movie card', async () => {
      API.getData.mockResolvedValueOnce([{rating: 3}, {rating: 2}, {rating: 4}])
      const { getAllByAltText } = render(
       <App
        isLoggedIn={true}
        user={{ id: 1, email: "charlie@turing.io", name: "Charlie" }}
        userRatings={[
         { rating: 3, movie_id: 1 },
         { rating: 2, movie_id: 2 },
         { rating: 4, movie_id: 3 },
        ]}
        movies={[
         {
          id: 1,
          title: "Donkey Kong",
          poster_path: "someURL",
          backdrop_path: "someURL",
          release_date: "2019-12-04",
          overview: "Some overview",
          average_rating: 6,
         },
         {
          id: 2,
          title: "Godzilla",
          poster_path: "someURL",
          backdrop_path: "someURL",
          release_date: "2019-12-04",
          overview: "Some overview",
          average_rating: 4,
         },
         {
          id: 3,
          title: "Signs",
          poster_path: "someURL",
          backdrop_path: "someURL",
          release_date: "2018-12-04",
          overview: "Some overview",
          average_rating: 8,
         },
        ]}
       />
      );
      const emptyStarIcons = await waitFor(() => getAllByAltText('empty star icon'))
      expect(emptyStarIcons).toHaveLength(3)

      // what about testing helper methods 
    })


    it.skip('should display trailers for each movie', async () => {
      let trailers = API.getData.mockResolvedValueOnce([
        { 
        id: 1, movie_id: 1, key: "SUXWAEX2jlg", site: "YouTube", type: "Trailer" 
      },
        { 
          id: 2, movie_id: 2, key: "SUXWAEX2jlg", site: "YouTube", type: "Trailer" 
        }, 
        { 
          id: 3, movie_id: 3, key: "SUXWAEX2jlg", site: "YouTube", type: "Trailer" 
        }
      ])
      const {getAllByAltText} = render(<MemoryRouter><App/></MemoryRouter>)
      const allTrailers = await waitFor(() => getAllByAltText('movie-trailer'))
      expect(getAllByAltText(allTrailers)).toHaveLength(3)
    })

     it.skip("should display comments for each movie", async () => {
      // let comments = API.getData.mockResolvedValueOnce([
      //  {
      //   id: 1,
      //   movie_id: 1,
      //   key: "SUXWAEX2jlg",
      //   site: "YouTube",
      //   type: "Trailer",
      //  },
      //  {
      //   id: 2,
      //   movie_id: 2,
      //   key: "SUXWAEX2jlg",
      //   site: "YouTube",
      //   type: "Trailer",
      //  },
      //  {
      //   id: 3,
      //   movie_id: 3,
      //   key: "SUXWAEX2jlg",
      //   site: "YouTube",
      //   type: "Trailer",
      //  },
      // ]);
      // const { getAllByAltText } = render(<App trailers={trailers} />);
      // const allTrailers = await waitFor(() => getAllByAltText("movie-trailer"));
      // expect(getAllByAltText(allTrailers)).toHaveLength(3);
     });



  })


  describe('Errors/Bad Requests', () => {
    
    it.skip('should render error message if rejected promise in posting user login info', () => {
       API.postData.mockRejectedValueOnce({})
        const { getByText } = render(<MemoryRouter><App/></MemoryRouter>) 
       expect(getByText('Incorrect email or password. Please try again.')).toBeInTheDocument()
    })
    
    it.skip('should render error message if rejected promise in fetching movies', async () => {
      API.getData.mockRejectedValueOnce([])
        const { getByText } = render(<MemoryRouter><App/></MemoryRouter>) 
      const error = await waitFor(() => { getByText("Oops, something went wrong! 🙁 Please try again.")})
      expect(getByText(error)).toBeInTheDocument()
    })
  
    it.skip('should render error message if rejected promise in fetching full single movie information', () => {
      API.getData.mockRejectedValueOnce({})
        const { getByText } = render(<MemoryRouter><App/></MemoryRouter>) 
      expect(getByText("Oops, something went wrong! 🙁 Please try again.")).toBeInTheDocument()
    })

    it.skip('should render error message if rejected promise in fetching movies for search bar', () => {
      API.getData.mockRejectedValueOnce([])
        const { getByText } = render(<MemoryRouter><App/></MemoryRouter>) 
      expect(getByText("No movies were found. Please refine your search.")).toBeInTheDocument()
    })

     it.skip('should render error message if rejected promise in fetching movie trailers', () => {
       API.getData.mockRejectedValueOnce([])
        const { getByText } = render(<MemoryRouter><App/></MemoryRouter>) 
       expect(getByText("Oops, something went wrong! 🙁 Please try again.")).toBeInTheDocument()
    })



  } )





  //component did mount
  // check that get all movies has been called
  // states change after mount (error / movies) 

})
