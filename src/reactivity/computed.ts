/*
 * @Author: Mr.Cong Wei
 * @Date: 2023-01-07 14:28:59
 * @LastEditTime: 2023-01-07 14:59:50
 */

import { reactiveEffect } from './effect'

class ComputedRefImpl {
	private _getter: any
	private _dirty: boolean = true
	private _value: any
	private _effect: reactiveEffect
	constructor(getter) {
		this._getter = getter
		this._effect = new reactiveEffect(getter, () => {
			if (this._dirty) return
			this._dirty = true
		})
	}

	public get value() {
		if (this._dirty) {
			this._dirty = false
			this._value = this._effect.run()
		}
		return this._value
	}
}

export function computed(getter) {
	return new ComputedRefImpl(getter)
}
