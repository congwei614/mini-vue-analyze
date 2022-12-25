/*
 * @Author: Mr.Cong Wei
 * @Date: 2022-12-24 14:58:30
 * @LastEditTime: 2022-12-25 15:51:09
 */

import { mutableHandlers, readonlyHandlers, shallowReadonlyHandlers } from './baseHandlers'

export const enum ReactiveFlags {
	Is_Reactive = '__v_isReactive',
	Is_Readonly = '__v_isReadonly'
}

export function createActiveObject(raw, baseHandlers) {
	return new Proxy(raw, baseHandlers)
}

export function isReactive(raw) {
	return !!raw[ReactiveFlags.Is_Reactive]
}

export function isReadonly(raw) {
	return !!raw[ReactiveFlags.Is_Readonly]
}

export function isProxy(raw) {
	return isReactive(raw) || isReadonly(raw)
}

export function shadowReadonly(raw) {
	return createActiveObject(raw, shallowReadonlyHandlers)
}

export function reactive(raw) {
	return createActiveObject(raw, mutableHandlers)
}

export function readonly(raw) {
	return createActiveObject(raw, readonlyHandlers)
}
