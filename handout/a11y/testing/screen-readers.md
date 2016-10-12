# Testing with Screen Readers
The only way to be certain that your application is usable by screen readers and other assistive technologies is to check for yourself. 

To test with a screen reader, you will need to use a screen reading program and navigate your page using keyboard commands specific to that program. *When testing with a screen reader, do not rely on Chrome.* Most [screen reader users do not use Chrome](http://webaim.org/projects/screenreadersurvey6/) as their main browser, and browser-specific differences will occur in testing. Internet Explorer or Firefox are preferred.

## Testing on Mac using VoiceOver
VoiceOver is OSX's built-in screen reader, and therefore often the easiest option for developers. 

VoiceOver can be turned on and off with the keyboard shortcut `CMD + F5` and also through the `System Preferences` menu. In the System Preferences menu, you can also adjust the speed at which VoiceOver will read to you. While testing, it is helpful to set it to a higher speed.

[WebAIM's guide for testing with VoiceOver](http://webaim.org/articles/voiceover/) provides detailed usage instructions.

## Testing on Windows using NVDA
[NVDA](http://www.nvaccess.org/) is a free (but donation funded) screen reader for Windows platforms. 

Once NVDA has been downloaded and installed, you can start it with the keyboard command `Ctrl + Alt + N`. 

[WebAIM's guide for testing with NVDA](http://webaim.org/articles/nvda/) provides detailed usage instructions.

## What to look for
When testing with a screen reader, you are testing a different form of user experience. As with any UX consideration, your objective should be to ensure that screen reader users will find your application sensible and usable. 

It is likely that problems will jump out at you when you start, but check in particular for the following:
- Image names are not read out by the screen reader; they have appropriate descriptive text
- Elements that are inaccessible to the screen reader are not necessary to the user's understanding
- Blocks of repeating text (e.g. menus) can be skipped
- The page is read in the intended/visual order (not source order)
- Forms can be navigated, completed and understood clearly
- Validation errors can be understood clearly
- The screen reader understands and reads toasts and alerts in a comprehensible way

## Additional Notes
When testing with a screen reader, it is important to remember that you will not necessarily have a 100% authentic experience due to difference in screen reading programs and user proficiency. The [most popular screen readers](http://webaim.org/projects/screenreadersurvey6/) are not free, and though many developers use Macs, most screen reader users will use Windows. 
