/*
 * @Author: Mr.Cong Wei
 * @Date: 2022-12-24 14:46:35
 * @LastEditTime: 2022-12-24 18:12:54
 */
import { reactive } from '../reactive'
import { effect, stop } from '../effect'
describe('effect', () => {
	it('happy path', () => {
		const user = reactive({ age: 10 })
		let ages
		effect(() => {
			ages = user.age + 1
		})
		expect(ages).toBe(11)

		// update
		user.age++
		expect(ages).toBe(12)
	})

	it('should return runner when call effect', () => {
		// 调用effect返回runner函数，runner函数返回fn的结果
		// effect(fn) ->返回 function runner()
		// ->执行fn -> 返回fn结果
		let age = 1
		const runner = effect(() => {
			age++
			return 'foo'
		})

		// 首次执行fn
		expect(age).toBe(2)

		expect(runner()).toBe('foo')
		// 执行runner函数再次触发fn
		expect(age).toBe(3)
	})

	it('scheduler', () => {
		// 1、通过effect的第二个参数给定一个scheduler的fn
		// 2、effect第一次执行还会执行fn
		// 3、当触发set即update时不会执行fn而执行scheduler
		// 4、如果执行runner的时候，再次执行fn

		let dummy
		let run: any
		const scheduler = jest.fn(() => {
			run = runner
		})
		const obj = reactive({ foo: 1 })
		const runner = effect(() => (dummy = obj.foo), { scheduler })

		expect(scheduler).not.toHaveBeenCalled() // 没有调用
		expect(dummy).toBe(1)
		obj.foo++ // 第一次触发trigger函数
		expect(scheduler).toHaveBeenCalledTimes(1) // update时被调用一次
		expect(dummy).toBe(1) // 没有更新，没有执行fn
		run()
		expect(dummy).toBe(2) // 通过run函数 触发fn
	})

	it('stop', () => {
		// 停止响应式
		let dummy
		const obj = reactive({ prop: 1 })
		const runner = effect(() => {
			dummy = obj.prop
		})
		obj.prop = 2
		expect(dummy).toBe(2)
		stop(runner)
		stop(runner) // 多次调用
		obj.prop = 3
		expect(dummy).toBe(2)

		runner()
		expect(dummy).toBe(3)
	})

	it('onStop', () => {
		// 停止响应式回调
		const obj = reactive({ foo: 1 })
		const onStop = jest.fn()
		let dummy
		const runner = effect(
			() => {
				dummy = obj.foo
			},
			{ onStop }
		)
		stop(runner)
		expect(onStop).toBeCalledTimes(1)
	})
})
