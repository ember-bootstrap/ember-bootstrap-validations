import Ember from 'ember';
import BsForm from 'ember-bootstrap/components/bs-form';

const { computed } = Ember;

export default BsForm.extend({
  foo: 'bar',

  hasValidator: computed.notEmpty('model.validate'),

  validate(model) {
    Ember.assert('Model needs to have the ember-validations mixin', model && typeof model.validate === 'function');
    return this.get('model').validate();
  }

});
