// TODO: Make PR to disabled return types in JS files
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
    };
};
