import { expect } from '@jest/globals';
import cypressCoverageConfigOverride from '.';
import ABSOLUTE_TSCONFIG_PATH from './constants/absolute-tsconfig-path';
import BABEL_PLUGIN_ISTANBUL_PATH from './constants/babel-plugin-istanbul-path';
import INVALID_BABEL_RULE_OPTIONS_ERROR from './constants/invalid-babel-rule-options-error';
import MISSING_MODULE_RULES_ERROR from './constants/missing-module-rules-error';
import MISSING_ONE_OF_BABEL_RULE_ERROR from './constants/missing-one-of-babel-rule-error';
import MISSING_WEBPACK_MODULE_ERROR from './constants/missing-webpack-module-error';
import MISSING_WEBPACK_PLUGINS_ERROR from './constants/missing-webpack-plugins-error';
import noop from './test/utils/noop';

describe('cypressCoverageConfigOverride', (): void => {
  it('should throw an error if module is not set', (): void => {
    expect((): void => {
      cypressCoverageConfigOverride({
        plugins: [],
      });
    }).toThrowError(MISSING_WEBPACK_MODULE_ERROR);
  });

  it('should throw an error if plugins is not set', (): void => {
    expect((): void => {
      cypressCoverageConfigOverride({
        module: {},
      });
    }).toThrowError(MISSING_WEBPACK_PLUGINS_ERROR);
  });

  it('should throw an error if rules are not set', (): void => {
    expect((): void => {
      cypressCoverageConfigOverride({
        plugins: [],
        module: {},
      });
    }).toThrowError(MISSING_MODULE_RULES_ERROR);
  });

  it('should throw an error if a oneOf Babel rule does not exist', (): void => {
    expect((): void => {
      cypressCoverageConfigOverride({
        plugins: [],
        module: {
          rules: [{}],
        },
      });
    }).toThrowError(MISSING_ONE_OF_BABEL_RULE_ERROR);
  });

  it('should throw an error if the Babel rule does not have an options record', (): void => {
    expect((): void => {
      cypressCoverageConfigOverride({
        plugins: [],
        module: {
          rules: [
            '...',
            {
              oneOf: [
                {},
                {
                  loader: 'babel-loader',
                },
              ],
            },
          ],
        },
      });
    }).toThrowError(INVALID_BABEL_RULE_OPTIONS_ERROR);
  });

  it('should apply Cypress coverage to the Webpack config if Babel plugins do not exist', (): void => {
    expect(
      cypressCoverageConfigOverride({
        module: {
          rules: [
            '...',
            {
              oneOf: [
                {},
                {
                  loader: 'babel-loader',
                  options: {},
                },
              ],
            },
          ],
        },
        plugins: [
          {
            apply: noop,
            options: {},
          },
          {
            apply: noop,
            tsconfig: '',
            options: {
              tsconfig: '',
            },
          },
        ],
      }),
    ).toStrictEqual({
      module: {
        rules: [
          '...',
          {
            oneOf: [
              {},
              {
                loader: 'babel-loader',
                options: {
                  plugins: [BABEL_PLUGIN_ISTANBUL_PATH],
                },
              },
            ],
          },
        ],
      },
      plugins: [
        {
          apply: noop,
          options: {},
        },
        {
          apply: noop,
          tsconfig: ABSOLUTE_TSCONFIG_PATH,
          options: {
            tsconfig: ABSOLUTE_TSCONFIG_PATH,
          },
        },
      ],
    });
  });

  it('should apply Cypress coverage to the Webpack config if Babel plugins exist', (): void => {
    expect(
      cypressCoverageConfigOverride({
        module: {
          rules: [
            '...',
            {
              oneOf: [
                {},
                {
                  loader: 'babel-loader',
                  options: {
                    plugins: ['test plugin'],
                  },
                },
              ],
            },
          ],
        },
        plugins: [
          {
            apply: noop,
            options: {},
          },
          {
            apply: noop,
            tsconfig: '',
            options: {
              tsconfig: '',
            },
          },
        ],
      }),
    ).toStrictEqual({
      module: {
        rules: [
          '...',
          {
            oneOf: [
              {},
              {
                loader: 'babel-loader',
                options: {
                  plugins: ['test plugin', BABEL_PLUGIN_ISTANBUL_PATH],
                },
              },
            ],
          },
        ],
      },
      plugins: [
        {
          apply: noop,
          options: {},
        },
        {
          apply: noop,
          tsconfig: ABSOLUTE_TSCONFIG_PATH,
          options: {
            tsconfig: ABSOLUTE_TSCONFIG_PATH,
          },
        },
      ],
    });
  });
});
