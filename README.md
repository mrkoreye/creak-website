# The Creak's Website
The goal here was to make a super light website ([www.thecreak.net](www.thecreak.net)) with no external styles/js that is easy and fun to make changes to and develop. There are a bunch of little gulp tasks that smush the various html and styles into the main html page, and then it gets uploaded to s3 when deployed.
* To get started, run `npm install`.
* You will need to install imagemagick as outlined here: https://www.npmjs.com/package/gulp-image-resize.
* The image carousel is populated dynamically via the list of images in the large-photos folder. Order is determined via the number that the filename starts with.
* To develop, run `gulp develop`.
* Preview site at [http://localhost:8080/](http://localhost:8080/). It will reload automatically as you make changes.
* To deploy, run `gulp deploy`. You will need to have the proper aws credentials in `~/.aws/credentials`.

