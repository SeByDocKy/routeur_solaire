function addInputNested(setting, name, content, readonly, type, min, max) {
    let value;
    let bornes = '';
    if (setting.value instanceof Number || setting.value === 0) {
        value = +setting.value.toFixed(5);
    } else {
        value = setting.value;
    }
    if (min && max) {
        bornes = ' min="' + min + '" max="' + max + '" ';
    }
    content += "<div class='group'>";
    content += "   <input step='0.000001' type='" + type + "'  value='" +
        (value !== undefined ? value : '') + "' name='" + name + "' id='" + name + "' " + (readonly ? 'readonly' : '') + bornes + ">";
    content += "    <span class='highlight'></span>";
    content += "    <span class='bar'></span>";
    content += "    <label class='label-input-text'>" + setting.label + "</label > ";
    content += "</div>";
    return content;
}

function addInput(settingValue, name, content, readonly, type, id) {
    let value;
    if (settingValue instanceof Number) {
        value = settingValue.toFixed(5);
    } else {
        value = settingValue;
    }

    content += "<div class='group'>";
    content += "   <input step='0.000001' type='" + type + "'  value='" + (value ? value : '') + "' name='" + name + "' id='" + id + "' " + (readonly ? 'readonly' : '') + ">";
    content += "    <span class='highlight'></span>";
    content += "    <span class='bar'></span>";
    content += "    <label class='label-input-text'>" + name + "</label > ";

    content += "</div>";
    return content;
}

function updatePercentageState() {
    const checked = document.getElementById('marcheForcee').checked;
    document.getElementById('marcheForceeHidden').value = checked;
}

function update2Sortie() {
    const checked = document.getElementById('utilisation2Sorties').checked;
    document.getElementById('utilisation2SortiesHidden').value = checked;
}

function updateRelaisStatique() {
    const checked = document.getElementById('relaisStatique').checked;
    document.getElementById('relaisStatiqueHidden').value = checked;
}

function addSwitch(setting, name, onchange, content) {
    content += "<label class='pure-material-switch' style='padding: 0 0 1em 0; margin: 0 1em; width: calc(100% - 2em);'>";
    content += "    <input name='" + name + "NotHidden' id='" + name + "' type='checkbox' onchange='" + onchange + "()' " + (setting.value ? 'checked' : '') + ">";
    content += "    <span style='font-size: 1em'>" + setting.label + "</span>";
    content += "</label>";
    content += "    <input type='hidden' name='" + name + "' id='" + name + "Hidden' value='" + setting.value + "'></input>";
    return content;
}

function updateSelectBooleanHidden(idHidden, id) {
    document.getElementById(idHidden).value = document.getElementById(id).value
}

function updateMarcheForceeHidden() {
    document.getElementById('marcheForceePercentageHidden').value = document.getElementById('selectMarcheForcee').value;
}
function updateBasculementModeHidden() {
    document.getElementById('basculementModeHidden').value = document.getElementById('basculementMode').value;
    update2Sortie();
}

