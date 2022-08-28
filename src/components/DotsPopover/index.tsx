import React, {FC, useMemo} from 'react';

// Libs
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import {SvgProps} from 'react-native-svg';

// Components
import Icon from '~/components/Icon';

// Styles
import {DotsContainer, RowPopover, TextPopover} from './styles';
import {colors, metrics} from '~/styles';

const {ContextMenu} = renderers;

interface IPopoverItem {
  name: string;
  iconName: string;
  iconClass?: 'MaterialCommunityIcons' | 'Ionicons' | undefined;
  action: () => any;
  SVG?: FC<SvgProps> | undefined;
}

interface IPopover {
  items: IPopoverItem[];
  preferredPlacement?: string;
  background?: string;
  color?: string;
  width?: number | undefined;
  button?: any | undefined;
}

const DotsPopover: React.FC<IPopover> = ({
  items,
  preferredPlacement = 'left',
  color = colors.primaryText,
  button,
  width = 160,
}) => {
  const triggerStyles = useMemo(
    () => ({
      triggerTouchable: {
        underlayColor: colors.transparent,
      },
    }),
    [],
  );

  const renderButton = () => {
    if (button) {
      return button;
    }

    return (
      <DotsContainer style={{backgroundColor: colors.transparent}}>
        <Icon name="ellipsis-vertical" size={25} color={color} />
      </DotsContainer>
    );
  };

  return (
    <Menu renderer={ContextMenu} rendererProps={{preferredPlacement}}>
      <MenuTrigger customStyles={triggerStyles}>{renderButton()}</MenuTrigger>
      <MenuOptions
        optionsContainerStyle={{
          borderRadius: metrics.baseRadiusLow,
          width,
        }}>
        {items.map((value, index) => (
          <MenuOption onSelect={value.action} key={index}>
            <RowPopover>
              <Icon
                name={value.iconName}
                size={metrics.baseIconsLow}
                color={colors.secondaryText}
                SVG={value.SVG}
                iconClass={value.iconClass}
              />
              <TextPopover>{value.name}</TextPopover>
            </RowPopover>
          </MenuOption>
        ))}
      </MenuOptions>
    </Menu>
  );
};

export default DotsPopover;
