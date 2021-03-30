import React from 'react';
import { render, screen } from 'react-dom';
import DeleteDialog from './DeleteDialog';

it('renders the deletion dialog', () => {
  render(<DeleteDialog userId={1} />);
  expect(screen.getByText('Delete this user?')).toBeInTheDocument();
});
