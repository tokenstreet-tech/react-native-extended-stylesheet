import React from 'react';
import renderer from 'react-test-renderer';

import { JestTestingScreenExample } from '../JestTestingScreenExample';

test('renders correctly', () => {
    const tree = renderer.create(<JestTestingScreenExample />).toJSON();
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
