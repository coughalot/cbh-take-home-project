# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

assertions to add:

no input: return string "0" - provided

typechecking - ts

validation: 
event input has partitionKey field
candidate exists
candidate is a string
candidate max length is not more than MAX_PARTITION_KEY_LENGTH

candidate is a sha3-512 hash

ok so if candidate not more than 256, it doesn't get hashed, 

if input is a string, returns a hashed version of that string


--- 

I went outside the tab to look up https://nodejs.org/api/crypto.html#hashdigestencoding


exported MAX_PARTITION_KEY_LENGTH to be able to use it in test specs, without hard-coding the value.

