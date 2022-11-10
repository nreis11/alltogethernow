const DEBUG = false;

var timeChecker; // Var for time interval checker
var bubbleInterval; // Var for bubble interval cloner
var audio = document.querySelector("#main-audio");
var playBtn = $("#play-btn");
var pauseBtn = $("#pause-btn");
var replayBtn = $("#replay-btn");
var pop = document.querySelector("#pop");
var assets = $("#assets");
var mainContainer = $("#main-container");
var words = $("#words");
var numsTable = $("#nums-table");
var john1 = $("#1-john");
var ringo2 = $("#2-ringo");
var george3 = $("#3-george");
var paul4 = $("#4-paul");
var littleMore = $("#little-more");
var johnHead = $("#john-head");
var paulHead = $("#paul-head");
var georgeHead = $("#george-head");
var ringoHead = $("#ringo-head");
var heart = $("#heart");
var loveClass = $(".love");
var loveYouText = $("#love-you-text");
var alphaTable = $("#alpha-table");
var aPaul = $("#a-paul");
var bJohn = $("#b-john");
var cRingo = $("#c-ringo");
var dGeorge = $("#d-george");
var friendTea = $("#friend-tea");
var beatlesOutside = $("#beatles-outside");
var waves = $("#waves");
var ship = $("#ship");
var meadow = $("#meadow");
var tree = $("#tree");
var lumberjack = $("#lumberjack");
var bird = $("#bird");
var sidewalk = $("#sidewalk");
var treeTrunk = $("#tree-trunk");
var jumpRope = $("#jump-rope");
var school = $("#school");
var sub = $("#sub");
var meList = $("#me-list");
var mePaul = $("#me-paul");
var meJohn = $("#me-john");
var meGeorge = $("#me-george");
var meRingo = $("#me-ringo");
var clownFish = $("#clownfish");
var bubbles = $(".bubble");
var colorsDiv = $("#colors-container");
var blackAlbum = $("#black-album");
var whiteAlbum = $("#white-album");
var greenAlbum = $("#green-album");
var redAlbum = $("#red-album");
var friendBed = $("#friend-text");
var mosaic = $("#mosaic");
var controls = $(".controls");

var keyFrames = {
  clear: showImage.bind(mainContainer, {}, true),
  reset: reset.bind(null),
  one: showChild.bind(john1, { parentName: numsTable }, true),
  two: showChild.bind(ringo2),
  three: showChild.bind(george3),
  four: showChild.bind(paul4),
  "little more": showImage.bind(littleMore, {}, true),
  five: animateObj.bind(johnHead, { left: "0px" }, true),
  six: animateObj.bind(paulHead, { right: "0px" }),
  seven: animateObj.bind(georgeHead, { top: "0px" }),
  eight: animateObj.bind(ringoHead, { bottom: "0px" }),
  love: showImage.bind(loveClass, {}, true),
  a: showChild.bind(aPaul, { parentName: alphaTable }, true),
  b: showChild.bind(bJohn),
  c: showChild.bind(cRingo),
  d: showChild.bind(dGeorge),
  "friend to tea": showImage.bind(friendTea, {}, true),
  e: showImage.bind(beatlesOutside, { left: -1 }, true),
  f: showImage.bind(beatlesOutside, { left: -12 }),
  g: showImage.bind(beatlesOutside, { left: -24 }),
  h: showImage.bind(beatlesOutside, { left: -35 }),
  i: showImage.bind(beatlesOutside, { left: -49 }),
  j: showImage.bind(beatlesOutside, { left: 0.1, centered: true }, true),
  waves: showImage.bind(waves, {}, true),
  sky: showImage.bind(mainContainer, { addClass: "skyblue" }),
  ship: showImage.bind(ship),
  meadow: showImage.bind(meadow, {}, true),
  tree: showImage.bind(tree),
  lumberjack: showImage.bind(lumberjack),
  bird: showImage.bind(bird),
  sidewalk: showImage.bind(sidewalk, {}, true),
  school: showImage.bind(school),
  trunk: showImage.bind(treeTrunk),
  skip: showImage.bind(jumpRope),
  oceanblue: showImage.bind(mainContainer, { addClass: "oceanblue" }, true),
  clownfish: showImage.bind(clownFish),
  sub: showImage.bind(sub),
  "me-paul": showChild.bind(mePaul, { parentName: meList, addClass: "float" }),
  "me-john": showChild.bind(meJohn, { addClass: "float" }),
  "me-george": showChild.bind(meGeorge, { addClass: "float" }),
  "me-ringo": showChild.bind(meRingo, { addClass: "float" }),
  bubbles: startBubbleCloner.bind(null),
  clearBubbles: stopBubbleCloner.bind(null),
  black: showChild.bind(blackAlbum, { parentName: colorsDiv }, true),
  white: showChild.bind(whiteAlbum, { parentName: colorsDiv }, true),
  green: showChild.bind(greenAlbum, { parentName: colorsDiv }, true),
  red: showChild.bind(redAlbum, { parentName: colorsDiv }, true),
  "friend to bed": showImage.bind(friendBed, {}, true),
  pink: showImage.bind($(".tile"), {}, true),
  brown: showImage.bind($("#slide"), { left: 57.4, altLeft: 59.4 }),
  yellow: showImage.bind($("#slide"), { left: 42, altLeft: 39.5 }),
  orange: showImage.bind($("#slide"), { left: 26.6, altLeft: 20 }),
  blue: showImage.bind($("#slide"), { left: 11, altLeft: 0.1 }),
  allTogether: showImage.bind($(".together")),
  moveSub: moveAcrossScreen.bind($("#sub-two")),
  fadeOut: fadeOutThis.bind($(".together")),
  credits: animateObj.bind($("#credits-container"), { opacity: 1 }),
};

