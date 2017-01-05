"use strict";

const assert = require('assert');
const should = require('chai').should();
const elementReader = require('../getInfo');
const element = require('./assets/element.json');

describe('Element Reader', () => {
  describe('#getHub', ()=> {
    it('should return the hub name for Element JSON', () => {
      assert.equal('marketing', elementReader.getHub(element));
    });
  });
  describe('#getResources', () => {
    it('should return an object with keys of all resources', () => {
      let resources = ['activities', 'campaigns', 'contacts'];
      resources.forEach((resource) => {
        elementReader.getResources(element).should.have.property(resource);
      });
    });
  });
});
