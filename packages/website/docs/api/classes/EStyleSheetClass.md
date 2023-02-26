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

[packages/core/src/api.ts:38](https://github.com/tokenstreet-tech/react-native-extended-stylesheet/blob/ab6c8c8/packages/core/src/api.ts#L38)

## Properties

### absoluteFill

• **absoluteFill**: `RegisteredStyle`<`AbsoluteFillStyle`\> = `StyleSheet.absoluteFill`

#### Defined in

[packages/core/src/api.ts:27](https://github.com/tokenstreet-tech/react-native-extended-stylesheet/blob/ab6c8c8/packages/core/src/api.ts#L27)

---

### absoluteFillObject

• **absoluteFillObject**: `AbsoluteFillStyle` = `StyleSheet.absoluteFillObject`

#### Defined in

[packages/core/src/api.ts:26](https://github.com/tokenstreet-tech/react-native-extended-stylesheet/blob/ab6c8c8/packages/core/src/api.ts#L26)

---

### builded

• `Private` **builded**: `boolean`

#### Defined in

[packages/core/src/api.ts:30](https://github.com/tokenstreet-tech/react-native-extended-stylesheet/blob/ab6c8c8/packages/core/src/api.ts#L30)

---

### child

• **child**: <T\>(`styles`: `T`, `styleName`: `string`, `index`: `number`, `count`: `number`) => `AnyStyle`

#### Type declaration

▸ <`T`\>(`styles`, `styleName`, `index`, `count`): `AnyStyle`

Returns base style and style with child pseudo selector

##### Type parameters

| Name | Type               |
| :--- | :----------------- |
| `T`  | `StyleSet`<`any`\> |

##### Parameters

| Name        | Type     |
| :---------- | :------- |
| `styles`    | `T`      |
| `styleName` | `string` |
| `index`     | `number` |
| `count`     | `number` |

##### Returns

`AnyStyle`

#### Defined in

[packages/core/src/api.ts:29](https://github.com/tokenstreet-tech/react-native-extended-stylesheet/blob/ab6c8c8/packages/core/src/api.ts#L29)

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

[packages/core/src/api.ts:23](https://github.com/tokenstreet-tech/react-native-extended-stylesheet/blob/ab6c8c8/packages/core/src/api.ts#L23)

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

[packages/core/src/api.ts:22](https://github.com/tokenstreet-tech/react-native-extended-stylesheet/blob/ab6c8c8/packages/core/src/api.ts#L22)

---

### globalVars

• `Private` **globalVars**: `any`

#### Defined in

[packages/core/src/api.ts:32](https://github.com/tokenstreet-tech/react-native-extended-stylesheet/blob/ab6c8c8/packages/core/src/api.ts#L32)

---

### hairlineWidth

• **hairlineWidth**: `number` = `StyleSheet.hairlineWidth`

#### Defined in

[packages/core/src/api.ts:25](https://github.com/tokenstreet-tech/react-native-extended-stylesheet/blob/ab6c8c8/packages/core/src/api.ts#L25)

---

### listeners

• `Private` `Readonly` **listeners**: `Record`<`string`, `never`\> \| {}

#### Defined in

[packages/core/src/api.ts:33](https://github.com/tokenstreet-tech/react-native-extended-stylesheet/blob/ab6c8c8/packages/core/src/api.ts#L33)

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

[packages/core/src/api.ts:24](https://github.com/tokenstreet-tech/react-native-extended-stylesheet/blob/ab6c8c8/packages/core/src/api.ts#L24)

---

### sheets

• `Private` `Readonly` **sheets**: `Sheet`<`unknown`\>[]

#### Defined in

[packages/core/src/api.ts:31](https://github.com/tokenstreet-tech/react-native-extended-stylesheet/blob/ab6c8c8/packages/core/src/api.ts#L31)

---

### BUILD_EVENT

▪ `Static` `Private` `Readonly` **BUILD_EVENT**: `string` = `'build'`

#### Defined in

[packages/core/src/api.ts:19](https://github.com/tokenstreet-tech/react-native-extended-stylesheet/blob/ab6c8c8/packages/core/src/api.ts#L19)

## Methods

### build

▸ **build**<`TGlobalVariablesObject`\>(`globalVariablesObject?`): `void`

Builds all created stylesheets with passed variables

#### Type parameters

| Name                     |
| :----------------------- |
| `TGlobalVariablesObject` |

#### Parameters

| Name                     | Type                                          |
| :----------------------- | :-------------------------------------------- |
| `globalVariablesObject?` | `TGlobalVariables`<`TGlobalVariablesObject`\> |

#### Returns

`void`

#### Defined in

[packages/core/src/api.ts:73](https://github.com/tokenstreet-tech/react-native-extended-stylesheet/blob/ab6c8c8/packages/core/src/api.ts#L73)

---

### calcGlobalVars

▸ `Private` **calcGlobalVars**<`TGlobalVariablesObject`\>(`globalVariablesObject?`): `void`

#### Type parameters

| Name                     |
| :----------------------- |
| `TGlobalVariablesObject` |

#### Parameters

| Name                     | Type                                          |
| :----------------------- | :-------------------------------------------- |
| `globalVariablesObject?` | `TGlobalVariables`<`TGlobalVariablesObject`\> |

#### Returns

`void`

#### Defined in

[packages/core/src/api.ts:126](https://github.com/tokenstreet-tech/react-native-extended-stylesheet/blob/ab6c8c8/packages/core/src/api.ts#L126)

---

### calcSheets

▸ `Private` **calcSheets**(): `void`

#### Returns

`void`

#### Defined in

[packages/core/src/api.ts:137](https://github.com/tokenstreet-tech/react-native-extended-stylesheet/blob/ab6c8c8/packages/core/src/api.ts#L137)

---

### callListeners

▸ `Private` **callListeners**(`event`): `void`

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `event` | `string` |

#### Returns

`void`

#### Defined in

[packages/core/src/api.ts:141](https://github.com/tokenstreet-tech/react-native-extended-stylesheet/blob/ab6c8c8/packages/core/src/api.ts#L141)

---

### checkGlobalVars

▸ `Private` **checkGlobalVars**<`TGlobalVariablesObject`\>(`globalVariablesObject`): `void`

#### Type parameters

| Name                     |
| :----------------------- |
| `TGlobalVariablesObject` |

#### Parameters

| Name                    | Type                                                       |
| :---------------------- | :--------------------------------------------------------- |
| `globalVariablesObject` | `Readonly`<`TGlobalVariables`<`TGlobalVariablesObject`\>\> |

#### Returns

`void`

#### Defined in

[packages/core/src/api.ts:147](https://github.com/tokenstreet-tech/react-native-extended-stylesheet/blob/ab6c8c8/packages/core/src/api.ts#L147)

---

### clearCache

▸ **clearCache**(): `void`

Clears all cached styles.

#### Returns

`void`

#### Defined in

[packages/core/src/api.ts:121](https://github.com/tokenstreet-tech/react-native-extended-stylesheet/blob/ab6c8c8/packages/core/src/api.ts#L121)

---

### create

▸ **create**<`T`\>(`styles`): `TNamedStyles`<`T`\>

Creates stylesheet that will be calculated after build

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name     | Type                         |
| :------- | :--------------------------- |
| `styles` | `TExtendedNamedStyles`<`T`\> |

#### Returns

`TNamedStyles`<`T`\>

#### Defined in

[packages/core/src/api.ts:59](https://github.com/tokenstreet-tech/react-native-extended-stylesheet/blob/ab6c8c8/packages/core/src/api.ts#L59)

---

### subscribe

▸ **subscribe**(`event`, `listener`): `void`

Subscribe to event. Currently, only 'build' event is supported.

#### Parameters

| Name       | Type        |
| :--------- | :---------- |
| `event`    | `string`    |
| `listener` | `TListener` |

#### Returns

`void`

#### Defined in

[packages/core/src/api.ts:95](https://github.com/tokenstreet-tech/react-native-extended-stylesheet/blob/ab6c8c8/packages/core/src/api.ts#L95)

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

[packages/core/src/api.ts:109](https://github.com/tokenstreet-tech/react-native-extended-stylesheet/blob/ab6c8c8/packages/core/src/api.ts#L109)

---

### value

▸ **value**(`expr`, `prop?`): `any`

Calculates particular value. For some values you need to pass prop (e.g. percent)

#### Parameters

| Name    | Type                      |
| :------ | :------------------------ |
| `expr`  | `Readonly`<`TValueExpr`\> |
| `prop?` | `string`                  |

#### Returns

`any`

#### Defined in

[packages/core/src/api.ts:85](https://github.com/tokenstreet-tech/react-native-extended-stylesheet/blob/ab6c8c8/packages/core/src/api.ts#L85)

---

### assertSubscriptionParams

▸ `Static` `Private` **assertSubscriptionParams**(`event`, `listener`): `void`

#### Parameters

| Name       | Type        |
| :--------- | :---------- |
| `event`    | `string`    |
| `listener` | `TListener` |

#### Returns

`void`

#### Defined in

[packages/core/src/api.ts:46](https://github.com/tokenstreet-tech/react-native-extended-stylesheet/blob/ab6c8c8/packages/core/src/api.ts#L46)
