const myFlatFunction = (ob) => {
  let result = {};
  
  for (const i in ob) {
    if (Array.isArray(ob[i])) {
      for (let k = 0; k < ob[i].length; k++) {
        const temp = myFlatFunction(ob[i][k]);
        for (const j in temp) {
          result[i + '_' + j] = temp[j];
        }
      }
    } else if ((typeof ob[i]) === 'object') {
      const temp = myFlatFunction(ob[i]);
      for (const j in temp) {
        result[i + '_' + j] = temp[j];
      }
    } else {
      result[i] = ob[i];
    }
  }

  return result;
};

/*
 * @param prevArray is an array of objects
 * @param currArray is an array of objects
 * @return a string with HTML markup in it, should return null if error occurs.
 */
module.exports.arrayDiffToHtmlTable = function( prevArray, currArray) {
  try {
    
    
    const flattenPrevArray = prevArray.reduce((acc, curr) => {
      acc.push(myFlatFunction(curr))
      return acc
    }, [])

    const flattenCurrArray = currArray.reduce((acc, curr) => {
      acc.push(myFlatFunction(curr))
      return acc
    }, [])

    const resultArrayHeader = []
    const resultArrayPrevData = []
    const resultArrayCurrData = []
    let count = 1

    flattenPrevArray.forEach(prevOb => {
      const currFoundId = flattenCurrArray.findIndex(currOb => currOb.id === prevOb.id)

      // Deleted keys
      if (currFoundId === -1) {
        for (const prevI in prevOb) {
          resultArrayHeader.push(prevI + count)
          resultArrayPrevData.push({ key: prevI + count, value: prevOb[prevI] })
          resultArrayCurrData.push({ key: prevI + count, value: 'DELETED', class: 'fw-bold bg-danger bg-opacity-10' })
        }
      } else {
        const currOb = flattenCurrArray[currFoundId]

        for (const prevI in prevOb) {
          resultArrayHeader.push(prevI + count)
          resultArrayPrevData.push({ key: prevI + count, value: prevOb[prevI] })

          if (Object.hasOwnProperty.call(currOb, prevI)) {
            // Same key value
            if (prevOb[prevI] === currOb[prevI]) {
              resultArrayCurrData.push({ key: prevI + count, value: currOb[prevI] })
            }
            // Value changed
            else {
              resultArrayCurrData.push({ key: prevI + count, value: currOb[prevI], class: 'fw-bold bg-success bg-opacity-10' })
            }
            delete currOb[prevI]
          }
          // Deleted key
          else {
            resultArrayCurrData.push({ key: prevI + count, value: 'DELETED', class: 'fw-bold bg-danger bg-opacity-10' })
          }
        }

        // Added keys
        for (const currI in currOb) {
          resultArrayHeader.push(currI + count,)
          resultArrayPrevData.push({ key: currI + count, value: '' })
          resultArrayCurrData.push({ key: currI + count, value: currOb[currI], class: 'fw-bold bg-success bg-opacity-10' })
        }

        flattenCurrArray.splice(currFoundId, 1)
      }

      count ++
    })

    flattenCurrArray.forEach(currOb => {
      // Added keys
      for (const currI in currOb) {
        resultArrayHeader.push(currI + count,)
        resultArrayPrevData.push({ key: currI + count, value: '' })
        resultArrayCurrData.push({ key: currI + count, value: currOb[currI], class: 'fw-bold bg-success bg-opacity-10' })
      }

      count ++
    })


    let html = ''
    html += '<table class="d-block overflow-scroll table table-striped table-bordered table-hover">'
    html += '<thead>'
    html += '<tr>'
    html += generateTableHeader(resultArrayHeader)
    html += '</tr>'
    html += '</thead>'
    html += '<tbody>'
    html += '<tr>'
    html += generateTableDoc(resultArrayPrevData)
    html += '</tr>'
    html += '<tr>'
    html += generateTableDoc(resultArrayCurrData)
    html += '</tr>'
    html += '</tbody>'
    html += '</table>'

    return html
  } catch (error) {
    console.error(error)
    return null 
  }
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
