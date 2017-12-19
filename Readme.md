XDebug Controls for [Local][0475-0001], because debugging happens.

## Show off
Here is an handy GIF to show the add-on functionalities, enjoy.
![Version 1 demo](/doc/images/version-1-demo.gif?raw=true "Version 1 demo")

## Requirements and installation
1. Well... [Local][0475-0001]
2. XDebug Controls will only be available on custom sites
3. To install the addon open Local, go to Preferences > Add-ons > Reveal add-ons folder and unzip the content of this repository in that folder. Or clone it using:
	```bash
 	git clone https://github.com/lucatume/local-addon-xdebug-control.git
	```
4. Relevant [XDebug settings][0475-0002] are exposed by the addon as a list of select fields; I've picked some defaults for you but take your team to read what each does.

## Usage
The add-on consists of a single page UI found under the More > XDebug Control menu.  
Some sensible and relevant XDbebug settings are exposed; the `remote_host` one is missing as the add-on is setting it for you.

## I found a bug: what should I do?
Crap! Well: it happens.  
There is a known issues where the data provided to the addon right after Local has started will be inconsistent; the symptom is that nothing will happen when clicking "More > XDebug Control".  
**The remedy is as old as IT: quit the app and restart it**.  
Before opening an issue be very very sure (very very sure, again) that your issue does not sound like "How do I configure XDebug to work with my IDE?"; I will try and support the addon, but Google is still your friend.
Should this not solve the issue take the time to open an issue on this repository detailing:

1. Mac or Windows?
2. Your site settings (php version, web server, MySQL version and the like)
3. XDebug Control settings (if any)
4. Any other information you think might be useful

## How do I debug this?
You can access the Developer Tools for the Local application using `F12`.  
Access the addon folder and run `npm install` to pull the developer dependencies.  

## License
MIT

## Changelog
### [Unreleased][unreleased]

### [1.1.0][1.1.0]
* Changed - Pretty much rewritten the code from scratch
* Changed - The XDebugt `remote_host` value is now set automatically from the add-on
* Fixed - loading functionalities and inconsistent behaviours 

### [1.0.3][1.0.3]
* Fixed - add a loading screen while fetching XDebug information from the container

### [1.0.2][1.0.2]
* Fixed - the behaviour of the XDebug Control field list to apply unchanged settings too

### [1.0.1][1.0.1]
* Added - use `F12` to open the Developer Tools
* Added - the `electron-react-devtools` package to allow installing React tools in Developer Tools

### 1.0.0 - Initial version

[unreleased]: https://github.com/lucatume/local-addon-xdebug-control/compare/1.1.0...HEAD 
[1.1.0]: https://github.com/lucatume/local-addon-xdebug-control/compare/1.0.3...1.1.0
[1.0.3]: https://github.com/lucatume/local-addon-xdebug-control/compare/1.0.2...1.0.3
[1.0.2]: https://github.com/lucatume/local-addon-xdebug-control/compare/1.0.1...1.0.2
[1.0.1]: https://github.com/lucatume/local-addon-xdebug-control/compare/1.0.0...1.0.1

[0475-0001]: https://local.getflywheel.com/
[0475-0002]: https://xdebug.org/docs/all_settings
