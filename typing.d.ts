/*
 * @Author: licw
 * @Description: 
 * @LastEditTime: 2022-06-22 10:53:51
 */
/// <reference types="react-scripts" />

declare module '*.module.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module 'crypto-js';
