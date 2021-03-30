import React from 'react';
import { render, screen } from 'react-dom';
import AddDialog from './AddDialog';

it('renders the deletion dialog', () => {
  render(<AddDialog />);
  expect(screen.getByText('Add User')).toBeInTheDocument();
});
