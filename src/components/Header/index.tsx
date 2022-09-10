import React, { FC, useEffect, useMemo, useState } from "react";
import { Animated, Easing } from "react-native";

// Libs
import { SvgProps } from "react-native-svg";

// Components
import Icon from "~/components/Icon";
import DotsPopover from "~/components/DotsPopover";

// Styles
import {
  Container,
  IconTouchableArea,
  Title,
  TitleContainer,
  LeftIconsContainer,
  RightIconsContainer,
  EmptyContainer,
} from "./styles";
import { colors, metrics } from "~/styles";

// Navigation
import { goBack } from "~/routes/RootNavigation";

const Header: React.FC<{
  title: string;
  leftButton?: string | FC<SvgProps>;
  leftButtonColor?: string | undefined;
  leftButtonFunction?: () => void;
  leftButtonIconClass?: "MaterialCommunityIcons" | "Ionicons";
  rightButton?: string | undefined;
  rightButtonColor?: string | undefined;
  rightButtonFunction?: () => void;
  rightButtonIconClass?: "MaterialCommunityIcons" | "Ionicons";
  actions?: Array<{
    action: () => void;
    iconName: string;
    iconClass?: "MaterialCommunityIcons" | "Ionicons" | undefined;
    name: string;
  }>;
  enableSpinRightButton?: boolean;
}> = ({
  title,
  leftButton = "",
  leftButtonColor,
  leftButtonFunction,
  leftButtonIconClass = "MaterialCommunityIcons",
  rightButton = "",
  rightButtonColor,
  rightButtonFunction = () => {},
  rightButtonIconClass = "MaterialCommunityIcons",
  actions = [],
  enableSpinRightButton = false,
}) => {
  const leftIconName = typeof leftButton === "string" ? leftButton : undefined;
  const LeftSVGIcon = typeof leftButton === "function" ? leftButton : undefined;

  const rightIconName =
    typeof rightButton === "string" ? rightButton : undefined;
  const RightSVGIcon =
    typeof rightButton === "function" ? rightButton : undefined;

  const [spinValue, setSpinValue] = useState(new Animated.Value(0));

  useEffect(() => {
    const spinRightButton = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    );

    if (enableSpinRightButton) spinRightButton.start();
    else {
      spinRightButton.stop();
      setSpinValue(new Animated.Value(0));
    }
  }, [enableSpinRightButton]);

  const spin = useMemo(
    () =>
      spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
      }),
    [spinValue]
  );

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
            }}
          >
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
        <Title testID="title" numberOfLines={1}>
          {title}
        </Title>
      </TitleContainer>
      {((rightButton !== undefined && rightButton.length > 0) ||
        actions.length > 0) && (
        <RightIconsContainer>
          {rightButton !== undefined && rightButton.length > 0 && (
            <IconTouchableArea paddingLeft onPress={rightButtonFunction}>
              <Animated.View style={{ transform: [{ rotate: spin }] }}>
                <Icon
                  name={rightIconName}
                  SVG={RightSVGIcon}
                  size={metrics.baseIconsMedium}
                  color={rightButtonColor || colors.primaryText}
                  iconClass={rightButtonIconClass}
                />
              </Animated.View>
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
