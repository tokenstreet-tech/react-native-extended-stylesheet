---
sidebar_position: 7
---

## FAQ

1. **I'm getting error: `"Unresolved variable: ..."`**
    - Ensure that you call `EStyleSheet.build()` in entry point of your app.
    - Ensure that `$variable` name without typos.
    - Ensure that you are not using `EStyleSheet.value()` before the styles are built. See [#50](https://github.com/vitalets/react-native-extended-stylesheet/issues/50) for details.
