import React, {FC} from 'react';

// Libs
import {SvgProps} from 'react-native-svg';

// Components
import Icon from '~/components/Icon';
import DotsPopover from '~/components/DotsPopover';

// Styles
import {
  Container,
  IconTouchableArea,
  Title,
  TitleContainer,
  LeftIconsContainer,
  RightIconsContainer,
  EmptyContainer,
} from './styles';
import {colors, metrics} from '~/styles';

// Navigation
import {goBack} from '~/routes/RootNavigation';

const Header: React.FC<{
  title: string;
  leftButton?: string | FC<SvgProps>;
  leftButtonColor?: string | undefined;
  leftButtonFunction?: () => void;
  leftButtonIconClass?: 'MaterialCommunityIcons' | 'Ionicons';
  rightButton?: string | undefined;
  rightButtonColor?: string | undefined;
  rightButtonFunction?: () => void;
  rightButtonIconClass?: 'MaterialCommunityIcons' | 'Ionicons';
  actions?: Array<{
    action: () => void;
    iconName: string;
    iconClass?: 'MaterialCommunityIcons' | 'Ionicons' | undefined;
    name: string;
  }>;
}> = ({
  title,
  leftButton = '',
  leftButtonColor,
  leftButtonFunction,
  leftButtonIconClass = 'Ionicons',
  rightButton = '',
  rightButtonColor,
  rightButtonFunction = () => {},
  rightButtonIconClass = 'Ionicons',
  actions = [],
}) => {
  const leftIconName = typeof leftButton === 'string' ? leftButton : undefined;
  const LeftSVGIcon = typeof leftButton === 'function' ? leftButton : undefined;

  const rightIconName =
    typeof rightButton === 'string' ? rightButton : undefined;
  const RightSVGIcon =
    typeof rightButton === 'function' ? rightButton : undefined;

  return (
    <Container>
      {leftButton !== undefined ? (
        <LeftIconsContainer>
          <IconTouchableArea
            paddingRight
            onPress={() => {
              if (leftButtonFunction) {
                leftButtonFunction();
              } else {
                goBack();
              }
            }}>
            <Icon
              name={leftIconName}
              SVG={LeftSVGIcon}
              size={metrics.baseIconsMedium}
              color={leftButtonColor || colors.primaryText}
              iconClass={leftButtonIconClass}
            />
          </IconTouchableArea>
        </LeftIconsContainer>
      ) : (
        <EmptyContainer />
      )}
      <TitleContainer>
        <Title numberOfLines={1}>{title}</Title>
      </TitleContainer>
      {((rightButton !== undefined && rightButton.length > 0) ||
        actions.length > 0) && (
        <RightIconsContainer>
          {rightButton !== undefined && rightButton.length > 0 && (
            <IconTouchableArea paddingLeft onPress={rightButtonFunction}>
              <Icon
                name={rightIconName}
                SVG={RightSVGIcon}
                size={metrics.baseIconsMedium}
                color={rightButtonColor || colors.primaryText}
                iconClass={rightButtonIconClass}
              />
            </IconTouchableArea>
          )}

          {actions.length > 0 && (
            <DotsPopover
              preferredPlacement="bottom"
              items={actions}
              background={colors.primary}
            />
          )}
        </RightIconsContainer>
      )}

      {(rightButton === undefined || rightButton.length <= 0) &&
        actions.length <= 0 && <EmptyContainer />}
    </Container>
  );
};

export default Header;
