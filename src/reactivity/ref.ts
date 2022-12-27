import { hasChanged, isObject } from '../shared'
import { isTracking, trackEffects, triggerEffects } from './effect'
import { reactive } from './reactive'

class RefImpl {
	private _value
	private _rawValue
	public dep = new Set()
	constructor(raw) {
		this._rawValue = raw
		this._value = convert(raw)
	}

	public get value() {
		trackRefValue(this)
		return this._value
	}

	public set value(newValue) {
		if (hasChanged(this._rawValue, newValue)) {
			this._rawValue = newValue
			this._value = convert(newValue) // 先修改值再去触发依赖
			triggerEffects(this.dep)
		}
	}
}

function convert(raw) {
	return isObject(raw) ? reactive(raw) : raw
}

export function trackRefValue(ref) {
	if (isTracking()) {
		trackEffects(ref.dep)
	}
}

export function ref(raw) {
	return new RefImpl(raw)
}
