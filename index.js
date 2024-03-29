/*
   Copyright 2018 Engage Technology Partners Ltd

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

"use strict";

const PluginError = require("plugin-error");
const through = require("through2");
const PLUGIN_NAME = require("./package").name;
const visualRegressionReportConstructor = require("visual-regression-report");

function visualRegressionReport(opts) {
	let newVisualRegressionReport;
	try {
		newVisualRegressionReport = visualRegressionReportConstructor(opts);
	} catch (error) {
		throw new PluginError(PLUGIN_NAME, error);
	}

	function compare(file, enc, callback) {
		newVisualRegressionReport.compareScreenshot(file.path)
			.then(() => callback())
			.catch((error) => callback(error));
	}

	function createReport(callback) {
		newVisualRegressionReport.createReport()
			.then((statistics) => callback(null, statistics))
			.catch(callback);
	}

	return through.obj(compare, createReport);
}

module.exports = visualRegressionReport;
