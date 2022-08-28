import styled from 'styled-components/native';
import {colors, metrics} from '~/styles';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.white};
`;

export const SafeAreaHeader = styled.SafeAreaView``;

export const SafeAreaBody = styled.SafeAreaView`
  flex: 1;
`;

export const Scroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: metrics.basePadding,
    paddingTop: 20,
    paddingBottom: 60,
  },
})``;
