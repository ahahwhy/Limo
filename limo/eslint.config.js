import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';

export default [
  // Базовая конфигурация ESLint
  js.configs.recommended,

  // Конфигурация для Vue
  ...pluginVue.configs['flat/essential'],

  // Пропуск форматирования для Prettier
  skipFormatting,

  // Пользовательские настройки
  {
    rules: {
      'vue/custom-sections': 'off', // Отключить правило для пользовательских секций
      'vue/no-multiple-template-root': 'off', // Отключить правило для нескольких корневых элементов
    },
    overrides: [
      {
        files: ['**/*.{js,mjs,jsx,vue}'], // Файлы для линтинга
        name: 'app/files-to-lint',
      },
      {
        ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'], // Игнорируемые файлы
        name: 'app/files-to-ignore',
      },
    ],
  },
];
