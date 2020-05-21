const pdf = require('html-pdf');

export default (info) => {
    const html = `<div>test</div>`
    pdf.create(html, options).toFile('./businesscard.pdf', function(err, res) {
        if (err) return console.log(err);
        console.log(res); // { filename: '/app/businesscard.pdf' }
    });
}