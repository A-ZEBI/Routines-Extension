var manifest = require('../manifest_partials/common'),
  fileSystem = require('fs-extra'),
  path = require('path'),
  env = require('../.env');
logofile = env.NODE_ENV == 'development' ? "images/dev-logo.png" : "images/logo.png";

// generates the manifest file using the package.json informations
manifest.name = process.env.npm_package_title;
manifest.version = process.env.npm_package_version;
manifest.manifest_version = 2;

manifest.description = process.env.npm_package_description;
manifest.icons = {
  '128': logofile,
  '16': logofile,
  '48': logofile,
};
manifest.browser_action = {
  default_icon: {
    '19': logofile,
    '38': logofile,
  },
  default_title: process.env.npm_package_title,
};

fileSystem.writeFileSync(path.join(__dirname, '../dist/manifest.json'), JSON.stringify(manifest));
