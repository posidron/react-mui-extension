import { rename } from "fs/promises";
import { join } from "path";

async function postBuild() {
  const dist = "dist";

  // Rename the HTML files to match manifest.json expectations
  await rename(
    join(dist, "src/pages/popup/index.html"),
    join(dist, "popup.html")
  );
  await rename(join(dist, "src/pages/tab/index.html"), join(dist, "tab.html"));
  await rename(
    join(dist, "src/pages/sidebar/index.html"),
    join(dist, "sidebar.html")
  );
}

postBuild().catch(console.error);
