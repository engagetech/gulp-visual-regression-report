"use strict";

const PluginError = require("plugin-error");
const log = require("fancy-log");
const through = require("through2");
const path = require("path");
const fs = require("fs");
const PLUGIN_NAME = require("./package").name;
const imagediff = require("image-diff");
const swig = require("swig");

function mkdirpSync(path) {
	if (fs.existsSync(path)) {
		return;
	}
	fs.mkdirSync(path);
}

function cssRegressionReport(opts) {
	if (!opts.beforeDir)
		throw new PluginError(PLUGIN_NAME, "You must specify a 'beforeDir' folder that stores the old screenshots you want to compare the current ones with");
	if (!opts.reportsDir)
		throw new PluginError(PLUGIN_NAME, "You must specify a 'reportsDir' folder that will store the reporting images");

	opts.reportTemplate = opts.reportTemplate || path.join(__dirname, "report-template", "report.html");

	opts.beforeDir = path.resolve(opts.beforeDir);
	opts.reportsDir = path.resolve(opts.reportsDir);
	opts.reportTemplate = path.resolve(opts.reportTemplate);

	const statistics = {
		pages: [],
		same: 0,
		different: 0,
		branches: {},
		commits: {}
	};

	function _compare(file, enc, callback) {
		const filename = file.relative;

		const beforeImagePath = path.join(opts.beforeDir, filename);
		const beforeImageDirName = path.basename(path.dirname(beforeImagePath));
		statistics.commits.before = beforeImageDirName;

		const afterImagePath = file.path;
		const afterImageDirName = path.basename(path.dirname(file.path));
		statistics.commits.after = afterImageDirName;

		const diffImagePath = path.join(opts.reportsDir, filename);

		imagediff({
			actualImage: afterImagePath,
			expectedImage: beforeImagePath,
			diffImage: diffImagePath,
			shadow: true
		}, (error, imagesAreSame) => {
			if (error) {
				log.error(error);
				return callback();
			}

			if (imagesAreSame) {
				fs.unlink(diffImagePath);
				statistics.same++;
				return callback();
			}

			statistics.different++;

			const afterImageReportPath = path.join(opts.reportsDir, afterImageDirName, filename);
			const beforeImageReportPath = path.join(opts.reportsDir, beforeImageDirName, filename);

			mkdirpSync(path.dirname(afterImageReportPath));
			mkdirpSync(path.dirname(beforeImageReportPath));
			fs.copyFileSync(afterImagePath, afterImageReportPath);
			fs.copyFileSync(beforeImagePath, beforeImageReportPath);

			statistics.pages.push({
				before: path.relative(opts.reportsDir, beforeImageReportPath),
				after: path.relative(opts.reportsDir, afterImageReportPath),
				diff: path.relative(opts.reportsDir, diffImagePath),
				title: filename
			});

			callback();
		});
	}

	function _createReport(callback) {
		log(`Compared ${statistics.same + statistics.different}, and found ${statistics.different} differences`);

		statistics.pages = statistics.pages.sort((a, b) => {
			return a.title.localeCompare(b.title);
		});

		swig.renderFile(opts.reportTemplate, statistics, (error, report) => {
			const reportFile = path.join(opts.reportsDir, "report.html");

			fs.writeFile(reportFile, report, callback);

			fs.readdirSync(path.dirname(opts.reportTemplate))
				.filter((file) => file !== path.basename(opts.reportTemplate))
				.forEach((file) => {
					fs.copyFileSync(path.join(path.dirname(opts.reportTemplate), file), path.join(opts.reportsDir, file));
				});
		})
	}

	return through.obj(_compare, _createReport);
}

module.exports = cssRegressionReport;