/*
 * @Author: Mr.Cong Wei
 * @Date: 2022-12-24 14:46:35
 * @LastEditTime: 2022-12-24 17:50:16
 */
import { reactive } from '../reactive'
describe('reactive', () => {
	it('happy path', () => {
		const original = { foo: 1 }
		const observed = reactive(original)

		expect(observed).not.toBe(original)
		expect(observed.foo).toBe(1)

		expect(original.foo).toBe(observed.foo)
	})
})
