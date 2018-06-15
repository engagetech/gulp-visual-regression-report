"use strict";

const gulp = require("gulp");
const cssRegressionReport = require("../index");

gulp.task("test", function() {
	return gulp.src("./images/after/*.png")
		.pipe(cssRegressionReport({
			beforeDir: "./images/before",
			reportsDir: "./images/report",
			reportTemplate: "../report-template/report.html"
		}))
});