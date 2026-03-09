function generateDynamicName(baseName) {
  const timestamp = Date.now();
  return `${baseName}_${timestamp}`;
}

module.exports = {
  generateDynamicName
};