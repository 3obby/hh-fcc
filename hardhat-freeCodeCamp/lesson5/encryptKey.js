const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
  const encrypted = await wallet.encrypt(
    process.env.PK_PASSWORD,
    process.env.PRIVATE_KEY
  );
  console.log(encrypted);
  fs.writeFileSync("./.encryptedKey.json", encrypted);
}

main()
  .then(() => {
    console.log("Closing");
    process.exit(0);
  })
  .catch((error) => {
    console.log("Error Encountered:");
    console.error(error);
    process.exit(1);
  });
