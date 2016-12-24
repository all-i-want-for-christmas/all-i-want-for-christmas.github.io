// on load
(function(){
  console.log('window.location.hash', window.location);
    var name = decodeURIComponent(window.location.hash.slice(1)) || 'matthew';

    var music1 = document.getElementById('music1'),
        music2 = document.getElementById('music2'),
        personName = document.getElementById('personName'),
        music3 = document.getElementById('music3'),
        music4 = document.getElementById('music4');

    var personInput = document.querySelector('input'),
        hiddenButton = document.getElementById('hidden-button');

    var playSecond = true;
    var playThird = false;
    var playFourth = false;

    personInput.addEventListener('change', setName);
    personInput.addEventListener('keyup', setName);

    personInput.value = name;
    window.document.title = 'All I want for Christmas is ${name}';
    setNameAudio();

    if ( window.innerWidth < 450 ){
        hiddenButton.style.display = 'block';
    } else {
        music1.play();
    }

    hiddenButton.addEventListener('click', function(){
        music1.play();

        personName.play();
        personName.pause();

        music2.play();
        music2.pause();

        personName.play();
        personName.pause();

        music3.play();
        music3.pause();

        personName.play();
        personName.pause();

        music4.play();
        music4.pause();

        personName.play();
        personName.pause();

        hiddenButton.innerHTML = 'loading...';
        hiddenButton.disabled = true;
    });

    music1.addEventListener('playing', function(){
        hiddenButton.style.opacity = '0';
        hiddenButton.style.transofrm = 'scale(0)';
    });

    music1.addEventListener('ended', function(){
        personName.play();
    });

    personName.addEventListener('ended', function(){
        setNameAudio();

        if(playSecond){
            music2.play();
            playSecond = false;
            playThird = true;
        } else if (playThird) {
            music3.play();
            playThird = false;
            playFourth = true;
        }  else if(playFourth){
          music4.play();
          playSecond = true;
          playFourth = false;
        }
    });

    music2.addEventListener('ended', function(){
        personName.play();
    });

    music3.addEventListener('ended', function(){
        music4.play();
    });

    music4.addEventListener('ended', function(){
        personName.play();
    });


    function setName(){
        name = personInput.value;
        window.location.hash = encodeURIComponent(name);
    }

    function setNameAudio(){
        name = personInput.value;

        if( name === '' ){
            name = 'matthew';
        }

        voice = 'usenglishmale',
        speed = -10,
        apiKey = '34b06ef0ba220c09a817fe7924575123';

        var newSrc = 'https://api.ispeech.org/api/rest' +
                     '?apikey=' + apiKey +
                     '&action=convert' +
                     '&voice=' + voice +
                     '&speed=' + speed +
                     '&pitch=0' +
                     '&text=' + name;

        if(newSrc === personName.src){
            return;
        }
        personName.src = newSrc;
        personName.playbackRate = 1.5;
    }


})();
