import React from 'react';
import { render, screen } from 'react-dom';
import EditDialog from './EditDialog';

it('renders the edit dialog', () => {
  render(<EditDialog userId={1} />);
  expect(screen.getByText('Edit user')).toBeInTheDocument();
});
