iLMS
====
It is a mobile app companion for using and interfacing with Politeknik Brunei LMS. This project is a forked from [Moodle Mobile 2.x repo](https://github.com/moodlehq/moodlemobile2)

This repo is primarily used to add features that Politeknik Brunei (PB) requires. It is primarily maintained by School of ICT (SICT) of Politeknik Brunei.

Further information about Moodle Mobile 2.x can be found below.

Moodle Mobile (Ionic 2)
-----------------

This is the primary repository of source code for the official Moodle Mobile app version 3.5.x

* [User documentation](http://docs.moodle.org/en/Moodle_Mobile)
* [Developer documentation](http://docs.moodle.org/dev/Moodle_Mobile)
* [Development environment setup](http://docs.moodle.org/dev/Setting_up_your_development_environment_for_Moodle_Mobile_2)
* [Bug Tracker](https://tracker.moodle.org/browse/MOBILE)
* [Release Notes](http://docs.moodle.org/dev/Moodle_Mobile_Release_Notes)


Contribution
------------

### Setting up environment
With the new v3.5.0 of Moodle Mobile, or now it is just call Moodle app, it uses Ionic 2! Hooray! 🎉🎉

Thus to build this project inside your computer, you'll need to read the documentation found at [Developer documentation](http://docs.moodle.org/dev/Moodle_Mobile) (Especially for Windows machine).

In summary you'll need:

- node version ~~6.9.1~~
- ionic CLI latest stable version
- cordova latest stable version
- gulp latest stable version

Next before building and running make sure you did the following steps:

1. `nvm install 6.9.1`
2. `nvm use 6.9.1`
3. `npm cache clean`
4. `npm install -g cordova ionic gulp`

> Note: If you are developing other project using latest stable version of node, I recommend using nvm which you can found out at: [nvm](https://github.com/creationix/nvm) which basically enables you to change node versions depending on projects. And read this section about [.nvmrc](https://github.com/creationix/nvm#nvmrc) which covers how to automatically change node version depending on directory.

**Working on your first Pull Request?** You can learn how from this *free* series [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github)

License
-------

[Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0)
