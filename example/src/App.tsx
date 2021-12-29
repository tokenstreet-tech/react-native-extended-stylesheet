import EStyleSheet from '@tokenstreet/react-native-extended-stylesheet';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
    React.useEffect(() => {
        EStyleSheet.build();
    }, []);

    return (
        <View style={styles.container}>
            <Text>Text</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        width: 60,
        height: 60,
        marginVertical: 20,
    },
});
