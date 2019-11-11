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

const gulp = require("gulp");
const gulpVisualRegressionReport = require("../index");
const argv = require("yargs").argv

gulp.task("regression-report", () => {
	return gulp.src("./screenshots/after/*.png")
		.pipe(gulpVisualRegressionReport({
			beforeDir: "./screenshots/before",
			reportsDir: "./report"
		}))
});

gulp.task("tests", () => {
    // execute ng test, change 
    // --parameters.screenshotPrefix
});

// Present help info
gulp.task("help", () => {
	console.log("\n\nOptions:");
	console.log("tests --url http://localhost:4200 --version 1.2.3\n  : run tests against a url, save screenshots in folder 1.2.3");
    console.log("regression-report --before 1.2.3 --after 4.5.6\n  : create a report comparing screenshots from two versions");
    console.log("\n");
});

gulp.task("default", ["help"]);
