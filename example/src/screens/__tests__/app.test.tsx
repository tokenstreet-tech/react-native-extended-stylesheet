import React from 'react';
import renderer from 'react-test-renderer';

import { JestTestingScreen } from '../JestTestingScreen';

test('renders correctly', () => {
    const tree = renderer.create(<JestTestingScreen />).toJSON();
    expect(tree).toMatchSnapshot();
});

/*
 * // Instead of creating __mocks__ you can build style for particular test in beforeAll hook:
 * import EStyleSheet from '@tokenstreet/react-native-extended-stylesheet';
 *
 * beforeAll(() => {
 *     EStyleSheet.build({
 *         $fontColor: '#F5FCFF',
 *     });
 * });
 */
