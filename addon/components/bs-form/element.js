import Ember from 'ember';
import BsFormElement from 'ember-bootstrap/components/bs-form/element';

const { computed, defineProperty } = Ember;

export default BsFormElement.extend({

  hasValidator: computed.notEmpty('model.validate'),

  setupValidations() {
    defineProperty(this, 'errors', computed.readOnly(`model.errors.${this.get('property')}`));
  }
});