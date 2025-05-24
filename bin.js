#!/usr/bin/env node

const args = process.argv.splice(2);
if (args.length === 0) {
  // User enters empty npx command
  console.log("Please enter the add command");
} else {
  if (args[0] === "add") {
    console.log("add");
    console.log(args);
  } else {
    // User enters command npx command with first arg not being add.
    console.log("Please enter the add command");
  }
}