// Timings for keyframes
var timings = {
  0.1: "clear",
  0.2: "reset",
  10.5: "one",
  11.2: "two",
  11.9: "three",
  12.5: "four",
  13.1: "little more",
  15.7: "five",
  16.2: "six",
  16.9: "seven",
  17.2: "eight",
  18.3: "love",
  20.7: "a",
  21.4: "b",
  "22.0": "c",
  22.6: "d",
  23.2: "friend to tea",
  25.8: "e",
  26.4: "f",
  "27.0": "g",
  27.2: "h",
  27.6: "i",
  "28.0": "j",
  28.7: "love",
  30.9: "waves",
  31.5: "sky",
  "32.0": "ship",
  33.4: "meadow",
  33.9: "sky",
  "34.0": "tree",
  34.6: "lumberjack",
  35.2: "bird",
  35.9: "sidewalk",
  "36.0": "sky", //Not synced
  36.3: "school",
  36.5: "trunk",
  "37.0": "skip",
  38.4: "oceanblue",
  38.8: "clownfish",
  "39.0": "sub",
  39.7: "me-paul",
  40.5: "me-john",
  41.3: "me-george",
  42.3: "me-ringo",
  42.4: "bubbles",
  43.4: "allTogether",
  "53.0": "clearBubbles",
  53.3: "black",
  "54.0": "white",
  54.6: "green",
  55.2: "red",
  55.9: "friend to bed",
  58.3: "pink",
  58.9: "brown",
  59.4: "yellow",
  59.8: "orange",
  60.2: "blue",
  61.1: "love",
  63.4: "oceanblue",
  63.5: "bubbles",
  63.6: "allTogether",
  64.5: "moveSub",
  70.5: "moveSub",
  "76.0": "moveSub",
  "82.0": "clearBubbles",
  82.9: "waves",
  83.4: "sky",
  83.5: "ship",
  85.3: "meadow",
  85.8: "sky",
  85.9: "tree",
  86.4: "lumberjack",
  "87.0": "bird",
  87.6: "sidewalk",
  87.7: "sky",
  88.1: "school",
  88.2: "trunk",
  88.8: "skip",
  "90.0": "oceanblue",
  90.4: "clownfish",
  90.6: "sub",
  91.3: "me-paul",
  "92.0": "me-john",
  "93.0": "me-george",
  93.8: "me-ringo",
  93.9: "bubbles",
  94.5: "allTogether",
  "98.0": "moveSub",
  "103.0": "moveSub",
  "110.0": "moveSub",
  "118.0": "clearBubbles",
  119.5: "fadeOut",
  124.7: "credits",
};

// Reset all children with opacity changes, beatles outside img
function reset() {
  $(".hidden").css("opacity", 0);
  $("#beatles-outside").css({ width: "", height: "" });
}

// If calling first image, hide everything else. Otherwise, keep the other images visible
function showImage(args = {}, hide = false) {
  if (hide) {
    assets.children().hide();
    mainContainer.removeClass().addClass("whitebg");
  }
  this.show();
  if (args) {
    handleArgs.call(this, args);
  }
}

function handleArgs(args) {
  // Cannot use switch statement. Need to evaluate every condition.
  if (args.top || args.left) {
    this.css({ top: `${args.top}%`, left: `${args.left}%` });
  }
  if (args.centered) {
    this.css({ width: "100%", height: "100%" });
  }
  if (args.addClass) {
    this.addClass(args.addClass);
  }
  // Activate for media query slide animation
  if (args.altLeft && window.innerWidth <= 1280) {
    this.css("left", `${args.altLeft}%`);
  }
}

function animateObj(args = {}, hide = false) {
  if (hide) {
    assets.children().hide();
  }
  this.show();
  this.animate(args, 300);
}

