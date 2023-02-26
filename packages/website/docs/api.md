---
sidebar_position: 5
---

## EStyleSheet API

### .create()

```jsx
/**
 * Creates extended stylesheet object
 *
 * @param {Object} source style
 * @returns {Object} extended stylesheet object
 */
 create (source) {...}
```

### .build()

```jsx
/**
 * Calculates all stylesheets
 *
 * @param {Object} [globalVars] global variables for all stylesheets
 */
 build (globalVars) {...}
```

### .value()

```jsx
/**
 * Calculates particular expression.
 *
 * @param {*} value
 * @param {String} [prop] property for which value is calculated. For example, to calculate percent values
 * the function should know is it 'width' or 'height' to use proper reference value.
 * @returns {*} calculated result
 */
 value (value, prop) {...}
```

**Please note** that in most cases `EStyleSheet.value()` should be used inside function, not directly:

```jsx
const styles = EStyleSheet.create({
    button1: {
        width: () => EStyleSheet.value('$contentWidth') + 10, // <-- Correct!
    },
    button2: {
        width: EStyleSheet.value('$contentWidth') + 10, // <-- Incorrect. Because EStyleSheet.build() may occur later and $contentWidth will be undefined at this moment.
    },
});
```

### .child()

```jsx
/**
 * Returns styles with pseudo classes :first-child, :nth-child-even, :last-child according to index and count
 *
 * @param {Object} stylesheet
 * @param {String} styleName
 * @param {Number} index index of item for style
 * @param {Number} count total count of items
 * @returns {Object|Array} styles
 */
 child (styles, styleName, index, count) {...}
```

### .subscribe()

```jsx
/**
 * Subscribe to event. Currently only 'build' event is supported.
 *
 * @param {String} event
 * @param {Function} listener
 */
 subscribe (event, listener) {...}

```

This method is useful when you want to pre-render some component on init.
As extended style is calculated after call of `EStyleSheet.build()`,
it is not available instantly after creation so you should wrap pre-render
info listener to `build` event:

```jsx
const styles = EStyleSheet.create({
    button: {
        width: '80%',
    },
});

// this will NOT work as styles.button is not calculated yet
let Button = <View style={styles.button}></View>;

// but this will work
let Button;
EStyleSheet.subscribe('build', () => {
    Button = <View style={styles.button}></View>;
});
```

### .unsubscribe()

```jsx
/**
 * Unsubscribe from event. Currently only 'build' event is supported.
 *
 * @param {String} event
 * @param {Function} listener
 */
 unsubscribe (event, listener) {...}

```

Unsubscribe from event.
