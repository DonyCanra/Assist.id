function subtractDaysFromCurrentDate(days) {
  var currentDate = new Date();
  var resultDate = new Date(currentDate);
  resultDate.setDate(currentDate.getDate() - days);
  return resultDate;
}

// Contoh penggunaan: kurangkan 7 hari dari tanggal saat ini
// var sevenDaysAgo = subtractDaysFromCurrentDate(7);

// Print the result
// console.log(sevenDaysAgo);
export default subtractDaysFromCurrentDate;
