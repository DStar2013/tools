/* eslint-disable no-redeclare */

import * as _ from 'lodash';

declare global {
  /** 当前是否在开发环境 */
  const IS_DEV: boolean;

  /** 应用配置 */
  const CONFIG: object;

  /** 国际化文案模板 */
  const I18N_TEMPLATES: object;

  const _: _.LoDashStatic;
}
