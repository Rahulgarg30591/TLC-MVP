const { test, expect } = require('@playwright/test');
const { phone, password } = require('./admin');

const API = process.env.E2E_API_URL || 'http://localhost:8080';

async function login(request) {
  const response = await request.post(`${API}/user/login`, {
    data: { email: phone, password },
  });
  expect(response.ok(), await response.text()).toBeTruthy();
  const body = await response.json();
  expect(body.user.phoneNumber).toBe(phone);
  expect(typeof body.user.id).toBe('number');
  return body.user;
}

function auth(user) {
  return { Authorization: `Bearer ${user.key}` };
}

test.describe('account id links', () => {
  test('volunteer, profile, role, workshop, and meeting links use the account id', async ({
    request,
  }) => {
    const user = await login(request);

    const byId = await request.get(`${API}/volunteers/${user.id}/details`, {
      headers: auth(user),
    });
    expect(byId.ok()).toBeTruthy();
    const detail = await byId.json();
    expect(detail.user.id).toBe(user.id);
    expect(detail.user.phoneNumber).toBe(phone);
    expect(Array.isArray(detail.user.workshop_volunteers)).toBeTruthy();
    expect(Array.isArray(detail.user.meetings_volunteers)).toBeTruthy();

    const byEmail = await request.get(
      `${API}/volunteers/dev.admin@thelastcentre.com/details`,
      { headers: auth(user) }
    );
    expect(byEmail.status()).toBe(400);

    const otherProfile = await request.put(`${API}/user/1/update`, {
      headers: { ...auth(user), 'Content-Type': 'application/json' },
      data: {
        name: user.name,
        dob: user.dob,
        city: user.city,
        state: user.state,
        location: user.location,
        gender: user.gender,
        phoneNumber: user.phoneNumber,
        pincode: Number(user.pincode),
        yearOfJoining: Number(user.yearOfJoining),
      },
    });
    expect(otherProfile.status()).toBe(403);

    const selfProfile = await request.put(`${API}/user/${user.id}/update`, {
      headers: { ...auth(user), 'Content-Type': 'application/json' },
      data: {
        name: user.name,
        dob: user.dob,
        city: user.city,
        state: user.state,
        location: user.location,
        gender: user.gender,
        phoneNumber: user.phoneNumber,
        pincode: Number(user.pincode),
        yearOfJoining: Number(user.yearOfJoining),
      },
    });
    expect(selfProfile.ok(), await selfProfile.text()).toBeTruthy();

    const ownRole = await request.put(`${API}/volunteers/updateRole`, {
      headers: { ...auth(user), 'Content-Type': 'application/json' },
      data: { id: user.id, isAdmin: true },
    });
    expect(ownRole.status()).toBe(403);

    const search = await request.get(
      `${API}/volunteers/searchAndFilter?page=1&no_of_records=5&value=${phone}`,
      { headers: auth(user) }
    );
    expect(search.ok()).toBeTruthy();
    const found = (await search.json()).data.users[0];
    expect(found.id).toBe(user.id);
    expect(found.phoneNumber).toBe(phone);

    const workshops = await request.get(
      `${API}/workshops?page=1&no_of_records=50`,
      { headers: auth(user) }
    );
    expect(workshops.ok(), await workshops.text()).toBeTruthy();
    const withPeople = (await workshops.json()).data.workshops.filter(
      (row) => row.volunteers_count > 0 || row.lead_volunteers_count > 0
    );
    expect(withPeople.length).toBeGreaterThan(0);
    const workshop = await request.get(
      `${API}/workshops/${withPeople[0].id}/details`,
      { headers: auth(user) }
    );
    expect(workshop.ok(), await workshop.text()).toBeTruthy();
    const workshopBody = await workshop.json();
    const members = [
      ...workshopBody.data.workshop.workshop_volunteers,
      ...workshopBody.data.workshop.workshop_lead_volunteers,
    ];
    expect(members.length).toBeGreaterThan(0);
    for (const member of members) {
      expect(typeof member.user.id).toBe('number');
      expect(member.user_email).toBeUndefined();
    }

    const meetings = await request.get(
      `${API}/meetings?page=1&no_of_records=50`,
      { headers: auth(user) }
    );
    expect(meetings.ok(), await meetings.text()).toBeTruthy();
    const meetingRows = (await meetings.json()).data.meetings;
    expect(meetingRows.length).toBeGreaterThan(0);
    let sawVolunteer = false;
    for (const row of meetingRows) {
      const meeting = await request.get(`${API}/meetings/${row.id}/details`, {
        headers: auth(user),
      });
      expect(meeting.ok(), await meeting.text()).toBeTruthy();
      const volunteers = (await meeting.json()).data.meetings_volunteers || [];
      for (const member of volunteers) {
        sawVolunteer = true;
        expect(typeof member.user.id).toBe('number');
        expect(member.volunteer_email).toBeUndefined();
      }
      if (sawVolunteer) break;
    }
    expect(sawVolunteer).toBeTruthy();
  });

  test('a new enrollment records the volunteer by account id', async ({
    request,
  }) => {
    const user = await login(request);
    const mobile = '9000012345';
    const created = await request.post(`${API}/enrollments`, {
      headers: { ...auth(user), 'Content-Type': 'application/json' },
      data: {
        name: 'Id Link Check',
        dob: '01/01/2010',
        gender: 'male',
        mobile_number: mobile,
        email: '',
        address: 'Test address',
        city: 'Delhi',
        state: 'Delhi',
        pincode: 110001,
        children: [],
        enrolled_by_id: user.id,
      },
    });
    expect(created.ok(), await created.text()).toBeTruthy();

    const list = await request.get(
      `${API}/enrollments?page=1&no_of_records=5&value=${mobile}`,
      { headers: auth(user) }
    );
    expect(list.ok(), await list.text()).toBeTruthy();
    const row = (await list.json()).data.enrollments[0];
    expect(row.mobile_number).toBe(mobile);
    expect(row.enrollment_volunteer.id).toBe(user.id);
    expect(row.enrollment_volunteer.phoneNumber).toBe(phone);

    const removed = await request.delete(`${API}/enrollments/`, {
      headers: { ...auth(user), 'Content-Type': 'application/json' },
      data: { ids: [row.id] },
    });
    expect(removed.ok(), await removed.text()).toBeTruthy();
  });
});

