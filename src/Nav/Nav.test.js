import { render } from '@testing-library/react'
import React from 'react'
import Nav from './Nav'
import '@testing-library/jest-dom'

describe('Nav', () => {
  it('should have four buttons', () => {
    const {getAllByRole} = render(<Nav />)
    expect(getAllByRole('button')).toHaveLength(4)
  })

  it('should have a Home button', () => {
   const { getByText, getAllByRole } = render(<Nav />)
   expect(getByText('Home')).toBeInTheDocument()
   expect(getAllByRole('button')[0].id).toBe('home-btn')
  });

  it('should have a Your Ratings button', () => {
   const { getByText, getAllByRole } = render(<Nav />)
   expect(getByText('Your Ratings')).toBeInTheDocument()
   expect(getAllByRole('button')[1].id).toBe('ratings-header-btn')
  });

  it('should have a Login button', () => {
    const { getByText, getAllByRole } = render(<Nav />)
    expect(getByText('Login')).toBeInTheDocument()
    expect(getAllByRole('button')[2].id).toBe('login-btn');
  });

  it('should have a Logout button', () => {
   const { getByText, getAllByRole } = render(<Nav />)
   expect(getByText('Logout')).toBeInTheDocument()
   expect(getAllByRole('button')[3].id).toBe('logout-btn');
  });



})