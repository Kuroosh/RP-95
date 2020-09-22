﻿using Altv_Roleplay.models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Altv_Roleplay.Model
{
    class ServerItems
    {
        public static List<Server_Items> ServerItems_ = new List<Server_Items>();
        public static List<Server_Teleports> ServerTeleports_ = new List<Server_Teleports>();

        public static string ReturnNormalItemName(string itemName)
        {
            try
            {
                var normalName = itemName;
                if (itemName.Contains("♂")) { normalName = itemName.Replace("♂", "-M-"); }
                else if (itemName.Contains("♀")) { normalName = itemName.Replace("♀", "-W-"); }
                else if (itemName.Contains("Ausweis")) { normalName = "Ausweis"; }
                else if (itemName.Contains("EC Karte")) { normalName = "EC Karte"; }
                else if (itemName.Contains("Fahrzeugschluessel")) { normalName = "Fahrzeugschluessel"; }
                else if (itemName.Contains("Generalschluessel")) { normalName = "Generalschluessel"; }
                return normalName;
            }
            catch (Exception e)
            {
                Core.Debug.CatchExceptions("ReturnNormalItemName", e);
            }
            return "";
        }

        public static string ReturnItemPicSRC(string itemName)
        {
            try
            {
                itemName = ReturnNormalItemName(itemName);
                var item = ServerItems_.ToList().FirstOrDefault(i => i.itemName == itemName);
                if (item != null) return item.itemPicSRC;
            }
            catch (Exception e)
            {
                Core.Debug.CatchExceptions("ReturnItemPicSRC", e);
            }
            return "";
        }

        public static bool ExistItem(string itemName)
        {
            try
            {
                itemName = ReturnNormalItemName(itemName);
                var item = ServerItems_.ToList().FirstOrDefault(i => i.itemName == itemName);
                if (item != null) return true;
            }
            catch (Exception e)
            {
                Core.Debug.CatchExceptions("ExistItem", e);
            }
            return false;
        }

        public static string GetItemType(string itemName)
        {
            try
            {
                itemName = ReturnNormalItemName(itemName);
                var item = ServerItems_.ToList().FirstOrDefault(i => i.itemName == itemName);
                if (item != null) return item.itemType;
            }
            catch (Exception e)
            {
                Core.Debug.CatchExceptions("GetItemType", e);
            }
            return "";
        }

        public static string GetItemDescription(string itemName)
        {
            try
            {
                itemName = ReturnNormalItemName(itemName);
                var item = ServerItems_.ToList().FirstOrDefault(i => i.itemName == itemName);
                if (item != null) return item.itemDescription;
            }
            catch (Exception e)
            {
                Core.Debug.CatchExceptions("GetItemDescription", e);
            }
            return "";
        }

        public static float GetItemWeight(string itemName)
        {
            try
            {
                itemName = ReturnNormalItemName(itemName);
                var item = ServerItems_.ToList().FirstOrDefault(i => i.itemName == itemName);
                if (item != null) return item.itemWeight;
            }
            catch (Exception e)
            {
                Core.Debug.CatchExceptions("GetItemWeight", e);
            }
            return 0f;
        }

        public static bool IsItemDesire(string itemName)
        {
            try
            {
                itemName = ReturnNormalItemName(itemName);
                var item = ServerItems_.ToList().FirstOrDefault(i => i.itemName == itemName);
                if (item != null) return item.isItemDesire;
            }
            catch (Exception e)
            {
                Core.Debug.CatchExceptions("IsItemDesire", e);
            }
            return false;
        }

        public static int GetItemDesireFood(string itemName)
        {
            try
            {
                itemName = ReturnNormalItemName(itemName);
                var item = ServerItems_.ToList().FirstOrDefault(i => i.itemName == itemName);
                if (item != null) return item.itemDesireFood;
            }
            catch (Exception e)
            {
                Core.Debug.CatchExceptions("GetItemDesireFood", e);
            }
            return 0;
        }

        public static int GetItemDesireDrink(string itemName)
        {
            try
            {
                itemName = ReturnNormalItemName(itemName);
                var item = ServerItems_.ToList().FirstOrDefault(i => i.itemName == itemName);
                if (item != null) return item.itemDesireDrink;
            }
            catch (Exception e)
            {
                Core.Debug.CatchExceptions("GetItemDesireDrink", e);
            }
            return 0;
        }

        public static bool hasItemAnimation(string itemName)
        {
            try
            {
                itemName = ReturnNormalItemName(itemName);
                var item = ServerItems_.ToList().FirstOrDefault(i => i.itemName == itemName);
                if (item != null) return item.hasItemAnimation;
            }
            catch (Exception e)
            {
                Core.Debug.CatchExceptions("hasItemAnimation", e);
            }
            return false;
        }

        public static string GetItemAnimationName(string itemName)
        {
            try
            {
                itemName = ReturnNormalItemName(itemName);
                var item = ServerItems_.ToList().FirstOrDefault(i => i.itemName == itemName);
                if (item != null) return item.itemAnimationName;
            }
            catch (Exception e)
            {
                Core.Debug.CatchExceptions("GetItemAnimationName", e);
            }
            return "";
        }

        public static bool IsItemDroppable(string itemName)
        {
            try
            {
                itemName = ReturnNormalItemName(itemName);
                var item = ServerItems_.ToList().FirstOrDefault(i => i.itemName == itemName);
                if (item != null) return item.isItemDroppable;
            }
            catch (Exception e)
            {
                Core.Debug.CatchExceptions("IsItemDroppable", e);
            }
            return false;
        }

        public static bool IsItemGiveable(string itemName)
        {
            try
            {
                itemName = ReturnNormalItemName(itemName);
                var item = ServerItems_.ToList().FirstOrDefault(i => i.itemName == itemName);
                if (item != null) return item.isItemGiveable;
            }
            catch (Exception e)
            {
                Core.Debug.CatchExceptions("IsItemGiveable", e);
            }
            return false;
        }

        public static bool IsItemUseable(string itemName)
        {
            try
            {
                itemName = ReturnNormalItemName(itemName);
                var item = ServerItems_.ToList().FirstOrDefault(i => i.itemName == itemName);
                if (item != null) return item.isItemUseable;
            }
            catch (Exception e)
            {
                Core.Debug.CatchExceptions("IsItemUseable", e);
            }
            return false;
        }
    }
}
