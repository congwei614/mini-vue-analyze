/*
 * @Author: Mr.Cong Wei
 * @Date: 2022-12-27 20:52:24
 * @LastEditTime: 2023-01-12 16:15:33
 */
import { hasChanged, isObject } from "../shared"
import { isTracking, trackEffects, triggerEffects } from "./effect"
import { reactive } from "./reactive"

class RefImpl {
    private _value
    private _rawValue
    public dep = new Set()
    public __v_isRef = true
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
            triggerRefValue(this)
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

export function triggerRefValue(ref) {
    triggerEffects(ref.dep)
}

export function ref(raw) {
    return isRef(raw) ? raw : new RefImpl(raw)
}

export function isRef(raw) {
    return !!(raw && raw.__v_isRef)
}

export function unRef(raw) {
    return isRef(raw) ? raw.value : raw
}

// 函数的目的是解构 ref
// 比如在 template 中使用 ref 的时候，直接使用就可以了
// 例如： const count = ref(0) -> 在 template 中使用的话 可以直接 count
// 解决方案就是通过 proxy 来对 ref 做处理

const shallowUnwrapHandlers = {
    get(target, key, receiver) {
        // 如果里面是一个 ref 类型的话，那么就返回 .value
        // 如果不是的话，那么直接返回value 就可以了
        return unRef(Reflect.get(target, key, receiver))
    },
    set(target, key, value, receiver) {
        const oldValue = target[key]
        if (isRef(oldValue) && !isRef(value)) {
            // 当旧值是ref新值不是ref是，要为旧值ref赋值
            return (target[key].value = value)
        } else {
            return Reflect.set(target, key, value, receiver)
        }
    },
}
// 这里没有处理 objectWithRefs 是 reactive 类型的时候
// TODO reactive 里面如果有 ref 类型的 key 的话， 那么也是不需要调用 ref.value 的
// （but 这个逻辑在 reactive 里面没有实现）
export function proxyRefs(objectWithRefs) {
    return new Proxy(objectWithRefs, shallowUnwrapHandlers)
}
