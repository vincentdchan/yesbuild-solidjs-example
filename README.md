
# Yesbuild + SolidJS Demo

This is an example to demonstrate how to use [Yesbuild](https://github.com/vincentdchan/yesbuild) to compile SolidJS. For the compilation,
I wrote [a plugin](https://github.com/vincentdchan/yesbuild/tree/master/packages/yesbuild-solidjs) to compile the syntax of SolidJS.

# Differences

The most frequently asked question is the differences between yesbuild and the others. Yesbuild uses a very traditional way to implement the functionality other bundlers provide.

Before the concept of bundler rises, people used [gulp](https://gulpjs.com/) tools to bind things together. The building procedure was divided into several tasks.

Yesbuild basically uses this idea, but it's smarter. You can use Yesbuild to write a lot of tasks to compose. Yesbuild can automatically analyse the dependencies and check if they are changed.

Unlike other bundlers, Yesbuild doesn't need a resident process to implement incremental build because all the intermediate files are persistent on the disk. Yesbuild can detect the changes and build the minimal tasks.

Instead of writing a lot of configs, you are using Yesbuild to write steps to build. Check the file [yesbuild.config.ts](./yesbuild.config.ts) in this directory. You can almost do anything with this config. So Yesbuild is more than a bundler. It's a build system. You can compose everything such as compiler/transpiler.

## Install

Clone the repo. Run `pnpm/npm/yarn`.

### Begin

```sh
pnpm run build
```

### Start a Dev Server

```sh
pnpm run start
```

## Unfinished job

This is a demo and proof of concept, so something is not finished:

- Sourcemap
