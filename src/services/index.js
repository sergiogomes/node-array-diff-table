const myFlatFunction = ob => {
  let result = {}
  
  for (const i in ob) {
    if (Array.isArray(ob[i])) {
      for (let k = 0; k < ob[i].length; k++) {
        const temp = myFlatFunction(ob[i][k])
        for (const j in temp) {
          result[i + k + '_' + j] = temp[j]
        }
      }
    } else if ((typeof ob[i]) === 'object') {
      const temp = myFlatFunction(ob[i])
      for (const j in temp) {
        result[i + '_' + j] = temp[j]
      }
    } else {
      result[i] = ob[i]
    }
  }

  return result
}

const reduceToFlat = arr => {
  return arr.reduce((acc, curr) => {
    acc.push(myFlatFunction(curr))
    return acc
  }, [])
}

const turnArrayIntoObj = arr => {
  return arr.reduce((acc, curr) => {
    acc[curr.id] = curr
    return acc
  }, {})
}

const generateTableHeader = arr => {
  let html = ''
  arr.forEach(h => {
    html += `<th scope="col">${h}</th>`
  })

  return html
}

const generateTableDoc = arr => {
  let html = ''
  arr.forEach(d => {
    html += `<td ${d.class ? 'class="'+d.class+'"' : ''}>${d.value}</td>`
  })

  return html
}

const generateHTML = (arrayHeader, arrayPreviousData, arrayCurrentData) => {
  let html = ''
  html += '<table class="d-block overflow-scroll table table-striped table-bordered table-hover">'
  html += '<thead>'
  html += '<tr>'
  html += generateTableHeader(arrayHeader)
  html += '</tr>'
  html += '</thead>'
  html += '<tbody>'
  html += '<tr>'
  html += generateTableDoc(arrayPreviousData)
  html += '</tr>'
  html += '<tr>'
  html += generateTableDoc(arrayCurrentData)
  html += '</tr>'
  html += '</tbody>'
  html += '</table>'

  return html
}

/*
 * @param prevArray is an array of objects
 * @param currArray is an array of objects
 * @return a string with HTML markup in it, should return null if error occurs.
 */
const arrayDiffToHtmlTable = (prevArray, currArray) => {
  try {
    const flattenPreviousArray = reduceToFlat(prevArray)
    const flattenCurrentArray = reduceToFlat(currArray)
    const flattenCurrentObject = turnArrayIntoObj(flattenCurrentArray)
    
    let count = 0
    const resultArrayHeader = []
    const resultArrayPreviousData = []
    const resultArrayCurrentData = []

    flattenPreviousArray.forEach(prevOb => {
      if (Object.hasOwnProperty.call(flattenCurrentObject, prevOb.id)) {
        const currOb = flattenCurrentObject[prevOb.id]

        for (const prevI in prevOb) {
          resultArrayHeader.push(prevI + count)
    
          if (Object.hasOwnProperty.call(currOb, prevI)) {
            // Same key value
            if (prevOb[prevI] === currOb[prevI]) {
              resultArrayPreviousData.push({ key: prevI + count, value: prevOb[prevI] })
              resultArrayCurrentData.push({ key: prevI + count, value: currOb[prevI] })
            }
            // Value changed
            else {
              resultArrayPreviousData.push({ key: prevI + count, value: prevOb[prevI], class: 'bg-danger bg-opacity-10' })
              resultArrayCurrentData.push({ key: prevI + count, value: currOb[prevI], class: 'fw-bold bg-success bg-opacity-10' })
            }
            delete currOb[prevI]
          }
          // Deleted key
          else {
            resultArrayPreviousData.push({ key: prevI + count, value: prevOb[prevI] })
            resultArrayCurrentData.push({ key: prevI + count, value: 'DELETED', class: 'fw-bold bg-danger bg-opacity-10' })
          }
        }
    
        // Added keys
        for (const currI in currOb) {
          resultArrayHeader.push(currI + count,)
          resultArrayPreviousData.push({ key: currI + count, value: '', class: 'bg-danger bg-opacity-10' })
          resultArrayCurrentData.push({ key: currI + count, value: currOb[currI], class: 'fw-bold bg-success bg-opacity-10' })
        }
    
        delete flattenCurrentObject[prevOb.id]
      } else {
        for (const prevI in prevOb) {
          resultArrayHeader.push(prevI + count)
          resultArrayPreviousData.push({ key: prevI + count, value: prevOb[prevI] })
          resultArrayCurrentData.push({ key: prevI + count, value: 'DELETED', class: 'fw-bold bg-danger bg-opacity-10' })
        }
      }

      count ++
    })
    
    for (const i in flattenCurrentObject) {
      const currOb = flattenCurrentObject[i]
      // Added keys
      for (const currI in currOb) {
        resultArrayHeader.push(currI + count,)
        resultArrayPreviousData.push({ key: currI + count, value: '', class: 'bg-danger bg-opacity-10' })
        resultArrayCurrentData.push({ key: currI + count, value: currOb[currI], class: 'fw-bold bg-success bg-opacity-10' })
      }

      count ++
    }

    return generateHTML(resultArrayHeader, resultArrayPreviousData, resultArrayCurrentData)
  } catch (error) {
    console.error(error)
    return null 
  }
}

module.exports = {
  myFlatFunction,
  reduceToFlat,
  turnArrayIntoObj,
  generateTableHeader,
  generateTableDoc,
  generateHTML,
  arrayDiffToHtmlTable,
}
