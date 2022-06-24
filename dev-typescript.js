import esbuild from "esbuild";
import esbuildSvelte from "esbuild-svelte";
import sveltePreprocess from "svelte-preprocess";

esbuild
  .build({
    entryPoints: ["index.ts"],
    mainFields: ["svelte", "browser", "module", "main"],
    bundle: true,
    outdir: "./dist",
    plugins: [
      esbuildSvelte({
        preprocess: sveltePreprocess(),
      }),
    ],
  })
  .catch(() => process.exit(1));