function addSelectMarcheForcee(setting, content, disabled) {
    content += "<div class='select'>";
    content += "    <select onchange='updateMarcheForceeHidden()' name='marcheForceePercentageNotHidden' id='selectMarcheForcee' class='select-text'  " + (disabled ? 'disabled' : '') + ">";
    content += "        <option value='' " + (setting.value === '' ? 'selected' : '') + "></option>";
    content += "        <option value='25' " + (setting.value === 25 ? 'selected' : '') + ">25%</option>";
    content += "        <option value='50' " + (setting.value === 50 ? 'selected' : '') + ">50%</option>";
    content += "        <option value='75' " + (setting.value === 75 ? 'selected' : '') + ">75%</option>";
    content += "        <option value='100' " + (setting.value === 100 ? 'selected' : '') + ">100%</option>";
    content += "    </select>";
    content += "    <span class='select-highlight'></span>";
    content += "    <span class='select-bar'></span>";
    content += "    <label class='select-label'>Pourcentage</label>";
    content += "<input type='hidden' name='marcheForceePercentage' id='marcheForceePercentageHidden' value='" + setting.value + "'></input>";
    content += "</div>";
    return content;
}
function addSelectBasculementMode(setting, content, disabled) {
    content += "<div class='select'>";
    content += "    <select onchange='updateBasculementModeHidden()' name='basculementModeNotHidden' id='basculementMode' class='select-text'  " + (disabled ? 'disabled' : '') + ">";
    content += "        <option value='T' " + (setting.value === 'T' ? 'selected' : '') + ">Température</option>";
    content += "        <option value='P' " + (setting.value === 'P' ? 'selected' : '') + ">Puissance Zéro</option>";
    content += "    </select>";
    content += "    <span class='select-highlight'></span>";
    content += "    <span class='select-bar'></span>";
    content += "    <label class='select-label'>Choix du basculement</label>";
    content += "<input type='hidden' name='basculementMode' id='basculementModeHidden' value='" + setting.value + "'></input>";
    content += "</div>";
    return content;
}

function addRadioButtonRelaisStatique(setting, content, readonly) {
    content += "<div class='radios' style='margin: 0 1em;display: flex;'>";
    content += "    <label class='pure-material-radio' style='flex: 1;'>";
    content += "        <input value='V' id='r1_relaisstatique' type='radio' name='tensionOuTemperature' " + (setting.value === 'V' ? 'checked ' : '') + (readonly ? 'readonly' : '') + ">";
    content += "        <span>Tension Batterie</span>";
    content += "    </label>";
    content += "    <label class='pure-material-radio'>";
    content += "        <input value='D' id='r2_relaisstatique' type='radio' name='tensionOuTemperature' " + (setting.value === 'D' ? 'checked ' : '') + (readonly ? 'readonly' : '') + ">";
    content += "        <span>Température</span>";
    content += "    </label>";
    content += "</div>";
    return content;
}

function submitSummary() {
    const oldMarcheForcee = JSON.parse(sessionStorage.getItem("settings")).userSettings.marcheForcee.value;
    sessionStorage.removeItem("settings");
    if (oldMarcheForcee && !document.getElementById('marcheForcee').checked) {
        // réinitialisation de la temporisation
        document.getElementById('temporisation').value = 0;
        document.getElementById('marcheForceePercentageHidden').value = 0;
    }
    document.getElementById('toast').className = 'notif peek';
    document.getElementById('toast').style.animation = 'none';
    setTimeout(function () {
        document.getElementById('toast').style.animation = '';
    }, 10);
    document.getElementById('summaryForm').submit();
    setTimeout(function () {
        displayContent();
    }, 1500);
}
function submitSystem(needRestart) {
    const seuilDemarrageBatterieValid = document.getElementById('seuilDemarrageBatterie').checkValidity();
    const toleranceNegativeValid = document.getElementById('toleranceNegative').checkValidity();

    if (seuilDemarrageBatterieValid && toleranceNegativeValid) {
        const idToast = needRestart ? 'toastRestart' : 'toast';
        if (needRestart) {

        } else {

        }
        document.getElementById(idToast).className = 'notif peek';
        document.getElementById(idToast).style.animation = 'none';
        setTimeout(function () {
            document.getElementById(idToast).style.animation = '';
        }, 10);
        sessionStorage.removeItem("settings");
        document.getElementById('needRestart').value = needRestart;
        document.getElementById('systemForm').submit();
        setTimeout(function () {
            displayContent();
        }, 2000);
    }
}

function submitCommunication() {
    sessionStorage.removeItem("settings");
    document.getElementById('wifiForm').submit();
    setTimeout(function () {
        document.getElementById('toastRestart').className = 'notif peek';
        document.getElementById('toastRestart').style.animation = 'none';
        setTimeout(function () {
            document.getElementById('toastRestart').style.animation = '';
        }, 10);
        document.getElementById('mqttForm').submit();
        setTimeout(function () {
            displayContent();
        }, 2000);
    }, 1000);

}

