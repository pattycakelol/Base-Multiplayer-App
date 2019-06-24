# Base-Multiplayer-App
Some projects require initial setup that I'm too lazy to keep remaking. I plan on building off of this to make other multiplayer apps.

At the moment, this project sets up the server to serve pages to the client and handle sockets, all demonstrated in a chat (which I assume most multiplayer apps will have).


# Update 6/23/19
I had a lot of time for what I've wanted to do with this and I have an idea of where I want to take it. 
I have decided that I want to make a game using this platform that uses a completely static webpage(ideally hosted on GitHub Pages). I'm not entirely sure how I'm going to pull it off, but I think a good first step would be looking into firebase.

For the sake of having an order of things to do:
room codes -> connect firebase to hold chat messages from rooms -> data deletion (if the chat message is too old or how/when to delete rooms & their data) -> build a new game with firebase & the static page -> m o b i l e   f r i e n d l y

Why static? Why not just run a server on an AWS instance to handle game interaction?:
Because I've done that and it's boring. Also GH Pages gives you a nice, clean link to share to people and doesnt look incredibly sketch the way that aws instances do (i dont want to buy a domain name). 

Me typing this is an attempt at motivating myself to actually do it.

So, with nothing else to say:
# Updated To-do

* rooms
    * either by:
        * room codes
        * room finder (list of available rooms)
* connect firebase to rooms (see if i can save previous chats)
* find out how to delete rooms over time (expired)
* make a game..?
   * find out how many requests to firebase i can make
* m o b i l e   f r i e n d l y

* learn to style README
