import React from 'react';
import { SafeAreaView } from 'react-native';

/* eslint-disable @typescript-eslint/no-unused-vars */
import { HotModuleReloadScreen } from './screens/HotModuleReloadScreen';
import { JestTestingScreen } from './screens/JestTestingScreen';
import { MediaQueriesScreen } from './screens/MediaQueriesScreen';
import { ReadmeScreen } from './screens/ReadmeScreen';
import { RemScreen } from './screens/RemScreen';
import { SimpleScreen } from './screens/SimpleScreen';
import { ThemingScreen } from './screens/theming/ThemingScreen';
/* eslint-enable @typescript-eslint/no-unused-vars */

/**
 * The screens must be rendered individually,
 * because each screen calls EStyleSheet.build() with the respective global variables.
 * Otherwise, the screens would interfere with each other.
 * @constructor
 */
export const App = () => (
    <SafeAreaView>
        {/* <HotModuleReloadScreen />*/}
        {/* <JestTestingScreen />*/}
        {/* <MediaQueriesScreen />*/}
        {/* <ReadmeScreen />*/}
        {/* <RemScreen />*/}
        <SimpleScreen />
        {/* <ThemingScreen />*/}
    </SafeAreaView>
);
