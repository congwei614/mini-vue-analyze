/*
 * @Author: Mr.Cong Wei
 * @Date: 2022-12-24 15:04:40
 * @LastEditTime: 2023-01-12 15:42:38
 */

import { extend } from "../shared";
import { recordEffectScope } from "./effectScope";

let activeEffect;
let shouldTrack;

export function isTracking() {
  return shouldTrack && activeEffect !== undefined;
}

export class reactiveEffect {
  #_fn: any; // static public
  #_activeClearEffect = true;
  public onStop?: () => void;
  public deps: any[] = [];
  constructor(fn, public scheduler?: Function | undefined, scope?) {
    recordEffectScope(this, scope);
    this.#_fn = fn;
  }
  run() {
    if (!this.#_activeClearEffect) {
      return this.#_fn();
    }
    shouldTrack = true;
    activeEffect = this;

    const result = this.#_fn();
    shouldTrack = false;
    return result;
  }
  stop() {
    if (this.#_activeClearEffect) {
      clearUpEffect(this);
      if (this.onStop) this.onStop();
      this.#_activeClearEffect = false;
    }
  }
}

function clearUpEffect(effect) {
  effect.deps.forEach((_dep: any) => {
    _dep.delete(effect);
  });
  effect.deps.length = 0;
}

const targetMap = new WeakMap();
export function track(target, key) {
  if (!isTracking()) return;

  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }

  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }
  trackEffects(dep);
}

export function trackEffects(dep) {
  if (dep.has(activeEffect)) return;
  dep.add(activeEffect);
  activeEffect.deps.push(dep);
}

export function trigger(target, key) {
  let depsMap = targetMap.get(target);
  if (!depsMap) return;

  let dep = depsMap.get(key);
  if (!dep) return;
  triggerEffects(dep);
}
export function triggerEffects(dep) {
  dep.forEach((_effect) => {
    if (_effect.scheduler) {
      _effect.scheduler();
    } else {
      _effect.run();
    }
  });
}

export function effect(fn, option?: any) {
  const _effect = new reactiveEffect(fn);
  extend(_effect, option);
  _effect.run();

  const runner: any = _effect.run.bind(_effect);
  runner.effect = _effect;
  return runner;
}

export function stop(runner) {
  runner.effect.stop();
}
