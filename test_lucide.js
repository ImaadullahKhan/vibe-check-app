const icons = require('lucide-react');
console.log(Object.keys(icons).filter(k => /burger|sandwich|pizza|beef|meat|food|drink|cup|glass|cake|coffee|utensils|croissant/i.test(k)).join(', '));
