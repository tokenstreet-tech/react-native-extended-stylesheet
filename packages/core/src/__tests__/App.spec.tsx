import { EStyleSheet } from '@tokenstreet/react-native-extended-stylesheet';
import React, { useMemo } from 'react';
import { Platform, Text, View } from 'react-native';
import renderer from 'react-test-renderer';

it('should render correctly', () => {
    // Arrange
    EStyleSheet.build({
        $fontColor: '#F5FCFF',
    });

    const styles = EStyleSheet.create({
        // <-- use EStyleSheet instead of StyleSheet
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '$fontColor', // <-- EStyleSheet variable
        },
        welcome: {
            fontSize: '1rem',
            textAlign: 'center',
            margin: 10,
        },
        instructions: {
            textAlign: 'center',
            color: '#333333',
            marginBottom: 5,
        },
    });

    const JestTestingScreen: React.FC = () => {
        const instructions = useMemo(
            () =>
                Platform.select({
                    ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
                    android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
                }),
            []
        );

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.instructions}>To get started, edit App.js</Text>
                <Text style={styles.instructions}>{instructions}</Text>
            </View>
        );
    };

    // Act
    const tree = renderer.create(<JestTestingScreen />).toJSON();

    // Assert
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
