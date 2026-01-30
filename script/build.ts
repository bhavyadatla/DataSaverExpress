import esbuild from "esbuild";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

async function build() {
  try {
    console.log("Building backend...");
    if (!fs.existsSync("dist")) {
      fs.mkdirSync("dist");
    }

    await esbuild.build({
      entryPoints: ["server/index.ts"],
      bundle: true,
      platform: "node",
      format: "cjs",
      outfile: "dist/index.cjs",
      external: ["pg-native", "fsevents"],
      packages: "external",
    });

    console.log("Preparing public files...");
    if (fs.existsSync("dist/public")) {
      fs.rmSync("dist/public", { recursive: true, force: true });
    }
    fs.mkdirSync("dist/public", { recursive: true });
    
    // Copy public directory to dist/public
    execSync("cp -r public/* dist/public/", { stdio: "inherit" });

    console.log("Build completed successfully!");
  } catch (error) {
    console.error("Build failed:", error);
    process.exit(1);
  }
}

build();
