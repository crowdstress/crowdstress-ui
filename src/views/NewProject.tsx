import React from 'react';

import { Content } from '@/components/ui/Content';
import { CreateProject } from '@/components/widgets/CreateProject';

export const NewProject: React.FC = () => {
  return <div className="flx-aic-jcc flx-item-1">
    <Content>
      <CreateProject />
    </Content>
  </div>;
};
