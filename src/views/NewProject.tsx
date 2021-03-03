import React, { useState } from 'react';
import { Widget } from '@/components/ui/Widget';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Content } from '@/components/ui/Content';
import { useDispatch } from 'react-redux';
import { createProject } from '@/store/project/actions';
import { useHistory } from 'react-router';
import { Checkbox } from '@/components/ui/Checkbox';
import { Tooltip } from '@/components/ui/Tooltip';
import IconInfo from '@/assets/svg/info.svg';
import styled from 'styled-components';

const ProtectBlock = styled.div`
  margin: 0 .25rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TooltipText = styled.div`
  min-width: 10rem;
`;

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
      name: name.trim(),
      owner: 'test',
      protected: isProtected,
    }));
    setInProgress(false);
    history.push('/editor');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value === ' ') return;
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
          <ProtectBlock>
            <Checkbox value={isProtected} onChange={setProtected} label={'Protect your project'} />
            <Tooltip
              position="right"
              text={<TooltipText>Your project will be signed with your personal secret key. Even if somebody tries to upload project file, it will be rejected and reported</TooltipText>}
            >
              <div className="icon-wrapper-s">
                <IconInfo className="icon-gray" />
              </div>
            </Tooltip>
          </ProtectBlock>
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
