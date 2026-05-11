const fs = require('fs')
const path = require('path')

test('searchProducts uses parameterized query (replacements) and no string concatenation', () => {
  const filePath = path.join(__dirname, '..', 'data', 'static', 'codefixes', 'dbSchemaChallenge_1.ts')
  const content = fs.readFileSync(filePath, 'utf8')
  // Ensure the code uses sequelize replacements for parameterized queries
  expect(content).toMatch(/replacements\s*:/)
  // Ensure there is no concatenation of criteria into the SQL string
  expect(content).not.toMatch(/\+\s*criteria\s*\+|"%\\"\+criteria\+\\"%"|'%"\+criteria\+"%'/)
})
