const crypto = require("crypto");

exports.MAX_PARTITION_KEY_LENGTH = 256;
const MAX_PARTITION_KEY_LENGTH = exports.MAX_PARTITION_KEY_LENGTH;

function createHash(input) {
  return crypto.createHash("sha3-512").update(input).digest("hex");
}

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  const { partitionKey } = event;

  if (partitionKey) {
    return partitionKey.length > MAX_PARTITION_KEY_LENGTH ? createHash(partitionKey) : partitionKey;
  } else {
    const data = JSON.stringify(event);
    return createHash(data)
  }
};