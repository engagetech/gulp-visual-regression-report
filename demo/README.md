# Demo for gulp-visual-regression-report

Compares screenshots of your apps and creates a report, using [visual-regression-report](TODO link).

## Installation

Install the required packages:

`npm install`


## Usage

Build the example Angular application and launch a server with:

`ng serve`

Next, create a set of screenshots using gulp:

`gulp test --version 1`

Now edit the `app.component.css` file and uncomment the CSS towards the end of the file, or make a minor change yourself if you fancy!

Then, create a second set of screenshots with gulp:

`gulp test --version 2`

Now, create a regression report that compares the two versions:

`gulp report --before 1 --after 2`

Open the result up in your favourite browser, and play spot the difference!


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
