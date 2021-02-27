import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getPresentObjects } from '@/store/editor/objects';
import { ModalWrapper } from '@/components/ModalWrapper';
import styled from 'styled-components';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { GRAY_COLOR } from '@/components/ui/colors';

const Item = styled.div`
  margin-bottom: 1.25rem;
`;

const Info = styled.div`
  font-size: .875rem;
  line-height: 1rem;
  color: ${GRAY_COLOR};
  margin-bottom: .5rem;
`;

interface SaveProjectProps {
  onClose?: () => void;
}

export const SaveProject: React.FC<SaveProjectProps> = ({ onClose }) => {
  const objects = useSelector(getPresentObjects);
  const [name, setName] = useState('');
  const [inProgress, setInProgress] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    setInProgress(true);
    save();
  };

  const save = (): void => {
    // save
  };

  return <ModalWrapper title="Сохранить проект" onClose={onClose}>
    <form onSubmit={handleSubmit}>
      <Item className="flx-aic-jcsb">
        <Input
          id="project-name"
          inputDisplay="block"
          type="text"
          placeholder="Название проекта"
          value={name}
          onChange={handleChange}
          required
        />
      </Item>
      <Item>
        <Info className="flx-aic-jcsb">
          <span>Количество объектов</span>
          <strong>{ objects.length }</strong>
        </Info>
      </Item>
      <Button
        type="submit"
        buttonStyle="primary"
        buttonDisplay="block"
        size="medium"
        disabled={inProgress}
      >
        Сохранить
      </Button>
    </form>
  </ModalWrapper>;
};
