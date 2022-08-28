import styled from 'styled-components/native';
import {colors, metrics} from '~/styles';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 50px;
`;

export const TitleContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-weight: bold;
  color: ${colors.primaryText};
`;

export const IconTouchableArea = styled.TouchableOpacity<{
  paddingLeft?: boolean;
  paddingRight?: boolean;
}>`
  border-radius: ${metrics.baseRadiusHigh}px;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 70px;
  padding-left: ${props => (props.paddingLeft ? 10 : 0)}px;
  padding-right: ${props => (props.paddingRight ? 10 : 0)}px;
`;

export const LeftIconsContainer = styled.View`
  width: 70px;
  align-items: flex-start;
`;

export const RightIconsContainer = styled.View`
  width: 70px;
  flex-direction: row;
  justify-content: flex-end;
`;

export const EmptyContainer = styled.View`
  width: 70px;
`;
