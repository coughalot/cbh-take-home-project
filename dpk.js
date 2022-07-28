const crypto = require("crypto");
exports.MAX_PARTITION_KEY_LENGTH = 256;

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = exports.MAX_PARTITION_KEY_LENGTH;
  let candidate;

  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      console.log(`----> dpk.js: Line 13: data :`, data);
      candidate = crypto.createHash("sha3-512").update(data).digest("hex");
      console.log(`----> dpk.js: Line 15:  candidate:`, candidate)
    }
  }

  if (candidate) {
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
      console.log(`----> dpk.js: Line 22: candidate wasnt a string before so stringify :`, candidate)
    }
  } else {
    console.log('no input')
    candidate = TRIVIAL_PARTITION_KEY;
  }

  console.log(`----> dpk.js: Line 37:  candidate.length:`, candidate.length)


  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate;
};