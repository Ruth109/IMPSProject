const helpers = require('handlebars');

// Este helper nos permite comparar 2 valores en la plantilla handlebars
helpers.registerHelper('eq', function (a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this); // Utilizamos un if ternario
});

// Helper para formatear la fecha
helpers.registerHelper('formatDate', function (date) {
    const formattedDate = new Date(date).toISOString().split('T')[0];
    return formattedDate;
});

module.exports = helpers;