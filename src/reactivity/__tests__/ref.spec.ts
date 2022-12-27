import { effect } from '../effect'
import { ref } from '../ref'

/*
 * @Author: Mr.Cong Wei
 * @Date: 2022-12-27 20:26:50
 * @LastEditTime: 2022-12-27 21:23:04
 */
describe('ref', () => {
	it('happy path', () => {
		const a = ref(1)
		expect(a.value).toBe(1)
	})

	it('should be reactive', () => {
		const a = ref(1)
		let dummy
		let calls = 0
		effect(() => {
			calls++
			dummy = a.value
		})

		expect(calls).toBe(1)
		expect(dummy).toBe(1)
		a.value = 2
		expect(calls).toBe(2)
		expect(dummy).toBe(2)
		// same value should not trigger
		a.value = 2
		expect(calls).toBe(2)
		expect(dummy).toBe(2)
	})

	it('should make nested properties reactive', () => {
		const a = ref({
			count: 1
		})
		let dummy
		effect(() => {
			dummy = a.value.count
		})

		expect(dummy).toBe(1)
		a.value.count = 2
		expect(dummy).toBe(2)
	})
})