test.describe('volunteer page on a phone', () => {
  test.use({ viewport: { width: 393, height: 851 } });

  test('opens a volunteer at a numeric account id', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('textbox', { name: 'Phone number' }).fill(phone);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByText('Welcome back, Local Admin')).toBeVisible();

    await page.locator('header').getByText('Local Admin').click();
    await page.getByRole('link', { name: 'Edit Profile' }).click();
    await page.keyboard.press('Escape');
    await expect(page.getByLabel('Phone Number')).toHaveValue(phone);
    const update = page.waitForResponse(
      (response) =>
        response.url().includes('/user/') &&
        response.url().includes('/update') &&
        response.request().method() === 'PUT'
    );
    await page.getByRole('button', { name: 'Save' }).click();
    const updateResponse = await update;
    expect(updateResponse.url()).toMatch(/\/user\/\d+\/update$/);
    expect(updateResponse.ok(), await updateResponse.text()).toBeTruthy();
    await expect(page.getByText('Welcome back, Local Admin')).toBeVisible();

    await page.locator('.hamIconBtn').click();
    await page.getByRole('link', { name: 'Volunteers' }).click();
    await page.getByPlaceholder('Search name or email').fill(phone);
    const adminName = page.getByRole('gridcell', { name: /Local Admin/ });
    await expect(adminName).toBeVisible();
    await adminName.getByText('Local Admin', { exact: true }).click();
    await expect(page).toHaveURL(/\/volunteers\/detail\/\d+\/view$/);
    await expect(page).not.toHaveURL(/@/);
    await expect(page.getByLabel('Phone Number')).toHaveValue(phone);
    await expect(page.getByText('Extra information', { exact: true })).toBeVisible();
  });
});
