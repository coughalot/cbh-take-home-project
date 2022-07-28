const { deterministicPartitionKey, MAX_PARTITION_KEY_LENGTH } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it(`Returns literal input if provided partitionKey length is less than MAX_PARTITION_KEY_LENGTH of ${MAX_PARTITION_KEY_LENGTH}`, () => {
    const result = deterministicPartitionKey({ partitionKey: 'foo' });
    expect(result).toBe('foo');
    expect(typeof result).toBe('string');
  });

  it(`Returns a hexidecimal hash string of input if provided input has partitionKey property is a string longer than MAX_PARTITION_KEY_LENGTH of ${MAX_PARTITION_KEY_LENGTH}`, () => {
    const str257chars = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
    let result = deterministicPartitionKey({ partitionKey: str257chars });
    expect(typeof result).toBe('string');
    expect(result.length).toBe(128);
  });


  it(`Returns a hexidecimal hash string of input if provided input is a string whose length is less than MAX_PARTITION_KEY_LENGTH of ${MAX_PARTITION_KEY_LENGTH}`, () => {
    const result = deterministicPartitionKey('bar');
    expect(typeof result).toBe('string')
    expect(result.length).toBe(128);
  });


  it(`Returns a hexidecimal hash string of input if provided input is a number whose length is less than MAX_PARTITION_KEY_LENGTH of ${MAX_PARTITION_KEY_LENGTH}`, () => {
    const result = deterministicPartitionKey(4);
    expect(typeof result).toBe('string')
    expect(result.length).toBe(128);
  });

  it(`Returns a sha-512 hash when provided a partitionKey longer than MAX_PARTITION_KEY_LENGTH of ${MAX_PARTITION_KEY_LENGTH}`, () => {
    const result = deterministicPartitionKey('foo');
    expect(typeof result).toBe('string')
    expect(result.length).toBe(128);
  });


  it(`Returns a hexidecimal hash string of input if provided input is a string longer than MAX_PARTITION_KEY_LENGTH of ${MAX_PARTITION_KEY_LENGTH}`, () => {
    const str257chars = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
    let result = deterministicPartitionKey(str257chars);
    expect(typeof result).toBe('string');
    expect(result.length).toBe(128);
  });






});
