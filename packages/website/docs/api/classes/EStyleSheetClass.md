---
id: 'EStyleSheetClass'
title: 'Class: EStyleSheetClass'
sidebar_label: 'EStyleSheetClass'
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new EStyleSheetClass**()

Constructor

#### Defined in

[packages/core/src/api.ts:38](https://github.com/tokenstreet-tech/react-native-extended-stylesheet/blob/28e65ee/packages/core/src/api.ts#L38)

## Properties

### absoluteFill

• **absoluteFill**: `RegisteredStyle`<`AbsoluteFillStyle`\> = `StyleSheet.absoluteFill`

#### Defined in

[packages/core/src/api.ts:27](https://github.com/tokenstreet-tech/react-native-extended-stylesheet/blob/28e65ee/packages/core/src/api.ts#L27)

---

### absoluteFillObject

• **absoluteFillObject**: `AbsoluteFillStyle` = `StyleSheet.absoluteFillObject`

#### Defined in

[packages/core/src/api.ts:26](https://github.com/tokenstreet-tech/react-native-extended-stylesheet/blob/28e65ee/packages/core/src/api.ts#L26)

---

### child

• **child**: <T\>(`styles`: `T`, `styleName`: `string`, `index`: `number`, `count`: `number`) => `AnyStyle`

#### Type declaration

▸ <`T`\>(`styles`, `styleName`, `index`, `count`): `AnyStyle`

Returns styles with pseudo classes :first-child, :nth-child-even, :last-child according to index and count

##### Type parameters

| Name | Type               |
| :--- | :----------------- |
| `T`  | `StyleSet`<`any`\> |

##### Parameters

| Name        | Type     | Description             |
| :---------- | :------- | :---------------------- |
| `styles`    | `T`      |                         |
| `styleName` | `string` |                         |
| `index`     | `number` | Index of item for style |
| `count`     | `number` | Total count of items    |

##### Returns

`AnyStyle`

styles

#### Defined in

[packages/core/src/api.ts:29](https://github.com/tokenstreet-tech/react-native-extended-stylesheet/blob/28e65ee/packages/core/src/api.ts#L29)

---

### compose

• **compose**: <T, U, V\>(`style1`: `StyleProp`<`U`\> \| `StyleProp`<`U`\>[], `style2`: `StyleProp`<`V`\> \| `StyleProp`<`V`\>[]) => `StyleProp`<`T`\> = `StyleSheet.compose`

#### Type declaration

▸ <`T`, `U`, `V`\>(`style1`, `style2`): `StyleProp`<`T`\>

Combines two styles such that style2 will override any styles in style1.
If either style is falsy, the other one is returned without allocating
an array, saving allocations and maintaining reference equality for
PureComponent checks.

##### Type parameters

| Name | Type                                               |
| :--- | :------------------------------------------------- |
| `T`  | extends `ImageStyle` \| `TextStyle` \| `ViewStyle` |
| `U`  | extends `ImageStyle` \| `TextStyle` \| `ViewStyle` |
| `V`  | extends `ImageStyle` \| `TextStyle` \| `ViewStyle` |

##### Parameters

| Name     | Type                                     |
| :------- | :--------------------------------------- |
| `style1` | `StyleProp`<`U`\> \| `StyleProp`<`U`\>[] |
| `style2` | `StyleProp`<`V`\> \| `StyleProp`<`V`\>[] |

##### Returns

`StyleProp`<`T`\>

#### Defined in

[packages/core/src/api.ts:23](https://github.com/tokenstreet-tech/react-native-extended-stylesheet/blob/28e65ee/packages/core/src/api.ts#L23)

---

### flatten

• **flatten**: <T\>(`style?`: `StyleProp`<`T`\>) => `T` extends infer U[] ? `U` : `T` = `StyleSheet.flatten`

#### Type declaration

▸ <`T`\>(`style?`): `T` extends infer U[] ? `U` : `T`

Flattens an array of style objects, into one aggregated style object.
Alternatively, this method can be used to lookup IDs, returned by
StyleSheet.register.

> **NOTE**: Exercise caution as abusing this can tax you in terms of
> optimizations.
>
> IDs enable optimizations through the bridge and memory in general. Referring
> to style objects directly will deprive you of these optimizations.

Example:

```
const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    fontSize: 16,
    color: 'white'
  },
  selectedListItem: {
    color: 'green'
  }
});

StyleSheet.flatten([styles.listItem, styles.selectedListItem])
// returns { flex: 1, fontSize: 16, color: 'green' }
```

Alternative use:

```
StyleSheet.flatten(styles.listItem);
// return { flex: 1, fontSize: 16, color: 'white' }
// Simply styles.listItem would return its ID (number)
```

This method internally uses `StyleSheetRegistry.getStyleByID(style)`
to resolve style objects represented by IDs. Thus, an array of style
objects (instances of StyleSheet.create), are individually resolved to,
their respective objects, merged as one and then returned. This also explains
the alternative use.

##### Type parameters

| Name |
| :--- |
| `T`  |

##### Parameters

| Name     | Type              |
| :------- | :---------------- |
| `style?` | `StyleProp`<`T`\> |

##### Returns

`T` extends infer U[] ? `U` : `T`

#### Defined in

[packages/core/src/api.ts:22](https://github.com/tokenstreet-tech/react-native-extended-stylesheet/blob/28e65ee/packages/core/src/api.ts#L22)

---

### hairlineWidth

• **hairlineWidth**: `number` = `StyleSheet.hairlineWidth`

#### Defined in

[packages/core/src/api.ts:25](https://github.com/tokenstreet-tech/react-native-extended-stylesheet/blob/28e65ee/packages/core/src/api.ts#L25)

---

### setStyleAttributePreprocessor

• **setStyleAttributePreprocessor**: (`property`: `string`, `process`: (`nextProp`: `any`) => `any`) => `void` = `StyleSheet.setStyleAttributePreprocessor`

#### Type declaration

▸ (`property`, `process`): `void`

WARNING: EXPERIMENTAL. Breaking changes will probably happen a lot and will
not be reliably announced. The whole thing might be deleted, who knows? Use
at your own risk.

Sets a function to use to pre-process a style property value. This is used
internally to process color and transform values. You should not use this
unless you really know what you are doing and have exhausted other options.

##### Parameters

| Name       | Type                         |
| :--------- | :--------------------------- |
| `property` | `string`                     |
| `process`  | (`nextProp`: `any`) => `any` |

##### Returns

`void`

#### Defined in

[packages/core/src/api.ts:24](https://github.com/tokenstreet-tech/react-native-extended-stylesheet/blob/28e65ee/packages/core/src/api.ts#L24)

## Methods

### build

▸ **build**<`TGlobalVariablesObject`\>(`globalVars?`): `void`

Calculates all stylesheets

#### Type parameters

| Name                     |
| :----------------------- |
| `TGlobalVariablesObject` |

#### Parameters

| Name          | Type                                          | Description                          |
| :------------ | :-------------------------------------------- | :----------------------------------- |
| `globalVars?` | `TGlobalVariables`<`TGlobalVariablesObject`\> | Global variables for all stylesheets |

#### Returns

`void`

#### Defined in

[packages/core/src/api.ts:74](https://github.com/tokenstreet-tech/react-native-extended-stylesheet/blob/28e65ee/packages/core/src/api.ts#L74)

---

### clearCache

▸ **clearCache**(): `void`

Clears all cached styles.

#### Returns

`void`

#### Defined in

[packages/core/src/api.ts:158](https://github.com/tokenstreet-tech/react-native-extended-stylesheet/blob/28e65ee/packages/core/src/api.ts#L158)

---

### create

▸ **create**<`T`\>(`source`): `TNamedStyles`<`T`\>

Creates extended stylesheet object that will be calculated after build

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name     | Type                         | Description  |
| :------- | :--------------------------- | :----------- |
| `source` | `TExtendedNamedStyles`<`T`\> | Source style |

#### Returns

`TNamedStyles`<`T`\>

Extended stylesheet object

#### Defined in

[packages/core/src/api.ts:60](https://github.com/tokenstreet-tech/react-native-extended-stylesheet/blob/28e65ee/packages/core/src/api.ts#L60)

---

### subscribe

▸ **subscribe**(`event`, `listener`): `void`

Subscribe to event. Currently, only 'build' event is supported.

#### Parameters

| Name       | Type        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :--------- | :---------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `event`    | `string`    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `listener` | `TListener` | This method is useful when you want to pre-render some component on init. As extended style is calculated after call of `EStyleSheet.build()`, it is not available instantly after creation so you should wrap pre-render info listener to `build` event: `jsx const styles = EStyleSheet.create({ button: { width: '80%', }, }); // this will NOT work as styles.button is not calculated yet let Button = <View style={styles.button}></View>; // but this will work let Button; EStyleSheet.subscribe('build', () => { Button = <View style={styles.button}></View>; }); ` |

#### Returns

`void`

#### Defined in

[packages/core/src/api.ts:132](https://github.com/tokenstreet-tech/react-native-extended-stylesheet/blob/28e65ee/packages/core/src/api.ts#L132)

---

### unsubscribe

▸ **unsubscribe**(`event`, `listener`): `void`

Unsubscribe from event. Currently, only 'build' event is supported.

#### Parameters

| Name       | Type        |
| :--------- | :---------- |
| `event`    | `string`    |
| `listener` | `TListener` |

#### Returns

`void`

#### Defined in

[packages/core/src/api.ts:146](https://github.com/tokenstreet-tech/react-native-extended-stylesheet/blob/28e65ee/packages/core/src/api.ts#L146)

---

### value

▸ **value**(`expr`, `prop?`): `any`

Calculates particular expression. For some values you need to pass prop (e.g. percent)

#### Parameters

| Name    | Type                      | Description                                                                                                                                                        |
| :------ | :------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `expr`  | `Readonly`<`TValueExpr`\> | Value                                                                                                                                                              |
| `prop?` | `string`                  | Property for which value is calculated. For example, to calculate percent values the function should know is it 'width' or 'height' to use proper reference value. |

#### Returns

`any`

Calculated result

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

#### Defined in

[packages/core/src/api.ts:100](https://github.com/tokenstreet-tech/react-native-extended-stylesheet/blob/28e65ee/packages/core/src/api.ts#L100)
