/*
 * @Author: Mr.Cong Wei
 * @Date: 2023-01-07 14:28:59
 * @LastEditTime: 2023-01-12 17:19:23
 */

import { isFunction, NOOP } from "../shared"
import { reactiveEffect } from "./effect"
import { ReactiveFlags } from "./reactive"
import { trackRefValue, triggerRefValue } from "./ref"

class ComputedRefImpl {
    public dep = new Set()
    public readonly effect: reactiveEffect
    public readonly [ReactiveFlags.Is_Readonly]: boolean = false
    private _dirty: boolean = true
    private _value: any
    constructor(getter, private readonly _setter, isReadonly: boolean) {
        this.effect = new reactiveEffect(getter, () => {
            if (this._dirty) return
            this._dirty = true
            triggerRefValue(this)
        })
        this[ReactiveFlags.Is_Readonly] = isReadonly
    }

    public get value() {
        trackRefValue(this)
        if (this._dirty) {
            this._dirty = false
            this._value = this.effect.run()
        }
        return this._value
    }
    set value(newValue) {
        this._setter(newValue)
    }
}

export function computed(getterOrOptions) {
    let getter
    let setter

    const onlyGetter = isFunction(getterOrOptions)
    if (onlyGetter) {
        getter = getterOrOptions
        setter = NOOP
    } else {
        getter = getterOrOptions.get
        setter = getterOrOptions.set
    }

    return new ComputedRefImpl(getter, setter, onlyGetter || !setter)
}
