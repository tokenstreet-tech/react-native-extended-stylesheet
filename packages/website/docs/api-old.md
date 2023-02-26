---
sidebar_position: 4
---

# EStyleSheet API (Old)

## .child()

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

## .subscribe()

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

## .unsubscribe()

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
