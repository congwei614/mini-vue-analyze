/*
 * @Author: Mr.Cong Wei
 * @Date: 2022-12-24 14:46:35
 * @LastEditTime: 2022-12-24 18:19:13
 */
import { reactive } from '../reactive'
import { stop, effect } from '../effect'
describe('reactive', () => {
	it('happy path', () => {
		const original = { foo: 1 }
		const observed = reactive(original)

		expect(observed).not.toBe(original)
		expect(observed.foo).toBe(1)

		expect(original.foo).toBe(observed.foo)

		// 响应式旧值和新值相同
		observed.foo = 1
		expect(observed.foo).toBe(1)
	})
})
