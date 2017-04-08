#!/usr/bin/env node

///////
// 
//             Name:  liri.js
//      Description:  emulates a very low functionality, command-line version
// 				      of Siri
//           Author:  Jake Stenger <myselfjake@gmail.com>
//          Created:  2017-04-04
//          Version:  1.0
//    Last modified:  n/a
// Last modified by:  n/a
//   New in version:  BRAND NEW! Full of bugs?
// 
///////

///////////////////////////////////////////////////////////////////////
// Global Variable Declarations and Imports
///////////////////////////////////////////////////////////////////////

var fs = require('fs');
var request = require('request');
var Twitter = require('twitter');
var spotify = require('spotify');
var tw_Config = require('./keys.js'); //gets keys from separate file as object
var inputString = process.argv;
var cyan = '\x1b[36m%s\x1b[0m';
var white = '\x1b[37m%s\x1b[0m';
var yellow = '\x1b[33m%s\x1b[0m';
var red = '\x1b[31m%s\x1b[0m';

///////////////////////////////////////////////////////////////////////
// Function Definitions
///////////////////////////////////////////////////////////////////////

function getTweets() {
	// This function prints my last 20 tweets and their creation dates. I 
	// think I've tweeted 4 things in my life, even though I work at Twitter.
	// So, this function will print my last 4 tweets, unless I make some more.
	var client = new Twitter(tw_Config.twitterKeys);
	client.get('statuses/user_timeline', {screen_name: 'muddsbeets', count: 20}, function(error, tweets, response) {
		if (error) {
			console.log(red, '[ERROR] Twitter is the worst!');
		} else {
			console.log('');
			for (var i = 0; i < tweets.length; i++) {
				console.log(cyan, '######  Tweet Number ' + (i+1) + '  ######');
				console.log(white, tweets[i].text);
				console.log('');
			};
		}
	});
}

function getMovie(name) {
	// This function queries OMDb's API to get information about a movie, then
	// prints that information to a screen. If no movie is passed, this 
	// function assumes "Mr. Nobody".

	name = name || "Mr. Nobody";
	var url = 'http://www.omdbapi.com/?t='+ encodeURI(name) +'&plot=short&&tomatoes=true&r=json';
	request(url, function (error, response, body) {
		if (response.statusCode == 200) {
			console.log(cyan, '\n###### MOVIE INFO #########################');
			console.log(white, '  Movie Title: ' + JSON.parse(body)['Title']);
			console.log(white, '  Movie Year: ' + JSON.parse(body)['Year']);
			console.log(white, '  IMDB Rating: ' + JSON.parse(body)['imdbRating']);
			console.log(white, '  Country: ' + JSON.parse(body)['Country']);
			console.log(white, '  Language: ' + JSON.parse(body)['Language']);
			console.log(white, '  Plot: ' + JSON.parse(body)['Plot']);
			console.log(white, '  Actors: ' + JSON.parse(body)['Actors']);
			console.log(white, '  Rotten Tomatoes Rating: ' + JSON.parse(body)['tomatoRating']);
			console.log(white, '  Rotten Tomatoes URL: ' + JSON.parse(body)['tomatoURL']);
			console.log('');
		} else if (error){
			console.log(red, '[ERROR] OMDb API returned an error...');
			console.log(error)
		} else {
			console.log(red, '[ERROR] Unknown Error');
		}
	})
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

	name = name || "Ace of Base The Sign";
	spotify.search({type: 'track', query: name}, function(error, data) {
	    if (error) {
			console.log(red, '[ERROR] Spotify returned an error');
			console.log(error);
	    } else {
			var artist = data.tracks.items[0].artists[0].name;
			var songName = data.tracks.items[0].name;
			var albumName = data.tracks.items[0].album.name;
			var songURL = data.tracks.items[0].album.external_urls;
			var printURL = function() {
        		for (url in songURL) {
          			return songURL[url];
        		}
        	};

			// Print results
			console.log(cyan, '\n###### SONG INFO #########################')
			console.log(white, '  Artist: ' + artist);
			console.log(white, '  Song: ' + songName);
			console.log(white, '  Album: ' + albumName);
			console.log(white, '  URL: ' + printURL() + '\n');
		}
	});
}

function chooseRandom() {
	// This function reads a single command from a different file in the 
	// filesystem, for some reason. It then passes it to getMode() for further
	// processing. It talks to the file so getMode doesn't have to. It's a file
	// function. IT'S GOOD WITH FILES.

	fs.readFile('./random.txt', 'utf8', function read(error, data) {
		if (error) {
			console.log(red, '[ERROR] Your computer is broken');
			console.log(error);
		} else {
			var cmds = data.split(',');
			getMode(cmds[0], cmds[1]);
		}
	});
}

function getMode(cmd, args) {
	// This function attempts to parse whatever gibberish the users passes as
	// arguments, and run the appropriate function with the correct parameter.
	// It takes an optional argument, cmd, which will only have a value if
	// called from chooseRandom().

	func = cmd || process.argv[2];
	
	if (args === undefined) {
		args = [];
		for (var i = 3; i < process.argv.length; i++) {
			args.push(process.argv[i]);
		}
		var argString = args.join(" ");
	}

	switch(func) {
		case 'movie-this':
			getMovie(argString);
			break;
		case 'tweet-this':
			getTweets();
			break;
		case 'spotify-this-song':
			getSong(argString);
			break;
		case 'do-what-it-says':
			chooseRandom();
			break;
		default:
			sendHelp();
	};
}

function sendHelp() {
	// I figure this application should help its users by printing its own man
	// page whenever the user passes nonsense into it, which I have to assume
	// will be about 80% of the time. This function just prints out the contents
	// of man.txt to screen. If you don't like what it prints, go complain to
	// that file. This function is content agnostic.
	fs.readFile('./man.txt', 'utf8', function read(error, data) {
		if (error) {
			console.log(red, '[ERROR] Your computer is broken');
			console.log(error);
		} else {
			console.log(white, data);
		}
	});
}

///////////////////////////////////////////////////////////////////////
// Let's get this party started!
///////////////////////////////////////////////////////////////////////

getMode();