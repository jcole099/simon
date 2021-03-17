document.querySelector('.ng-text').addEventListener('click', function() {
    document.querySelector('.newgame').style.zIndex = '-1';
    //call controller to start game
    controller.displayRound();
    controller.setupEventListeners();
});



var controller = (function() {
    var sequence = [];
    var score = 0;
    var bPressCnt = 0;
    
    return {
        displayRound: function() {
            uiController.toggleSequenceDisplay();
            uiController.disableButtons();
            controller.getRandomNum();
            var sCntr;
            sCntr = 0;
            var looping = setInterval(function() {
                if (sCntr === sequence.length) {
                    clearInterval(looping);
                    controller.userInput();
                } else {
                    var temp = sequence[sCntr];
                    uiController.addLight(sequence[sCntr]);
                    uiController.playSound(sequence[sCntr]);
                    setTimeout(function() {uiController.removeLight(temp)}, 700);
                    sCntr++; 
                }
            }, 1200);
        },
        
        getRandomNum: function() {
            var rando = Math.floor(Math.random() * 4);
            sequence.push(rando);
        },
        
        userInput: function() {
            uiController.toggleSequenceDisplay();
            uiController.enableButtons();
            bPressCnt = 0;
        },
        
        updateScore: function() {
            document.querySelector('.score').innerHTML = score;
        },
        
        buttonPress: function(whichButton) {
            
            if (sequence[bPressCnt] === whichButton) {
                score++;
                controller.updateScore();
                bPressCnt++;
                uiController.playSound(whichButton);
                if (bPressCnt == sequence.length) {
                    controller.displayRound();
                }
            } else {
                console.log('GAME OVER NERD');
                uiController.disableButtons();
                uiController.playSound(4);
            }
        },
        setupEventListeners: function() {
            document.querySelector('.btn-0').addEventListener('click', function() {
                controller.buttonPress(0);
            });
            document.querySelector('.btn-1').addEventListener('click', function() {
                controller.buttonPress(1);
            });
            document.querySelector('.btn-2').addEventListener('click', function() {
                controller.buttonPress(2);
            });
            document.querySelector('.btn-3').addEventListener('click', function() {
                controller.buttonPress(3);
            });
        }
    }
    
})();



var uiController = (function() {
    return {
        addLight: function(whichButton) {
            document.querySelector('.btn-' + whichButton).classList.add('light-' + whichButton);
        },
        removeLight: function(whichButton) {
            document.querySelector('.btn-' + whichButton).classList.remove('light-' + whichButton);
        },
        playSound: function(whichSound) {
            document.querySelector('#sound-' + whichSound).play();
        },
        disableButtons: function() {
            for (var i=0; i < 4; i++) {
                document.querySelector('.btn-' + i).classList.add('disable');
            }
        },
        enableButtons: function() {
            for (var i=0; i < 4; i++) {
                document.querySelector('.btn-' + i).classList.remove('disable');
            }
        },
        toggleSequenceDisplay: function() {
            var seq = document.querySelector('.sequence');
            
            if (seq.innerHTML == 'Displaying sequence') {
                seq.innerHTML = 'Input sequence';
                seq.classList.remove('seq-computer');
                seq.classList.add('seq-player');
            } else {
                seq.innerHTML = 'Displaying sequence';
                seq.classList.remove('seq-player');
                seq.classList.add('seq-computer');
            }
        }
    } 
})();




















