import { lesson as setup } from "./lessons/setup.js";
import { lesson as modeEnvConfig } from "./lessons/mode-env-config.js";
import { lesson as entryOutput } from "./lessons/entry-output.js";
import { lesson as multiPageApp } from "./lessons/multi-page-app.js";
import { lesson as resolveAlias } from "./lessons/resolve-alias.js";
import { lesson as loaders } from "./lessons/loaders.js";
import { lesson as cssProduction } from "./lessons/css-production.js";
import { lesson as assetStrategy } from "./lessons/asset-strategy.js";
import { lesson as babelTypescriptPostcss } from "./lessons/babel-typescript-postcss.js";
import { lesson as plugins } from "./lessons/plugins.js";
import { lesson as configMaintenance } from "./lessons/config-maintenance.js";
import { lesson as devServerHmr } from "./lessons/dev-server-hmr.js";
import { lesson as buildPerformance } from "./lessons/build-performance.js";
import { lesson as sourceMapDebug } from "./lessons/source-map-debug.js";
import { lesson as treeShaking } from "./lessons/tree-shaking.js";
import { lesson as splittingCache } from "./lessons/splitting-cache.js";
import { lesson as productionCache } from "./lessons/production-cache.js";
import { lesson as bundleAnalysis } from "./lessons/bundle-analysis.js";
import { lesson as externalsCdn } from "./lessons/externals-cdn.js";
import { lesson as definePluginEnv } from "./lessons/define-plugin-env.js";
import { lesson as buildSecurity } from "./lessons/build-security.js";
import { lesson as staticDeployment } from "./lessons/static-deployment.js";
import { lesson as ciQuality } from "./lessons/ci-quality.js";
import { lesson as moduleFederation } from "./lessons/module-federation.js";
import { lesson as ecosystemMigration } from "./lessons/ecosystem-migration.js";

export const lessons = [
  setup,
  modeEnvConfig,
  entryOutput,
  multiPageApp,
  resolveAlias,
  loaders,
  cssProduction,
  assetStrategy,
  babelTypescriptPostcss,
  plugins,
  configMaintenance,
  devServerHmr,
  buildPerformance,
  sourceMapDebug,
  treeShaking,
  splittingCache,
  productionCache,
  bundleAnalysis,
  externalsCdn,
  definePluginEnv,
  buildSecurity,
  staticDeployment,
  ciQuality,
  moduleFederation,
  ecosystemMigration
];
