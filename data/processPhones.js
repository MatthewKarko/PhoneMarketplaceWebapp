const fs = require('fs')

const data = JSON.parse(fs.readFileSync('phonelisting_demo-raw.json', 'utf8'))

for (const phone of data) {
  phone.image = `/phone-images/${phone.brand}.jpeg`
  phone.disabled = 'disabled' in phone
}

fs.writeFileSync('phonelisting_demo-processed.json', JSON.stringify(data))
