import React from 'react';
import styled from 'styled-components';

import { GetProjectsReply } from '@/api/projects';
import { ProjectThumbnail } from '@/components/projects/ProjectThumbnail';
import { BLACK_COLOR, BORDER_COLOR, GRAY_COLOR, WHITE_COLOR } from '@/components/ui/colors';
import { flxCol } from '@/components/ui/flex';
import { fontPrimaryLight, fontPrimaryRegular } from '@/components/ui/fonts';
import { getDateTime } from '@/utils/date';

type ProjectProps = GetProjectsReply & {
  onClick?: () => void;
};

const ProjectCard = styled.div`
  background: ${WHITE_COLOR};
  border: 1px solid ${BORDER_COLOR};
  border-radius: .5rem;
  cursor: pointer;
  user-select: none;
  overflow: hidden;
  height: 16rem;
  ${flxCol};
`;

const ProjectInfo = styled.div`
  padding: 0 2rem 2rem;
`;

const ProjectName = styled.div`
  color: ${BLACK_COLOR};
  margin-bottom: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  ${fontPrimaryRegular(16)};
`;

const ProjectUpdatedAt = styled.div`
  color: ${GRAY_COLOR};
  ${fontPrimaryLight(14)};
`;

export const Project: React.FC<ProjectProps> = ({ id, name, updatedAt, onClick }) =>
  <ProjectCard onClick={onClick}>
    <ProjectThumbnail url={`/api/thumbnail/${id}`} />
    <ProjectInfo>
      <ProjectName>{ name }</ProjectName>
      <ProjectUpdatedAt>{ getDateTime(updatedAt) }</ProjectUpdatedAt>
    </ProjectInfo>
  </ProjectCard>;
