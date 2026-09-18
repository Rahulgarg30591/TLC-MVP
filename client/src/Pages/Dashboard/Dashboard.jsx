import { Box, ButtonBase, Divider, Stack, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { useStyles } from './Dashboard.styles';
import { useNavigate } from 'react-router-dom'
import UserContext from '../../store/userContext';
import { ReactComponent as EnrollmentColorIcon } from '../.././assets/Icons/enrollmentsColorIcon.svg';
import { ReactComponent as VolunteerColorIcon } from '../.././assets/Icons/volunteerColorIcon.svg';
import { ReactComponent as MeetingsColorIcon } from '../.././assets/Icons/meetingsColorIcon.svg';
import { ReactComponent as WorkshopColorIcon } from '../.././assets/Icons/workshopColorIcon.svg';
import UpcomingWorkshop from '../../Components/UpcomingWorkshop/UpcomingWorkshop';
import DoughnutChart from './Charts/DonutChart/DoughnutChart';
import { useReactQuery } from '../../hooks/useReactQuery';
import { dashboardDetails, dashboardWorkshops } from '../../apis/dashboard';
import Loader from '../../Components/Loader/Loader';

const Dashboard = () => {
  const nav = useNavigate()
  const { user } = useContext(UserContext);
  const { data, isPending } = useReactQuery(
    ['dashboard'],
    dashboardDetails
  );
  const { data: wkshps, isPending: isLoading } = useReactQuery(
    ['wkshps'],
    dashboardWorkshops
  );

  const classes = useStyles();

  if (isPending || isLoading) {
    return <Loader isDashboard={true} />
  }

  const smallCardData = [
    {
      id: 0,
      title: 'Total volunteers',
      value: data?.data?.volunteers || 0,
      icon: <VolunteerColorIcon />,
      class: 'volunteer',
      click: () => nav('/volunteers'),
    },
    {
      id: 1,
      title: 'Total workshops',
      value: data?.data?.workshops || 0,
      icon: <WorkshopColorIcon />,
      class: 'workshop',
      click: () => nav('/workshops'),
    },
    {
      id: 2,
      title: 'Total Enrollments',
      value: data?.data?.enrollments || 0,
      icon: <EnrollmentColorIcon />,
      class: 'enrollment',
      click: () => nav('/enrollments'),
    },
    {
      id: 3,
      title: 'Total Meetings',
      value: data?.data?.meetings || 0,
      icon: <MeetingsColorIcon />,
      class: 'meeting',
      click: () => nav('/meetings'),
    },
  ];


  return (
    <Box className={classes.root}>
      <Box className={classes.welcome}>
        <Box>
          <Typography className="welcomeTitle">
            Welcome back, {user?.name || 'there'}
          </Typography>
          <Typography className="welcomeSub">
            Click a card below, or open an upcoming workshop from the list.
          </Typography>
        </Box>
      </Box>
      <Box className={classes.smallCardContainer}>
        {smallCardData.map((item) => (
          <Stack
            key={item.id}
            component={ButtonBase}
            className={`${classes.smallCard} ${item.class}`}
            divider={<Divider orientation="vertical" flexItem />}
            direction={'row'}
            sx={{ display: 'flex', minWidth: 0 }}
            onClick={item?.click}
          >
            {item.icon}
            <Box className={classes.titleAndValue}>
              <Typography className="cardValue">
                {Number(item.value || 0).toLocaleString('en-IN')}
              </Typography>
              <Typography className="cardTitle">{item.title}</Typography>
              <Typography className="cardCta">Open →</Typography>
            </Box>
          </Stack>
        ))}
      </Box>
      <Box className={classes.bigCardContainer}>
        <Box className={classes.bigCard}>
          <Typography className="bigCardHeading">
            Last 6 Months Enrollments
          </Typography>
          <Box className={classes.chartMain}>
            <DoughnutChart data={data} />
          </Box>
        </Box>
        <Box className={classes.bigCard}>
          <Box className={classes.bigCardHeadingRow}>
            <Typography className="bigCardHeading">
              Upcoming Workshops
            </Typography>
            <Typography
              className="seeAll"
              onClick={() => nav('/workshops')}
            >
              See all
            </Typography>
          </Box>
          <Box className={classes.upcominWorkshops}>
            {wkshps?.data?.workshops?.length > 0 ? (
              wkshps?.data?.workshops?.map((workshop) => (
                <UpcomingWorkshop
                  key={workshop?.id}
                  id={workshop?.id}
                  title={workshop?.types}
                  startDate={workshop?.start_date}
                  endDate={workshop?.end_date}
                  location={workshop?.venue_city}
                />
              ))
            ) : (
              <Typography className="noWorkshop">
                No Upcoming workshops!
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
