/*
 * @Author: Mr.Cong Wei
 * @Date: 2022-12-24 17:55:19
 * @LastEditTime: 2022-12-25 15:07:10
 */
export const extend = Object.assign

export function isObject(value) {
	return value !== null && typeof value === 'object'
}
