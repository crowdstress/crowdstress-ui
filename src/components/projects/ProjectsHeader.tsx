import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { getProjects } from '@/api/handlers/projects';
import { GetProjectsReply } from '@/api/projects';
import { ModalWrapper } from '@/components/ModalWrapper';
import { CreateProject } from '@/components/projects/CreateProject';
import { Button } from '@/components/ui/Button';
import { flxAic } from '@/components/ui/flex';
import { fontPrimaryRegular } from '@/components/ui/fonts';
import { Input } from '@/components/ui/Input';
import { SEARCH_WAIT } from '@/config';
import { useUpdate } from '@/hooks/useUpdate';

interface ProjectsHeaderProps {
  onSearch: (data: GetProjectsReply[]) => void;
}

const ProjectsHeaderBlock = styled.div`
  padding: 1rem;
  ${flxAic};
`;

const ProjectsTitle = styled.div`
  white-space: nowrap;
  margin-right: 2rem;
  ${fontPrimaryRegular(24)};
`;

const ProjectsMainBlock = styled.div`
  flex-grow: 6;
  ${flxAic};
`;

const ProjectsSearch = styled.div`
  flex-grow: 1;
`;

export const ProjectsHeader: React.FC<ProjectsHeaderProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const openModal = (): void => {
    if (!showCreateModal) setShowCreateModal(true);
  };

  const closeModal = (): void => {
    setShowCreateModal(false);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value.trim());
  };

  const fetchProjects = async (name?: string): Promise<void> => {
    const res = await getProjects({ name });
    if (res.__state === 'success' && res.data) {
      onSearch(res.data);
    }
  };

  const fetchProjectsDebounce = useCallback(debounce(fetchProjects, SEARCH_WAIT), []);

  useUpdate(() => {
    fetchProjectsDebounce(query);
  }, [query]);

  useEffect(() => {
    fetchProjects().then();
  }, []);

  return <React.Fragment>
    <ProjectsHeaderBlock>
      <ProjectsMainBlock>
        <ProjectsTitle>My projects</ProjectsTitle>
        <Button
          buttonDisplay="inline"
          buttonStyle="primary"
          size="small"
          onClick={openModal}
        >
          Create new
        </Button>
      </ProjectsMainBlock>
      <ProjectsSearch>
        <Input
          type="text"
          placeholder={'find project'}
          value={query}
          onChange={handleQueryChange}
        />
      </ProjectsSearch>
    </ProjectsHeaderBlock>
    {
      showCreateModal &&
      <ModalWrapper title={'New project'} onClose={closeModal}>
        <CreateProject />
      </ModalWrapper>
    }
  </React.Fragment>;
};
