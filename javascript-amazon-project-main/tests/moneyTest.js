import { formatCurrency } from "../scripts/utils/money.js";

console.log('converts cents to dollars')

if(formatCurrency(2095) === "20.95"){
    console.log("Test passed: formatCurrency(2095) returns '20.95' as expected.");
}
else {
    
    console.log("Test failed: formatCurrency(2095) should return '20.95'");
}
console.log('converts 0 to dollars')

if(formatCurrency(0) === "0.00"){
    console.log("Test passed: formatCurrency(2095) returns '20.95' as expected.");
}
else {
    
    console.log("Test failed: formatCurrency(2095) should return '20.95'");
}

console.log('rounds to nearest cent')

if(formatCurrency(2000.5) === "20.01"){
    console.log("Test passed: formatCurrency(2095) returns '20.95' as expected.");
}
else {
    
    console.log("Test failed: formatCurrency(2095) should return '20.95'");
}