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
    it('should generate a string with html table body row', () => {
      const arr = [
        { value: '12345', class: ''},
        { value: 'Sergio', class: 'bg-danger bg-opacity-10'},
        { value: '30', class: ''},
        { value: '', class: 'bg-danger bg-opacity-10'}
      ]
      const expected = '<td >12345</td><td class="bg-danger bg-opacity-10">Sergio</td><td >30</td><td class="bg-danger bg-opacity-10"></td>'

      const result = indexService.generateTableDoc(arr)
      expect(result).to.equal(expected)
    })
  })

  describe('generateHTML', () => {
    it('should generate a string with html table with two rows', () => {
      const arrHeader = ['id', 'name', 'age', 'birth']
      const arrRowOne = [
        { value: '12345', class: ''},
        { value: 'Sergio', class: 'bg-danger bg-opacity-10'},
        { value: '30', class: ''},
        { value: '', class: 'bg-danger bg-opacity-10'}
      ]
      const arrRowTwo = [
        { value: '12345', class: ''},
        { value: 'Sergio Gomes', class: 'fw-bold bg-success bg-opacity-10'},
        { value: '', class: 'bg-danger bg-opacity-10'},
        { value: '1992', class: 'bg-success bg-opacity-10'}
      ]
      const expected = '<table class="d-block overflow-scroll table table-striped table-bordered table-hover"><thead><tr><th scope="col">id</th><th scope="col">name</th><th scope="col">age</th><th scope="col">birth</th></tr></thead><tbody><tr><td >12345</td><td class="bg-danger bg-opacity-10">Sergio</td><td >30</td><td class="bg-danger bg-opacity-10"></td></tr><tr><td >12345</td><td class="fw-bold bg-success bg-opacity-10">Sergio Gomes</td><td class="bg-danger bg-opacity-10"></td><td class="bg-success bg-opacity-10">1992</td></tr></tbody></table>'

      const result = indexService.generateHTML(arrHeader, arrRowOne, arrRowTwo)
      expect(result).to.equal(expected)
    })
  })

  describe('arrayDiffToHtmlTable', () => {
    it('should ', () => {

    })
  })
})
