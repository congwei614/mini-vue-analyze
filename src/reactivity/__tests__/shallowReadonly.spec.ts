/*
 * @Author: Mr.Cong Wei
 * @Date: 2022-12-24 14:46:35
 * @LastEditTime: 2022-12-25 19:08:27
 */
import { isReadonly, shadowReadonly } from '../reactive'

describe('shallowReadonly', () => {
	it('should not make non-reactive properties reactive', () => {
		const wrapped = shadowReadonly({ n: { foo: 1 } })

		expect(isReadonly(wrapped)).toBe(true)
		expect(isReadonly(wrapped.n)).toBe(false)
	})
})
