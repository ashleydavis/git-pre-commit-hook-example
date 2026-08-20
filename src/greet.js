//
// The whole application: one function, so there is something for a test to test.
//
// This is deliberately wrong. The test below it expects "Hello", this says "Hi", so the test fails
// and the pre-commit hook refuses the commit. Changing "Hi" to "Hello" is the one-word fix.
//
export function greet(name) {
    return `Hi, ${name}!`;
}
