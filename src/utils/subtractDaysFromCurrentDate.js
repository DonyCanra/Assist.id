function subtractDaysFromCurrentDate(days) {
  var currentDate = new Date();
  var resultDate = new Date(currentDate);
  resultDate.setDate(currentDate.getDate() - days);

  // Format tanggal dengan metode bantuan
  var formattedDate = resultDate.toISOString().split("T")[0];

  return formattedDate;
}

// Contoh penggunaan: kurangkan 7 hari dari tanggal saat ini
// var sevenDaysAgo = subtractDaysFromCurrentDate(0);

// Print the result
// console.log(sevenDaysAgo);

export default subtractDaysFromCurrentDate;
