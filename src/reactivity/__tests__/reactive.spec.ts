/*
 * @Author: Mr.Cong Wei
 * @Date: 2022-12-24 14:46:35
 * @LastEditTime: 2022-12-25 16:09:38
 */
import { isProxy, isReactive, reactive } from '../reactive'
describe('reactive', () => {
	it('happy path', () => {
		const original = { foo: 1, array: [{ bar: 1 }] }
		const observed = reactive(original)

		expect(observed).not.toBe(original)
		expect(observed.foo).toBe(1)

		expect(original.foo).toBe(observed.foo)

		// 响应式旧值和新值相同
		observed.foo = 1
		expect(observed.foo).toBe(1)

		expect(isProxy(observed)).toBe(true)
		expect(isProxy(observed.array[0])).toBe(true)
		expect(isProxy(original)).toBe(false)
	})

	it('isReactive', () => {
		const original = { foo: 1 }
		const observed = reactive(original)

		expect(isReactive(observed)).toBe(true)
		expect(isReactive(original)).toBe(false)
	})

	it('nested reactive', () => {
		const original = { nested: { foo: 1 }, array: [{ bar: 2 }] }
		const observed = reactive(original)

		expect(isReactive(observed.nested)).toBe(true)
		expect(isReactive(observed.array)).toBe(true)
		expect(isReactive(observed.array[0])).toBe(true)
	})
})
