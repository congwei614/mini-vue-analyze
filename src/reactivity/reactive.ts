/*
 * @Author: Mr.Cong Wei
 * @Date: 2022-12-24 14:58:30
 * @LastEditTime: 2022-12-24 17:49:05
 */

import { track, trigger } from './effect'

export function reactive(raw) {
	return new Proxy(raw, {
		get(target, key, receiver) {
			const res = Reflect.get(target, key, receiver)

			// TODO 收集依赖
			track(target, key)

			return res
		},
		set(target, key, value, receiver) {
			const oldValue = target[key]
			const res = Reflect.set(target, key, value, receiver)
			// TODO 触发依赖
			if (res && oldValue !== value) trigger(target, key)

			return res
		}
	})
}
