const generateInputId = label => {
  const formatedLabel = label
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g,'-')
    .replace(/(^-|-$)/g,'')

  return `${Date.now}-${formatedLabel}`
}

export {
  generateInputId,
}
