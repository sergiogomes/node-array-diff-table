const indexService = require('../services/index')
const expect = require('chai').expect
// const sinon = require('sinon')

describe('index service', () => {

  describe('myFlatFunction', () => {
    it('should ', () => {

    })
  })

  describe('reduceToFlat', () => {
    it('should ', () => {

    })
  })

  describe('turnArrayIntoObj', () => {
    it('should transform an array of objects into a key value objects with the id as the key', () => {
      const arr = [
        { id: 12345, name: 'Sergio', age: 30 },
        { id: 12245, name: 'Cindy', age: 29 },
      ]
      const expected = {
        '12345': { id: 12345, name: 'Sergio', age: 30 },
        '12245': { id: 12245, name: 'Cindy', age: 29 }
      }
      
      const result = indexService.turnArrayIntoObj(arr)
      expect(result).to.deep.equal(expected)
    })
  })

  describe('generateTableHeader', () => {
    it('should generate a string with html table header columns', () => {
      const arr = ['id', 'name', 'age']
      const expected = '<th scope="col">id</th><th scope="col">name</th><th scope="col">age</th>'

      const result = indexService.generateTableHeader(arr)
      expect(result).to.equal(expected)
    })
  })

  describe('generateTableDoc', () => {
    it('should ', () => {

    })
  })

  describe('generateHTML', () => {
    it('should ', () => {

    })
  })

  describe('arrayDiffToHtmlTable', () => {
    it('should ', () => {

    })
  })
})
