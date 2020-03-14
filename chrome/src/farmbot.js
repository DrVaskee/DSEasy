// Memorizing elements
var output;
var timeBetweenFarm;
var variationBetweenFarm;
var btnStartOnce;
var btnStartBot;
var timerOutput;

startUp();


function startUp() {
	console.log("Warming up bot...");

	// // Inject UI:
	// var element = document.querySelector("#am_widget_Farm");
	// var htmlForm = document.createElement("div");
	// htmlForm.innerHTML = "<div> <h1 style='color: red'>FARMBOT AKTIV - Nichts klicken</h1> </div> <table class='vis'> <tr> <th>Time between Farm:</th> <th>Variation between Farm:</th> <th>Information:</th> </tr> <tr> <td> <input type='number' value='10' style='text-align: left; width: 100%;' id='tbf'> </td> <td> <input type='number' value='3' style='text-align: left; width: 100%;' id='vbf'> </td> </tr> <tr> <td> <button id='startbot' onclick='FarmBot.StartFarmBot()' style='text-align: center; width: 100%;'>Start Farmbot</button> </td> <td id='timer'></td> <td id='output'>Dies ist eine Testausgabe</td> </tr>> <tr> <td> <button id='farmonce' onclick='FarmBot.FarmOnce()' style='text-align: center; width: 100%;'>Farm just once</button> </td> </tr> </table>";
	// element.parentNode.insertBefore(htmlForm, element);

	// Memorizing elements

	FarmBot.output = document.querySelector("#output");
	FarmBot.output.innerHTML = "Bot successfully loaded."
	FarmBot.timeBetweenFarm = document.querySelector("#tbf");
	FarmBot.variationBetweenFarm = document.querySelector("#vbf");
	FarmBot.btnStartOnce = document.querySelector("#farmonce");
	FarmBot.btnStartBot = document.querySelector("#startbot");
	FarmBot.timerOutput = document.querySelector("#timer");
	FarmBot.timerOutput.innerHTML = "Bot not started."

	// The Bot itself
	// Accountmanager.farm.unitsAppearAvailableAB = function (e) { return true; } //Override function of ds that locally checks weather troops are available

	// activate already attacked filter
	var attacked_checkbox = document.querySelector("#attacked_checkbox");
	if (!attacked_checkbox.getAttribute("checked")) {
		attacked_checkbox.click();
	}
}

function TestFarmBot() {
	console.log("Pong!");
}

FarmBot = {
	output: "",
	timeBetweenFarm: "",
	variationBetweenFarm: "",
	btnStartOnce: "",
	btnStartBot: "",
	timerOutput: "",
	FarmOnce: function () {
		btnStartBot.setAttribute("disabled", "true");
		btnStartOnce.setAttribute("disabled", "true");

		doFarm();

		btnStartOnce.removeAttribute("disabled");
	},
	StartFarmBot: function () {
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
	},
	DoFarm: function () {
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
};