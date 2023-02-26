## Caveats

1. **Dynamic theme change is possible only with loosing components local state**
   When theme styles are re-calculated - all components should be re-rendered.
   Currently it can be done via re-mounting components tree, please see [#47].

    > Note: it is not issue if you are using state container like [Redux](https://github.com/reactjs/redux)
    > and can easily re-render app in the same state

2. **Dynamic orientation change is not supported**
   Please see [#9] for more details.
3. **Old RN versions (< 0.43) can crash the app with percent values**
   RN >= 0.43 supports percent values natively ([#32]) and EStyleSheet since 0.5.0 just proxy percent values to RN as is ([#77]) to keep things simple.
   Older RN versions (< 0.43) can't process percents and EStyleSheet process such values.
   So if you are using RN < 0.43, you should stick to EStyleSheet@0.4.0.
