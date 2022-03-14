const expect = require('chai').expect
const indexService = require('../services/index')
const { prevArray, currArray} = require('../../mocks/index')

describe('index service', () => {

  describe('myFlatFunction', () => {
    it('should transform a nested object into a flat object', () => {
      const arr ={
        id: 1,
        name: 'Sebastiao',
        children: [
          {
            id: 11,
            name: 'Zanza',
            children: [
              {
                id: 111,
                name: 'Thiago',
                children: [
                  {
                    id: 1111,
                    name: 'Ben'
                  }
                ]
              }
            ],
          },
          {
            id: 12,
            name: 'Sergio',
            children: [
              {
                id: 121,
                name: 'Sergio',
                children: [
                  {
                    id: 1211,
                    name: 'Nicolas'
                  }
                ]
              },
              {
                id: 122,
                name: 'Ana'
              }
            ]
          }
        ]
      }
      const expected = {
        'children0_children0_children0_id': 1111,
        'children0_children0_children0_name': 'Ben',
        'children0_children0_id': 111,
        'children0_children0_name': 'Thiago',
        'children0_id': 11,
        'children0_name': 'Zanza',
        'children1_children0_children0_id': 1211,
        'children1_children0_children0_name': 'Nicolas',
        'children1_children0_id': 121,
        'children1_children0_name': 'Sergio',
        'children1_children1_id': 122,
        'children1_children1_name': 'Ana',
        'children1_id': 12,
        'children1_name': 'Sergio',
        'id': 1,
        'name': 'Sebastiao',
      }

      const result = indexService.myFlatFunction(arr)
      expect(result).to.deep.equal(expected)
    })
  })

  describe('reduceToFlat', () => {
    it('should transform a nested array of objects into a flat array of objects', () => {
      const arr = [
        {
          id: 11,
          name: 'Zanza',
          children: [
            {
              id: 111,
              name: 'Thiago',
              children: [
                {
                  id: 1111,
                  name: 'Ben'
                }
              ]
            }
          ],
        },
        {
          id: 12,
          name: 'Sergio',
          children: [
            {
              id: 121,
              name: 'Sergio',
              children: [
                {
                  id: 1211,
                  name: 'Nicolas'
                }
              ]
            },
            {
              id: 122,
              name: 'Ana'
            }
          ]
        }
      ]
      const expected = [
        {
          'children0_children0_id': 1111,
          'children0_children0_name': 'Ben',
          'children0_id': 111,
          'children0_name': 'Thiago',
          'id': 11,
          'name': 'Zanza',
        },
        {
          'children0_children0_id': 1211,
          'children0_children0_name': 'Nicolas',
          'children0_id': 121,
          'children0_name': 'Sergio',
          'children1_id': 122,
          'children1_name': 'Ana',
          'id': 12,
          'name': 'Sergio',
        },
      ]

      const result = indexService.reduceToFlat(arr)
      expect(result).to.deep.equal(expected)
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
    it('should take two arguments, flattens the objects and returns an HTML Table of all the values and what changed', () => {
      const expected = '<table class="d-block overflow-scroll table table-striped table-bordered table-hover"><thead><tr><th scope="col">id0</th><th scope="col">name0</th><th scope="col">age0</th><th scope="col">children0_id0</th><th scope="col">children0_name0</th><th scope="col">children0_age0</th><th scope="col">children1_id0</th><th scope="col">children1_name0</th><th scope="col">children1_age0</th><th scope="col">children1_children0_id0</th><th scope="col">children1_children0_name0</th><th scope="col">children1_children1_id0</th><th scope="col">children1_children1_name0</th><th scope="col">children1_children1_age0</th><th scope="col">children2_id0</th><th scope="col">children2_name0</th><th scope="col">children0_somekey0</th><th scope="col">children1_children0_age0</th><th scope="col">children1_children1_somekey0</th><th scope="col">children2_age0</th><th scope="col">id1</th><th scope="col">name1</th><th scope="col">age1</th><th scope="col">children0_id1</th><th scope="col">children0_name1</th><th scope="col">children0_age1</th><th scope="col">children0_children0_id1</th><th scope="col">children0_children0_name1</th><th scope="col">children0_children0_age1</th><th scope="col">children0_children1_id1</th><th scope="col">children0_children1_name1</th><th scope="col">children0_children1_age1</th><th scope="col">children0_children1_children0_id1</th><th scope="col">children0_children1_children0_name1</th><th scope="col">children0_children1_children0_age1</th><th scope="col">id2</th><th scope="col">name2</th><th scope="col">age2</th><th scope="col">children0_id2</th><th scope="col">children0_name2</th><th scope="col">children0_age2</th><th scope="col">children1_id2</th><th scope="col">children1_name2</th><th scope="col">children1_age2</th><th scope="col">children1_children0_id2</th><th scope="col">children1_children0_name2</th><th scope="col">children1_children0_age2</th><th scope="col">id3</th><th scope="col">name3</th><th scope="col">age3</th><th scope="col">id4</th><th scope="col">name4</th><th scope="col">age4</th><th scope="col">children0_id4</th><th scope="col">children0_name4</th><th scope="col">children0_age4</th></tr></thead><tbody><tr><td >23b9dbff</td><td >Jessie</td><td class="bg-danger bg-opacity-10">50</td><td >5c0f3094</td><td class="bg-danger bg-opacity-10">Peter</td><td >20</td><td >c1484221</td><td class="bg-danger bg-opacity-10">Paul</td><td >32</td><td >2e6d866e</td><td >Carol</td><td >e48a27ad</td><td >Hester</td><td >15</td><td >8a265c23</td><td >Hilda</td><td class="bg-danger bg-opacity-10"></td><td class="bg-danger bg-opacity-10"></td><td class="bg-danger bg-opacity-10"></td><td class="bg-danger bg-opacity-10"></td><td >53164b2b</td><td class="bg-danger bg-opacity-10">Mathew</td><td >70</td><td >b14a960c</td><td >Spencer</td><td >45</td><td >ff3c260c</td><td class="bg-danger bg-opacity-10">Joseph</td><td class="bg-danger bg-opacity-10">22</td><td >7c60920a</td><td >Robert</td><td >27</td><td >0e11874f</td><td >Ian</td><td >2</td><td >5a4bdc98</td><td >Claire</td><td >63</td><td >014b62a3</td><td >Adrian</td><td class="bg-danger bg-opacity-10">41</td><td >a1899541</td><td >Julie</td><td >32</td><td >013362a3</td><td >Patricia</td><td class="bg-danger bg-opacity-10">4</td><td >1a4b4fh98</td><td >Sergio</td><td >30</td><td class="bg-danger bg-opacity-10"></td><td class="bg-danger bg-opacity-10"></td><td class="bg-danger bg-opacity-10"></td><td class="bg-danger bg-opacity-10"></td><td class="bg-danger bg-opacity-10"></td><td class="bg-danger bg-opacity-10"></td></tr><tr><td >23b9dbff</td><td >Jessie</td><td class="fw-bold bg-success bg-opacity-10">51</td><td >5c0f3094</td><td class="fw-bold bg-success bg-opacity-10">Pedro</td><td class="fw-bold bg-danger bg-opacity-10">DELETED</td><td >c1484221</td><td class="fw-bold bg-success bg-opacity-10">Paulo</td><td >32</td><td >2e6d866e</td><td >Carol</td><td >e48a27ad</td><td >Hester</td><td class="fw-bold bg-danger bg-opacity-10">DELETED</td><td >8a265c23</td><td >Hilda</td><td class="fw-bold bg-success bg-opacity-10">HAHA</td><td class="fw-bold bg-success bg-opacity-10">12</td><td class="fw-bold bg-success bg-opacity-10">Hestersome</td><td class="fw-bold bg-success bg-opacity-10">25</td><td >53164b2b</td><td class="fw-bold bg-success bg-opacity-10">Mateus</td><td >70</td><td >b14a960c</td><td >Spencer</td><td >45</td><td >ff3c260c</td><td class="fw-bold bg-success bg-opacity-10">Jose</td><td class="fw-bold bg-success bg-opacity-10">32</td><td >7c60920a</td><td >Robert</td><td >27</td><td >0e11874f</td><td >Ian</td><td >2</td><td >5a4bdc98</td><td >Claire</td><td >63</td><td >014b62a3</td><td class="fw-bold bg-danger bg-opacity-10">DELETED</td><td class="fw-bold bg-success bg-opacity-10">45</td><td >a1899541</td><td >Julie</td><td >32</td><td >013362a3</td><td >Patricia</td><td class="fw-bold bg-success bg-opacity-10">41</td><td class="fw-bold bg-danger bg-opacity-10">DELETED</td><td class="fw-bold bg-danger bg-opacity-10">DELETED</td><td class="fw-bold bg-danger bg-opacity-10">DELETED</td><td class="fw-bold bg-success bg-opacity-10">514bs4fh4</td><td class="fw-bold bg-success bg-opacity-10">Cindy</td><td class="fw-bold bg-success bg-opacity-10">29</td><td class="fw-bold bg-success bg-opacity-10">b13a910c</td><td class="fw-bold bg-success bg-opacity-10">Nicolas</td><td class="fw-bold bg-success bg-opacity-10">1</td></tr></tbody></table>'

      const result = indexService.arrayDiffToHtmlTable(prevArray, currArray)
      expect(result).to.deep.equal(expected)
    })
  })

})
