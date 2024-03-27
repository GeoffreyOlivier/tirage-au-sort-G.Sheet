function myFunction() {
    var feuille = SpreadsheetApp.openById("1XWJeZVS6psrAVi4n5KeIQDYL41t4dyuP447GFztZKVc");
    var participants = feuille.getRange('C2:C' + feuille.getLastRow()).getValues();
    participants = shuffleArray(participants);

    var nbParticipants = participants.length;
    var nbBoxDetente = Math.floor(nbParticipants * 0.3); // 30%
    var nbCadeauSexy = Math.floor(nbParticipants * 0.2); // 20%
    var nbRemise5 = Math.floor(nbParticipants * 0.10); // 10%
    var participantsRestants = nbParticipants - (nbBoxDetente + nbCadeauSexy + nbRemise5);

    var gagnantsBoxDetente = [];
    var gagnantsCadeauSexy = [];
    var gagnantsRemise5 = [];
    var perdants = [];

    gagnantsBoxDetente = participants.slice(0, nbBoxDetente).map(p => p[0]);
    gagnantsCadeauSexy = participants.slice(nbBoxDetente, nbBoxDetente + nbCadeauSexy).map(p => p[0]);
    gagnantsRemise5 = participants.slice(nbBoxDetente + nbCadeauSexy, nbBoxDetente + nbCadeauSexy + nbRemise5).map(p => p[0]);
    perdants = participants.slice(-participantsRestants).map(p => p[0]);

    var grandGagnant = perdants.splice(Math.floor(Math.random() * perdants.length), 1);

    feuille.getRange('G2').setValue(gagnantsBoxDetente.join("\n"));
    feuille.getRange('G3').setValue(gagnantsCadeauSexy.join("\n"));
    feuille.getRange('G4').setValue(gagnantsRemise5.join("\n"));
    feuille.getRange('G5').setValue(perdants.join("\n"));
    feuille.getRange('G6').setValue(grandGagnant);
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
