import React, {FC} from 'react';
import {IoniconsStyle, MaterialCommunityIconsStyle} from './styles';
import {colors, metrics} from '~/styles';
import {SvgProps} from 'react-native-svg';

const Icon: React.FC<{
  iconClass?: 'Ionicons' | 'MaterialCommunityIcons' | undefined;
  name?: string | undefined;
  color?: string | undefined;
  size?: number | undefined;
  SVG?: FC<SvgProps>;
}> = ({
  iconClass = 'MaterialCommunityIcons',
  name = 'arrow-left',
  color = colors.secondary,
  size = metrics.baseIconsMedium,
  SVG = undefined,
}) => {
  IoniconsStyle.loadFont();
  MaterialCommunityIconsStyle.loadFont();

  if (SVG) {
    return <SVG width={size} height={size} />;
  } else if (name) {
    if (iconClass === 'Ionicons') {
      return <IoniconsStyle name={name} size={size} color={color} />;
    } else if (iconClass === 'MaterialCommunityIcons') {
      return (
        <MaterialCommunityIconsStyle name={name} size={size} color={color} />
      );
    }

    return <></>;
  }

  return <></>;
};

export default Icon;
