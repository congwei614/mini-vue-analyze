/*
 * @Author: Mr.Cong Wei
 * @Date: 2023-01-09 17:39:44
 * @LastEditTime: 2023-01-12 15:38:31
 */

let activeEffectScope;

export class EffectScope {
  public effects = [];
  private _actvie = true;
  constructor() {}

  get active() {
    return this._actvie;
  }

  run(fn) {
    activeEffectScope = this;
    if (this._actvie) {
      return fn();
    }
  }

  stop() {
    if (this._actvie) {
      this._actvie = false;
    }
  }
}

export function recordEffectScope(effect, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}
