import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { newProject } from '@/api/handlers/projects';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { EditorLocationState } from '@/models/editor';

export const CreateProject: React.FC = () => {
  const [name, setName] = useState('');
  const [inProgress, setInProgress] = useState(false);
  const history = useHistory<EditorLocationState>();

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setInProgress(true);

    const res = await newProject({ name: name.trim() });
    if (res.__state === 'success' && res.data) {
      const { id } = res.data;
      history.push('/editor', { id });
      return;
    }
    setInProgress(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value === ' ') return;
    setName(e.target.value);
  };

  return <form onSubmit={handleSubmit}>
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
  </form>;
};
