import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';

import { SimpleExampleScreen } from './screens/SimpleExampleScreen';

const Drawer = createDrawerNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="SimpleExampleScreen" component={SimpleExampleScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
