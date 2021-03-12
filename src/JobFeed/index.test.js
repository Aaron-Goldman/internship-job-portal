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
          name: 'Test Job Name',
          description: 'Test Job Description',
          company: {
            name: 'Test Company Name',
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
  expect(await screen.findByText('Test Job Name')).toBeInTheDocument();
  expect(await screen.findByText('Test Job Description')).toBeInTheDocument();
  expect(await screen.findByText('Test Company Name')).toBeInTheDocument();
});
