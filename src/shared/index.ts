/*
 * @Author: Mr.Cong Wei
 * @Date: 2022-12-24 17:55:19
 * @LastEditTime: 2023-01-12 17:07:24
 */
export const extend = Object.assign

export const isObject = (value) => value !== null && typeof value === "object"

export const isFunction = (val) => typeof val === "function"

export const hasChanged = (value, newValue) => !Object.is(value, newValue)

export const NOOP = () => {}
