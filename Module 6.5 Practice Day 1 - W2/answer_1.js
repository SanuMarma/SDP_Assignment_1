const result = 80;

if (result < 0) {
  console.log("failed");
} else if (result >= 0 && result < 40) {
  console.log("You got C grade");
} else if (result >= 40 && result < 60) {
  console.log("You got B grade");
} else if (result >= 60 && result < 70) {
  console.log("You got A- grade");
} else if (result >= 70 && result < 80) {
  console.log("You got A grade");
} else if (result >= 80 && result < 100) {
  console.log("You got A+ grade");
} else {
  console.log("invalid");
}
