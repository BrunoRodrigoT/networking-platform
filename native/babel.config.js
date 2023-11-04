module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@src": "./src",
            "@components": "./src/components",
            "@contexts": "./src/contexts",
            "@hooks": "./src/hooks",
            "@assets": "./src/assets",
            "@models": "./src/models",
            "@utils": "./src/utils",
            "@config": "./src/config",
            "@screens": "./src/screens",
            "@services": "./src/services",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
