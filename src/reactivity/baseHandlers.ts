/*
 * @Author: Mr.Cong Wei
 * @Date: 2022-12-25 13:39:45
 * @LastEditTime: 2022-12-25 15:50:36
 */

import { extend, isObject } from '../shared'
import { track, trigger } from './effect'
import { reactive, ReactiveFlags, readonly } from './reactive'

// 将代理处理函数进行缓存
const get = createGetter()
const set = createSetter()
const readonlyGet = createGetter(true)
const shallowReadonlyGet = createGetter(true, true)

function createGetter(isReadonly = false, shallow = false) {
	return function get(target, key, receiver) {
		if (key === ReactiveFlags.Is_Reactive) {
			return !isReadonly
		} else if (key === ReactiveFlags.Is_Readonly) {
			return isReadonly
		}

		const res = Reflect.get(target, key, receiver)

		if (shallow) {
			return res
		}

		if (isObject(res)) {
			return isReadonly ? readonly(res) : reactive(res)
		}

		if (!isReadonly) {
			// TODO 收集依赖
			track(target, key)
		}

		return res
	}
}

function createSetter() {
	return function set(target, key, value, receiver) {
		const oldValue = target[key]
		const res = Reflect.set(target, key, value, receiver)
		// TODO 触发依赖
		if (res && oldValue !== value) trigger(target, key)

		return res
	}
}

export const mutableHandlers = {
	get,
	set
}

export const readonlyHandlers = {
	get: readonlyGet,
	set(target, key, value, receiver) {
		console.warn(`Set operation on key "${String(key)}" failed: target is readonly.`, target)
		return true
	}
}

export const shallowReadonlyHandlers = extend({}, readonlyHandlers, {
	get: shallowReadonlyGet
})
