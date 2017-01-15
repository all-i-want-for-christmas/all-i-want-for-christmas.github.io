(function() {
    var name = window.location.hash.slice(1) || 'matthew';

    var music1 = document.getElementById('music1'),
        music2 = document.getElementById('music2'),
        personName = document.getElementById('personName'),
        music3 = document.getElementById('music3'),
        music4 = document.getElementById('music4');
        hiddenButton = document.getElementById('hidden-button'),
        playSecond = true,
        playThird = false,
        playFourth = false,
        playSecondName = false,
        playThirdName = false,
        playFourthName = false,
        playFirstName = true,
        firstSongSrc = music1.src;

    window.document.title = 'All I want for Christmas is ' + name;

    if (window.innerWidth < 450) {
        hiddenButton.style.display = 'block';
    } else {
        music1.play();
    }

    hiddenButton.addEventListener('click', function() {
        music1.play();

        hiddenButton.innerHTML = 'loading...';
        hiddenButton.disabled = true;
    });

    music1.addEventListener('playing', function() {
        hiddenButton.style.opacity = '0';
        hiddenButton.style.transofrm = 'scale(0)';
    });

    if (name === '') {
        name = 'matthew';
    }

    voice = 'usenglishmale',
        speed = 0,
        apiKey = //myapikey;

    var nameSrc = 'https://api.ispeech.org/api/rest' +
        '?apikey=' + apiKey +
        '&action=convert' +
        '&voice=' + voice +
        '&speed=' + speed +
        '&pitch=0' +
        '&text=' + name;

//i hate this but necessary to play on safari ios :(
// http://stackoverflow.com/questions/23281784/continuous-html5-audio-video-playback-in-ios
    music1.addEventListener('ended', function() {
      console.log('in music1 end listener');
      if(playFirstName){
        music1.src = nameSrc;
        $(this)[0].play();
        playFirstName = false;
        playSecond = true;
    } else if (playSecond) {
        console.log('play second');
        music1.src = music2.src;
        $(this)[0].play();
        playSecond = false;
        playSecondName = true;
    } else if (playSecondName) {
        music1.src = nameSrc;
        $(this)[0].play();
        playSecondName= false;
        playThird = true;
      } else if (playThird) {
          console.log('play third');
          music1.src = music3.src;
          $(this)[0].play();
          playThird = false;
          playThirdName = true;
      } else if (playThirdName) {
        console.log('play third');
        music1.src = nameSrc;
        $(this)[0].play();
        playThirdName = false;
        playFourth = true;
    } else if (playFourth) {
        console.log('play fourth');
        music1.src = music4.src;
        $(this)[0].play();
        playFourth = false;
        playFourthName = true;
    } else if (playFourthName) {
        console.log('play fourth');
        music1.src = nameSrc;
        $(this)[0].play();
        playFourth = false;
        playFourthName = false;
    } else {
      music1.src = firstSongSrc;
      $(this)[0].play();
      playFirstName = true;
    }
  });
})();
