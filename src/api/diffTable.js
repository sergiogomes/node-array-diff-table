const express = require('express')
const router = express.Router()
const diffService = require('../services/index')
const { prevArray, currArray} = require('../../mocks/index')

router.get('/', (req, res) => {
  res.render('diff-table', {
    tableHTML: diffService.arrayDiffToHtmlTable(prevArray, currArray),
  })
})

module.exports = router
