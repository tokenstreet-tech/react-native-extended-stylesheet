---
sidebar_position: 3
---

# Features

## Global variables

Global variables are passed to `EStyleSheet.build()` and available in all stylesheets.

```jsx
// app entry: set global variables and calc styles
EStyleSheet.build({
    $textColor: '#0275d8',
});

// component: use global variables
const styles = EStyleSheet.create({
    text: {
        color: '$textColor',
    },
});

// global variable as inline style or as props to components
<View
    style={{
        backgroundColor: EStyleSheet.value('$textColor'),
    }}
>
    ...
</View>;
```

## Local variables

Local variables can be defined directly in sylesheet and have priority over global variables.
To define local variable just start it with `$`:

```jsx
const styles = EStyleSheet.create({
    $textColor: '#0275d8',
    text: {
        color: '$textColor',
    },
    icon: {
        color: '$textColor',
    },
});
```

Local variables are also available in result style: `styles.$textColor`.

## Theming

Changing app theme contains two steps:

1. re-build app styles
2. re-render components tree with new styles

To re-build app styles you can call `EStyleSheet.build()` with new set of global variables:

```jsx
EStyleSheet.build({
    $theme: 'light', // required variable for caching!
    $bgColor: 'white',
});
```

> Please note that special variable **`$theme` is required** for proper caching of calculated styles.

Re-rendering whole component tree is currently a bit tricky in React.
One option is to wrap app into component and re-mount it on theme change:

```jsx
  toggleTheme() {
    const theme = EStyleSheet.value('$theme') === 'light' ? darkTheme : lightTheme;
    EStyleSheet.build(theme);
    this.setState({render: false}, () => this.setState({render: true}));
  }
  render() {
    return this.state.render ? <App/> : null;
  }
```

