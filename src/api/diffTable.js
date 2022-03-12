const express = require('express')
const router = express.Router()

const mockedHeaders = [
  '_id',
  'someKey',
  'meta_subKey1',
  'meta_subKey2',
  'meta_subKey3',
]

const mockedData = [
  {
    _id: {
      value: 1,
      class: ''
    },
    someKey: {
      value: 'HANGUP',
      class: 'fw-bold'
    },
    meta_subKey1: {
      value: 1234,
      class: ''
    },
    meta_subKey2: {
      value: 'DELETED',
      class: 'fw-bold'
    },
    meta_subKey3: {
      value: '',
      class: ''
    },
  },
  {
    _id: {
      value: 2,
      class: 'fw-bold'
    },
    someKey: {
      value: 'RINGING',
      class: 'fw-bold'
    },
    meta_subKey1: {
      value: 5678,
      class: 'fw-bold'
    },
    meta_subKey2: {
      value: 207,
      class: 'fw-bold'
    },
    meta_subKey3: {
      value: 52,
      class: 'fw-bold'
    },
  }
]

router.get('/', (req, res) => {
  res.render('diff-table', {
    tableHeaders: mockedHeaders,
    tableData: mockedData,
  })
})

module.exports = router
