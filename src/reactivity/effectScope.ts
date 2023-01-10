/*
 * @Author: Mr.Cong Wei
 * @Date: 2023-01-09 17:39:44
 * @LastEditTime: 2023-01-10 17:47:05
 */
export class EffectScope {
  public effects = [];
  private _actvie = true;
  constructor() {}

  get active() {
    return this._actvie;
  }

  run(fn) {
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
