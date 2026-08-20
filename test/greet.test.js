import { test } from "node:test";
import assert from "node:assert/strict";
import { greet } from "../src/greet.js";

//
// One test, run by Node's own test runner, so there is nothing to install.
//
test("greet says hello to the person it is greeting", () => {
    assert.equal(greet("world"), "Hello, world!");
});
