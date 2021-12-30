import EStyleSheet from '@tokenstreet/react-native-extended-stylesheet';
import React, { useCallback, useState } from 'react';
import { Button, Text, View } from 'react-native';

const lightTheme = {
    $theme: 'light',
    $textColor: 'black',
    $bgColor: 'white',
};

const darkTheme = {
    $theme: 'dark',
    $textColor: 'white',
    $bgColor: 'black',
};

EStyleSheet.build(lightTheme);

export const ThemingExampleScreen: React.FC = () => {
    const [shouldRender, setShouldRender] = useState<boolean>(true);

    const toggleTheme = useCallback(() => {
        const theme = EStyleSheet.value('$theme') === 'light' ? darkTheme : lightTheme;
        EStyleSheet.build(theme);
        // SetState() called twice to re-render whole component tree
        setShouldRender(false);
        setShouldRender(true);
    }, []);

    if (shouldRender) {
        const buttonTitle = EStyleSheet.value('$theme') === 'light' ? 'Set dark theme' : 'Set light theme';
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.text}>Welcome to Extended StyleSheet!</Text>
                </View>
                <Button title={buttonTitle} onPress={toggleTheme} />
            </View>
        );
    }
    return null; // Returning null is important to re-render component tree
};

const styles = EStyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '$bgColor',
    },
    text: {
        color: '$textColor',
    },
});
