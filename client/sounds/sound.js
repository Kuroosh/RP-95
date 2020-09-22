import * as alt from 'alt';
import * as game from 'natives';

let webview = undefined;

alt.log("loooaded")

alt.onServer("InteractSound_CL:PlayOnAll", function(soundFile, soundVolume) {
    if(!webview) {
        webview = new alt.WebView('http://resource/client/sounds/index.html');
    }

    alt.log("caaaled")

    webview.emit('playSound', soundFile, soundVolume)
})