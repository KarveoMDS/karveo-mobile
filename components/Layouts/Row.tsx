import * as React from 'react';
import styled from 'styled-components';

import {View} from 'react-native';

const RowComponent = styled(View)<{
  justifyContent?: string;
  alignItems?: string;
  mr?: number;
  wrap?: boolean;
  mb?: number;
  mt?: number;
  ml?: number;
  flex?: number;
}>`
  ${props => (props.flex ? `flex: ${props.flex};` : '')}
  flex-direction: row;
  align-self: stretch;
  align-items: ${props => props.alignItems || 'flex-start'};
  justify-content: ${props => props.justifyContent || 'flex-start'};
  margin-right: ${props => props.mr || 0}px;
  margin-left: ${props => props.ml || 0}px;
  margin-top: ${props => props.mt || 0}px;
  margin-bottom: ${props => props.mb || 0}px;
  flex-wrap: ${props => (props.wrap ? 'wrap' : 'nowrap')};
`;

interface IProps {
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
  mr?: number;
  ml?: number;
  mt?: number;
  mb?: number;
  wrap?: boolean;
  children: React.ReactNode;
  style?: any;
  flex?: number;
  gap?: number;
}

export const Row = (props: IProps) => {
  const {children, ...styleProps} = props;

  return <RowComponent {...styleProps}>{children}</RowComponent>;
};
