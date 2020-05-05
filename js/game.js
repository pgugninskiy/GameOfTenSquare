const numDivs = 36;
const maxHits = 11;

let hits = 1;
let firstHitTime = getTimestamp();
let lastTarget = 0;
let miss

function round() {
  $(".row").removeClass('none');
  // FIXME: надо бы убрать "target" прежде чем искать новый - ok
  $(lastTarget).removeClass("target").html("");
  let divSelector = randomDivId();
  lastTarget = divSelector;
  $(divSelector).addClass("target");
  // TODO: помечать target текущим номером - ok
  $(divSelector).html(hits);
  // FIXME: тут надо определять при первом клике firstHitTime - ok
  
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала - ok
  $(".row").addClass('none');
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#win-message").removeClass("d-none");

}

function handleClick(event) {
  

  // FIXME: убирать текст со старых таргетов. Кажется есть .text? - ok
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    round(); 
  }
  else {
    miss = $(event.target).addClass("miss")
        
  } 
  
      // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
}

function init() {
 
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке - ok
  $("#button-start").on('click', function(event) {
    event.preventDefault();
    round();
  $("#button-reload").removeClass('none');
    /* Act on the event */
  $(this).addClass('block');
  });
  
  $(".game-field").on('click', function (event) {
    event.preventDefault();
    handleClick(event);
    /* Act on the event */
  });
  $("#button-reload").on('click', function(event) {
    event.preventDefault();
    location.reload();
    /* Act on the event */
  });
   $(".row").addClass('none'); 
}

$(document).ready(init);
