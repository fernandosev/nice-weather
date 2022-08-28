import React from 'react';

import {render} from '@testing-library/react-native';

import Home from '~/screens/Home';

test('Check title of the screen', () => {
  const {getByText} = render(<Home />);

  const header = getByText('Nice Weather');

  expect(header).toBeTruthy();
});
