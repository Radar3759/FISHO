var FISHO = FISHO || {};

FISHO.wordCount;
FISHO.wordsArr = [ ];

FISHO.domElems ={
    drawButton: document.getElementById('js-draw'),
    drawnLast : document.getElementById('js-last-word'),
    drawHistory: document.getElementById('js-history'),
    resetButton: document.getElementById('js-reset')
};

var wordsStart = 
["Betta", "Guppy", "Angelfish", "Neon Tetra", "Discus", "Rainbowfish", "Corydoras Catfish", "Swordtail", "Platies", "Mollies", "Rasbora", "Cherry Barb", "Dwarf Gourami", "Kuhli Loach", "African Dwarf Frog", "Zebra Danio", "Goldfish", "Tiger Barb", "Plecostomus", "Electric Blue Ram", "Harlequin Rasbora", "Clown Loach", "Cardinal Tetra", "Pearl Gourami", "Bristlenose Pleco", "Ember Tetra", "Celestial Pearl Danio", "Boeseman's Rainbowfish", "Apistogramma", "Endler's Livebearer", "Black Molly", "Amano Shrimp", "Redtail Shark", "Panda Corydoras", "Killifish", "Blood Parrot Cichlid", "Green Terror Cichlid", "Peacock Cichlid", "Pearl Danio", "White Cloud Mountain Minnow", "Electric Blue Acara", "Bolivian Ram", "Rosy Barb", "Blue Gourami", "Glass Catfish", "Otocinclus Catfish", "Electric Yellow Cichlid", "Red Cherry Shrimp", "Siamese Fighting Fish (Betta)", "Emperor Tetra","Java Fern",
"Anubias","Amazon Sword","Vallisneria","Java Moss","Cryptocoryne","Hornwort","Dwarf Baby Tears","Water Wisteria","Ludwigia","Rotala","Moneywort","Bacopa","Water Sprite","Dwarf Hairgrass","Amazon Frogbit","Red Root Floater","Dwarf Sagittaria",
"Alternanthera reineckii","Cryptocoryne Wendtii","Hygrophila","Ambulia","Pennywort","Pygmy Chain Sword","Staurogyne Repens"]


// randomize wordsStart arr while preserving the original
const words = [...wordsStart].sort(() => Math.random() - 0.5);
// test randomizer code
// console.log(words);


//pushes to aka populates wordsArr[], assigns a letter to each str
FISHO.populateWords = () => {

    for ( let i = FISHO.wordCount; i >= 1; i-- ) {

        if ( i >= 0 && i <= 15) FISHO.wordsArr.push( 'F-' + words[i] );
        if ( i >= 16 && i <= 30) FISHO.wordsArr.push( 'I-' + words[i] );
        if ( i >= 31 && i <= 45 ) FISHO.wordsArr.push( 'S-' + words[i]);
        if ( i >= 46 && i <= 60 ) FISHO.wordsArr.push( 'H-' + words[i]);
        if ( i >= 61 && i <= 75) FISHO.wordsArr.push( 'O-' + words[i]);

    }

};

FISHO.addClassOnClick = ( obj, cl ) => {

    [ ...obj ].map( el => {

        el.addEventListener( 'click', () => {

            el.classList.contains( cl ) ? el.classList.remove( cl ) : el.classList.add( cl );

        } );

    });

};


//Initiates FISHO, populates wordsArr
(FISHO.init = () => {

    FISHO.wordCount = words.length;
    FISHO.populateWords(FISHO.wordsArr);

})();

// console.log(FISHO.wordCount)
// console.log(FISHO.wordsArr)

// Gen Random Word 1
FISHO.generateRandomWord = () => {

    // random word 
    const _word = Math.floor( Math.random() * (FISHO.wordsArr).length);

    return _word;

};


//  Gen Random Word 2
FISHO.randomWordSelector = () => {

    const _wordCount  = FISHO.wordsArr.length;
    const _randomWord = FISHO.generateRandomWord( _wordCount - 1 );

    return FISHO.wordsArr[ _randomWord ];

};


FISHO.popWord = word => {

    const _wordIndex = FISHO.wordsArr.indexOf( word );

    if ( _wordIndex > -1 ) FISHO.wordsArr.splice( _wordIndex, 1 );

    return FISHO;

};

FISHO.updateDrawHistory = word => {

    const _node     = document.createElement( 'li' );
    const _textnode = document.createTextNode( word );

    // append word word to 'li'
    _node.appendChild( _textnode );

    // update the DOM
    FISHO.domElems.drawHistory.appendChild( _node );

    // scroll to the bottom of the list in the DOM
    FISHO.domElems.drawHistory.scrollTop = FISHO.domElems.drawHistory.scrollHeight;

    return FISHO;

};

FISHO.updateLastDrawn = word => {

    FISHO.domElems.drawnLast.innerHTML = word;

    return FISHO;

};


FISHO.drawWord = () => {

    const _word = FISHO.randomWordSelector();
    const _drawnWord = parseInt( _word.split( '-' )[ 1 ] );

    if( FISHO.wordCount > 0 ) {

        FISHO.popWord( _word )
            .updateDrawHistory( _word )
            .updateLastDrawn( _word );
            
        if( FISHO.wordCount === 0 ) {

            // disable draw button
            FISHO.domElems.drawButton.disabled = true;
            FISHO.domElems.drawButton.classList.add( 'disabled' );
            // show the reset button
            FISHO.domElems.resetButton.classList.remove( 'display-none' );

        }

    }

};
FISHO.domElems.drawButton.addEventListener( 'click', FISHO.drawWord );
// FISHO.domElems.resetButton.addEventListener( 'click', FISHO.resetGame );

