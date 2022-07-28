const { deterministicPartitionKey, MAX_PARTITION_KEY_LENGTH } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it(`Returns literal input if provided partitionKey length is less than MAX_PARTITION_KEY_LENGTH of ${MAX_PARTITION_KEY_LENGTH}`, () => {
    const result = deterministicPartitionKey({ partitionKey: 'foo' });
    console.log(`----> dpk.test.js: Line 32:  result:`, result);
    console.log(`----> dpk.test.js: Line 35:  typeof:`, typeof result)
    expect(result).toBe('foo');
    expect(typeof result).toBe('string');
  });

  it(`Returns a hexidecimal hash string of input if provided input is a string whose length is less than MAX_PARTITION_KEY_LENGTH of ${MAX_PARTITION_KEY_LENGTH}`, () => {
    const result = deterministicPartitionKey('bar');
    console.log(`----> dpk.test.js: Line 32:  result:`, result);
    console.log(`----> dpk.test.js: Line 35:  typeof:`, typeof result)
    expect(typeof result).toBe('string')
    expect(result.length).toBe(128);
  });

  it(`Returns a hexidecimal hash string of input if provided input is a number whose length is less than MAX_PARTITION_KEY_LENGTH of ${MAX_PARTITION_KEY_LENGTH}`, () => {
    const result = deterministicPartitionKey(4);
    console.log(`----> dpk.test.js: Line 32:  result:`, result);
    console.log(`----> dpk.test.js: Line 35:  typeof:`, typeof result)
    expect(typeof result).toBe('string')
    expect(result.length).toBe(128);
  });

  it(`a single digit input`, () => {
    const result = deterministicPartitionKey('foo');
    console.log(`----> dpk.test.js: Line 32:  result:`, result);
    console.log(`----> dpk.test.js: Line 35:  typeof:`, typeof result)
  });

  it('Returns a sha-512 hash when successful', () => {
    // let result = deterministicPartitionKey({ foo: 'bar' });
    // console.log('result1', result);
    // a419a15de4a65c3dba49c38b4485cd4dce1dde4d18f5b965d90f0649bef54252ec4e76dbcaa603708e8e8ebbe848ba484e81e23b7823808b5b8e5f4222d122e8
    // result = deterministicPartitionKey({ partitionKey: 'bar' });
    // console.log('result2', result);
    // bar

    // empty object
    // result = deterministicPartitionKey({});
    // console.log('result3', result);
    // // c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862
    // result = deterministicPartitionKey({});
    // console.log('result4', result);
    // bar
  });




});
