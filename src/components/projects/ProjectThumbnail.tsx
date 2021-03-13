import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { flxAicJcc } from '@/components/ui/flex';
import { fontPrimaryLight } from '@/components/ui/fonts';

interface ProjectThumbnailProps {
  url: string;
}

const ProjectThumbnailBlock = styled.div`
  flex: 1;
  margin-bottom: 1rem;
`;

const ProjectThumbnailAlt = styled(ProjectThumbnailBlock)`
  background: #fafafa;
  color: #808080;
  ${fontPrimaryLight(14)};
  ${flxAicJcc};
`;

const ProjectThumbnailImage = styled(ProjectThumbnailBlock)<ProjectThumbnailProps>`
  background-image: ${({ url }): string => `url(${url})`};
  background-position: center top;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const ProjectThumbnail: React.FC<ProjectThumbnailProps> = ({ url }) => {
  const [state, setState] = useState<'ready' | 'pending' | 'error'>('pending');

  const handleLoad = (): void => setState('ready');
  const handleError = (): void => setState('error');

  useEffect(() => {
    const img = new Image();
    img.src = url;
    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);

    return (): void => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };
  }, []);

  return <React.Fragment>
    { state === 'pending' && <ProjectThumbnailAlt>Loading...</ProjectThumbnailAlt> }
    { state === 'error' && <ProjectThumbnailAlt>No image provided</ProjectThumbnailAlt> }
    { state === 'ready' && <ProjectThumbnailImage url={url} /> }
  </React.Fragment>;
};
