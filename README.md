nimble.webmaker.org
===================

A Webmaker-configured version of the mozilla/nimble project. -- An in-browser version of Brackets.

### Engines/Platforms
- Node.js: v0.10+

## Installation and Use
1) Clone the [nimble.webmaker.org](https://github.com/mozilla/nimble.webmaker.org) repository.

```
$ git clone https://github.com/mozilla/nimble.webmaker.org.git --recursive
```

2) In your nimble.webmaker.org directory, install all of the necessary dependencies:

If you don't already have `grunt-cli` and `bower` installed globally, here is the console command using `npm` -

```
$ sudo npm install grunt-cli -g
```

```
$ sudo npm install bower -g
```

Afterwards, install the npm modules -

```
$ npm install
```

3) Copy the distributed environment file via command line, or manually using a code editor:

```
$ cp env.dist .env
```

4) Run the MakeDrive server:

```
$ npm start
```

You will now have nimble.webmaker.org running on localhost via port 8003 - [http://localhost:8003](http://localhost:8003)
