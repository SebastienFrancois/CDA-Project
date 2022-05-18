import React, { lazy, Suspense } from 'react';

const LazyProjectCard = lazy(() => import('./ProjectCard'));

const ProjectCard = (
  props: JSX.IntrinsicAttributes & {
    name: string;
    status: string;
    dueDate: string;
  },
) => (
  <Suspense fallback={null}>
    <LazyProjectCard {...props} />
  </Suspense>
);

export default ProjectCard;
