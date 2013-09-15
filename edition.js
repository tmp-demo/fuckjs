// Here goes all the code related to editing the demo.
// this should not be included in the final demo.

function $(s) {
  return document.querySelector(s);
}

function $$(s) {
  return document.querySelectorAll(s);
}

scenesShortcuts = {"97":0, "122":1,"101":2, "114":3,"116":4,"116":5,"121":6,"117":7,"105":8,"111":9},
scenesLoopShortcuts = {"113":0, "115":1,"100":2, "102":3,"103":4,"104":5,"106":6,"107":7,"108":8,"109":9},

function edition_init() {
    seeker = document.getElementById("seeker");
    seeker.addEventListener("input", function (e) {
      seek(e.target.value);
      seeker.value = e.target.value;
      demo.looping = false;
    });

    document.addEventListener("keypress", function(e) {
      // play/pause
      if (e.charCode == 32) {
        if (demo.playState == demo.PLAYING) {
          demo.playState = demo.PAUSED;
          //drumsTrack.stop(0);
          //otherTrack.stop(0);
        } else if(demo.playState == demo.ENDED) {
          seek(0);
        } else {
          demo.playState = demo.PLAYING;
          seek(demo.currentTime);
          mainloop();
        }
      } else if(e.charCode == 8) { //backspace key
        demo.looping = false;
      } else if(typeof scenesShortcuts[e.charCode]  !== 'undefined' ) {
        // jump to scene
        if (scenesShortcuts[""+e.charCode] < demo.scenes.length){//s >= 0 && s <= 9 && s < demo.scenes.length) {
          demo.looping = false;
          seek(demo.scenes[scenesShortcuts[""+e.charCode]].start);
        }
      } else if (typeof scenesLoopShortcuts[e.charCode]  !== 'undefined' ) {
        // jump to scene
        if (scenesLoopShortcuts[""+e.charCode] < demo.scenes.length){//s >= 0 && s <= 9 && s < demo.scenes.length) {
          demo.looping = true;
          demo.current_scene = scenesLoopShortcuts[""+e.charCode];
          seek(demo.scenes[demo.current_scene].start);
        }
      }
    });
}

// ---------------------------------------------------------------------

function dump(something) {
  var pre = document.createElement("pre");
  pre.innerHTML = something;
  document.body.appendChild(pre); 
}


// ---------------------------------------------------------------------

var frames = [];

function recordFrame(cvs) {
  cvs.toBlob(function(blob) {
    frames.push(blob);
  });
}

function stichFramesForDownload()
{
  var blob = new Blob(frames,  {type: "application/octet-binary"});
  var url = URL.createObjectURL(blob);
  location.href = url;
}
