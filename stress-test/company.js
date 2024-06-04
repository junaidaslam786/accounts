import { check } from 'k6';
import http from 'k6/http';
import { Rate } from 'k6/metrics';
import faker from 'https://unpkg.com/faker@5.1.0/dist/faker.js';

const updateCompanyFailedRate = new Rate('failed update company request');

export function requestCompany(baseUrl, token) {
  const res = http.get(`${baseUrl}/company/2`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  check(res, {
    'Show company': res => res.status === 200,
  });
}

export function requestUpdateCompany(baseUrl, token) {
  const payload = JSON.stringify({
    name: faker.company.companyName(),
    address: faker.address.streetAddress(),
    industry: faker.company.bs(),
  });
  const params = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const res = http.put(`${baseUrl}/company/2`, payload, params);

  const result = check(res, {
    'Update company': res => res.status === 200,
  });
  updateCompanyFailedRate.add(!result);
}
