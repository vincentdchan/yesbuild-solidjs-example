import yesbuild, { useEsBuild, useTask, useDevServer, useCopy, useTaskDir } from 'yesbuild-core';
import * as path from 'path';
import { useSolidJS } from 'yesbuild-solidjs';

yesbuild.defineTask('solidjs', function* () {
  yield useSolidJS({
    files: './src/**/*',
    relative: './src',
  });
});

yesbuild.defineTask('default', function* () {
  const { taskDir: solidJsTaskDir } = yield useTask('solidjs');
  return useEsBuild({
    entryPoints: [path.join(solidJsTaskDir, 'index.js')],
    bundle: true,
    platform: 'browser',
    format: 'esm',
    splitting: true,
  });
});

yesbuild.defineTask('assets', () => {
  const taskDir = useTaskDir();
  return useCopy(
    './assets/**',
    taskDir,
    { relative: './assets' }
  );
});

yesbuild.defineTask('serve', function*() {
  const assetsResult = yield useTask('assets');
  const defaultResult = yield useTask('default');
  return useDevServer({
    port: 3000,
    mapTasks: [defaultResult, assetsResult],
  });
});
