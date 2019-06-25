
const fs = require("fs");

const countryList = ["MA", "MN", "MT", "ND", "HI", "ID", "WA", "AZ", "CA", "CO", "NV", "NM", "OR", "UT", "WY", "AR", "IA", "KS", "MO", "NE", "OK", "SD", "LA", "TX", "CT", "NH", "RI", "VT", "AL", "FL", "GA", "MS", "SC", "IL", "IN", "KY", "NC", "OH", "TN", "VA", "WI", "WV", "DE", "DC", "MD", "NJ", "NY", "PA", "ME", "MI", "AK"];

const data = countryList.map(x => Math.random().toFixed(2));

const text = countryList.map((c, i) => `${c},${data[i]}`);
console.log(`country,value\n${text.join("\n")}`);
