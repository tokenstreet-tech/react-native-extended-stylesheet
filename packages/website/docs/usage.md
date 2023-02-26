---
sidebar_position: 3
---

## Usage

1. Define styles using `EStyleSheet.create()` instead of `StyleSheet.create()`:

```jsx
/* component.js */
import EStyleSheet from '@tokenstreet/react-native-extended-stylesheet';

// define extended styles
const styles = EStyleSheet.create({
    column: {
        width: '80%', // 80% of screen width
    },
    text: {
        color: '$textColor', // global variable $textColor
        fontSize: '1.5rem', // relative REM unit
    },
    '@media (min-width: 350) and (max-width: 500)': {
        // media queries
        text: {
            fontSize: '2rem',
        },
    },
});

// use styles as usual
class MyComponent extends React.Component {
    render() {
        return (
            <View style={styles.column}>
                <Text style={styles.text}>Hello</Text>
            </View>
        );
    }
}
```

2. In app entry point call `EStyleSheet.build()` to actually calculate styles:

```jsx
/* app.js */
import EStyleSheet from '@tokenstreet/react-native-extended-stylesheet';

EStyleSheet.build({
    // always call EStyleSheet.build() even if you don't use global variables!
    $textColor: '#0275d8',
});
```
