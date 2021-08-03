const generateInputId = label => {
  const formatedLabel = label
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g,'-')
    .replace(/(^-|-$)/g,'')

  return `${Date.now}-${formatedLabel}`
}

const buildRequestFromInputData = inputData => {
  const requestEntries = Object
    .entries(inputData)
    .map(([key, data]) => [key, data.value])

  return Object.fromEntries(requestEntries)
}

export {
  generateInputId,
  buildRequestFromInputData,
}
