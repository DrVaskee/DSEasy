chrome.extension.sendMessage({}, function (response) {

	var readyStateCheckInterval = setInterval(function () {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);


			console.log("Injecting bot...");
			// Inject UI:
			var element = document.querySelector("#am_widget_Farm");
			var htmlForm = document.createElement("div");
			var uiString = "<table class='vis'> <tr> <th>Time between Farm:</th> <th>Variation between Farm:</th> <th>Information:</th> </tr> <tr> <td> <input type='number' value='10' style='text-align: left; width: 100%;' id='tbf'> </td> <td> <input type='number' value='3' style='text-align: left; width: 100%;' id='vbf'> </td> </tr> <tr> <td> <button id='startbot' onclick='FarmBot.StartFarmBot()' style='text-align: center; width: 100%;'>Start Farmbot</button> </td> <td id='timer'></td> <td id='output'>Dies ist eine Testausgabe</td> </tr>> <tr> <td> <button id='farmonce' onclick='FarmBot.FarmOnce()' style='text-align: center; width: 100%;'>Farm just once</button> </td> <td> <button id='init' onclick='$.getScript(!SCRIPT_SOURCE!)' style='text-align: center; width: 100%;'>Initialize</button> </td> </tr> </table>";
			uiString = uiString.replace("!SCRIPT_SOURCE!", "\"" + chrome.runtime.getURL('src/farmbot.js') + "\"");
			htmlForm.innerHTML = uiString;
			element.parentNode.insertBefore(htmlForm, element);


			// console.log(chrome.runtime.getURL('src/startup.js'));

			// var script = document.createElement('script');
			// script.src = chrome.runtime.getURL('src/startup.js');

			// (document.head || document.documentElement).appendChild(script);
		}
	}, 10);
});