function setSummarySettingsContent(settings) {
    let content = '<div class="title-container"><h1 style="text-align: center; margin: auto;">Routeur Solaire Hors Réseau</h1></div>';
    content += "<div style='max-width: 25em;margin: auto;height: calc(100vh - 8em);'>";
    content += "<form id='summaryForm' method='post' action='/summarysettings'>";
    content += "<div class='card card-2'>";
    content = addInputNested(settings["systemSettings"]["capteurTension"], 'capteurTension', content, true, 'number');
    settings['systemSettings']['intensiteBatterie']['value'] = settings['systemSettings']['intensiteBatterie']['value'].toFixed(2);
    content = addInputNested(settings["systemSettings"]["intensiteBatterie"], 'intensiteBatterie', content, true, 'number');
    content = addInputNested(settings["systemSettings"]["sortieActive"], "sortieActive", content, true, 'number');

    const state = settings["userSettings"]["etatRelaisStatique"] ? "Oui" : "Non";
    content = addInput(state, "Etat relais statique", content, true, 'text', 'etatRelaisStatique');

    content = addInput(Math.round(settings["systemSettings"]["temperatureEauChaude"]["value"]),
        settings["systemSettings"]["temperatureEauChaude"]["label"], content, true, 'number', 'temperatureEauChaude');
    content = addInput(Math.round(settings["systemSettings"]["puissanceDeChauffe"]["value"]),
        settings["systemSettings"]["puissanceDeChauffe"]["label"], content, true, 'number', 'puissanceDeChauffe');

    content = addInputNested(settings["systemSettings"]["puissanceGradateur"], "puissanceGradateur", content, true, 'number');
    content = addInputNested(settings["userSettings"]["seuilDemarrageBatterie"], "seuilDemarrageBatterie", content, true, 'number');
    content += "</div>";
    content += "<div class='card card-2'>";
    content = addSwitch(settings["userSettings"]["marcheForcee"], "marcheForcee", "updatePercentageState", content);
    content = addSelectMarcheForcee(settings["userSettings"]["marcheForceePercentage"], content);
    content = addInputNested(settings["userSettings"]["temporisation"], "temporisation", content, false, 'number');
    content += "</div>";
    content += "<div style='display: flex; flex-direction: column; align-items: flex-end; margin: 1em 0;'>";
    content += "    <button class='btn btn-form' onclick='submitSummary()'><span>Valider</span></button>";
    content += "</div>";
    content += "</form></div>";
    document.getElementById('content').innerHTML = content;
}

function setSystemSettingsContent(settings) {
    let content = '<div class="title-container"><h1 style="text-align: center;margin: auto;">Paramètres Généraux</h1></div>';
    content += "<div style='max-width: 25em;margin: auto; height: calc(100vh - 8em);'>";
    content += "<form id='systemForm' method='post' action='/systemsettings'>";
    content += "<div class='card card-2'>";
    content = addInputNested(settings["userSettings"]["coeffPince"], "coeffPince", content, false, 'number');
    content = addInputNested(settings["userSettings"]["zeropince"], "zeropince", content, false, 'number');
    content = addInputNested(settings["userSettings"]["coeffTension"], "coeffTension", content, false, 'number');
    content = addInputNested(settings["userSettings"]["correctionTemperature"], "correctionTemperature", content, false, 'number');
    content = addInputNested(settings["userSettings"]["seuilDemarrageBatterie"], "seuilDemarrageBatterie", content, false, 'number', 0, 100);
    content = addInputNested(settings["userSettings"]["toleranceNegative"], "toleranceNegative", content, false, 'number', 0, 1);
    content += "</div>";

    content += "<div class='card card-2'>";
    content = addSwitch(settings["userSettings"]["utilisation2Sorties"], "utilisation2Sorties", "update2Sortie", content);
    content = addSelectBasculementMode(settings["userSettings"]["basculementMode"], content, false);
    content = addInputNested(settings["userSettings"]["temperatureBasculementSortie2"], "temperatureBasculementSortie2", content, false, 'number');
    content = addInputNested(settings["userSettings"]["temperatureRetourSortie1"], "temperatureRetourSortie1", content, false, 'number');
    content += "</div>";

    content += "<div class='card card-2'>";
    content = addSwitch(settings["userSettings"]["relaisStatique"], "relaisStatique", 'updateRelaisStatique', content);
    content = addRadioButtonRelaisStatique(settings["userSettings"]["tensionOuTemperature"], content);
    content = addInputNested(settings["userSettings"]["seuilMarche"], "seuilMarche", content, false, 'number');
    content = addInputNested(settings["userSettings"]["seuilArret"], "seuilArret", content, false, 'number');
    content += "    <input type='hidden' name='needRestart' id='needRestart' value='false'></input>";

    content += "</div>";

    content += "<div style='display: flex; flex-direction: column; align-items: flex-end; margin: 1em 0;'>";
    content += "<div style='display: flex;'>";
    content += "    <button class='btn btn-form' style='margin-right: .5em;' onclick='submitSystem(true)'><span>Enregistrer</span></button>";
    content += "    <button class='btn btn-form' onclick='submitSystem(false)'><span>Valider</span></button>";
    content += "</div></div>";

    content += "</form></div>";
    document.getElementById('content').innerHTML = content;
}

