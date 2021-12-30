import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

/*
 * 1. Run app
 * 2. Enable hot module reload
 * 3. Click a few times on "Click me" button to set component state
 * 4. Change $fontColor value below
 * 5. Watch that font color is changed and component state is saved
 */

EStyleSheet.build({
    $fontColor: 'black', // Change this to another color
});

export const HotModuleReloadExampleScreen: React.FC = () => {
    const [count, setCount] = useState(0);

    return (
        <View style={styles.column}>
            <Text style={styles.header}>You clicked: {count}</Text>
            <Button onPress={() => setCount((prevCount) => prevCount + 1)} title="Click me!" />
        </View>
    );
};

const styles = EStyleSheet.create({
    column: {
        width: '80%',
        marginHorizontal: '10%',
        marginTop: '10%',
        backgroundColor: '#e6e6e6',
        alignItems: 'center',
        padding: '0.5rem',
    },
    header: {
        fontSize: '1rem',
        color: '$fontColor',
    },
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
module.hot.accept(() => {
    EStyleSheet.clearCache();
    EStyleSheet.build();
});
