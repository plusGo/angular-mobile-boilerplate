console.log('webpack.config.js配置文件执行了...')
// postcss插件
const POSTCSS_LOADER_OPTIONS = {
  postcssOptions: {
    ident: 'postcss',
    syntax: 'postcss-scss',
    plugins: [
      {
        'postcss-px-to-viewport': {
          viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
          viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
          unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数
          viewportUnit: "vw", //指定需要转换成的视窗单位，建议使用vw
          selectorBlackList: ['.ignore'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
          minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
          mediaQuery: false // 允许在媒体查询中转换`px`
        }
      }
    ]
  }
};
module.exports = (config, options) => {
  // config就是系统的webpack配置
  // 第一步过滤掉系统的css和sass处理
  const sassRules = config.module.rules.filter($rule => {
    return $rule.use && $rule.use.find($loader => $loader.loader && ($loader.loader.indexOf('sass-loader') !== -1 || $loader.loader.indexOf('css-loader') !== -1));
  });
  sassRules.forEach(sassRule => {
    console.log(`scss rule is founded,${sassRule}`);
    const postcssLoader = sassRule.use.find($loader => $loader.loader && $loader.loader.indexOf('postcss-loader') !== -1);
    if (postcssLoader) {
      console.log(`postcss loader is founded`);
      postcssLoader.options = POSTCSS_LOADER_OPTIONS;
    }
  });
  console.log(JSON.stringify(config.module.rules, null, 4));
  return config
};
