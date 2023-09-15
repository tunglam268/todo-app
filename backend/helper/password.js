function generateRandomPassword(length) {
  const charset = "abcdefghijklmnopqrstuvwxyz";
  let password = "";

  // Thêm một ký tự đặc biệt
  const specialChar = "!@#$%^&*()-_";
  const randomSpecialChar = specialChar[Math.floor(Math.random() * specialChar.length)];
  password += randomSpecialChar;

  // Thêm một ký tự viết hoa
  const uppercaseChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomUppercaseChar = uppercaseChar[Math.floor(Math.random() * uppercaseChar.length)];
  password += randomUppercaseChar;

  // Thêm một ký tự số
  const digitChar = "0123456789";
  const randomDigitChar = digitChar[Math.floor(Math.random() * digitChar.length)];
  password += randomDigitChar;

  // Đảm bảo rằng độ dài password đã tạo đủ theo yêu cầu
  for (let i = 3; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }

  // Trộn ngẫu nhiên chuỗi mật khẩu
  password = password.split('');
  for (let i = password.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [password[i], password[j]] = [password[j], password[i]];
  }

  return password.join('');
}
module.exports = generateRandomPassword;