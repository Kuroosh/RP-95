using AltV.Net.Elements.Entities;
using System;

namespace Altv_Roleplay.Factories
{
    public class ClassicPlayer : Player
    {
        private int _CharacterId { get; set; } = 0;
        public int CharacterId { get { return _CharacterId; } set { _CharacterId = value; this.SetSyncedMetaData("PLAYER_ID", value); } }
        private string _Username { get; set; }
        public string Username { get { return _Username; } set { _Username = value; this.SetSyncedMetaData("PLAYER_USERNAME", value); } }
        public string CharacterName { get; set; } = "None";
        public string FarmingAction { get; set; } = "None";
        public bool IsUsingCrowbar { get; set; } = false;
        public bool IsUnconscious { get; set; } = false;
        public string CurrentMinijob { get; set; } = "None";
        public string CurrentMinijobStep { get; set; } = "None";
        public int CurrentMinijobActionCount { get; set; } = 0;
        public int CurrentMinijobRouteId { get; set; } = 0;
        public bool isRobbingAShop { get; set; } = false;
        public bool Seatbelt { get; set; }
        public int AdminLevel { get; set; }

        public ClassicPlayer(IntPtr nativePointer, ushort id) : base(nativePointer, id)
        {
        }
    }
}
