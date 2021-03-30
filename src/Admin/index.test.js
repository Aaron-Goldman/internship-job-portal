import React from 'react';
import { render, screen } from 'react-dom';
import Admin from './index';

it('renders the admin page', () => {
  render(<Admin userId={1} />);
  expect(screen.getByText('Access Denied')).toBeInTheDocument();
});
