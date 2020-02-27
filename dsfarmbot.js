/**
 * Copyright (c) 2020
 *
 * Farmmanager Bot der alle X Minuten automatisch den B-Button der Farm drückt.
 * Falls dieser deaktiviert ist wird dieser vor der Ausführung wieder aktiviert.
 * In der Config-Section können einige Einstellungen am Bot vorgenommen werden.
 *
 * @summary Der Bot besteht aus einer einzigen Datei.
 * @author Yannick Vaske <bot@vaskee.de>
 *
 * Created at     : 2020-02-26 23:31:42
 * Last modified  : 2020-02-26 23:31:42
 */


// ----------- config ----------

const TIME_BETWEEN_FARM = 20 * 1000; //10 Minuten zwischen Farms
const VARIATION_TIME_BETWEEN_FARM = 1; //3 * 60 * 1000; // zufälliger Wert von 0 bis 180 Sekunden der auf die 10 Minuten gerechnet wird (Bot schutz)
const TIME_BETWEEN_ATTACK = 400; //alle 400 ms button drücken
const VARIATION_BETWEEN_ATTACK = 200; // bis zu 200 ms variation, sodass nicht immer alle 400 sekunden gedrückt wird sondern bis zu 600ms


// -----------------------------
// ----------- actual bot ------
Accountmanager.farm.unitsAppearAvailableAB = function (e) { return true; } // Funktion aus DS Code überschreiben, der prüft ob Truppen vorhanden sind

var botRuns = 0;

var progressElm = $("<div style='font-size: 25px;'>Angriff: 0/0</div>");
$("#am_widget_Farm").before(progressElm);
progressElm.html("Bot Durchläufe: " + botRuns + "</br> Angriff: 0/0");

var doFarm = function () {
    console.log("Starting Farm Action...");

    var total = $(".farm_icon_b").length;
    var farms = $(".farm_icon_b");
    var fasend = function (b) { // Rekrusiv die Dorfindizes durchlaufen
        if (b == total) return;
        var curFarm = $(farms[b])
        curFarm.removeClass("start_locked");
        curFarm.removeClass("farm_icon_disabled"); // B-Farm Button wieder aktivieren
        curFarm.trigger("click");
        progressElm.html("Bot Durchläufe: " + botRuns + "</br> Angriff: " + b + "/" + total - 1);
        setTimeout(function () { fasend(b + 1) }, TIME_BETWEEN_ATTACK + Math.random(VARIATION_BETWEEN_ATTACK));
    };
    fasend(0);
    console.log("Finished Farm Action.");
};
var timeout = TIME_BETWEEN_FARM + Math.random(VARIATION_TIME_BETWEEN_FARM);
console.log("Time to next farm: " + timeout / 1000 + " Seconds");
//run bot:
var startUp = function () {
    doFarm();
    botRuns++;
    progressElm.html("Bot Durchläufe: " + botRuns + "</br> Angriff: 0/0");
    setInterval(function () {
        doFarm();
        botRuns++;
        progressElm.html("Bot Durchläufe: " + botRuns + "</br> Angriff: 0/0");
    }, timeout);
};
startUp();


// -----------------------------