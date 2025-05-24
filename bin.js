#!/usr/bin/env node
import fs from "fs/promises";
import path from "path";
import { execSync } from "child_process";
const args = process.argv.splice(2);
if (args.length === 0) {
  // User enters empty npx command
  console.log("Please enter the add command");
} else {
  if (args[0] === "add") {
    if (args[1] === "mongodb") {
      // Install mongodb
      try {
        console.log(`Installing mongodb...`);
        execSync(`npm install mongodb`, { stdio: "inherit" });
      } catch (err) {
        console.error(`❌ Failed to install mongodb:`, err.message);
        process.exit(1);
      }
      // Adding mongoDB file
      try {
        const url =
          "https://raw.githubusercontent.com/Hajurian/devquickstart/refs/heads/main/components/mongodb.ts";
        const outputDirectory = "./src/lib";
        const outputPath = path.join(outputDirectory, "mongodb.ts");
        const res = await fetch(url);
        const code = await res.text();
        await fs.mkdir(outputDirectory, { recursive: true });
        await fs.writeFile(outputPath, code);

        console.log(`mongodb.ts added successfully.`);
      } catch (e) {
        console.error(`Error: ${e}`);
      }
      // Add mongoclientid to .env file
      try {
        const filePath = "./.env";
        let existing = "";
        try {
          existing = await fs.readFile(filePath, "utf-8");
        } catch {
          await fs.writeFile(filePath, "MONGOCLIENTID=");
        }
        if (!existing.includes("MONGOCLIENTID")) {
          await fs.writeFile(
            filePath,
            existing + "MONGOCLIENTID=your-client-id-here\n"
          );
        }
        console.log(`MONGOCLIENTID successfully added`);
      } catch (e) {
        console.error(`Error: ${e}`);
        process.exit(1);
      }
    }
  } else {
    // User enters command npx command with first arg not being add.
    console.log("Please enter the add command");
  }
}
