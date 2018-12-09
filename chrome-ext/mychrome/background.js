"use strict";
var config = { 
  socketHost  : "http://localhost:1234",
  badgeColor  : '#FF0000'
}
var socket = io.connect(config.socketHost);


// Start listning to server
socket.on('connect', () => {
  const userId = socket.id;
  console.log('Chrome connected Server', config.socketHost);
  socket.on(`init-${userId}`, (data)=>{
    console.log('init data', data);
    let logs = data.logs;
    // Show the notification 
    showNotifications(logs);
  });
  
  // When new movie released dispaly
  socket.on("liveUpdate", (data) => {
    console.info('liveUpdate ::',data);
    showNotifications(data)      
  });
  
  // When new movie released dispaly
  socket.on("init_logs", (data) => {
    console.info('init_logs ::',data);
    showNotifications(data)      
  });
});


/*
// Conditionally initialize the options.
if (!localStorage.isInitialized) {
  localStorage.isActivated = true;   // The display activation.
  localStorage.frequency = 1;        // The display frequency, in minutes.
  localStorage.isInitialized = true; // The option initialization.
}
// Set Badge color to red
chrome.browserAction.setBadgeBackgroundColor({color:config.badgeColor});
*/
// Show the notification base on the count of movies
function showNotifications(logs) {
  chrome.browserAction.setBadgeText({text: `${logs.length}`});

  //If movies more than 5 notify as list
  // if(movies.length>5) {
  //   let moviesList = movies.map((movie) =>{ 
  //     let genres = movie.genres ? `[${movie.genres.join(' / ')}]`: '';
  //     return { title:movie.title_long, message:`10/${movie.rating} ${genres} ${movie.language}` };
  //   });

  //   chrome.notifications.create(`movie.title_long `, {
  //     type: "list",
  //     title: "Latest Movies List",
  //     message: "Just Arive to site",
  //     iconUrl: "48.png",
  //     items: moviesList
  //   });

  // } else {
    // Create Single notification 
    logs.forEach((log, index) => { 
      chrome.notifications.create(`${index}`, {
        type: "basic",
        title: log.from,
        message: `${log.msg}`,
        iconUrl: '48.png',
        buttons: [
          {title: 'Youtube'},
        ],
        priority: 0
      });
    });

    // When notificatin click redirect to Yts page
    // chrome.notifications.onClicked.addListener((movieIndex) => {
    //   let toUrl = `${config.movieUrl}/${movies[movieIndex].slug}`;
    //   chrome.tabs.create({url:toUrl});
    // });
    // // when youtube click got youtube trailre
    // chrome.notifications.onButtonClicked.addListener((movieIndex, btnIndex) => {  
    //   let youtubeUrl = `${config.youtubeUrl}${movies[movieIndex].yt_trailer_code}`;
    //   chrome.tabs.create({url:youtubeUrl});
    // });
  // }
}