function showChild(args = {}, hide = false) {
  if (hide) {
    assets.children().hide();
    mainContainer.removeClass().addClass("whitebg");
  }
  if (args.parentName) {
    args.parentName.show();
  }
  this.css("opacity", "1");
  if (args) {
    handleArgs.call(this, args);
  }
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function startBubbleCloner() {
  bubbleInterval = setInterval(cloneBubbles, 2000);
}

function stopBubbleCloner() {
  clearInterval(bubbleInterval);
}

// Clone bubble, randomize scale, left, and animation duration
function cloneBubbles() {
  $.each(bubbles, function (i, bubble) {
    var jbubble = $(bubble);
    // Important to copy event handler!
    var clone = jbubble.clone(true);
    var randomLeft = getRandom(-10, 90);
    var randomSec = getRandom(5, 15);
    clone.css("left", `${randomLeft}%`);
    clone.css(
      "animation",
      `float ${randomSec}s linear forwards, bubbleRotate 2.5s linear forwards infinite`
    );
    clone.appendTo("#assets");
  });
}

function moveAcrossScreen() {
  this.show();
  var currentLeft = this.css("left").replace(/px/gi, "");
  var targetLeft = currentLeft < 0 ? "100%" : "-100%";
  var targetTop = getRandom(0, 60) + "%";
  var targetScale = getRandom(0.2, 1);
  this.css({
    left: targetLeft,
    top: targetTop,
    transform: `scale(${targetScale})`,
  });
  // If offscreen on right rotate to face proper direction
  if (targetLeft == "-100%") {
    this.css({ transform: `rotateY(180deg) scale(${targetScale})` });
  }
}

// Easter egg - You can pop the bubbles!
var bubbleClickEventListener = function () {
  $(".bubble").on("click", function () {
    pop.play();
    this.remove();
  });
};

// Removes bubble when offscreen
var bubbleAnimationEventListener = function () {
  $(".bubble").on(
    "webkitAnimationEnd oanimationend msAnimationEnd animationend",
    function (e) {
      this.remove();
    }
  );
};

// Reset state after animation
var meBubbleAnimationEventListener = function () {
  $(".me-images").on(
    "webkitAnimationEnd oanimationend msAnimationEnd animationend",
    function (e) {
      var image = $(this);
      image.css("opacity", "0");
      image.removeClass("float");
    }
  );
};

function handleControls(e, click = false) {
  // Space or click
  if (click || e.keyCode === 32) {
    var command = audio.paused ? audio.play() : audio.pause();
    displayPlaybackControls();
  }
}

// Get current time
function getCurrentAudioTime() {
  return audio.currentTime.toFixed(1);
}

// Check if current audio time is in timings hash
function timingChecker() {
  const currentTime = getCurrentAudioTime();
  if (DEBUG) {
    console.log(currentTime);
  }
  if (currentTime in timings) {
    var command = timings[currentTime];
    executeCommand(command);
  }
}

// Execute command in keyframes
function executeCommand(command) {
  if (DEBUG) {
    console.log("command", command);
  }
  keyFrames[command]();
}

function displayPlaybackControls() {
  if (audio.ended) {
    pauseBtn.hide();
    playBtn.hide();
    replayBtn.show();
  } else if (audio.paused) {
    pauseBtn.hide();
    playBtn.show();
  } else {
    pauseBtn.show();
    playBtn.hide();
    replayBtn.hide();
  }
  if (!audio.ended && audio.currentTime > 0) {
    setTimeout(fadeOutThis.bind(controls), 2000);
  }
}

function fadeOutThis() {
  $(this).fadeOut("slow");
}

// Display controls when hovering over main container
var mainContainerMouseEventListener = function () {
  mainContainer.on("mousemove", function () {
    displayPlaybackControls();
  });
};

var startAudioEventListener = function () {
  $(audio).on("play", function () {
    console.log("starting");
    timeChecker = setInterval(function () {
      timingChecker();
    }, 100);
  });
};

var stopAudioEventListener = function () {
  $(audio).on("pause", function () {
    console.log("clearing");
    clearInterval(timeChecker);
  });
};

// Control playback with mouse click
var mainContainerEventListener = function () {
  mainContainer.on("click", function (e) {
    handleControls(e, (click = true));
  });
};

// Start with all the assets hidden
assets.children().hide();
// DEBUG!
// audio.currentTime = 88;
// audio.currentTime = 15;

$(document).ready(function () {
  startAudioEventListener();
  stopAudioEventListener();
  mainContainerEventListener();
  mainContainerMouseEventListener();
  $(window).on("keyup", handleControls);
  bubbleClickEventListener();
  bubbleAnimationEventListener();
  meBubbleAnimationEventListener();
});
