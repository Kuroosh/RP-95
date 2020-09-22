using AltV.Net;
using AltV.Net.Data;
using AltV.Net.Elements.Entities;
using AltV.Net.Enums;
using AltV.Net.Resources.Chat.Api;
using Altv_Roleplay.Factories;
using Altv_Roleplay.Model;
using Altv_Roleplay.Utils;
using System;
using System.Linq;

namespace Altv_Roleplay.Handler
{
    public class AntiCheatHandler : IScript
    {
        [ScriptEvent(ScriptEventType.WeaponDamage)]
        public static void WeaponDamageEvent(ClassicPlayer player, ClassicPlayer target, uint weapon, ushort dmg, Position offset, BodyPart bodypart)
        {
            try
            {
                if (player == null || !player.Exists || target == null || !target.Exists) return;
                WeaponModel weaponModel = (WeaponModel)weapon;
                if (weaponModel == WeaponModel.Fist) return;
                if (Enum.IsDefined(typeof(AntiCheat.forbiddenWeapons), (Utils.AntiCheat.forbiddenWeapons)weaponModel))
                {
                    User.SetPlayerBanned(player, true, $"Waffen Hack[2]: {weaponModel}");
                    player.Kick("");
                    foreach (IPlayer p in Alt.Server.GetPlayers().ToList().Where(x => x != null && x.Exists && ((ClassicPlayer)x).CharacterId > 0 && x.AdminLevel() > 0))
                    {
                        p.SendChatMessage($"{Characters.GetCharacterName(player.CharacterId)} wurde gebannt: Waffenhack[2] - {weaponModel}");
                    }
                    return;
                }
            }
            catch (Exception e)
            {
                Core.Debug.CatchExceptions("WeaponDamageEvent", e);
            }
        }
    }
}
