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

const { Navigator, Screen } = createDrawerNavigator();

export const App = () => (
    <NavigationContainer>
        <Navigator initialRouteName="SimpleExampleScreen">
            <Screen name="HotModuleReloadExampleScreen" component={HotModuleReloadExampleScreen} />
            <Screen name="JestTestingScreenExample" component={JestTestingScreenExample} />
            <Screen name="MediaQueriesExampleScreen" component={MediaQueriesExampleScreen} />
            <Screen name="ReadmeExampleScreen" component={ReadmeExampleScreen} />
            <Screen name="RemExampleScreen" component={RemExampleScreen} />
            <Screen name="SimpleExampleScreen" component={SimpleExampleScreen} />
            <Screen name="ThemingExampleScreen" component={ThemingExampleScreen} />
        </Navigator>
    </NavigationContainer>
);
