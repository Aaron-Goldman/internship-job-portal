import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import JobFeed from './index';
import { QUERY_JOBS } from '../graphql/queries';

const mockedResponses = [{
  request: { query: QUERY_JOBS },
  result: {
    data: {
      jobs: [
        {
          id: 1,
          name: 'Designer',
          description: 'Designer description',
          company: {
            name: 'Design Company',
          },
        },
        {
          id: 2,
          name: 'Programmer',
          description: 'Programmer description',
          company: {
            name: 'Programming Company',
          },
        },
        {
          id: 3,
          name: 'Tester',
          description: 'Tester description',
          company: {
            name: 'Test Company',
          },
        },
      ],
    },
  },
}];

it('renders the job feed page', async () => {
  render(
    <MockedProvider mocks={mockedResponses}>
      <Router>
        <JobFeed />
      </Router>
    </MockedProvider>,
  );
  expect(await screen.findByText('Designer')).toBeInTheDocument();
  expect(await screen.findByText('Designer description')).toBeInTheDocument();
  expect(await screen.findByText('Design Company')).toBeInTheDocument();
  expect(await screen.findByText('Programmer')).toBeInTheDocument();
  expect(await screen.findByText('Programmer description')).toBeInTheDocument();
  expect(await screen.findByText('Programming Company')).toBeInTheDocument();
  expect(await screen.findByText('Tester')).toBeInTheDocument();
  expect(await screen.findByText('Tester description')).toBeInTheDocument();
  expect(await screen.findByText('Test Company')).toBeInTheDocument();
});
