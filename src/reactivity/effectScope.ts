export class EffectScope {
  public effects = [];
  private _actvie = true;
  constructor() {}

  get active() {
    return this._actvie;
  }

  run(fn) {
    return fn();
  }

  stop() {
    this._actvie = false;
  }
}
