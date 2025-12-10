import filesize from 'rollup-plugin-filesize';
import terser from '@rollup/plugin-terser';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import baseConfig from './rollup.config.base.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageJson = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf-8'));
const { name, version, author, global } = packageJson;

const banner =
  `${'/*!\n' + ' * '}${name}.js v${version}\n` +
  ` * (c) 2025-${new Date().getFullYear()} ${author}\n` +
  ` * Released under the MIT License.\n` +
  ` */`;

export default [
  {
    ...baseConfig,
    output: [
      {
        file: `lib/${name}.cjs.js`,
        format: 'cjs',
        banner,
      },
      {
        file: `lib/${name}.esm.js`,
        format: 'es',
        banner,
      },
    ],
    plugins: [...baseConfig.plugins, filesize()],
  },
  {
    ...baseConfig,
    output: [
      {
        file: `lib/${name}.js`,
        format: 'umd',
        name: global,
        banner,
      },
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
        },
      }),
      filesize(),
    ],
  },
];
