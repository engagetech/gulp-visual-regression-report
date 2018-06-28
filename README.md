# gulp-visual-regression-report

Compares screenshots of your apps and creates a report, using visual-regression-report.

## Installation

Install package with NPM and add it to your development dependencies:

`npm install --save-dev gulp-visual-regression-report`

## Usage

```javascript
const gulp = require("gulp");
const gulpVisualRegressionReport = require("gulp-visual-regression-report");

gulp.task("regression-report", function() {
	return gulp.src("./screenshots/after/*.png")
		.pipe(gulpVisualRegressionReport({
			beforeDir: "./screenshots/before",
			reportsDir: "./screenshots/report"
		}))
});

```

## Options

 * `beforeDir`: mandatory, the folder which contains the previous screenshots
 * `reportsDir`: mandatory, the folder which will contain the generated report
 * `reportTemplate`: optional, path to the report template file to use. Any file contained in that folder will also be copied verbatim to to `reportsDir`

## License

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
