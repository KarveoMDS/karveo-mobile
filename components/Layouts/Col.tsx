import * as React from 'react';
import styled from 'styled-components';
import {View} from 'react-native';

const ColComponent = styled(View)<{
  justifyContent?: string;
  alignItems?: string;
  mr?: number;
  ml?: number;
  mt?: number;
  mb?: number;
  wrap?: boolean;
  flex?: number;
  gap?: number;
}>`
  flex: ${props => props.flex || 'none'};
  flex-direction: column;
  align-self: stretch;
  align-items: ${props => props.alignItems || 'flex-start'};
  justify-content: ${props => props.justifyContent || 'flex-start'};
  margin-right: ${props => props.mr || 0}px;
  margin-left: ${props => props.ml || 0}px;
  margin-top: ${props => props.mt || 0}px;
  margin-bottom: ${props => props.mb || 0}px;
  flex-wrap: ${props => (props.wrap ? 'wrap' : 'nowrap')};
  gap: ${props => props.gap || 0}px;
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

export const Col = ({children, ...styleProps}: IProps) => {
  return <ColComponent {...styleProps}>{children}</ColComponent>;
};
