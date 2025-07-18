function getMinMax(str) {
  const array = str.split(' ')
    .map(elem => Number(elem))
    .filter(elem => !isNaN(elem))
    .sort((a, b) => a-b);

  return {
    min: array[0],
    max: array[array.length-1],
  }
}
