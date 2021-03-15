import React from 'react';
import { render, screen } from '@testing-library/react';
import { Route, MemoryRouter as Router } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import JobDetails from './index';
import { QUERY_JOB_DETAILS } from '../graphql/queries';
import { JOB_DETAILS_PATH } from '../paths';

const MOCK_JOB_ID = 1;

const mockedJobResponse = {
  request: {
    query: QUERY_JOB_DETAILS,
    variables: {
      id: MOCK_JOB_ID,
    },
  },
  result: {
    data: {
      job: {
        name: 'Test Job Name',
        description: 'Test Job Description',
        isAvailable: true,
        company: {
          name: 'Test Company Name',
        },
        jobSkills: [{
          skill: {
            id: 0,
            name: 'Test Skill',
          },
        }],
        jobRequirements: [{
          id: 0,
          name: 'Test Requirement',
        }],
        jobBenefits: [{
          id: 0,
          name: 'Test Benefit',
        }],
      },
    },
  },
};

const mockedResponses = [
  mockedJobResponse,
];

it('renders the job details page', async () => {
  render(
    <MockedProvider mocks={mockedResponses}>
      <Router initialEntries={[`/job-details/${MOCK_JOB_ID}`]}>
        <Route path={JOB_DETAILS_PATH}>
          <JobDetails />
        </Route>
      </Router>
    </MockedProvider>,
  );
  expect(await screen.findByText('Test Job Name')).toBeInTheDocument();
  expect(await screen.findByText('Test Job Description')).toBeInTheDocument();
  expect(await screen.findByText('Test Company Name')).toBeInTheDocument();
  expect(await screen.findByText('Test Skill')).toBeInTheDocument();
  expect(await screen.findByText('Test Requirement')).toBeInTheDocument();
  expect(await screen.findByText('Test Benefit')).toBeInTheDocument();
});
