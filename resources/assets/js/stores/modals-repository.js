
class ModalsRepository {
  constructor() {
    this._modals = new Map();
  }
  registerModal(id, modal) {
    this._modals.set(id, modal);
  }
  getModals() {
    return this._modals;
  }
}

export default new ModalsRepository();
