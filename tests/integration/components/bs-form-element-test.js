import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import EmberValidations from 'ember-validations';

import startApp from '../../helpers/start-app';
import destroyApp from '../../helpers/destroy-app';


moduleForComponent('bs-form-element', 'Integration | Component | bs form element', {
  integration: true
});



test('valid validation is supported as expected', function(assert) {
  let App = startApp();
  let model = Ember.Object.extend(EmberValidations,{
    test: '123',
    validations: {
      test: {
        presence: true
      }
    }
  }).create({
      container: App.__container__
    });

  this.set('model', model);
  this.on('submitAction', function() {
    assert.ok(true, 'submit action has been called.');
  });
  this.on('invalidAction', function() {
    assert.ok(false, 'Invalid action must not been called.');
  });

  this.render(hbs`
    {{#bs-form model=model action=(action "submitAction") invalid=(action "invalidAction")}}
      {{bs-form-element label="test" property="test"}}
    {{/bs-form}}
  `);

  assert.expect(1);

  this.$('form').submit();

  destroyApp(App);
});

test('invalid validation is supported as expected', function(assert) {
  let App = startApp();
  let model = Ember.Object.extend(EmberValidations,{
      test: null,
      validations: {
        test: {
          presence: true
        }
      }
    }).create({
      container: App.__container__
    });

  this.set('model', model);
  this.on('submitAction', function() {
    assert.ok(false, 'submit action must not been called.');
  });
  this.on('invalidAction', function() {
    assert.ok(true, 'Invalid action has been called.');
  });

  this.render(hbs`
    {{#bs-form model=model action=(action "submitAction") invalid=(action "invalidAction")}}
      {{bs-form-element label="test" property="test"}}
    {{/bs-form}}
  `);

  assert.expect(2);

  this.$('form').submit();
  assert.ok(this.$('.form-group').hasClass('has-error'), 'form element group has error class');

  destroyApp(App);
});
