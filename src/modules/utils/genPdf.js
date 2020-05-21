const pdf = require('html-pdf');

export default (info) => {
    const html = `<div>test</div>`
    pdf.create(html, options).toFile('./cv.pdf', function(err, res) {
        if (err) return console.log(err);
        console.log(res); // { filename: '/app/businesscard.pdf' }
    });
}



const options = {
    format: 'A4', 
    border: {
        top: '0.5cm',            
        right: '1cm',
        bottom: '0.5cm',
        left: '1cm'
    },
}