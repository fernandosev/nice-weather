import styled from 'styled-components/native';
import {colors} from '~/styles';

export const DotsContainer = styled.View`
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
`;

export const RowPopover = styled.View`
  padding: 5px;
  flex-direction: row;
  align-items: center;
`;

export const TextPopover = styled.Text`
  color: ${colors.secondaryText};
  margin-left: 10px;
`;
