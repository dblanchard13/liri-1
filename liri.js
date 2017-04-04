#!/usr/bin/env node

///////
// 
//             Name:  liri.js
//      Description:  emulates a very low functionality, command-line version
// 				   of Siri
//           Author:  Jake Stenger <myselfjake@gmail.com>
//          Created:  2017-04-04
//          Version:  1.0
//    Last modified:  n/a
// Last modified by:  n/a
//   New in version:  n/a
// 
///////

///////////////////////////////////////////////////////////////////////
// Global Variable Declarations and Imports
///////////////////////////////////////////////////////////////////////

var fs = require('fs');
var requests = require('request');
var twitter = require('twitter');
var spotify = require('spotify');
var command = "";


///////////////////////////////////////////////////////////////////////
// Function Definitions
///////////////////////////////////////////////////////////////////////

function getTweets() {
	// This function prints my last 20 tweets and their creation dates. I 
	// think I've tweeted 4 things in my life, even though I work at Twitter.
	// So, this function will print my last 4 tweets, unless I make some more. 
}

function getSong(name) {
	// This function gets the Spotify resource address, plus other information,
	// from the Spotify API for whatever is passed as "name". It prints the 
	// stuff to screen. What stuff? This stuff: 
	// 		1. Artist(s)
	//		2. Song name
	//		3. The album that the song is from
	// 		4. A preview link of the song from Spotify (resource address)
	// If no song is passed, this function assumes Ace Of Base's "The Sign".

}

function getMovie(name) {
	// This function queries OMDb's API to get information about a movie, then
	// prints that information to a screen. What information? This information:
	// 		1. Title of the movie.
	// 		2. Year the movie came out.
	// 		3. IMDB Rating of the movie.
	// 		4. Country where the movie was produced.
	// 		5. Language of the movie.
	// 		6. Plot of the movie.
	// 		7. Actors in the movie.
	// 		8. Rotten Tomatoes Rating.
	// 		9. Rotten Tomatoes URL.
	// If no movie is passed, this function assumes "Mr. Nobody".
}

function chooseRandom() {
	// This function reads a single command from a different file in the 
	// filesystem, for some reason. It then passes it to getMode() for further
	// processing. It talks to the file so getMode doesn't have to. It's a file
	// function. IT'S GOOD WITH FILES.

}

function getMode(cmd, arg) {
	// This function attempts to parse whatever gibberish the users passes as
	// arguments, and run the appropriate function with the correct parameter.
	// It takes an optional argument, cmd, which will only have a value if
	// called from chooseRandom().

	if (cmd === undefined){
		var cmd = process.argv[2];
		"my-tweets";
		"spotify-this-song";
		"movie-this";
		"do-what-it-says";
	} else {

	}
}

///////////////////////////////////////////////////////////////////////
// Let's get this party started!
///////////////////////////////////////////////////////////////////////

getMod	// 		1. 