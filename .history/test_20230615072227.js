


function generateUniqueId() {
  const timestamp = Date.now();
  const randomInt = Math.floor(Math.random() * 1000000); // Số ngẫu nhiên từ 0 đến 999999
  const uniqueId = timestamp * 1000000 + randomInt; // Kết hợp timestamp và số ngẫu nhiên thành một số duy nhất
  return uniqueId;
}
const id = generateUniqueId()
console.log(id)