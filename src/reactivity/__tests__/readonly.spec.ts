/*
 * @Author: Mr.Cong Wei
 * @Date: 2022-12-24 14:46:35
 * @LastEditTime: 2022-12-25 16:08:56
 */
import { isProxy, isReadonly, readonly } from '../reactive'

describe('readonly', () => {
	it('happy path', () => {
		// not set
		const original = { foo: 1, array: [{ bar: 1 }] }
		const wrapped = readonly(original)

		expect(wrapped).not.toBe(original)
		wrapped.foo = 2
		expect(wrapped.foo).toBe(1)

		expect(isProxy(wrapped)).toBe(true)
		expect(isProxy(wrapped.array[0])).toBe(true)
		expect(isProxy(original)).toBe(false)
	})

	it.skip('warn then call set', () => {
		// 触发set是提示警告
		console.warn = jest.fn()
		const wrapped = readonly({ foo: 1 })
		wrapped.foo = 2
		expect(console.warn).toBeCalled()
	})

	it('isReadonly', () => {
		const original = { foo: 1 }
		const observed = readonly(original)

		expect(isReadonly(observed)).toBe(true)
		expect(isReadonly(original)).toBe(false)
	})

	it('nested readonly', () => {
		const original = { nested: { foo: 1 }, array: [{ bar: 2 }] }
		const observed = readonly(original)

		expect(isReadonly(observed.nested)).toBe(true)
		expect(isReadonly(observed.array)).toBe(true)
		expect(isReadonly(observed.array[0])).toBe(true)
	})
})
