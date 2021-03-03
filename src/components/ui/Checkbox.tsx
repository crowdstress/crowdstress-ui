import React from 'react';
import styled from 'styled-components';
import { BORDER_COLOR, PRIMARY_COLOR } from '@/components/ui/colors';

const checkImage = 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 54 54\' shape-rendering=\'geometricPrecision\' text-rendering=\'geometricPrecision\' image-rendering=\'optimizeQuality\' fill-rule=\'evenodd\' clip-rule=\'evenodd\'%3E%3Cpath d=\'M13.548 25.939l10.938 10.294L40.57 16.931\' fill=\'none\' stroke=\'%23fff\' stroke-width=\'5.147\'/%3E%3C/svg%3E';

interface CheckboxProps {
  value: boolean;
  label?: string;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}

interface CheckboxLabelProps {
  disabled?: boolean;
}

const CheckboxLabel = styled.label<CheckboxLabelProps>`
  width: max-content;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  opacity: ${({ disabled }): number => disabled ? .6 : 1};
  user-select: none;
  font-weight: 300;
`;

const CheckboxInput = styled.input`
  position: absolute;
  appearance: none;
`;

interface CheckboxBoxProps {
  checked: boolean;
}

const CheckboxBox = styled.div<CheckboxBoxProps>`
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 1rem;
  border: 1px solid ${({ checked }): string => checked ? PRIMARY_COLOR : BORDER_COLOR};
  border-radius: .25rem;
  background-image: ${({ checked }): string => checked ? `url("${checkImage}")` : 'none'};
  background-color: ${({ checked }): string => checked ? PRIMARY_COLOR : '#fafafc'};
  transition: border-color .15s ease-in-out, background-color .15s ease-in-out;
`;

export const Checkbox: React.FC<CheckboxProps> =
  ({ value, label, disabled, onChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      onChange && onChange(e.target.checked);
    };

    return <CheckboxLabel disabled={disabled}>
      <CheckboxInput type="checkbox" checked={value} onChange={handleChange} />
      <CheckboxBox checked={value} />
      <span>{ label }</span>
    </CheckboxLabel>;
  };