The caveat is that all components loss their state.
In the future it may be possible with `forceDeepUpdate()` method (see [facebook/react#7759](https://github.com/facebook/react/issues/7759)).
The approach is open for discusison, feel free to share your ideas in [#22](https://github.com/vitalets/react-native-extended-stylesheet/issues/22),
[#47](https://github.com/vitalets/react-native-extended-stylesheet/issues/47).

You can check out full theming code in [examples/theming](https://github.com/tokenstreet-tech/react-native-extended-stylesheet/tree/main/packages/example/src/screens/theming) or in [Expo snack](https://snack.expo.io/@vitalets/dynamic-themes-with-extended-stylesheets).

## Media queries

Media queries allows to have different styles for different screens, platform, direction and orientation.
They are supported as properties with `@media` prefix (thanks for idea to [@grabbou](https://github.com/grabbou),
[#5](https://github.com/vitalets/react-native-extended-stylesheet/issues/5)).

Media queries can operate with the following values:

-   media type: `ios|android`
-   `width`, `min-width`, `max-width`
-   `height`, `min-height`, `max-height`
-   `orientation` (`landscape|portrait`)
-   `aspect-ratio`
-   `direction` (`ltr|rtl`)

You can use media queries on:

-   global level
-   sheet level
-   style level

Examples:

```jsx
// global level
EStyleSheet.build({
    '@media ios': {
        $fontSize: 12,
    },
    '@media android': {
        $fontSize: 16,
    },
});

// sheet level
const styles = EStyleSheet.create({
    column: {
        width: '80%',
    },
    '@media (min-width: 350) and (max-width: 500)': {
        column: {
            width: '90%',
        },
    },
});

// style level
const styles = EStyleSheet.create({
    header: {
        '@media ios': {
            color: 'green',
        },
        '@media android': {
            color: 'blue',
        },
    },
});
```

You can check out full example code in [examples/media-queries](https://github.com/tokenstreet-tech/react-native-extended-stylesheet/blob/main/packages/example/src/screens/MediaQueriesScreen.tsx) or in [Expo snack](https://snack.expo.io/@gbhasha/media-queries-using-extended-stylesheets).

## Math operations

Any value can contain **one** of following math operations: `*`, `/`, `+`, `-`. Operands can be numbers, variables and percents.
For example, to render circle you may create style:

```jsx
const styles = EStyleSheet.create({
    $size: 20,
    circle: {
        width: '$size',
        height: '$size',
        borderRadius: '0.5 * $size',
    },
});
```

## REM units

Similar to [CSS3 rem unit](http://snook.ca/archives/html_and_css/font-size-with-rem) it allows to define any integer value as relative to the root element. In our case root value is special `rem` global variable that can be set in `EStyleSheet.build()`. It makes easy to scale app depending on screen size and other conditions. Default rem is `16`.

```jsx
// component
const styles = EStyleSheet.create({
    text: {
        fontSize: '1.5rem',
        marginHorizontal: '2rem',
    },
});
// app entry
let { height, width } = Dimensions.get('window');
EStyleSheet.build({
    $rem: width > 340 ? 18 : 16,
});
```

You can check out full example code in [examples/rem](https://github.com/tokenstreet-tech/react-native-extended-stylesheet/blob/main/packages/example/src/screens/RemScreen.tsx) or in [Expo snack](https://snack.expo.io/@gbhasha/using-rem-units-with-extended-stylesheet).

## Percents

Percent values are supported natively since React Native 0.43.
EStyleSheet passes them through to original StyleSheet except cases, when you use calculations with percents,
e.g. `"100% - 20"`. Percents are calculated relative to **screen width/height** on application launch.

```jsx
const styles = EStyleSheet.create({
    column: {
        width: '100% - 20',
    },
});
```

**Percents in nested components**
If you need sub-component with percent operations relative to parent component - you can achieve that with variables.
For example, to render 2 sub-columns with 30%/70% width of parent column:

```jsx
render() {
  return (
    <View style={styles.column}>
      <View style={styles.subColumnLeft}></View>
      <View style={styles.subColumnRight}></View>
    </View>
  );
}

...

const styles = EStyleSheet.create({
  $columnWidth: '80%',
  column: {
    width: '$columnWidth',
    flexDirection: 'row'
  },
  subColumnLeft: {
    width: '0.3 * $columnWidth'
  },
  subColumnRight: {
    width: '0.7 * $columnWidth'
  }
});
```

## Scaling

You can apply scale to components by setting special `$scale` variable.

```jsx
const styles = EStyleSheet.create({
    $scale: 1.5,
    button: {
        width: 100,
        height: 20,
        marginLeft: 10,
    },
});
```

This helps to create reusable components that could be scaled depending on prop:

```jsx
class Button extends React.Component {
    static propTypes = {
        scale: React.PropTypes.number,
    };
    render() {
        let style = getStyle(this.props.scale);
        return <View style={style.button}></View>;
    }
}

let getStyle = function (scale = 1) {
    return EStyleSheet.create({
        $scale: scale,
        button: {
            width: 100,
            height: 20,
            marginLeft: 10,
        },
    });
};
```

To cache calculated styles please have a look on [caching](#caching) section.

## Underscored styles

Original react-native stylesheets are calculated to integer numbers and original values are unavailable.
But sometimes they are needed. Let's take an example:
You want to render text and icon with the same size and color.
You can take this [awesome icon library](https://github.com/oblador/react-native-vector-icons)
and see that `<Icon>` component has `size` and `color` props.
It would be convenient to define style for text and keep icon's size/color in sync.

```jsx
const styles = EStyleSheet.create({
    text: {
        fontSize: '1rem',
        color: 'gray',
    },
});
```

In runtime `styles` created with original react's `StyleSheet` will look like:

```jsx
styles = {
    text: 0,
};
```

But extended stylesheet saves calculated values under `_text` property:

```jsx
styles = {
    text: 0,
    _text: {
        fontSize: 16,
        color: 'gray',
    },
};
```

To render icon we just take styles from `_text`:

```jsx
return (
    <View>
        <Icon name="rocket" size={styles._text.fontSize} color={styles._text.color} />
        <Text style={styles.text}>Hello</Text>
    </View>
);
```

## Pseudo classes (:nth-child)

Extended stylesheet supports 4 pseudo classes: `:first-child`, `:nth-child-even`, `:nth-child-odd`, `:last-child`. As well as in traditional CSS it allows to apply special styling for first/last items or render stripped rows.
To get style for appropriate index you should use `EStyleSheet.child()` method.
It's signature: `EStyleSheet.child(stylesObj, styleName, index, count)`.

```jsx
const styles = EStyleSheet.create({
  row: {
    fontSize: '1.5rem',
    borderTopWidth: 1
  },
  'row:nth-child-even': {
    backgroundColor: 'gray' // make stripped
  },
  'row:last-child': {
    borderBottomWidth: 1 // render bottom edge for last row
  }
});
...
render() {
  return (
    <View>
      {items.map((item, index) => {
        return (
          <View key={index} style={EStyleSheet.child(styles, 'row', index, items.length)}></View>
        );
      })}
    </View>
  );
}
```

## Value as a function

For the deepest customization you can specify any value as a function that will be executed on EStyleSheet build.
For example, you may _darken_ or _lighten_ color of variable via [npm color package](https://www.npmjs.com/package/color):

```jsx
import Color from 'color';
import { EStyleSheet } from '@tokenstreet/react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  button: {
    backgroundColor: () => Color('green').darken(0.1).hexString() // <-- value as a function
  }
});

render() {
  return (
    <TouchableHighlight style={styles.button}>
      ...
    </TouchableHighlight>
  );
}
```

The common pattern is to use [EStyleSheet.value()](#value) inside the function to get access to global variables:

```jsx
EStyleSheet.build({
    $prmaryColor: 'green',
});

const styles = EStyleSheet.create({
    button: {
        backgroundColor: () => Color(EStyleSheet.value('$prmaryColor')).darken(0.1).hexString(),
    },
});
```

## Caching

If you use dynamic styles depending on runtime prop or you are making reusable component with dynamic styling
you may need stylesheet creation in every `render()` call. Let's take example from [scaling](#scaling) section:

```jsx
class Button extends React.Component {
    static propTypes = {
        scale: React.PropTypes.number,
    };
    render() {
        let style = getStyle(this.props.scale);
        return <View style={style.button}></View>;
    }
}

let getStyle = function (scale = 1) {
    return EStyleSheet.create({
        $scale: scale,
        button: {
            width: 100,
            height: 20,
            marginLeft: 10,
        },
    });
};
```

To avoid creating styles on every render you can use [lodash.memoize](https://www.npmjs.com/package/lodash.memoize):
store result for particular parameters and returns it from cache when called with the same parameters.
Updated example:

```jsx
import memoize from 'lodash.memoize';

let getStyle = memoize(function (scale = 1) {
    return EStyleSheet.create({
        $scale: scale,
        button: {
            width: 100,
            height: 20,
            marginLeft: 10,
        },
    });
});
```

Now if you call `getStyle(1.5)` 3 times actually style will be created on the first call
and two other calls will get it from cache.

## Outline for debug

It is possible to outline all components that are using EStyleSheet. For that set global `$outline` variable:

```jsx
EStyleSheet.build({ $outline: 1 });
```

> Note that components without styles will not be outlined,
> because RN [does not support](https://github.com/facebook/react-native/issues/1768) default component styling yet.

To outline particular component set local `$outline` variable:

```jsx
const styles = EStyleSheet.create({
  $outline: 1,
  column: {
    width: '80%',
    flexDirection: 'row'
  },
  ...
});
```

## Hot module reload

[Hot module reload (HMR)](https://facebook.github.io/react-native/blog/2016/03/24/introducing-hot-reloading.html)
allows you to change code and see live updates without loosing app state. It is very handy for tuning styles.
EStyleSheet supports HMR with the following options:

1.  When you change style of component - the component is updated by HMR automatically without any effort from your side.
2.  When you change global variable or theme - you should use [HMR API](https://facebook.github.io/react-native/releases/next/#hmr-api)
    to force style re-calculation:

    ````js
    // app.js
    EStyleSheet.build({
    $fontColor: 'black'
    });
        ...

        module.hot.accept(() => {
          EStyleSheet.clearCache();
          EStyleSheet.build(); // force style re-calculation
        });
        ```
    See full example of HMR [here](examples/hmr).

    ````
