import { AppPage } from './app.po';

"use strict";

const fs = require("fs");
const mkdirp = require("mkdirp");
const git = require("gulp-git");

	function writeScreenShot(data, filename) {
    var path = `./screenshots/${ browser.params.screenshotPrefix }`;
    mkdirp.sync(path);

    browser.getCapabilities().then((caps) => {
			var browserName = caps.get('browserName').replace(/\s/g, '');
			filename = `${browserName}-${filename}`;
		});

		browser.takeScreenshot().then((png) => {
			var stream = fs.createWriteStream([path, filename].join("/"));

			stream.write(new Buffer(png, "base64"));
			stream.end();
    });
	}

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to example-app!');
  });
});
