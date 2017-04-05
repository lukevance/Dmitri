"use strict";

const chai = require('chai');
const expect = chai.expect;
const elementReader = require('../elementReader');
const element = require('./assets/element.json');
const requester = require('../apiHandler');

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
  describe('#getParamNames', () => {
    it('should return an array of resource parameter names', () => {
      let resource = element.resources[0];
      elementReader.getParamNames(resource).should.have.lengthOf(3);
    });
  });
  describe('#getCRUDS', () => {
    it('should return an object with two top level keys: {name: "string", methods: object}', () => {
      Object.keys(elementReader.getCRUDS('activities', element)).should.have.lengthOf(2);
      elementReader.getCRUDS('activities', element).should.have.property('resourceName');
      elementReader.getCRUDS('activities', element).resourceName.should.be.a('string');
      elementReader.getCRUDS('activities', element).should.have.property('methods');
      elementReader.getCRUDS('activities', element).methods.should.be.a('object');
    });
    it('should return object with second level keys of CRUDS', () => {
      let objectToTest = elementReader.getCRUDS('activities', element);
      objectToTest.methods.should.have.property('CREATE');
      objectToTest.methods.should.have.property('RETRIEVE');
      objectToTest.methods.should.have.property('UPDATE');
      objectToTest.methods.should.have.property('DESTROY');
      objectToTest.methods.should.have.property('SELECT');
    });
  });
});

describe('Requester', () => {
  describe('getProdElement', () => {
    it('should return Element JSON of the elementkey passed in', () => {
      requester.getProdElement('gooddata', (r) => {
        console.log(r);
        return false;
        // return r.should.have.property('blahhh');
      });
    });
  });
});
