import Ember from 'ember';
import BsForm from 'ember-bootstrap/components/bs-form';

const { computed } = Ember;

export default BsForm.extend({
  
  hasValidator: computed.notEmpty('model.validate'),

  validate(model) {
    let m = model;

    if(model instanceof Ember.ObjectProxy) {
      m = model.get('content');
    }
    
    Ember.assert('Model needs to have the ember-validations mixin', m && typeof m.validate === 'function');
    return m.validate();
  }

});
