"use strict";

const chai = require('chai');
const expect = chai.expect;
const elementReader = require('../elementReader');
const element = require('./assets/element.json');

chai.should();

describe('Element Reader', () => {
  describe('#getHub', ()=> {
    it('should return the hub name for Element JSON', () => {
      expect(elementReader.getHub(element)).to.equal('marketing');
    });
  });
  describe('#getResources', () => {
    it('should return an object containing keys of all resources', () => {
      let resources = ['activities', 'campaigns', 'contacts'];
      resources.forEach((resource) => {
        elementReader.getResources(element).should.have.property(resource);
      });
    });
    //TODO: test an element with sub-resources!!!
    it('should return an object with no more keys than resources', () => {
      Object.keys(elementReader.getResources(element)).should.have.lengthOf(4);
    });
  });
  describe('#getCRUDS', () => {
    it('should return an object with one top level key of the requested resource', () => {
      elementReader.getCRUDS('activities', element).should.have.property('activities');
      Object.keys(elementReader.getCRUDS('activities', element)).should.have.lengthOf(1);
    });
    it('should return object with second level keys of CRUDS', () => {
      let objectToTest = elementReader.getCRUDS('activities', element);
      objectToTest.activities.should.have.property('CREATE');
      objectToTest.activities.should.have.property('RETRIEVE');
      objectToTest.activities.should.have.property('UPDATE');
      objectToTest.activities.should.have.property('DESTROY');
      objectToTest.activities.should.have.property('SELECT');
    });
  });
});
