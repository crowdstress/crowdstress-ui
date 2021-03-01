import React, { useState } from 'react';
import { Widget } from '@/components/ui/Widget';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Content } from '@/components/ui/Content';
import { useDispatch } from 'react-redux';
import { createProject } from '@/store/project/actions';
import { useHistory } from 'react-router';
import { Checkbox } from '@/components/ui/Checkbox';

export const NewProject: React.FC = () => {
  const [name, setName] = useState('');
  const [inProgress, setInProgress] = useState(false);
  const [isProtected, setProtected] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    setInProgress(true);
    dispatch(createProject({
      name,
      owner: 'test',
      protected: isProtected,
    }));
    setInProgress(false);
    history.push('/editor');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  return <Content>
    <div className="flx-aic">
      <Widget title={'New project'}>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder={'Project name'}
            value={name}
            onChange={handleChange}
            autoFocus
            required
          />
          <Checkbox value={isProtected} onChange={setProtected} label={'Protect your project'} />
          <Button
            type="submit"
            buttonDisplay="block"
            buttonStyle="primary"
            size="medium"
            disabled={inProgress}
          >
            Create
          </Button>
        </form>
      </Widget>
    </div>
  </Content>;
};
