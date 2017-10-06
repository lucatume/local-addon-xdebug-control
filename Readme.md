XDebug Controls for [Local][0475-0001], because debugging happens.

## Show off
Here is an handy GIF to show the add-on functionalities, enjoy.
![Version 1 demo](/doc/images/version-1-demo.gif?raw=true "Version 1 demo")

## Requirements
1. Well... [Local][0475-0001]
2. XDebug Controls will only be available on custom sites
3. To install the addon open Local, go to Preferences > Add-ons > Reveal add-ons folder and unzip the content of this repository in that folder. Or clone it using:
	```bash
 	git clone https://github.com/lucatume/local-addon-xdebug-control.git
	```
4. Relevant [XDebug settings][0475-0002] are exposed by the addon as a list of select fields; I've picked some defaults for you but take your team to read what each does.

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

## License
MIT

## Changelog
1.0.0 - Initial version

[0475-0001]: https://local.getflywheel.com/
[0475-0002]: https://xdebug.org/docs/all_settings
