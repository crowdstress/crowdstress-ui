import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';

import { GetProjectsReply } from '@/api/projects';
import { Project } from '@/components/projects/Project';
import { ProjectsHeader } from '@/components/projects/ProjectsHeader';

const ProjectsLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  grid-gap: 1rem;
  padding: 0 1rem;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<GetProjectsReply[]>([]);
  const history = useHistory();

  const handleProjectClick = (id: string): void => {
    history.push('/editor', { id });
  };

  return <div className="flx-col flx-item-1">
    <ProjectsHeader onSearch={setProjects} />
    <ProjectsLayout>
      {
        projects.map((project, index) =>
          <Project
            key={`project-${index}`}
            onClick={(): void => handleProjectClick(project.id)}
            {...project}
          />)
      }
    </ProjectsLayout>
  </div>;
};
