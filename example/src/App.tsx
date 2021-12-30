import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { HotModuleReloadExampleScreen } from './screens/HotModuleReloadExampleScreen';
import { JestTestingScreenExample } from './screens/JestTestingScreenExample';
import { MediaQueriesExampleScreen } from './screens/MediaQueriesExampleScreen';
import { ReadmeExampleScreen } from './screens/ReadmeExampleScreen';
import { RemExampleScreen } from './screens/RemExampleScreen';
import { SimpleExampleScreen } from './screens/SimpleExampleScreen';
import { ThemingExampleScreen } from './screens/ThemingExampleScreen';

const Drawer = createDrawerNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="SimpleExampleScreen">
                <Drawer.Screen name="HotModuleReloadExampleScreen" component={HotModuleReloadExampleScreen} />
                <Drawer.Screen name="JestTestingScreenExample" component={JestTestingScreenExample} />
                <Drawer.Screen name="MediaQueriesExampleScreen" component={MediaQueriesExampleScreen} />
                <Drawer.Screen name="ReadmeExampleScreen" component={ReadmeExampleScreen} />
                <Drawer.Screen name="RemExampleScreen" component={RemExampleScreen} />
                <Drawer.Screen name="SimpleExampleScreen" component={SimpleExampleScreen} />
                <Drawer.Screen name="ThemingExampleScreen" component={ThemingExampleScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
