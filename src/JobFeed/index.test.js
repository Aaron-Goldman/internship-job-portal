import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import JobFeed from './index';

it('renders the home page', () => {
  render(<Router><JobFeed /></Router>);
  expect(screen.getByText('Job Feed')).toBeInTheDocument();
});
