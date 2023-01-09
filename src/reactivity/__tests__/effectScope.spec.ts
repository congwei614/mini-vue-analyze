/*
 * @Author: Mr.Cong Wei
 * @Date: 2023-01-09 17:39:39
 * @LastEditTime: 2023-01-09 18:03:15
 */
import { EffectScope } from "../effectScope";

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
});