function setCommunicationSettingsContent(settings) {
    let content = '<div class="title-container"><h1 style="text-align: center;margin: auto;">Paramètres de Communication</h1></div>';
    content += "<div style='max-width: 25em;margin: auto; height: calc(100vh - 8em);'>";

    content += "<form id='wifiForm' method='post' action='/wifisettings'>";

    content += "<div class='card card-2'><h2 style='margin: 0em 1em 0.5em .8em;color: #2f409f;font-weight: 700;'>WIFI</h2>";
    content = addInput(settings["communicationSettings"]["ssid"], "ssid", content, false, 'text', 'ssid');
    content = addInput(settings["communicationSettings"]["password"], "password", content, false, 'text', 'password');
    content += "</div>";

    content += "</form>";

    content += "<form id='mqttForm' method='post' action='/mqttsettings'>";

    content += "<div class='card card-2'><h2 style='margin: 0em 1em 0.5em .8em;color: #2f409f;font-weight: 700;'>MQTT</h2>";
    content = addInput(settings['communicationSettings']['mqttServer'], 'mqttServer', content, false, 'text', 'mqttServer');
    content = addInput(settings['communicationSettings']['mqttPort'], 'mqttPort', content, false, 'number', 'mqttPort');
    content = addInput(settings['communicationSettings']['mqttUser'], 'mqttUser', content, false, 'text', 'mqttUser');
    content = addInput(settings['communicationSettings']['mqttPassword'], 'mqttPassword', content, false, 'text', 'mqttPassword');
    content = addInput(settings['communicationSettings']['mqttopic'], 'mqttopic', content, false, 'text', 'mqttopic');
    content = addInput(settings['communicationSettings']['mqttopicInput'], 'mqttopicInput', content, false, 'text', 'mqttopicInput');
    content = addInput(settings['communicationSettings']['mqttopicParam1'], 'mqttopicParam1', content, false, 'text', 'mqttopicParam1');
    content = addInput(settings['communicationSettings']['mqttopicParam2'], 'mqttopicParam2', content, false, 'text', 'mqttopicParam2');
    content = addInput(settings['communicationSettings']['mqttopicParam3'], 'mqttopicParam3', content, false, 'text', 'mqttopicParam3');
    content = addInput(settings['communicationSettings']['mqttopicPzem1'], 'mqttopicPzem1', content, false, 'text', 'mqttopicPzem1');
    content += "</div>";

    content += "</form>";
    content += "<div style='display: flex; flex-direction: column; align-items: flex-end; margin: 1em 0;'>";
    content += "    <button class='btn btn-form' onclick='submitCommunication()'><span>Enregistrer</span></button>";
    content += "</div></div>";

    document.getElementById('content').innerHTML = content;
}

