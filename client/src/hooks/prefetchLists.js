import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { volunteers } from '../apis/volunteers';
import { workshops } from '../apis/workshops';
import { meetings } from '../apis/meetings';
import { enrollments } from '../apis/enrollments';

const pageChunks = [
  () => import('../Pages/Volunteers/Volunteers'),
  () => import('../Pages/Workshops/Workshops'),
  () => import('../Pages/Meetings/Meetings'),
  () => import('../Pages/Enrollments/Enrollments'),
];

const firstPage = [
  {
    queryKey: [
      1,
      12,
      { search: '', status: 'all', role: 'all', gender: 'all' },
      true,
    ],
    queryFn: volunteers,
  },
  {
    queryKey: [
      1,
      12,
      { search: '', startDate: '', endDate: '', pastOrUpcoming: 'upcoming' },
      true,
    ],
    queryFn: workshops,
  },
  {
    queryKey: [1, 12, { search: '', startDate: '', endDate: '' }, true],
    queryFn: meetings,
  },
  {
    queryKey: [
      1,
      12,
      { search: '', gender: 'all', enrolledBy: 'all' },
      true,
    ],
    queryFn: enrollments,
  },
];

export function PrefetchLists({ user }) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!user?.key) return undefined;
    pageChunks.forEach((load) => {
      load().catch(() => {});
    });
    firstPage.forEach(({ queryKey, queryFn }) => {
      queryClient.prefetchQuery({
        queryKey,
        queryFn: ({ signal }) => queryFn({ signal, queryKey, user }),
      });
    });
    return undefined;
  }, [user, queryClient]);

  return null;
}
