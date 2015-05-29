bucket-android
==============

The front side app for bucket.

Built using ionic.

setup
-----
for windows:
- <a href=http://learn.ionicframework.com/videos/windows-android/>Ionic Framework Tutorial</a>
- `ionic setup sass`
- maybe `bower install`
- `ionic serve` (must be run in CMD)

build for mobile
----------------
Android:
- edit ./www/lib/openfb.js `runningInCordova=TRUE`
- edit ./www/js/app.js     `StatusBar.hide()`
- adb devices -l
- ionic run android

todo
----
- Create views
- add Bucket API as a service
- serve api information
- UX (slide box or <a href=https://github.com/saravmajestic/ionic/tree/master/tabbedSlideBox>tabbedSlideBox</a>)
