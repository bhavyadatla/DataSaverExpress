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
    if (fs.existsSync("public")) {
      execSync("cp -r public/* dist/public/", { stdio: "inherit" });
    }

    // Copy data files to dist if they exist, to ensure they are available in production
    const dataFiles = ["projects.json", "clients.json", "contacts.json", "subscribers.json"];
    dataFiles.forEach(file => {
      if (fs.existsSync(file)) {
        fs.copyFileSync(file, path.join("dist", file));
      }
    });

    console.log("Build completed successfully!");
  } catch (error) {
    console.error("Build failed:", error);
    process.exit(1);
  }
}

build();
