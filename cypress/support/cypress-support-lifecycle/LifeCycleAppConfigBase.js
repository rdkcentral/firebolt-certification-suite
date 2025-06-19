export class LifeCycleAppConfigBase {
  constructor() {
    this.state = {};
    this.history = [];
    this.additionalParams = undefined;
  }

  getHistory() {
    return this.history;
  }

  // Common functionality for both versions
  getCurrentState() {
    return this.state;
  }
}
