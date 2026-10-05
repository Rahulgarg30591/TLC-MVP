import { API_BASE } from './config';

export const dashboardDetails = async ({ user, signal }) => {
  try {
    const response = await fetch(
      `${API_BASE}/dashboard`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.key}`,
        },
        signal,
      }
    );
    return await response.json();
  } catch (err) {
    return {
      status: 'error',
      message: err,
    };
  }
};

export const dashboardWorkshops = async ({ user, signal }) => {
  try {
    const response = await fetch(
      `${API_BASE}/workshops?pastOrUpcoming=upcoming&sort_by=start_date`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.key}`,
        },
        signal,
      }
    );
    return await response.json();
  } catch (err) {
    return {
      status: 'error',
      message: err,
    };
  }
};
