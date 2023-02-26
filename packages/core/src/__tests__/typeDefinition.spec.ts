/**
 * Type definition tests
 */
import { StyleSheet } from 'react-native';

import { EStyleSheet } from '../';

describe('typeDefinition', () => {
    // eslint-disable-next-line jest/expect-expect
    it('should not throw an error', () => {
        const eStyles = EStyleSheet.create({
            $var: 10,
            button1: {
                width: () => '100%',
                '@media (min-width: 350)': {
                    width: '$var',
                },
            },
            button2: {
                color: 'blue',
                borderBottomWidth: EStyleSheet.hairlineWidth,
            },
            '@media ios': {
                button2: {
                    width: '100%',
                },
            },
            root: {
                // @ts-expect-error The next line should be false to test the type safety for negative-examples
                includeFontPadding: 5,
                // @ts-expect-error The next line should be false to test the type safety for negative-examples
                textAlignVertical: false,
            },
        });

        const styles = StyleSheet.create({
            button1: {
                ...EStyleSheet.absoluteFillObject,
                color: 'red',
            },
            button2: {
                color: 'blue',
                borderBottomWidth: EStyleSheet.hairlineWidth,
            },
        });

        EStyleSheet.build();
        EStyleSheet.build({ $var: 'foo' });
        EStyleSheet.value('100%');
        EStyleSheet.value('100%', 'width');
        EStyleSheet.subscribe('build', () => {});
        EStyleSheet.clearCache();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const x = EStyleSheet.absoluteFill;
        EStyleSheet.flatten([eStyles.button1, eStyles.button2]);
        // StyleSheet.flatten(styles.button1)
        EStyleSheet.flatten([styles.button1, styles.button2]);
        // EStyleSheet.setStyleAttributePreprocessor('color', () => 'red');
    });
});
