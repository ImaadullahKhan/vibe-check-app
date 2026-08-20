const icons = require('lucide-react');
console.log(Object.keys(icons).filter(k => /burger|sandwich|pizza|beef|meat|food|drink|cup|glass|cake|coffee|utensils|croissant|wrap|cookie/i.test(k)).join(', '));
