import ExternalModule from 'webpack/lib/ExternalModule';
import fs from 'fs';
import path from 'path';
import rmdir from 'rimraf';

/**
 * Custom-made Webpack Plugin to copy native modules to `node_modules`
 * rather than compile them into the fat JS file.
 */
export default class ExternalModulesPlugin {

  constructor(outputPath, forcedExternalModules) {
    const nodeModulesDir       = this.getModuleSourcePath("");
    this.nodeModules           = this.getFolderContents(nodeModulesDir);
    this.outputPath            = outputPath;
    this.forcedExternalModules = forcedExternalModules || [];
    this.isExternalModuleCache = {};
    this.externalModulesExist  = false;
  }

  // Copies the external modules to the output location. It creates a new 'node_modules' directory
  // at the output location, and copies the external modules across.
  apply(compiler) {
    const self = this;
    compiler.plugin('after-emit', function(compilation, callback) {

      const destNodeModulesDir = self.outputPath;

      rmdir(destNodeModulesDir, (error) => { if (error) throw error;
        if (!self.externalModulesExist) {
          callback();
        }
        else {
          fs.mkdir(destNodeModulesDir, (error) => { if (error) throw error;

            // Copy the external modules across to the new 'node_modules' directory.
            const moduleCache = self.isExternalModuleCache;
            for (var moduleName in moduleCache) {
              if (moduleCache.hasOwnProperty(moduleName)) {
                const isExternalModule = moduleCache[moduleName]; // Object is a mapping of name->boolean.
                if (isExternalModule) {
                  self.copyExternalModule(moduleName);
                }
              }
            }

            callback();
          });
        }
      });
    });
  }

  // Determines whether a module should be loaded externally, or whether it
  // should be compiled into the fat JS file by webpack.
  predicate() {
    const self = this;
    return function(context, request, callback) {
      var importType = 'commonjs';
      var moduleName = self.getModuleName(request);

      // Speed things up with an in-memory cache.
      let isExternalModule;
      if (self.isExternalModuleCache[moduleName] === undefined) {

        // Determine "external" or "internal" status of this module.
        isExternalModule = self.isNodeModule(moduleName) && self.isExternalModule(moduleName);

        self.isExternalModuleCache[moduleName] = isExternalModule;
      }
      else {
        isExternalModule = self.isExternalModuleCache[moduleName];
      }

      if (isExternalModule) {
        self.externalModulesExist = true;

        // Webpack's way of marking a module as external.
        // See: https://webpack.github.io/docs/configuration.html#externals
        return callback(null, importType + " " + request);
      }

      callback();
    };
  }

  // -------
  // PRIVATE
  // -------

  isNodeModule(moduleName) {
    return this.nodeModules.indexOf(moduleName) !== -1;
  }

  isExternalModule(moduleName) {
    return this.isNativeModule(moduleName) || this.isForcedExternalModule(moduleName);
  }

  isNativeModule(moduleName) {
    const modulePath = this.getModuleSourcePath(moduleName);
    const folderContents = this.getFolderContents(modulePath);

    return folderContents.some(subPath => {
      return subPath === ".bin"; // We might need to improve this test later.
    });
  }

  isForcedExternalModule(moduleName) {
    return this.forcedExternalModules.indexOf(moduleName) !== -1;
  }

  getFolderContents(dirName) {
    try {
      return fs.readdirSync(dirName);
    } catch (e){
      return [];
    }
  }

  getModuleName(moduleRequest) {
    return moduleRequest.split("/")[0];
  }

  getModuleSourcePath(moduleName) {
    return path.join(process.cwd(), `./node_modules/${moduleName}`);
  }

  getModuleTargetPath(moduleName) {
    return path.join(this.outputPath, moduleName);
  }

  copyExternalModule(moduleName) {
    const moduleSourcePath = this.getModuleSourcePath(moduleName);
    const moduleTargetPath = this.getModuleTargetPath(moduleName);

    fs.symlinkSync(moduleSourcePath, moduleTargetPath, 'dir');
  }
}
