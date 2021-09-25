module.exports = (api) => {
  api.cache(true);

  const presets = ['babel-preset-expo', 'module:react-native-dotenv'];
  const plugins = ['@babel/plugin-proposal-optional-chaining'];

  return {
    presets,
    plugins,
  };
};
