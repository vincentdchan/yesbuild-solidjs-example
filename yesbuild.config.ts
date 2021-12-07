import yesbuild, { useEsBuild, useTask, useDevServer, useCopy, useTaskDir } from 'yesbuild-core';
import * as path from 'path';
import { useSolidJS } from 'yesbuild-solidjs';

// The official SolidJS uses babel to transpile the syntaxes.
// I use a plugin to transpile all files using babel.
// All the outpus are in the folder `build/solidjs`.
yesbuild.defineTask('solidjs', function* () {
  yield useSolidJS({
    files: './src/**/*',
    relative: './src',
  });
});

yesbuild.defineTask('default', function* () {
  // This is telling yesbuild that the `default` task dependes on `solidjs` tasks.
  // So the `solidjs` task MUST be ran BEFORE `default` task.
  // And here we received the directory of `solidjs`.
  const { taskDir: solidJsTaskDir } = yield useTask('solidjs');

  // And we uses esbuild to bundle the outputs of solidjs
  return useEsBuild({
    entryPoints: [path.join(solidJsTaskDir, 'index.js')],
    bundle: true,
    platform: 'browser',
    format: 'esm',
    splitting: true,
    // We have depent 'solidjs', so it's no need to track the middle files.
    ignoreDeps: true,
  });
});

// We want to start a dev server so we needs html/css, copy them.
yesbuild.defineTask('assets', () => {
  const taskDir = useTaskDir();
  return useCopy(
    './assets/**',
    taskDir,
    { relative: './assets' }
  );
});

// This task starts a dev server
yesbuild.defineTask('serve', function*() {
  // Tell yesbuild to execute another two tasks
  const assetsResult = yield useTask('assets');
  const defaultResult = yield useTask('default');
  return useDevServer({
    port: 3000,
    // Tell yesbuild th map http requests to the directories
    // of another two tasks.
    mapTasks: [defaultResult, assetsResult],
  });
});
