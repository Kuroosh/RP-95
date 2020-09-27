using AltV.Net.Data;
using AltV.Net.Elements.Entities;
using System;

namespace Altv_Roleplay.Factories
{
    public class ClassicVehicle : Vehicle
    {
        public int VehicleId { get; set; }
        public bool Trunkstate { get; set; }
        public bool IsAdmin { get; set; }
        private float _Fuel { get; set; }
        public float Fuel { get { return _Fuel; } set { _Fuel = value; this.SetSyncedMetaData("VEHICLE_FUEL", value); } }
        private float _KM { get; set; }
        public float KM { get { return _KM; } set { _KM = value; this.SetSyncedMetaData("VEHICLE_KM", value); } }

        public ClassicVehicle(IntPtr nativePointer, ushort id) : base(nativePointer, id)
        {
        }

        public ClassicVehicle(uint model, Position position, Rotation rotation) : base(model, position, rotation)
        {
        }
    }
}
