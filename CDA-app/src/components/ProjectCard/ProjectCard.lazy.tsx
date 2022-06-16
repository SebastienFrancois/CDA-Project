import React, { lazy, Suspense } from 'react';
import { ProjectCardProps } from './ProjectCard';

const LazyProjectCard = lazy(() => import('./ProjectCard'));

const ProjectCard = (props: JSX.IntrinsicAttributes & ProjectCardProps) => (
  <Suspense fallback={null}>
    <LazyProjectCard {...props} />
  </Suspense>
);

export default ProjectCard;
