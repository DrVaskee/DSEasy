/**
 * Copyright (c) 2020
 *
 * Bot that activates in a given amount of time and farms with the farmanger.
 * It emulates the Farmbutton B Click.
 *
 * @summary The bot consists of one file. Everything it needs to run follows.
 * @author Yannick Vaske <bot@vaskee.de>
 *
 * Created at     : 2020-02-26 23:31:42
 * Last modified  : 2020-02-26 23:31:42
 */
//some constants (feel free to change)
const TIME_BETWEEN_ATTACK = 400; // press button only all {configured_value} ms
const VARIATION_BETWEEN_ATTACK = 200; // up to + {configured_value} ms to prevent getting caught.

// UI-Elements
var htmlForm = $("<table class='vis'> <tr> <th>Time between Farm:</th> <th>Variation between Farm:</th> <th style='padding-left: 50px'>Information:</th> </tr> <tr> <td> <input type='number' value='10' style='text-align: left; width: 100%;' id='tbf'> </td> <td> <input type='number' value='3' style='text-align: left; width: 100%;' id='vbf'> </td> </tr> <tr> <td> <button id='startbot' onclick='startFarmBot()' style='text-align: center; width: 100%;'>Start Farmbot</button> </td> <td id='timer'></td> <td id='output'>Dies ist eine Testausgabe</td> </tr>> <tr> <td> <button id='farmonce' onclick='farmOnce()' style='text-align: center; width: 100%;'>Farm just once</button> </td> </tr> </table>");

$("#am_widget_Farm").before(htmlForm);

// Memorizing elements
var output = document.querySelector("#output");
output.innerHTML = "Bot successfully loaded."

var timeBetweenFarm = document.querySelector("#tbf");
var variationBetweenFarm = document.querySelector("#vbf");
var btnStartOnce = document.querySelector("#farmonce");
var btnStartBot = document.querySelector("#startbot");
var timerOutput = document.querySelector("#timer");
timerOutput.innerHTML = "Bot not started."


// Handler
function farmOnce() {
    btnStartBot.setAttribute("disabled", "true");
    btnStartOnce.setAttribute("disabled", "true");

    doFarm();

    btnStartOnce.removeAttribute("disabled");
}
function startFarmBot() {
    btnStartOnce.setAttribute("disabled", "true");
    btnStartBot.setAttribute("disabled", "true");
    var activeFarmBot = $("<div><h1 style='color: red; text-align: center;'>FARMBOT AKTIV - Nichts klicken!!!</h1></div>");
$("#contentContainer").before(activeFarmBot);

    var timeout = (timeBetweenFarm.value * 60 * 1000) + Math.random((variationBetweenFarm.value * 60 * 1000));
    doFarm();
    var now = new Date();
    now.setMilliseconds(now.getMilliseconds() + timeout);
    timerOutput.innerHTML = "Next Attack at: " + now.toLocaleTimeString("de-de");
    setInterval(function () {
        doFarm();
        timeout = timeBetweenFarm.value + Math.random(variationBetweenFarm.value);
        now = new Date();
        now.setMilliseconds(now.getMilliseconds() + timeout);
        timerOutput.innerHTML = "Next Attack at: " + now.toLocaleTimeString("de-de");
    }, timeout);
}

// The Bot itself
Accountmanager.farm.unitsAppearAvailableAB = function (e) { return true; } //Override function of ds that locally checks weather troops are available

// activate already attacked filter
var attacked_checkbox = document.querySelector("#attacked_checkbox");
if (!attacked_checkbox.getAttribute("checked")) {
    attacked_checkbox.click();
}

var doFarm = function () {
    output.innerHTML = "Starting Farm Action...";

    var total = $(".farm_icon_b").length;
    var farms = $(".farm_icon_b");
    var farmVillage = function (b) {
        if (b == total) return;
        var curFarm = $(farms[b])
        curFarm.removeClass("start_locked");
        curFarm.removeClass("farm_icon_disabled"); // Reactivate Farmbutton
        curFarm.trigger("click");
        output.innerHTML = "Attacking: " + String(b) + "/" + String(total - 1);
        setTimeout(function () { farmVillage(b + 1) }, TIME_BETWEEN_ATTACK + Math.random(VARIATION_BETWEEN_ATTACK));
    };
    farmVillage(0);
    output.innerHTML = "Finished Farm Action. \n Farmed " + total - 1 + " villages";
}

