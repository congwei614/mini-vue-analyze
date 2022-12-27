/*
 * @Author: Mr.Cong Wei
 * @Date: 2022-12-24 17:55:19
 * @LastEditTime: 2022-12-27 21:21:33
 */
export const extend = Object.assign

export function isObject(value) {
	return value !== null && typeof value === 'object'
}

export function hasChanged(value, newValue) {
	return !Object.is(value, newValue)
}
