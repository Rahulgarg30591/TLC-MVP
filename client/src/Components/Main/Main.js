import React, { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import Signup from '../../Pages/Signup/Signup';
import Login from '../../Pages/Login/Login';
import ForgetPassword from '../../Pages/ForgetPassword/ForgetPassword';
import ResetPassword from '../../Pages/ResetPassword/ResetPassword';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Wrapper from '../Wrapper/Wrapper';
import UserContext from '../../store/userContext';
import { logStatus } from '../../apis/user';
import Loader from '../Loader/Loader';

const Dashboard = lazy(() => import('../../Pages/Dashboard/Dashboard'));
const Volunteers = lazy(() => import('../../Pages/Volunteers/Volunteers'));
const VolunteerDetails = lazy(
  () => import('../../Pages/Volunteers/VolunteerDetails/VolunteerDetails')
);
const DeletePopup = lazy(() => import('../DeletePopup/DeletePopup'));
const InvitePopup = lazy(
  () => import('../../Pages/Volunteers/InvitePopup/InvitePopup')
);
const VerifyPopup = lazy(
  () => import('../../Pages/Volunteers/VerifyPopup/VerifyPopup')
);
const WorkshopsDetails = lazy(
  () => import('../../Pages/Workshops/WorkshopsDetails/WorkshopsDetails')
);
const Workshops = lazy(() => import('../../Pages/Workshops/Workshops'));
const AutocompletePopup = lazy(
  () => import('../AutocompletePopup/AutocompletePopup')
);
const InfoTable = lazy(() => import('../InfoTable/InfoTable'));
const EnrollmentsDetails = lazy(
  () => import('../../Pages/Enrollments/EnrollmentsDetails/EnrollmentsDetails')
);
const MeetingsDetails = lazy(
  () => import('../../Pages/Meetings/MeetingsDetails/MeetingsDetails')
);
const Meetings = lazy(() => import('../../Pages/Meetings/Meetings'));
const Enrollments = lazy(() => import('../../Pages/Enrollments/Enrollments'));
const ErrorPage = lazy(() => import('../../Pages/ErrorPage/ErrorPage'));
const EditPage = lazy(() => import('../../Pages/EditPage/EditPage'));

let SESSIONUSER = localStorage.getItem('keys');
SESSIONUSER = SESSIONUSER ? JSON.parse(SESSIONUSER) : null;
function Main() {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(SESSIONUSER);
  const [error, setError] = useState(null);

  useEffect(() => {
    const data = async (body) => {
      const userData = await logStatus(body);
      if (userData?.status === 'success') {
        setUser(userData?.user);
        setLoader(null);
        const keys = {
          id: userData?.user?.email,
          key: userData?.user?.key,
        };
        localStorage.setItem('keys', JSON.stringify(keys));
        return;
      }
      if (userData?.message?.includes('expire')) {
        localStorage.clear();
        window.location.href = '/'
        return
      }
      setError(() => {
        localStorage.clear();
        return typeof userData?.message === 'string'
          ? userData?.message
          : 'Something went wrong.. Please try again later!';
      });
    };
    if (SESSIONUSER) {
      const { id: email, key } = SESSIONUSER;
      data({ email, key, isLoggingOut: false });
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user]
  );

  return (
    <UserContext.Provider value={value}>
      <BrowserRouter>
        <Wrapper>
          <Suspense fallback={<Loader />}>
          <Routes>
            {!user && !loader && <Route exact path="/" element={<Login />} />}
            {!user && !loader && (
              <Route exact path="/signup" element={<Signup />} />
            )}
            {!user && !loader && (
              <Route exact path="/forgotPass" element={<ForgetPassword />} />
            )}
            {!user && !loader && (
              <Route exact path="/resetPass" element={<ResetPassword />} />
            )}
            {!user && !loader && (
              <Route exact path="*" element={<Login />} />
            )}
            {loader && !error && <Route exact path="*" element={<Loader />} />}
            {loader && error && (
              <Route exact path="*" element={<ErrorPage>{error}</ErrorPage>} />
            )}
            {user && !loader && (
              <Route exact path="/" element={<Dashboard />} />
            )}
            {user && !loader && (
              <Route exact path="/editprofile" element={<EditPage />} />
            )}
            {user && !loader && (
              <Route exact path="/dashboard" element={<Dashboard />} />
            )}
            {user && !loader && (
              <Route exact path="/volunteers" element={<Volunteers />} />
            )}
            {user && !loader && (
              <Route
                exact
                path="/volunteers/detail/:email/:type"
                element={<VolunteerDetails />}
              />
            )}
            {user && !loader && (
              <Route exact path="/delete" element={<DeletePopup />} />
            )}
            {user && !loader && (
              <Route exact path="/invite" element={<InvitePopup />} />
            )}
            {user && !loader && (
              <Route exact path="/verify" element={<VerifyPopup />} />
            )}
            {user && !loader && (
              <Route
                exact
                path="/workshops/:createSuccess?"
                element={<Workshops />}
              />
            )}
            {user && !loader && (
              <Route
                exact
                path="/workshops/detail/:id/:type"
                element={<WorkshopsDetails />}
              />
            )}
            {user && !loader && (
              <Route
                exact
                path="/workshops/detail/:type"
                element={<WorkshopsDetails />}
              />
            )}
            {user && !loader && (
              <Route
                exact
                path="/autocomplete"
                element={<AutocompletePopup />}
              />
            )}
            {user && !loader && (
              <Route exact path="/infotable" element={<InfoTable />} />
            )}
            {user && !loader && (
              <Route path="/meetings/:createSuccess?" element={<Meetings />} />
            )}
            {user && !loader && (
              <Route
                exact
                path="/meetings/details/:id/:type"
                element={<MeetingsDetails />}
              />
            )}
            {user && !loader && (
              <Route
                exact
                path="/meetings/details/:type"
                element={<MeetingsDetails />}
              />
            )}
            {user && !loader && (
              <Route
                exact
                path="/enrollments/details/:id/:type"
                element={<EnrollmentsDetails />}
              />
            )}
            {user && !loader && (
              <Route
                exact
                path="/enrollments/details/:type"
                element={<EnrollmentsDetails />}
              />
            )}
            {user && !loader && (
              <Route
                exact
                path="/enrollments/:createSuccess?"
                element={<Enrollments />}
              />
            )}
            {user && !loader && (
              <Route exact path="*" element={<ErrorPage />} />
            )}
          </Routes>
          </Suspense>
        </Wrapper>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default Main;