function displaySettingsContent(callback) {
    if (sessionStorage.getItem("settings")) {
        callback(JSON.parse(sessionStorage.getItem("settings")));
    } else {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                const responseJson = JSON.parse(this.response);
                sessionStorage.setItem("settings", JSON.stringify(responseJson));
                callback(responseJson);
            }
        };
        xhttp.open("GET", "settings", true);
        xhttp.send();
    }
}

function updateSystemSettings() {
    setInterval(function () {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                if (sessionStorage.getItem("settings")) {
                    resultSaved = JSON.parse(sessionStorage.getItem("settings"));
                    const responseJson = JSON.parse(this.response);

                    const intensiteBatterie = +(+responseJson["intensiteBatterie"]).toFixed(2);

                    resultSaved["systemSettings"]["capteurTension"]["value"] = +responseJson["capteurTension"];
                    resultSaved["systemSettings"]["intensiteBatterie"]["value"] = intensiteBatterie;
                    resultSaved["systemSettings"]["sortieActive"]["value"] = +responseJson["sortieActive"];
                    resultSaved["systemSettings"]["temperatureEauChaude"]["value"] = Math.round(+responseJson["temperatureEauChaude"]);
                    resultSaved["systemSettings"]["puissanceDeChauffe"]["value"] = Math.round(+responseJson["puissanceDeChauffe"]);
                    resultSaved["systemSettings"]["puissanceGradateur"]["value"] = +responseJson["puissanceGradateur"];
                    resultSaved["userSettings"]["temporisation"]["value"] = +responseJson["temporisation"];
                    resultSaved["userSettings"]["marcheForcee"]["value"] = +responseJson["marcheForcee"];
                    resultSaved["systemSettings"]["etatRelaisStatique"]["value"] = +responseJson["etatRelaisStatique"];

                    sessionStorage.setItem("settings", JSON.stringify(resultSaved));
                    if (document.getElementById('capteurTension')) {
                        document.getElementById("capteurTension").value = +responseJson["capteurTension"];
                        document.getElementById("intensiteBatterie").value = intensiteBatterie;
                        document.getElementById("sortieActive").value = +responseJson["sortieActive"];
                        document.getElementById("temperatureEauChaude").value = Math.round(+responseJson["temperatureEauChaude"]);
                        document.getElementById("puissanceDeChauffe").value = Math.round(+responseJson["puissanceDeChauffe"]);
                        document.getElementById("puissanceGradateur").value = +responseJson["puissanceGradateur"];
                        document.getElementById("temporisation").value = +responseJson["temporisation"];
                        document.getElementById("marcheForcee").value = responseJson["marcheForcee"];
                        const state = responseJson["etatRelaisStatique"] ? "Oui" : "Non";
                        document.getElementById("etatRelaisStatique").value = state;
                    }
                }
            }
        };
        xhttp.open("GET", "getNewSettings", true);
        xhttp.send();
    }, 30000);
}

function displayContent() {
    document.getElementById('summaryfooter').style.fontWeight = '400';
    document.getElementById('systemfooter').style.fontWeight = '400';
    document.getElementById('communicationfooter').style.fontWeight = '400';
    //document.getElementById('chartfooter').style.fontWeight = '400';
    if (window.location.href.endsWith('system')) {
        document.getElementById('systemfooter').style.fontWeight = '700';
        displaySettingsContent(setSystemSettingsContent);
    } else if (window.location.href.endsWith('chart')) {
        document.getElementById('chartfooter').style.fontWeight = '700';
        displaySettingsContent(setSummarySettingsContent);
    } else if (window.location.href.endsWith('communication')) {
        document.getElementById('communicationfooter').style.fontWeight = '700';
        displaySettingsContent(setCommunicationSettingsContent);
    } else {
        document.getElementById('summaryfooter').style.fontWeight = '700';
        displaySettingsContent(setSummarySettingsContent);
    }
}
