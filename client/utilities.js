import * as alt from 'alt';
import * as game from 'natives';
import Ragdoll from './ragdoll';

const ragdoll = new Ragdoll(alt.Player.local);

let blip = null;
let markers = [];

alt.onServer("returnVehicleMods", (curVeh, modId) => {
    if (curVeh == null || curVeh == undefined) return;
    game.setVehicleModKit(curVeh.scriptID, 0);
    let maxMods = game.getNumVehicleMods(curVeh.scriptID, parseInt(modId));
    if (maxMods === 0) {
        alt.log("Keine Mods gefunden: " + maxMods);
    } else {
        for (var i = 0; i < maxMods; i++) {
            alt.log(`ModId: ${i} | Modname: ${game.getLabelText(game.getModTextLabel(curVeh.scriptID, modId, i))}`);
            alt.emitServer("Server:Utilities:createNewMod", `${game.getLabelText(game.getModTextLabel(curVeh.scriptID, modId, i))}`, parseInt(modId), parseInt(i + 1));
        }
    }
});

alt.everyTick(() => {
    game.hideHudComponentThisFrame(7)
    game.hideHudComponentThisFrame(9)
    game.hideHudComponentThisFrame(6)
    game.hideHudComponentThisFrame(3)
    game.hideHudComponentThisFrame(4)
    game.hideHudComponentThisFrame(13)
    game.hideHudComponentThisFrame(20)
});

alt.onServer("Client:Entity:setTime", (hour, minute) => {
    game.setClockTime(parseInt(hour), parseInt(minute), 0);
    alt.setMsPerGameMinute(60000);
});

alt.onServer("setPedIntoVehicle", (vehicle, seat) => {
    let cleared = false;
    const interval = alt.setInterval(() => {
        const vehicleScriptId = vehicle.scriptID;
        if (vehicleScriptId) {
            game.setPedIntoVehicle(alt.Player.local.scriptID, vehicleScriptId, seat);
            alt.clearInterval(interval);
            cleared = true;
        }
    }, 10);
    alt.setTimeout(() => {
        if (!cleared) {
            alt.clearInterval(interval);
        }
    }, 5000);
});

//443,85495, -975.82416, 30.678345

alt.onServer("Client:Entity:setMerryWeather", (msg) => {   
    game.setArtificialLightsState(false);
    game.setWeatherTypeNow(msg);
});

alt.onServer("Client:Minijob:CreateJobMarker", (name, color, sprite, markersprite, X, Y, Z, bobUpAndDown) => {
    blip = createBlip(X, Y, Z, sprite, 0.8, color, true, name);
    markers.push({
        type: markersprite,
        x: X,
        y: Y,
        z: Z,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
        red: 46,
        green: 133,
        blue: 232,
        alpha: 150,
        bobUpAndDown: bobUpAndDown
    });
});

alt.onServer("Client:Minijob:RemoveJobMarker", () => {
    markers = [];
    if (blip != null)
        blip.destroy();
});

alt.onServer("Client:Ragdoll:SetPedToRagdoll", (state, delay) => {
    alt.setTimeout(() => {
        if (state) {
            ragdoll.start();
        } else {
            ragdoll.stop();
        }
    }, delay);
});

alt.onServer("Client:Minijob:RemoveJobMarkerWithFreeze", (delay) => {
    markers = [];
    if (blip != null)
        blip.destroy();

    alt.setTimeout(() => {
        game.freezeEntityPosition(alt.Player.local.scriptID, true);
        if (alt.Player.local.vehicle != null) {
            game.freezeEntityPosition(alt.Player.local.vehicle.scriptID, true);
        }
        alt.setTimeout(() => {
            game.freezeEntityPosition(alt.Player.local.scriptID, false);
            if (alt.Player.local.vehicle != null) {
                game.freezeEntityPosition(alt.Player.local.vehicle.scriptID, false);
            }
        }, delay);
    }, 1500);
});

alt.onServer("Client:Utilities:repairVehicle", (vehicle) => {
    repairVehicle(vehicle);
});

function createBlip(X, Y, Z, sprite, scale, color, shortRange, name) {
    var newBlip = new alt.PointBlip(X, Y, Z);
    newBlip.sprite = sprite;
    newBlip.scale = scale;
    newBlip.color = color;
    newBlip.shortRange = shortRange;
    newBlip.name = name;
    newBlip.routeColor = color;
    newBlip.route = true;
    return newBlip;
}

export function repairVehicle(vehicle) {
    if (vehicle != null && vehicle instanceof alt.Vehicle) {
        game.setVehicleFixed(vehicle.scriptID);
        game.setVehicleDeformationFixed(vehicle.scriptID);
    }
}

export function GetDirectionFromRotation(rotation) {
    var z = rotation.z * (Math.PI / 180.0);
    var x = rotation.x * (Math.PI / 180.0);
    var num = Math.abs(Math.cos(x));

    return new alt.Vector3(
        (-Math.sin(z) * num),
        (Math.cos(z) * num),
        Math.sin(x)
    );
}

export class Raycast {
    static player = alt.Player.local;

    static line(radius, distance) {
        let position = game.getPedBoneCoords(alt.Player.local.scriptID, 31086, 0.5, 0, 0);
        let direction = GetDirectionFromRotation(game.getGameplayCamRot(2));
        let farAway = new alt.Vector3((direction.x * distance) + (position.x), (direction.y * distance) + (position.y), (direction.z * distance) + (position.z));
        let ray = game.startShapeTestCapsule(position.x, position.y, position.z, farAway.x, farAway.y, farAway.z, radius, -1, alt.Player.local.scriptID, 7);
        return this.result(ray);
    }

    static result(ray) {
        let result = game.getShapeTestResult(ray, undefined, undefined, undefined, undefined);
        let hitEntity = result[4];
        if (!game.isEntityAPed(hitEntity) && !game.isEntityAnObject(hitEntity) && !game.isEntityAVehicle(hitEntity)) return undefined;
        return {
            isHit: result[1],
            pos: new alt.Vector3(result[2].x, result[2].y, result[2].z),
            hitEntity,
            entityType: game.getEntityType(hitEntity),
            entityHash: game.getEntityModel(hitEntity)
        }
    }
}

alt.everyTick(() => {
    if (markers.length >= 1) {
        for (var i = 0; i < markers.length; i++) {
            game.drawRect(0, 0, 0, 0, 0, 0, 0, 0);
            game.drawMarker(markers[i].type, markers[i].x, markers[i].y, markers[i].z, 0, 0, 0, 0, 0, 0, markers[i].scaleX, markers[i].scaleY, markers[i].scaleZ, markers[i].red, markers[i].green, markers[i].blue, markers[i].alpha, markers[i].bobUpAndDown, false, 2, false, undefined, undefined, false);
        }
    }
});