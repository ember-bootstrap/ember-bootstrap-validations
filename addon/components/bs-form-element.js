import Ember from 'ember';
import BsFormElement from 'ember-bootstrap/components/bs-form-element';

const { computed, defineProperty } = Ember;

export default BsFormElement.extend({
  setupValidations() {
    defineProperty(this, 'errors', computed.readOnly(`model.errors.${this.get('property')}`));
  }
});