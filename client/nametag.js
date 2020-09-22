import * as alt from 'alt';
import * as game from 'natives';


let Draw = false;
let maxDistance = 60;
let maxDistance_load = maxDistance;

alt.on('syncedMetaChange', (Entity, key, value, oldValue) => {
	if (Entity == alt.Player.local) {
		switch (key) {
			case 'isAduty':
				Draw = value;
				break;
		}
	}
});

function DrawText(msg, player, posx, posy, posz, scale, fontType, ColorRGB, useOutline = true, useDropShadow = true) {
	let hex = msg.match('{.*}');
	if (hex) {
		const rgb = hexToRgb(hex[0].replace('{', '').replace('}', ''));
		r = rgb[0];
		g = rgb[1];
		b = rgb[2];
		msg = msg.replace(hex[0], '');
	}
	if (ColorRGB == undefined || ColorRGB == null) ColorRGB = 255;
	const lineHeight = game.getTextScaleHeight(scale[0], fontType);
	const entity = player.vehicle ? player.vehicle.scriptID : player.scriptID;
	const vector = game.getEntityVelocity(entity);
	const frameTime = game.getFrameTime();
	let Vector = {
		X: posx + vector.x * frameTime,
		Y: posy + vector.y * frameTime,
		Z: posz + vector.z * frameTime
	}
	// Names
	game.setDrawOrigin(Vector.X, Vector.Y, Vector.Z, 0);
	game.beginTextCommandDisplayText('STRING');
	game.setTextFont(fontType);
	game.setTextScale(scale[0], scale[1]);
	game.setTextProportional(true);
	game.setTextCentre(true);
	game.setTextColour(ColorRGB[0], ColorRGB[1], ColorRGB[2], ColorRGB[3]);
	game.setTextOutline();
	game.addTextComponentSubstringPlayerName(msg);
	game.endTextCommandDisplayText(0, 0);
	if (useOutline) game.setTextOutline();
	if (useDropShadow) game.setTextDropShadow();
	game.clearDrawOrigin();
}

function DrawNametags() {
	let players = alt.Player.all;
	if (players.length > 0) {
		let localPlayer = alt.Player.local;
		for (let i = 0; i < players.length; i++) {
			let player = players[i];
			let playerPos = localPlayer.pos;
			let playerPos2 = player.pos;
			if (!game.hasEntityClearLosToEntity(localPlayer.scriptID, player.scriptID, 17)) continue;
			let distance = game.getDistanceBetweenCoords(playerPos.x, playerPos.y, playerPos.z, playerPos2.x, playerPos2.y, playerPos2.z, true);
			if (player != localPlayer) {
				if (player.vehicle && localPlayer.vehicle) maxDistance_load = 60; else maxDistance_load = maxDistance;
				if (distance <= maxDistance_load) 
					DrawText("[" + player.getSyncedMeta('PLAYER_ID') + "] " + player.getSyncedMeta('PLAYER_USERNAME'), player, player.pos.x, player.pos.y, player.pos.z + 1.2, [0.65, 0.65], 4, [255, 255, 255, 255], true, true);
			}
		}
	}
}


alt.everyTick(() => {
    if(Draw) DrawNametags();
});