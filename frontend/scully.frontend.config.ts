import { ScullyConfig } from '@scullyio/scully';

/** this loads the default render plugin, remove when switching to something else. */


export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "frontend",
  spsModulePath: 'YOUR OWN MODULE PATH HERE',
  outDir: '../public',
  routes: {
  }
};