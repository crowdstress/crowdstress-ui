import React from 'react';
import { Toolbar, ToolbarButton } from '@/components/ui/Toolbar';
import { EditorParams } from '@/models/editor';
import { getParams, setParams } from '@/store/editor/params';
import { useDispatch, useSelector } from 'react-redux';
import IconGrid from '@/assets/svg/params/grid.svg';
import IconNodes from '@/assets/svg/params/nodes.svg';

export const Params: React.FC = () => {
  const params = useSelector(getParams);
  const { snapToGrid, snapToNodes } = params;
  const dispatch = useDispatch();

  const handleParamClick = (param: keyof Pick<EditorParams, 'snapToGrid' | 'snapToNodes'>): void => {
    dispatch(setParams({ [param]: !params[param] }));
  };

  return <Toolbar position={{
    vertical: 'bottom',
    horizontal: 'left',
  }} direction="row">
    <ToolbarButton
      active={snapToGrid}
      margin="right"
      onClick={(): void => handleParamClick('snapToGrid')}
    >
      <IconGrid />
    </ToolbarButton>
    <ToolbarButton
      active={snapToNodes}
      margin="right"
      onClick={(): void => handleParamClick('snapToNodes')}
    >
      <IconNodes />
    </ToolbarButton>
  </Toolbar>;
};
