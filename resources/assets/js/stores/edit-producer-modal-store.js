var EventEmitter = require('events').EventEmitter;

class EditFactoryModalStore extends EventEmitter {
  constructor() {
    super();
    this._producer = null;
    this._newValues = {};
  }

  setProducerValues(values) {
    this._newValues = values;
  }

  getProducerValues() {
    return this._newValues;
  }

  setProducer(producer) {
    this._producer = producer;
    this._newValues = {
      speed: this._producer.speed,
      power: this._producer.power,
      producer_type: this._producer.producer_type
    };
  }

  getProducer() {
    return this._producer;
  }

  emitChange(id) {
    this.emit(id);
  }
}

export default new EditFactoryModalStore();
