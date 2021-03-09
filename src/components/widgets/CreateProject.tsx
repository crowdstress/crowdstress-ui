import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { newProject } from '@/api/handlers/projects';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Widget } from '@/components/ui/Widget';
import { createProject } from '@/store/project/actions';

export const CreateProject: React.FC = () => {
  const [name, setName] = useState('');
  const [inProgress, setInProgress] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setInProgress(true);

    const res = await newProject({ name: name.trim() });
    if (res.__state === 'success' && res.data) {
      dispatch(createProject(res.data));
      history.push('/editor');
      return;
    }
    setInProgress(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value === ' ') return;
    setName(e.target.value);
  };

  return <Widget title={'New project'}>
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder={'Project name'}
        value={name}
        onChange={handleChange}
        autoFocus
        required
      />
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
  </Widget>;
};
