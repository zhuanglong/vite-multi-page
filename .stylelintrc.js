module.exports = {
  root: true,
  // 继承规则集
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier',
    'stylelint-config-idiomatic-order',
  ],
  overrides: [{
    files: ['**/*.scss'],
    customSyntax: 'postcss-scss',
  }, {
    files: ['**/*.vue'],
    customSyntax: 'postcss-html',
  }],
  rules: {
    // https://github.com/ream88/stylelint-config-idiomatic-order
    'color-function-notation': null,
    'alpha-value-notation': null,
    'property-no-vendor-prefix': null, // 禁止前缀的属性
    'value-no-vendor-prefix': null, // 禁止前缀的属性
    'selector-class-pattern': null,
    'no-empty-source': null,
    'no-duplicate-selectors': null, // 禁止样式表中的重复选择器
    'declaration-empty-line-before': null, // 声明前要求或禁止空行
    'at-rule-empty-line-before': null, // 规则前要求或禁止使用空行
    'at-rule-no-unknown': null, // 禁止使用未知规则
    'selector-pseudo-class-no-unknown': null, // 禁止未知的伪类选择器
    'property-no-unknown': null, // 禁止未知属性
  },
};
