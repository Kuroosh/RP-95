﻿using Altv_Roleplay.Factories;
using Altv_Roleplay.models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Altv_Roleplay.Model
{
    class ServerBankPapers
    {
        public static List<Server_Bank_Paper> ServerBankPaper_ = new List<Server_Bank_Paper>();

        public static void CreateNewBankPaper(int accountNumber, string Date, string Time, string Type, string ToOrFrom, string Message, string moneyAmount, string zoneName)
        {
            var ServerBankPaperData = new Server_Bank_Paper
            {
                accountNumber = accountNumber,
                Date = Date,
                Time = Time,
                Type = Type,
                ToOrFrom = ToOrFrom,
                TransactionMessage = Message,
                moneyAmount = moneyAmount,
                zoneName = zoneName
            };

            try
            {
                ServerBankPaper_.Add(ServerBankPaperData);

                using (gtaContext db = new gtaContext())
                {
                    db.Server_Bank_Paper.Add(ServerBankPaperData);
                    db.SaveChanges();
                }
            }
            catch (Exception e)
            {
                Core.Debug.CatchExceptions(e);
            }
        }

        public static string GetBankAccountBankPaper(ClassicPlayer player, int accountNumber)
        {
            if (player == null || !player.Exists) return "";
            var items = ServerBankPaper_.Where(x => x.accountNumber == accountNumber).Select(x => new
            {
                id = x.id,
                accountNumber = x.accountNumber,
                Date = x.Date,
                Time = x.Time,
                Type = x.Type,
                ToOrFrom = x.ToOrFrom,
                Message = x.TransactionMessage,
                moneyAmount = x.moneyAmount,
                zoneName = x.zoneName,
            }).OrderByDescending(x => x.id).ToList();

            return JsonConvert.SerializeObject(items);
        }

        public static string GetTabletBankAccountBankPaper(int accountNumber)
        {
            if (accountNumber == 0) return "";
            var items = ServerBankPaper_.Where(x => x.accountNumber == accountNumber).Select(x => new
            {
                id = x.id,
                date = x.Date,
                time = x.Time,
                type = x.Type,
                moneyamount = x.moneyAmount,
                location = x.zoneName,
                banknumber = x.ToOrFrom,
                text = x.TransactionMessage,
            }).OrderByDescending(x => x.id).ToList();

            return JsonConvert.SerializeObject(items);
        }
    }
}
