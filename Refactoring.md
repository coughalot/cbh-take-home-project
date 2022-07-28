# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
I was not very familiar with the digest method of the node crypto package, so my first thought was to look at the docs for that. I went outside the tab to look up https://nodejs.org/api/crypto.html#hashdigestencoding, but then I remembered the instructions explicitly said "Do not switch tabs during the interview and instead use the in-view search".  I did not see any option to search from within https://coderbyte.com/question/engineering-skills-assessment-67jdw66nr0 so I decided I'd have to manually figure out the code by dissecting it via some console.logging.  That allowed me to make enough observations about the expected behavior that I was able to come up with some test cases.  I exported MAX_PARTITION_KEY_LENGTH to be able to use it in test specs, without hard-coding the value.  After I had come up with some tests I realized that I was spending too long on this refactor portion of the test and hadn't started the Ticket Breakdown yet, but I knew there were still a few more validations that I need to make, so I took a little longer than I should have in order to figure out what those assertions were and codify them into tests. The process of writing the tests allowed me to draw some conclusions about redundancies in the code and some unnecessary conditionals, which allowed me to stream-line the code quite a bit.  I did have a few failing tests after I'd finished my first refactor, which made me glad I'd spent the time making those extra validations (although still feeling under the gun because I hadn't started the Ticket Breakdown yet).


