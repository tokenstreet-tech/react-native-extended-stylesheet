import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { HotModuleReloadScreen } from './screens/HotModuleReloadScreen';
import { JestTestingScreen } from './screens/JestTestingScreen';
import { MediaQueriesScreen } from './screens/MediaQueriesScreen';
import { ReadmeScreen } from './screens/ReadmeScreen';
import { RemScreen } from './screens/RemScreen';
import { SimpleScreen } from './screens/SimpleScreen';
import { ThemingScreen } from './screens/ThemingScreen';

const { Navigator, Screen } = createDrawerNavigator();

export const App = () => (
    <NavigationContainer>
        <Navigator initialRouteName="SimpleExampleScreen">
            <Screen name="HotModuleReloadScreen" component={HotModuleReloadScreen} />
            <Screen name="JestTestingScreen" component={JestTestingScreen} />
            <Screen name="MediaQueriesScreen" component={MediaQueriesScreen} />
            <Screen name="ReadmeScreen" component={ReadmeScreen} />
            <Screen name="RemScreen" component={RemScreen} />
            <Screen name="SimpleScreen" component={SimpleScreen} />
            <Screen name="ThemingScreen" component={ThemingScreen} />
        </Navigator>
    </NavigationContainer>
);
