import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';

import { getProjects } from '@/api/handlers/projects';
import { GetProjectsReply } from '@/api/projects';
import { BLACK_COLOR, BORDER_COLOR, GRAY_COLOR, WHITE_COLOR } from '@/components/ui/colors';
import { Input } from '@/components/ui/Input';

const ProjectsHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
`;

const ProjectsTitle = styled.div`
  font-size: 1.5rem;
  white-space: nowrap;
  flex-grow: 6;
`;

const ProjectsSearch = styled.div`
  flex-grow: 1;
`;

const ProjectsLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  grid-gap: 1rem;
  padding: 0 1rem;
  overflow-x: hidden;
  overflow-y: auto;
  flex: 1;
`;

const ProjectCard = styled.div`
  background: ${WHITE_COLOR};
  padding: 2rem;
  border: 1px solid ${BORDER_COLOR};
  border-radius: .5rem;
  cursor: pointer;
  user-select: none;
  overflow: hidden;
`;

const ProjectName = styled.div`
  color: ${BLACK_COLOR};
  font-weight: 400;
  margin-bottom: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProjectUpdatedAt = styled.div`
  color: ${GRAY_COLOR};
  font-size: .875rem;
  font-weight: 300;
  line-height: 1.25rem;
`;

type ProjectProps = Omit<GetProjectsReply, 'id'> & {
  onClick?: () => void;
};

const Project: React.FC<ProjectProps> = ({ name, updatedAt, onClick }) =>
  <ProjectCard onClick={onClick}>
    <ProjectName>{ name }</ProjectName>
    <ProjectUpdatedAt>{ updatedAt }</ProjectUpdatedAt>
  </ProjectCard>;

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<GetProjectsReply[]>([]);
  const [query, setQuery] = useState('');
  const history = useHistory();

  const handleProjectClick = (id: string): void => {
    history.push('/editor', { id });
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value.trim());
  };

  const fetchProjects = async (name?: string): Promise<void> => {
    const res = await getProjects({ name });
    if (res.__state === 'success' && res.data) {
      setProjects(res.data);
    }
  };

  const fetchProjectsDebounce = useCallback(debounce(fetchProjects, 250), []);

  useEffect(() => {
    fetchProjectsDebounce(query);
  }, [query]);

  useEffect(() => {
    fetchProjects().then();
  }, []);

  return <div className="flx-col flx-item-1">
    <ProjectsHeader>
      <ProjectsTitle>My projects</ProjectsTitle>
      <ProjectsSearch>
        <Input
          type="text"
          placeholder={'Поиск по проектам'}
          value={query}
          onChange={handleQueryChange}
        />
      </ProjectsSearch>
    </ProjectsHeader>
    <ProjectsLayout>
      {
        projects.map(({ id, name, updatedAt }, index) =>
          <Project
            key={`project-${index}`}
            name={name}
            updatedAt={updatedAt}
            onClick={(): void => handleProjectClick(id)}
          />)
      }
    </ProjectsLayout>
  </div>;
};
