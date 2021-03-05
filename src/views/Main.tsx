import React from 'react';
import { useHistory } from 'react-router';

import { Card } from '@/components/ui/Card';
import { Content } from '@/components/ui/Content';

export const Main: React.FC = () => {
  const history = useHistory();

  const handleCreate = (): void => {
    history.push('/new');
  };

  return <div className="flx-aic-jcc flx-item-1">
    <Content>
      <div>
        <Card
          onClick={handleCreate}
          title={'Create project'}
          description={'Create new project in floor plan editor'}
        />
        <Card title={'Load project'} description={'Upload locally stored project'} />
      </div>
    </Content>
  </div> ;
};
