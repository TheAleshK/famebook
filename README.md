famebook
========

This is still a very early version.

##Dependencies
It is actually quite simple really

First make sure you have node.js installed... without that nothing works!  You can either install it with your favorite package manager or with [the installer](http://nodejs.org/download) found on [nodejs.org](http://nodejs.org).

This project relies on grunt-cli, and bower to do all the heavy lifting for you

```
npm install -g grunt-cli bower
```

##Getting Started

```
npm install && bower install
```

That's it!!!

##Running the Development Server

Simply run ```grunt serve``` and you will start a local development server and open Chrome.  Watch tasks will be running, and your browser will be automatically refreshed whenever a file in the repo changes.

You can run serve with ```--port=9001``` to manually pick the port that the server will run on

*This option is currently borked...*
You can also change the port livereload is running on with the option ```--livereload=8675309```
*... if you think you can fix it check out the [issue on github](https://github.com/Famous/generator-famous/issues/22)*

If you would like to have your server be accessible to other devices on your local machine use the option ```--hostname=0.0.0.0```

##Contributing

Feel free to create pull requests with your changes. 

##License

MIT. Do whatever you want. Copyrights Kuba Siemiatkowski 2014.
