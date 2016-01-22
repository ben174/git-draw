# Git Draw
Allows you to draw in your GitHub heatmap

![demo-vid](https://github.com/ben174/git-draw/raw/master/media/demo-video.gif)


##### Created by Ben Friedland - http://www.bugben.com


This is a Chrome extension which will allow you to freely draw on your GitHub
heatmap. You can then export your drawing to a script containing a git commit
log. Once you've run and pushed this script to a new repository, your commit
log will match the drawing you made.

Download the extension here: 

https://chrome.google.com/webstore/detail/git-draw/aapcmdackhlfobmkcpplkjpfceihngkh?hl=en-US&gl=US

## Instructional Video

My Brother, Rich Friedland, made a comprehensive video on how to use the extension.

https://www.youtube.com/watch?v=ptzDfPZ--Qk


## Why not a bookmarklet?

Because CSP. GitHub's CSP policy makes a bookmarklet next to impossible.
There's a workaround involving injecting code into a canvas and then executing
it from there, but that feels like something that'll be fixed. A Chrome extension
makes it easier. Once you're done making your drawing, just uninstall the extension.

## Acknowledgements

GitFiti: https://github.com/gelstudios/gitfiti - got the idea from here, and 
poked around their src to see how they were writing commit messages.
