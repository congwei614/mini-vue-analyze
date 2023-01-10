/*
 * @Author: Mr.Cong Wei
 * @Date: 2023-01-09 17:39:39
 * @LastEditTime: 2023-01-10 14:48:24
 */
import { effect } from "../effect";
import { EffectScope } from "../effectScope";
import { reactive } from "../reactive";

/*
 * @Author: Mr.Cong Wei
 * @Date: 2023-01-09 17:39:39
 * @LastEditTime: 2023-01-09 17:46:09
 */
describe("reactivity/effect/scope", () => {
  it("should run", () => {
    const fnSpy = jest.fn(() => {});
    new EffectScope().run(fnSpy);
    expect(fnSpy).toHaveBeenCalledTimes(1);
  });

  it("should accept zero argument", () => {
    const scope = new EffectScope();
    expect(scope.effects.length).toBe(0);
  });

  it("should return run value", () => {
    expect(new EffectScope().run(() => 1)).toBe(1);
  });

  it("should work w/ active property", () => {
    const scope = new EffectScope();
    scope.run(() => 1);
    expect(scope.active).toBe(true);
    scope.stop();
    expect(scope.active).toBe(false);
  });

  it("should collect the effects", () => {
    const scope = new EffectScope();
    scope.run(() => {
      let dummy;
      const counter = reactive({ num: 0 });
      effect(() => (dummy = counter.num));

      expect(dummy).toBe(0);
      counter.num = 7;
      expect(dummy).toBe(7);
    });

    expect(scope.effects.length).toBe(1);
  });
});
