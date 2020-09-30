var type = 1,
    radius = '18em',
    start = -90,
    globalInteractMenuAction = "close",
    globalInteractMenuType = "none",
    selectedBank = "None",
    globalPlayerBillType = undefined,
    globalPlayerBilltargetCharId = undefined,
    globalRecievePlayerBillType = undefined,
    globalRecievePlayerBillFactionCompanyId = undefined,
    globalRecievePlayerBillAmount = undefined,
    globalRecievePlayerBillReason = undefined,
    globalRecievePlayerBillFactionName = undefined,
    globalRecievePlayerBillGivenCharacterId = undefined,
    playerHasLowHealth = false,
    curATMPin = undefined,
    curATMAccountNumber = undefined,
    curGarageId = undefined,
    curVehShopId = undefined,
    curATMzoneName = undefined,
    isPersoIdentityCardInUse = false,
    isPersoServiceCardInUse = false,
    globalFuelstationBenzinPrice = undefined,
    globalFuelstationDieselPrice = undefined,
    globalFuelstationStromPrice = undefined,
    globalFuelstationKerosinPrice = undefined,
    globalShopId = undefined,
    globalFactionATMfactionid = undefined,
    allowHudlistScroll,
    hudlistActiveListID,
    hudlistTargetElement,
    hudlistLastElement,
    globalClothesStorageArray = [],
    targetMessageUser,
    userPhoneNumber = "1",
    phoneAudioOnce = null,
    phoneAudioLoop = null,
    allowChatKeyUp = false,
    selectedChatId = 0,
    latestCall = null,
    latestAlert = null,
    LSPDIntranetSelectedPerson = null,
    LSPDIntranetLastQuery = null,
    RadioFreqMin = 450000, // kHz
    RadioFreqMax = 495000,
    RadioFreqSteps = 10,
    RadioMarkSteps = 50,
    RadioFreqSpacing = 30, //px
    RadioLabelSteps = 250,
    RadioEnabled = false,
    RadioTimeout = null,
    RadioAudioLoop = null,
    activeRadioFreq = null,
    permittedFrequencies = [200],
    globalFactionATMtype = undefined,
    globalBarberHeadoverlaysData = undefined,
    globalBarberHeadoverlaysOpacityData = undefined,
    globalBarberHeadoverlaysColorData = undefined,
    globalBarberheadoverlaysarray = [globalBarberHeadoverlaysData, globalBarberHeadoverlaysOpacityData,
        globalBarberHeadoverlaysColorData
    ];

function SendIdentityCardApplyForm() {
    var birthplace = $("#identityCardApplyFormBirthplace").val().replace(/^\s+|\s+$/g, "");
    if (birthplace.length <= 0) {
        return;
    }

    alt.emit("Client:HUD:sendIdentityCardApplyForm", birthplace);
    $("#identityCardApplyForm").fadeTo(1000, 0, function () {
        $("#identityCardApplyForm").hide();
    });
}

function ShowNotification(notificationtype, message, time) {
    toastr.options.progressBar = true;
    toastr.options.positionClass = "toast-top-right";

    switch (notificationtype) {
        case 0:
            break;
        case 1:
            //Info Notification
            toastr.info(message, "", {
                timeOut: time
            });
            break;
        case 2:
            //Success Notification
            toastr.success(message, "", {
                timeOut: time
            });
            break;
        case 3:
            //Warning Notification
            toastr.warning(message, "", {
                timeOut: time
            });
            break;
        case 4:
            //Error Notification
            toastr.error(message, "", {
                timeOut: time
            });
            break;
    }
}

function SetPlayerHUDInVehicle(state, fuel, km) {
    $("#locationbox").hide();
    $("#locationtext").hide();
    $("#VehicleSpeedBox").hide();
    $("#VehicleSpeedBoxText").hide();
    $("#VehicleFuelBox").hide();
    $("#VehicleFuelBoxText").hide();
    $("#VehicleKMBox").hide();
    $("#hudbox").hide();
    $("#VehicleKmhBox").hide();
    $("#VehicleKMBoxText").hide();
    $("#VehicleLockedBox").hide();

    if (state == false) {
        // nicht im Auto
    } else {
        // im Auto
        $("#VehicleSpeedBoxText").html(`0km/h`);
        $("#VehicleKMBoxText").html(`${km} KM`);
        $("#VehicleFuelBoxText").html(`${fuel} Liter`);
        $("#locationbox").fadeTo(1, 1, function () {});
        $("#locationtext").fadeTo(1, 1, function () {});
        $("#VehicleSpeedBox").fadeTo(1, 1, function () {});
        $("#VehicleSpeedBoxText").fadeTo(1, 1, function () {});
        $("#VehicleFuelBox").fadeTo(1, 1, function () {});
        $("#VehicleFuelBoxText").fadeTo(1, 1, function () {});
        $("#VehicleKMBox").fadeTo(1, 1, function () {});
        $("#hudbox").fadeTo(1, 1, function () {});
        $("#VehicleKmhBox").fadeTo(1, 1, function () {});
        $("#VehicleKMBoxText").fadeTo(1, 1, function () {});
        $("#VehicleLockedBox").fadeTo(1, 1, function () {});
    }
}

function SetPlayerHUDVehicleSpeed(speed) {
    $("#VehicleSpeedBoxText").html(`${speed}  Km/h`);
}

function SetPlayerHUDVehicleInfos(fuel, km) {
    $("#VehicleKMBoxText").html(`${km} KM`);
    $("#VehicleFuelBoxText").html(`${fuel} Liter`);
}

function updateVoiceHUD(state) {
    $("#voicemic").attr("src", "../utils/img/microphone.png");
    switch (state) {
        case 0: //Muted
            $("#voicebox").css("background", "#da34348a");
            $("#voicemic").attr("src", "../utils/img/mute.png");
            break;
        case 3: //3
            $("#voicebox").css("background", "#36b1468a");
            break;
        case 8: //8
            $("#voicebox").css("background", "#dce02f8a");
            break;
        case 15: //15
            $("#voicebox").css("background", "#e0822f8a");
            break;
        case 32: //32
            $("#voicebox").css("background", "#da34348a");
            break;
    }
}

function toggleHudlist(shouldBeVisible) {
    if (shouldBeVisible) {
        hudlistActiveListID = "HUDlist-home";
        hudlistTargetFirstElem();
        allowHudlistScroll = true;
        document.getElementById(hudlistActiveListID).focus();
        $("#HUDlist-Box").fadeTo(300, 1, function () {
            $("#HUDlist-Box").show();
        });
    } else {
        globalClothesStorageArray = [];
        $("#HUDlist-clothesList").html(``);
        allowHudlistScroll = false;
        hudlistActiveListID = null;
        $("#HUDlist-Box").fadeTo(300, 0, function () {
            alt.emit("Client:ClothesStorage:destroyCEF");
            $("HUDlist-Box").hide();
        });
    }
}

function updateSpeakState(state) {
    if (state) {
        $("#voicebox").css("border", "2px double #40f140");
    } else {
        $("#voicebox").css("border", "2px solid #0000006e");
    }
}

function updateStreetLocation(loc) {
    $("#locationtext").html(loc);
}

/* Interaktionsmenü Zeug */
var interactItems = null;

function toggleInterActionMenu(state, type, itemArray) {
    var interactHTML = itemArray;
    if (state == true) {
        globalInteractMenuType = type;
        $("#InteractionMenu-List").html(interactHTML);
        interactItems = $("li.interactitem");

        interactItems.mouseleave(function () {
            globalInteractMenuAction = "close";
            $("#InteractionMenu-SelectedTitle").html("Schließen");
        });

        interactItems.mouseenter(function () {
            globalInteractMenuAction = $(this).attr('data-action');
            interactString = $(this).attr('data-actionstring');
            $("#InteractionMenu-SelectedTitle").html($(this).attr('data-actionstring'));
        });
        $("#InteractionMenu-List").show();

        transformInteractMenuItems();
    } else {
        $("#InteractionMenu-List").hide();
    }
}

function SetClothesStorageItems(items) {
    items = JSON.parse(items);
    for (var i in items) {
        globalClothesStorageArray.push(items[i]);
    }
}

function SetClothesStorageContent(typ) {
    let html = "<li tabindex='0' data-preview='false'>Zurück</li>";
    html += "<li tabindex='0' data-preview='false'>None</li>";
    for (var i in globalClothesStorageArray) {
        if (globalClothesStorageArray[i].clothesType != typ) continue;
        html += "<li tabindex='0' data-preview='true' data-draw='" + globalClothesStorageArray[i]
            .clothesDraw +
            "' data-texture='" + globalClothesStorageArray[i].clothesTex + "'>" +
            `${globalClothesStorageArray[i].clothesName}` +
            "</li>";
    }

    $("#HUDlist-clothesList").html(html);
}

function hudlistTargetFirstElem() {
    $("#" + hudlistActiveListID + " ul").children().first().addClass("active");
    $("#" + hudlistActiveListID + " ul").children().first().focus();
    hudlistTargetElement = 1;
}

function hudlistUpdateView() {
    $("#" + hudlistActiveListID + " ul li:nth-child(" + hudlistTargetElement + ")").addClass("active");
    $("#" + hudlistActiveListID + " ul li:nth-child(" + hudlistTargetElement + ")").focus();
}

function hudlistCycleDown() {
    if (hudlistTargetElement < $("#" + hudlistActiveListID + " li").length) {
        let target = $("#" + hudlistActiveListID + " ul li:nth-child(" + hudlistTargetElement + ")");
        target.removeClass("active");
        hudlistTargetElement++;
        target = $("#" + hudlistActiveListID + " ul li:nth-child(" + hudlistTargetElement + ")");
        hudlistUpdateView();
        if (hudlistTargetElement == "HUDlist-home") return;
        if (target.data("preview") == false || target.data("preview") == "false") return;
        let last = $("#HUDlist-home ul li:nth-child(" + hudlistLastElement + ")");
        clothesPreview(last.data("target"), target.data("draw"), target.data("texture"));
    }
}

function hudlistCycleUp() {
    if (hudlistTargetElement > 1) {
        let target = $("#" + hudlistActiveListID + " ul li:nth-child(" + hudlistTargetElement + ")");
        target.removeClass("active");
        hudlistTargetElement--;
        target = $("#" + hudlistActiveListID + " ul li:nth-child(" + hudlistTargetElement + ")");
        hudlistUpdateView();
        if (hudlistTargetElement == "HUDlist-home") return;
        if (target.data("preview") == false || target.data("preview") == "false") return;
        let last = $("#HUDlist-home ul li:nth-child(" + hudlistLastElement + ")");
        clothesPreview(last.data("target"), target.data("draw"), target.data("texture"));
    }
}

function clothesPreview(Type, Drawable, Texture) {
    switch (Type) {
        case "Top":
            alt.emit("Client:ClothesShop:setClothes", 11, Drawable, Texture);
            break;
        case "Undershirt":
            alt.emit("Client:ClothesShop:setClothes", 8, Drawable, Texture);
            break;
        case "Decal":
            alt.emit("Client:ClothesShop:setClothes", 10, Drawable, Texture);
            break;
        case "Leg":
            alt.emit("Client:ClothesShop:setClothes", 4, Drawable, Texture);
            break;
        case "Feet":
            alt.emit("Client:ClothesShop:setClothes", 6, Drawable, Texture);
            break;
        case "Hat":
            alt.emit("Client:ClothesShop:setAccessory", 0, Drawable, Texture);
            break;
        case "Mask":
            alt.emit("Client:ClothesShop:setClothes", 1, Drawable, Texture);
            break;
        case "Glass":
            alt.emit("Client:ClothesShop:setAccessory", 1, Drawable, Texture);
            break;
        case "Earring":
            alt.emit("Client:ClothesShop:setAccessory", 2, Drawable, Texture);
            break;
        case "Watch":
            alt.emit("Client:ClothesShop:setAccessory", 6, Drawable, Texture);
            break;
        case "Bracelet":
            alt.emit("Client:ClothesShop:setAccessory", 7, Drawable, Texture);
            break;
        case "Necklace":
            alt.emit("Client:ClothesShop:setClothes", 7, Drawable, Texture);
            break;
        case "Torso":
            alt.emit("Client:ClothesShop:setClothes", 3, Drawable, Texture);
            break;
        case "Armor":
            alt.emit("Client:ClothesShop:setClothes", 9, Drawable, Texture);
            break;
    }
}

function hudlistCycleRight() {
    let target = $("#" + hudlistActiveListID + " ul li:nth-child(" + hudlistTargetElement + ")");
    if (hudlistActiveListID == "HUDlist-home") {
        target.removeClass("active");
        if (hudlistTargetElement == 1) {
            closeHudlist();
        } else {
            hudlistLastElement = hudlistTargetElement;
            hudlistActiveListID = "HUDlist-clothes";
            // Öffne mit entsprechendem Typ
            SetClothesStorageContent(target.data("target"));
            $('#HUDlist-carousel').carousel(1);
            $("#HUDlist-Box").data("target", target.html());
            hudlistTargetFirstElem();
        }
    } else {
        if (hudlistTargetElement == 1) {
            hudlistCycleLeft();
        } else {
            let action = target;
            target = $("#HUDlist-home ul li:nth-child(" + hudlistLastElement + ")");
            alt.emit("Client:ClothesStorage:setCharacterClothes", `${action.html()}`,
                `${target.data("target")}`);
        }
    }
}

function hudlistCycleLeft() {
    if (hudlistActiveListID == "HUDlist-home") {
        closeHudlist();
    } else {
        $("#" + hudlistActiveListID + " ul li:nth-child(" + hudlistTargetElement + ")").removeClass(
            "active");
        hudlistActiveListID = "HUDlist-home";
        $('#HUDlist-carousel').carousel(0);
        hudlistTargetElement = hudlistLastElement;
        hudlistUpdateView();
    }
}

function closeHudlist() {
    $("#" + hudlistActiveListID + " ul li:nth-child(" + hudlistTargetElement + ")").removeClass(
        "active");
    hudlistTargetElement = 1;
    toggleHudlist(false);
}

function transformInteractMenuItems() {
    //Items richtig im Kreis anordnen  
    var $items = $('li.interactitem:not(:first-child)'),
        numberOfItems = (type === 1) ? $items.length : $items.length - 1,
        slice = 360 * type / numberOfItems;

    $items.each(function (i) {
        var $self = $(this),
            rotate = slice * i + start,
            rotateReverse = rotate * -1;

        $self.css({
            'transform': 'rotate(' + rotate + 'deg) translate(' + radius + ') rotate(' +
                rotateReverse + 'deg)'
        });
    });
}

function CreateIdentityCardApplyForm(charname, gender, adress, birthdate) {
    $("#identityCardApplyFormCharname").val(charname);
    if (gender == true || gender == "true") {
        gender = "Weiblich";
    } else if (gender == false || gender == "false") {
        gender = "Männlich";
    }
    $("#identityCardApplyFormGender").val(gender);
    $("#identityCardApplyFormAdress").val(adress);
    $("#identityCardApplyFormBirthdate").val(birthdate);
    $("#identityCardApplyForm").fadeTo(1000, 1, function () {});
}



function createBankAccountManageForm(bankArray, curBank) {
    var bankFormHTML = "";
    var bankAccountCount = 0;
    bankArray = JSON.parse(bankArray);
    for (var i in bankArray) {
        bankFormHTML +=
            `<li class='list-group-item'><p class='title'>${bankArray[i].accountNumber}</p><p class='floatleft'>Kontostand:</p><p class='floatright'>${bankArray[i].money}$</p><p class='floatleft'>Gründungsort:</p><p class='floatright'>${bankArray[i].createZone}</p>` +
            "<button class='btn btn-primary' onclick='BankAccountManageFormAction(`generatepin`, " +
            bankArray[i]
            .accountNumber + ");'><i class='fas fa-cogs'></i></button>";

        if (bankArray[i].closed === true) {
            bankFormHTML +=
                "<button class='btn btn-primary' onclick='BankAccountManageFormAction(`lock`, " +
                bankArray[i].accountNumber + ");'><i class='fas fa-lock'></i></button>";
        } else {
            bankFormHTML +=
                "<button class='btn btn-primary' onclick='BankAccountManageFormAction(`lock`, " +
                bankArray[i].accountNumber + ");'><i class='fas fa-unlock'></i></button>";
        }

        if (bankArray[i].mainAccount === true) {
            bankFormHTML +=
                "<button class='btn btn-primary' onclick='BankAccountManageFormAction(`setMain`, " +
                bankArray[i].accountNumber + ");'><i class='fas fa-star'></i></button>";
            bankAccountCount++;
        } else {
            bankFormHTML +=
                "<button class='btn btn-primary' onclick='BankAccountManageFormAction(`setMain`, " +
                bankArray[i].accountNumber + ");'><i class='far fa-star'></i></button>";
            bankAccountCount++;
        }
        bankFormHTML +=
            "<button class='btn btn-primary' onclick='BankAccountManageFormAction(`copycard`, " +
            bankArray[i].accountNumber + ");'><i class='fas fa-copy'></i></button>";
        bankFormHTML += "</li>";
    }

    if (bankAccountCount < 2) {
        bankFormHTML +=
            "<li class='list-group-item new' onclick='BankAccountManageFormCreateNewAccount()'><p class='title'>Neues Konto</p><i class='fas fa-plus'></i></li>";
    }
    selectedBank = curBank;
    $("#bankAccountManageFormList").html(bankFormHTML);
    $("#bankAccountManageForm").fadeTo(1000, 1, function () {});
}

function BankAccountManageFormDestroyCEF() {
    $("#bankAccountManageForm").fadeOut(500, function () {
        $("#bankAccountManageForm").hide();
    });
    alt.emit('Client:Bank:BankAccountdestroyCEF');
}

function BankFactionATMFormDestroyCEF() {
    $("#bankFactionATMForm").fadeOut(500, function () {
        globalFactionATMfactionid = undefined;
        globalFactionATMtype = undefined;
        $("#bankFactionATMForm").hide();
    });
    alt.emit("Client:FactionBank:destroyCEF");
}

function BankAccountManageFormCreateNewAccount() {
    if (selectedBank == "None") return;
    alt.emit("Client:Bank:BankAccountCreateNewAccount", selectedBank);
    $("#bankAccountManageForm").hide();
}

function BankAccountManageFormAction(action, accountNumber) {
    alt.emit("Client:Bank:BankAccountAction", action, `${accountNumber}`);
    $("#bankAccountManageForm").hide();
}

function BankATMcreateCEF(PIN, accountNumber) {
    curATMPin = PIN;
    curATMAccountNumber = accountNumber;
    BankATMshowSite("bankATMbox-PinArea");
    $("#bankATMbox").fadeTo(1000, 1, function () {});
}

function BankATMdestroyCEF() {
    $("#bankATMbox").fadeOut(500, function () {
        $("#bankATMbox").hide();
    });
    alt.emit("Client:ATM:BankATMdestroyCEF");
}

function BankATMshowSite(site) {
    $("#bankATMbox-PinArea").hide();
    $("#bankATMbox-WithDrawArea").hide();
    $("#bankATMbox-DepositArea").hide();
    $("#bankATMbox-ViewTransactionArea").hide();
    $("#bankATMbox-OverviewArea").hide();
    $("#bankATMbox-DoMoneyTransfer").hide();
    $(`#${site}`).fadeTo(500, 1, function () {
        $(`#${site}`).show();
    });

    if (site == "bankATMbox-PinArea") {
        $("#bankATMboxDescriptionTitle").html(
            "Um weitere Aktionen durchführen zu können geben Sie bitte Ihre Geheimzahl ein.<br>Geben Sie Ihre Geheimzahl zu oft falsch ein wird Ihre Karte gesperrt."
        );
    } else if (site == "bankATMbox-OverviewArea") {
        $("#bankATMboxDescriptionTitle").html(
            "Wählen Sie eine der unten aufgelisteten Möglichkeiten aus.");
        alt.emit("Client:ATM:requestBankData", curATMAccountNumber);
    }
}

function BankATMSetRequestedData(curBalance, bankPaperArray) {
    bankPaperArray = JSON.parse(bankPaperArray);
    let bankPaperHTML = "";

    for (var i in bankPaperArray) {
        if (bankPaperArray[i].Type == "Einzahlung") {
            bankPaperHTML += "<div class='card text-white green'>";
        } else if (bankPaperArray[i].Type == "Auszahlung") {
            bankPaperHTML += "<div class='card text-white red'>";
        } else if (bankPaperArray[i].Type == "Eingehende Überweisung" || bankPaperArray[i].Type ==
            "Ausgehende Überweisung") {
            bankPaperHTML += "<div class='card text-white blue'>";
        }

        bankPaperHTML +=
            `<div class='card-header'>Aktivität vom ${bankPaperArray[i].Date} ${bankPaperArray[i].Time} Uhr</div>` +
            `<div class='card-body'><h6 class='card-title'>${bankPaperArray[i].Type}</h6><p class='card-text'>`;

        if (bankPaperArray[i].Type == "Einzahlung" || bankPaperArray[i].Type == "Auszahlung") {
            bankPaperHTML += `<b>Standort: </b>${bankPaperArray[i].zoneName}<br>` +
                `<b>Betrag: </b>${bankPaperArray[i].moneyAmount}$<br>`;
        } else if (bankPaperArray[i].Type == "Ausgehende Überweisung") {
            bankPaperHTML += `<b>Absender: </b>${bankPaperArray[i].accountNumber}<br>` +
                `<b>Empfänger: </b>${bankPaperArray[i].ToOrFrom}<br>` +
                `<b>Standort: </b>${bankPaperArray[i].zoneName}<br>` +
                `<b>Betrag: </b>${bankPaperArray[i].moneyAmount}$<br>`;
        } else if (bankPaperArray[i].Type == "Eingehende Überweisung") {
            bankPaperHTML += `<b>Absender: </b>${bankPaperArray[i].ToOrFrom}<br>` +
                `<b>Empfänger: </b>${bankPaperArray[i].accountNumber}<br>` +
                `<b>Standort: </b>${bankPaperArray[i].zoneName}<br>` +
                `<b>Betrag: </b>${bankPaperArray[i].moneyAmount}$<br>`;
        }
        bankPaperHTML += `</p></div></div>`;
    }

    $("#bankATMBox-WithdrawBalanceInput").val(`${curBalance}$`);
    $("#bankATMBox-DepositBalanceInput").val(`${curBalance}$`);
    $("#bankATMBox-MoneyTransferBalanceInput").val(`${curBalance}$`);
    $("#bankATMbox-ViewTransactionArea-List").html(bankPaperHTML);
}

function shopCEFBoxDestroy() {
    $("#shopCEFBox").fadeOut(500, function () {
        $("#shopCEFBox").hide();
        alt.emit("Client:Shop:destroyShopCEF");
    });
}

function shopCEFBuyItem(htmlelem, itemname, itemmaxamount, isOnlySelling) {
    var listitem = $(htmlelem).parent();
    var listItemInput = $(listitem).find("input").val();
    if (itemname == "" || itemname == undefined || itemname == null) return;
    if (isOnlySelling == false) {
        if (itemmaxamount == 0) {
            ShowNotification(3, `Der Shop hat den ausgewählten Gegenstand nicht mehr auf Lager.`, 5000);
            return;
        }
        if (listItemInput > itemmaxamount) {
            ShowNotification(3,
                `Du kannst nur maximal ${itemmaxamount} Gegenstände davon erwerben (deine Auswahl: ${listItemInput})!`,
                5000);
            return;
        }

        alt.emit("Client:Shop:buyItem", globalShopId, listItemInput, itemname);
    } else if (isOnlySelling == true) {
        if (listItemInput > itemmaxamount) {
            ShowNotification(3,
                `Du kannst nur maximal ${itemmaxamount} verkaufen da du nicht mehr dabei hast.`,
                5000);
            return;
        }
        alt.emit("Client:Shop:sellItem", globalShopId, listItemInput, itemname);
    }
    shopCEFBoxDestroy();
}

function shopCEFBoxCreateCEF(itemArray, shopId, isOnlySelling) {
    itemArray = JSON.parse(itemArray);
    let shopCefHTML = "";
    globalShopId = shopId;

    for (var i in itemArray) {
        shopCefHTML += "<li class='list-group-item'>" +
            `<img src='../utils/img/inventory/${itemArray[i].itempic}'><p class='name'>${itemArray[i].itemname}</p><hr><p class='price'>${itemArray[i].itemprice}$</p><hr>` +
            `<input type='number' value='1' placeholder='Anzahl' spellcheck='false' onkeypress='return event.charCode >= 48 && event.charCode <= 57'>` +
            "<button type='button' class='btn' onclick='shopCEFBuyItem(this, `" + itemArray[i]
            .itemname + "`, " +
            itemArray[i].itemmaxamount + ", " + isOnlySelling +
            ");'><i class='fas fa-shopping-basket'></i></button></li>";
    }

    if (isOnlySelling == false) {
        $("#shopCEFBox-Title").html(`EINKAUFSLADEN`);
        $("#shopCEFBox-RobButton").show();
        $("#shopCEFBox-RobButton").attr("onclick", `robShop(${shopId});`);
    } else if (isOnlySelling == true) {
        $("#shopCEFBox-RobButton").attr("onclick", "");
        $("#shopCEFBox-RobButton").hide();
        $("#shopCEFBox-Title").html(`GEGENSTÄNDE VERKAUFEN`);
    }
    $("#shopCEFBox-List").html(shopCefHTML);
    $("#shopCEFBox").fadeTo(1000, 1, function () {});
}

function robShop(shopId) {
    alt.emit("Client:Shop:robShop", shopId);
    shopCEFBoxDestroy();
}

function BarberChangeHair(id) {
    switch (id) {
        case 0:
            globalBarberheadoverlaysarray[0][13] = document.getElementById("BarberHairVariation").value;
            if (document.getElementById("BarberHairVariation").value == "23") {
                globalBarberheadoverlaysarray[0][13] = 22;
            }
            break;
        case 1:
            globalBarberheadoverlaysarray[2][13] = document.getElementById("BarberHairColor1").value;
            break;
        case 2:
            globalBarberheadoverlaysarray[1][13] = document.getElementById("BarberHairColor2").value;
            break;
        case 3:
            globalBarberheadoverlaysarray[0][1] = document.getElementById("BarberBeardVariation").value;
            break;
        case 4:
            globalBarberheadoverlaysarray[2][1] = document.getElementById("BarberBeardColor").value;
            break;
        case 5:
            globalBarberheadoverlaysarray[0][2] = document.getElementById("BarberEyebrowsVariation")
                .value;
            break;
        case 6:
            globalBarberheadoverlaysarray[2][2] = document.getElementById("BarberEyebrowsColor").value;
            break;
        case 7:
            globalBarberheadoverlaysarray[0][4] = document.getElementById("BarberMakeupVariation")
                .value;
            break;
        case 8:
            globalBarberheadoverlaysarray[1][4] = document.getElementById("BarberMakeupAlpha").value;
            break;
        case 9:
            globalBarberheadoverlaysarray[0][8] = document.getElementById("BarberLipstickVariation")
                .value;
            break;
        case 10:
            globalBarberheadoverlaysarray[2][8] = document.getElementById("BarberLipstickColor").value;
            break;
        case 11:
            globalBarberheadoverlaysarray[0][5] = document.getElementById("BarberWangenBlushVariation")
                .value;
            break;
        case 12:
            globalBarberheadoverlaysarray[2][5] = document.getElementById("BarberWangenBlushColor")
                .value;
            break;
    }
    alt.emit("Client:Barber:UpdateHeadOverlays", JSON.stringify(globalBarberheadoverlaysarray));
}

function BarberBuyHairStyles() {
    $("#BarberBuyButton").prop("disabled", true);
    alt.emit("Client:Barber:finishBarber", JSON.stringify(globalBarberheadoverlaysarray));
    barberCEFBoxdestroy();
    setTimeout(() => {
        $("#BarberBuyButton").prop("disabled", false);
    }, 2500);
}

function CloseBarberCEF() {
    alt.emit("Client:Barber:RequestCurrentSkin");
    barberCEFBoxdestroy();
}

function barberCEFBoxdestroy() {
    $("#barberCEFBox").fadeOut(500, function () {
        $("#barberCEFBox").hide();
    });
    alt.emit("Client:Barber:destroyBarberCEF");
}

function clickdropBarber(current) {
    $(".dropdown-selector").prop("checked", false);
    $(current).prop("checked", true);
}

function SetGarageCEFListContent(garagename, garageInArray, garageOutArray) {
    var garageHTML = "",
        garageInArray = JSON.parse(garageInArray),
        garageOutArray = JSON.parse(garageOutArray);

    for (var i in garageInArray) {
        garageHTML += "<li class='list-group-item green' onclick='GarageCEFBoxDoAction(`storage`, `" +
            garageInArray[i].vehid + "`);'>" +
            `<span class='vehname'>${garageInArray[i].name}</span><span class='vehkz'>${garageInArray[i].plate}</span></li>`;
    }

    for (var i in garageOutArray) {
        garageHTML += "<li class='list-group-item red' onclick='GarageCEFBoxDoAction(`take`, `" +
            garageOutArray[i]
            .vehid + "`);'>" +
            `<span class='vehname'>${garageOutArray[i].name}</span><span class='vehkz'>${garageOutArray[i].plate}</span></li>`;
    }

    $("#GarageCEFBOX-title").html(`${garagename}`);
    $("#GarageCEFBox-VehList").html(garageHTML);
    $("#GarageCEFBox").fadeTo(1000, 1, function () {});
}

function GarageCEFBoxDoAction(action, vehID) {
    //action storage = einparken, take = ausparken
    if (action == "" || vehID == 0) return;
    alt.emit("Client:Garage:DoAction", curGarageId, action, vehID);
    GarageCEFBoxdestroy();
}

function GarageCEFBoxdestroy() {
    $("#GarageCEFBox").fadeOut(1, function () {
        $("#GarageCEFBox").hide();
        curGarageId = undefined;
    });
    alt.emit("Client:Garage:destroyGarageCEF");
}

function SetVehicleShopCEFListContent(shopid, shopname, itemarray) {
    var vehshophtml = "",
        itemarray = JSON.parse(itemarray);

    for (var i in itemarray) {
        vehshophtml +=
            `<li class='list-group-item'><img src='../utils/img/vehicles/${itemarray[i].hash}.png'><span><b>Fahrzeugname: </b>${itemarray[i].name}</span><br><span><b>Hersteller: </b>${itemarray[i].manufactor}</span><br>` +
            `<span><b>Treibstoff: </b>${itemarray[i].fueltype}</span><br><span><b>Tankgröße: </b>${itemarray[i].maxfuel} Liter</span><br><span><b>Kofferraum: </b>${itemarray[i].trunkcapacity}kg</span><br>` +
            `<span><b>Sitzplätze: </b>${itemarray[i].seats}</span><br><span><b>Preis: </b>${itemarray[i].price}$</span>` +
            "<span class='buybtn' onclick='VehicleShopCEFBuyItem(`" + itemarray[i].hash +
            "`);'><i class='fas fa-dollar-sign'></i></span></li>";
    }

    $("#VehicleShopCEFBox-title").html(`${shopname}`);
    $("#VehicleShopCEFBox-StoreList").html(vehshophtml);
    $("#VehicleShopCEFBox").fadeTo(1000, 1, function () {});
}

function VehicleShopCEFBuyItem(hash) {
    alt.emit("Client:VehicleShop:BuyVehicle", curVehShopId, hash);
    CloseVehicleShopCEF();
}

function CloseVehicleShopCEF() {
    $("#VehicleShopCEFBox").fadeOut(500, function () {
        $("#VehicleShopCEFBox").hide();
        curVehShopId = undefined;
    });
    alt.emit("Client:VehicleShop:destroyVehicleShopCEF");
}

function SetJobcenterJobListContent(jobArray) {
    var jobcenterHTML = "",
        jobArray = JSON.parse(jobArray);

    for (var i in jobArray) {
        jobcenterHTML +=
            "<li class='list-group-item'><i class='fa fa-check' onclick='JobcenterSelectJob(`" +
            jobArray[i].jobName + "`);'></i><img src='../utils/img/" + jobArray[i].jobPic +
            "'><p class='title'>" +
            jobArray[i].jobName + "</p><hr>" +
            `<p class='subtitle'>Benötigte Zeit:<font class='content'>${jobArray[i].jobNeededHours} Std</font></p>` +
            `<p class='subtitle'>Verdienst:<font class='content'>${jobArray[i].jobPaycheck}$</font></p></li>`;
    }

    $("#jobCenterApplyForm-JobList").html(jobcenterHTML);
    $("#jobCenterApplyForm").fadeTo(1000, 1, function () {});
}

function JobcenterSelectJob(jobname) {
    if (jobname == "" || jobname == undefined) return;
    $("#jobCenterApplyForm").fadeOut(250, function () {});
    alt.emit("Client:Jobcenter:SelectJob", jobname);
}

function closeJobcenterCEF() {
    $("#jobCenterApplyForm").fadeOut(250, function () {});
    alt.emit("Client:Jobcenter:destroyCEF");
}

var globalHotelApartmentsArray = [];

function setHotelApartmentsItems(array) {
    array = JSON.parse(array);
    for (var i in array) {
        globalHotelApartmentsArray.push(array[i]);
    }
}

function openHotelRentCEF(hotelname) {
    var hotelHTML = "";
    for (var i in globalHotelApartmentsArray) {
        hotelHTML +=
            `<li class='list-group-item'><p class='title'>Zimmer ${globalHotelApartmentsArray[i].apartmentId}</p>`;

        if (globalHotelApartmentsArray[i].ownerId >= 1) {
            hotelHTML +=
                `<p class='rentstate'><i class='fas fa-bed'></i>Mietstatus: <font style='color: #e83838'>Belegt</font></p>` +
                `<p class='rentstate'><i class='fas fa-user'></i>Mieter: <font>${globalHotelApartmentsArray[i].ownerName}</font></p>`;
        } else {
            hotelHTML +=
                `<p class='rentstate'><i class='fas fa-bed'></i>Mietstatus: <font style='color: #38e876'>Frei</font></p>` +
                `<p class='rentstate'><i class='fas fa-user'></i>Mieter: <font>-/-</font></p>`;
        }

        hotelHTML +=
            `<p class='rentstate'><i class='far fa-clock'></i>Mietdauer: <font>${globalHotelApartmentsArray[i].maxRentHours} Std.</font></p>` +
            `<p class='rentstate'><i class='fas fa-dollar-sign'></i>Mietpreis: <font>${globalHotelApartmentsArray[i].rentPrice}$</font></p>` +
            `<button type='button' class='btn btn-sm btn-danger' onclick='LockHotel("${globalHotelApartmentsArray[i].hotelId}", "${globalHotelApartmentsArray[i].apartmentId}");'><i class='fas fa-lock'></i></button>` +
            `<button type='button' class='btn btn-sm btn-danger' onclick='RentHotel("${globalHotelApartmentsArray[i].hotelId}", "${globalHotelApartmentsArray[i].apartmentId}");'><i class='fas fa-dollar-sign'></i></button>` +
            `<button type='button' class='btn btn-sm btn-danger' onclick='EnterHotel("${globalHotelApartmentsArray[i].hotelId}", "${globalHotelApartmentsArray[i].apartmentId}");'><i class='fas fa-sign-in-alt'></i></button></li>`;
    }
    $("#HotelManageCEFBox-ApartmentList").html(hotelHTML);
    $("#HotelManageCEFBox-HotelName").html(`Hotel: ${hotelname}`);
    $("#HotelManageCEFBox").fadeTo(1000, 1, function () {});
}

function EnterHotel(hotelId, apartmentId) {
    if (hotelId <= 0 || apartmentId <= 0) return;
    closeHotelManageCEFBox();
    alt.emit("Client:Hotel:EnterHotel", hotelId, apartmentId);
}

function RentHotel(hotelId, apartmentId) {
    if (hotelId <= 0 || apartmentId <= 0) return;
    closeHotelManageCEFBox();
    alt.emit("Client:Hotel:RentHotel", hotelId, apartmentId);
}

function LockHotel(hotelId, apartmentId) {
    if (hotelId <= 0 || apartmentId <= 0) return;
    closeHotelManageCEFBox();
    alt.emit("Client:Hotel:LockHotel", hotelId, apartmentId);
}

function closeHotelManageCEFBox() {
    $("#HotelManageCEFBox").fadeOut(500, function () {
        $("#HotelManageCEFBox").hide();
        alt.emit("Client:Hotel:destroyCEF");
    });
    globalHotelApartmentsArray = [];
}

function openHouseManageCEF(houseInfoArray, renterArray) {
    var renterHTML = "",
        upgradeHTML = "",
        houseInfoArray = JSON.parse(houseInfoArray),
        renterArray = JSON.parse(renterArray),
        houseId = 0;

    for (var i in houseInfoArray) {
        houseId = houseInfoArray[i].id;
        if (houseId <= 0 || houseId == undefined) continue;
        if (houseInfoArray[i].ownerId <= 0) continue;
        $("#HouseManageCEFBox-TresorInput").val('');
        $("#HouseManageCEFBox-TresorInput").attr('placeholder', `${houseInfoArray[i].money}`);
        $("#HouseManageCEFBox-rentPriceInput").val('');
        $("#HouseManageCEFBox-rentPriceInput").attr('placeholder', `${houseInfoArray[i].rentPrice}`);
        $('#HouseManageCEFBox-setRentPriceBtn').removeAttr('onClick');
        $('#HouseManageCEFBox-AllowRentersBtn').removeAttr('onClick');
        $('#HouseManageCEFBox-DenyRentersBtn').removeAttr('onClick');
        $('#HouseManageCEFBox-TresorDepositBtn').removeAttr('onClick');
        $('#HouseManageCEFBox-TresorWithdrawBtn').removeAttr('onClick');
        $('#HouseManageCEFBox-setRentPriceBtn').attr('onClick',
            `HouseManageSetNewRentPrice(${houseInfoArray[i].id}, ${houseInfoArray[i].rentPrice});`);
        $('#HouseManageCEFBox-AllowRentersBtn').attr('onClick',
            `HouseManageSetRentState(${houseInfoArray[i].id}, 'true');`);
        $('#HouseManageCEFBox-DenyRentersBtn').attr('onClick',
            `HouseManageSetRentState(${houseInfoArray[i].id}, 'false');`);
        $('#HouseManageCEFBox-TresorDepositBtn').attr('onClick',
            `HouseManageTresorAction(${houseInfoArray[i].id}, 'deposit');`);
        $('#HouseManageCEFBox-TresorWithdrawBtn').attr('onClick',
            `HouseManageTresorAction(${houseInfoArray[i].id}, 'withdraw');`);
        $("#HouseManageCEFBox-TresorAmount").html(`${houseInfoArray[i].money}$`);
        if (houseInfoArray[i].hasStorage) {
            upgradeHTML += `<li class='list-group-item'><p>Lagerraum - 1500$</p></li>`;
        } else {
            upgradeHTML +=
                `<li class='list-group-item'><p>Lagerraum - 1500$</p><button type='button' onclick='HouseManageBuyUpgrade(${houseInfoArray[i].id}, "storage");' class='btn btn-sm btn-success'><i class='fas fa-dollar-sign'></i></button></li>`;
        }

        if (houseInfoArray[i].hasAlarm) {
            upgradeHTML += `<li class='list-group-item'><p>Alarmanlage - 500$</p></li>`;
        } else {
            upgradeHTML +=
                `<li class='list-group-item'><p>Alarmanlage - 500$</p><button type='button' onclick='HouseManageBuyUpgrade(${houseInfoArray[i].id}, "alarm");' class='btn btn-sm btn-success'><i class='fas fa-dollar-sign'></i></button></li>`;
        }

        if (houseInfoArray[i].hasBank) {
            upgradeHTML += `<li class='list-group-item'><p>Tresor - 250$</p></li>`;
        } else {
            upgradeHTML +=
                `<li class='list-group-item'><p>Tresor - 250$</p><button type='button' onclick='HouseManageBuyUpgrade(${houseInfoArray[i].id}, "bank");' class='btn btn-sm btn-success'><i class='fas fa-dollar-sign'></i></button></li>`;
        }
    }

    for (var i in renterArray) {
        if (renterArray[i].charId <= 0 || renterArray[i].charId == undefined) continue;
        renterHTML +=
            `<li class='list-group-item'><p>${renterArray[i].renterName}</p><button type='button' onclick='HouseManageRemoveRenter(${houseId}, ${renterArray[i].charId});' class='btn btn-sm btn-danger'><i class='fas fa-times'></i></button></li>`;
    }

    $("#HouseManageCEFBox-RenterList").html(renterHTML);
    $("#HouseManageCEFBox-UpgradeList").html(upgradeHTML);
    $("#HouseManageCEFBox").fadeTo(1000, 1, function () {});
}

function HouseManageTresorAction(houseId, action) {
    if (houseId <= 0 || houseId == undefined) return;
    if (action != "withdraw" && action != "deposit") return;
    var inputVal = $("#HouseManageCEFBox-TresorInput").val();
    if (inputVal == undefined || inputVal <= 0) return;
    closeHouseManageCEFBox();
    alt.emit("Client:HouseManage:TresorAction", houseId, action, inputVal);
}

function HouseManageBuyUpgrade(houseId, upgrade) {
    if (houseId <= 0) return;
    if (upgrade != "alarm" && upgrade != "storage" && upgrade != "bank") return;
    closeHouseManageCEFBox();
    alt.emit("Client:HouseManage:BuyUpgrade", houseId, upgrade);
}

function HouseManageRemoveRenter(houseId, renterId) {
    if (houseId <= 0 || houseId == undefined || renterId <= 0 || renterId == undefined) return;
    closeHouseManageCEFBox();
    alt.emit("Client:HouseManage:RemoveRenter", houseId, renterId);
}

function HouseManageSetRentState(houseId, rentState) {
    if (houseId <= 0 || houseId == undefined || rentState == undefined) return;
    closeHouseManageCEFBox();
    alt.emit("Client:HouseManage:setRentState", houseId, rentState);
}

function HouseManageSetNewRentPrice(houseId, currentPrice) {
    if (houseId <= 0 || houseId == undefined) return;
    var inputVal = $("#HouseManageCEFBox-rentPriceInput").val();
    if (inputVal <= 0 || inputVal == undefined || inputVal == currentPrice) return;
    closeHouseManageCEFBox();
    alt.emit("Client:HouseManage:setRentPrice", houseId, inputVal);
}

function closeHouseManageCEFBox() {
    $("#HouseManageCEFBox").fadeOut(500, function () {
        $("#HouseManageCEFBox").hide();
        alt.emit("Client:HouseManage:destroyCEF");
    });
}

function openHouseEntranceCEF(charId, houseInfoArray, isRentedIn) {
    var houseHTML = "",
        houseInfoArray = JSON.parse(houseInfoArray);

    for (var i in houseInfoArray) {
        var color = "red";
        var isRentable = "nicht mietbar";
        $("#HouseEntranceCEFBox-Cut").removeClass("green");
        $("#HouseEntranceCEFBox-HouseName").removeClass("green");
        if (houseInfoArray[i].isRentable == true) {
            isRentable = "mietbar";
        }
        if (houseInfoArray[i].ownerId <= 0) {
            color = "green";
            houseHTML +=
                "<div class='container'><p class='green'>Eigentümer: <font>Kein Besitzer</font></p></div>";
            $("#HouseEntranceCEFBox-Cut").addClass("green");
            $("#HouseEntranceCEFBox-HouseName").addClass("green");
        } else {
            houseHTML +=
                `<div class='container'><p class='red'>Eigentümer: <font>${houseInfoArray[i].ownerName}</font></p></div>`;
        }

        houseHTML +=
            `<div class='container'><p class='${color}'>Einrichtungsstufe: <font>${houseInfoArray[i].interiorId}</font></p></div>` +
            `<div class='container'><p class='${color}'>Aktuelle Mieter: <font>${houseInfoArray[i].renterCount}</font></p></div>` +
            `<div class='container'><p class='${color}'>Maximale Mieter: <font>${houseInfoArray[i].maxRenters}</font></p></div>` +
            `<div class='container'><p class='${color}'>Mietpreis: <font>${houseInfoArray[i].rentPrice}$</font></p></div>` +
            `<div class='container'><p class='${color}'>Mietstatus: <font>${isRentable}</font></p></div>` +
            `<div class='container'><p class='${color}'>Kaufpreis: <font>${houseInfoArray[i].price}$</font></p></div>`;


        if (houseInfoArray[i].ownerId <= 0) {
            houseHTML +=
                `<button type="button" onclick='HouseEntranceBuyHouse(${houseInfoArray[i].id});' class="btn btn-sm btn-danger green">Kaufen</button>`;
        } else if (houseInfoArray[i].ownerId > 0 && houseInfoArray[i].ownerId == charId) {
            houseHTML += `<button type="button" class="btn btn-sm btn-danger">Verkaufen</button>`;
        }

        if (houseInfoArray[i].isRentable && !isRentedIn) {
            houseHTML +=
                `<button type="button" onclick='HouseEntranceRentHouse(${houseInfoArray[i].id});' class="btn btn-sm btn-danger">Einmieten</button>`;
        }

        if (isRentedIn) {
            houseHTML +=
                `<button type="button" onclick='HouseEntranceUnrentHouse(${houseInfoArray[i].id});' class="btn btn-sm btn-danger">Ausmieten</button>`;
        }

        if (!houseInfoArray[i].isLocked) {
            houseHTML +=
                `<button type="button" onclick='HouseEntranceEnterHouse(${houseInfoArray[i].id});' class="btn btn-sm btn-danger">Betreten</button>`;
        }

        $("#HouseEntranceCEFBox-HouseName").html(`${houseInfoArray[i].street}`);
    }

    $("#HouseEntranceCEFBox-List").html(houseHTML);
    $("#HouseEntranceCEFBox").fadeTo(1000, 1, function () {});
}

function HouseEntranceUnrentHouse(houseId) {
    if (houseId <= 0) return;
    closeHouseEntranceCEFBox();
    alt.emit("Client:HouseEntrance:UnrentHouse", houseId);
}

function HouseEntranceRentHouse(houseId) {
    if (houseId <= 0) return;
    closeHouseEntranceCEFBox();
    alt.emit("Client:HouseEntrance:RentHouse", houseId);
}

function HouseEntranceBuyHouse(houseId) {
    if (houseId <= 0) return;
    closeHouseEntranceCEFBox();
    alt.emit("Client:HouseEntrance:BuyHouse", houseId);
}

function HouseEntranceEnterHouse(houseId) {
    if (houseId <= 0) return;
    closeHouseEntranceCEFBox();
    alt.emit("Client:HouseEntrance:EnterHouse", houseId);
}

function closeHouseEntranceCEFBox() {
    $("#HouseEntranceCEFBox").fadeOut(500, function () {
        $("#HouseEntranceCEFBox").hide();
        alt.emit("Client:HouseEntrance:destroyCEF");
    });
}

function closeTownHallHouseSelector() {
    $("#TownhallHouseSelectorBox").fadeOut(500, function () {
        $("#TownhallHouseSelectorBox").hide();
        alt.emit("Client:Townhall:destroyHouseSelector");
    });
}

function openTownhallHouseSelector(houseArray) {
    var html = "",
        houseArray = JSON.parse(houseArray);

    for (var i in houseArray) {
        html +=
            `<li class='list-group-item'><span>${houseArray[i].street}</span><button type='button' onclick='HouseSelectorSelectHouse(${houseArray[i].id});' class='btn btn-sm btn-success'><i class='fas fa-check'></i></button><button type='button' onclick='HouseSelectorSellHouse(${houseArray[i].id});' class='btn btn-sm btn-danger'><i class='fas fa-dollar-sign'></i></button>`;
    }

    $("#TownHallHouseSelector-List").html(html);
    $("#TownhallHouseSelectorBox").fadeTo(1000, 1, function () {});
}

function HouseSelectorSelectHouse(houseId) {
    if (houseId <= 0 || houseId == undefined) return;
    closeTownHallHouseSelector();
    alt.emit("Client:House:setMainHouse", houseId);
}

function HouseSelectorSellHouse(houseId) {
    if (houseId <= 0 || houseId == undefined) return;
    closeTownHallHouseSelector();
    alt.emit("Client:House:SellHouse", houseId);
}

function togglePhone(shouldBeVisible) {
    if (shouldBeVisible) {
        $("#Smartphone-Box").animate({
            'margin-bottom': '0vw'
        }, 800);
        if (selectedChatId != 0) {
            allowChatKeyUp = true;
        }
    } else {
        let phoneMargin = getViewportPhoneMarginBot()
        $("#Smartphone-Box").animate({
            'margin-bottom': `${phoneMargin}px`
        }, 800);
        allowChatKeyUp = false;
    }
}


function activatePhone(shouldBeVisible) {
    if (shouldBeVisible) {
        $("#Smartphone-Box").fadeTo(500, 1, function () {
            $("#Smartphone-Box").show();
            phoneForceToHome();
            // Debug
            phoneAddressRefresh();
        });
    } else {
        $("#Smartphone-Box").fadeTo(500, 0, function () {
            $("#Smartphone-Box").hide();
            allowChatKeyUp = false;
            phoneForceToHome();
        });
    }
}

function updatePhoneNumber(number) {
    let settingsdisplay = document.getElementById("phone-settings-number");
    settingsdisplay.innerHTML = number;
    settingsdisplay.dataset.number = number;
    userPhoneNumber = `${number}`;
}

function ShowLSPDIntranetApp(shouldBeVisible, serverWanteds) {
    if (!shouldBeVisible || shouldBeVisible == undefined) {
        $("#phone-app-police").hide();
        return;
    }

    let wantedHtmlCat1 = "",
        wantedHtmlCat2 = "",
        wantedHtmlCat3 = "",
        wantedHtmlCat4 = "",
        wantedHtmlCat5 = "",
        wantedHtmlCat6 = "",
        wantedHtmlCat7 = "",
        wantedHtmlCat8 = "";
    serverWanteds = JSON.parse(serverWanteds);

    for (var i in serverWanteds) {
        if (serverWanteds[i].category == 1) wantedHtmlCat1 +=
            "<button class='btn' onclick='phonePoliceAddParagraph(" + serverWanteds[i].category + "." +
            serverWanteds[i].paragraph + ");' data-wantedid='" + serverWanteds[i].wantedId +
            "' data-jailtime='" +
            serverWanteds[i].jailtime + "' data-ticketfine='" + serverWanteds[i].ticketfine +
            "' data-paragraph='" +
            serverWanteds[i].category + "." + serverWanteds[i].paragraph +
            "'><div class='badge badge-pill badge-dark'>§" + serverWanteds[i].category + " Abs. " +
            serverWanteds[i]
            .paragraph + "</div> " + serverWanteds[i].wantedName + "</button>";
        else if (serverWanteds[i].category == 2) wantedHtmlCat2 +=
            "<button class='btn' onclick='phonePoliceAddParagraph(" + serverWanteds[i].category + "." +
            serverWanteds[i].paragraph + ");' data-wantedid='" + serverWanteds[i].wantedId +
            "' data-jailtime='" +
            serverWanteds[i].jailtime + "' data-ticketfine='" + serverWanteds[i].ticketfine +
            "' data-paragraph='" +
            serverWanteds[i].category + "." + serverWanteds[i].paragraph +
            "'><div class='badge badge-pill badge-dark'>§" + serverWanteds[i].category + " Abs. " +
            serverWanteds[i]
            .paragraph + "</div> " + serverWanteds[i].wantedName + "</button>";
        else if (serverWanteds[i].category == 3) wantedHtmlCat3 +=
            "<button class='btn' onclick='phonePoliceAddParagraph(" + serverWanteds[i].category + "." +
            serverWanteds[i].paragraph + ");' data-wantedid='" + serverWanteds[i].wantedId +
            "' data-jailtime='" +
            serverWanteds[i].jailtime + "' data-ticketfine='" + serverWanteds[i].ticketfine +
            "' data-paragraph='" +
            serverWanteds[i].category + "." + serverWanteds[i].paragraph +
            "'><div class='badge badge-pill badge-dark'>§" + serverWanteds[i].category + " Abs. " +
            serverWanteds[i]
            .paragraph + "</div> " + serverWanteds[i].wantedName + "</button>";
        else if (serverWanteds[i].category == 4) wantedHtmlCat4 +=
            "<button class='btn' onclick='phonePoliceAddParagraph(" + serverWanteds[i].category + "." +
            serverWanteds[i].paragraph + ");' data-wantedid='" + serverWanteds[i].wantedId +
            "' data-jailtime='" +
            serverWanteds[i].jailtime + "' data-ticketfine='" + serverWanteds[i].ticketfine +
            "' data-paragraph='" +
            serverWanteds[i].category + "." + serverWanteds[i].paragraph +
            "'><div class='badge badge-pill badge-dark'>§" + serverWanteds[i].category + " Abs. " +
            serverWanteds[i]
            .paragraph + "</div> " + serverWanteds[i].wantedName + "</button>";
        else if (serverWanteds[i].category == 5) wantedHtmlCat5 +=
            "<button class='btn' onclick='phonePoliceAddParagraph(" + serverWanteds[i].category + "." +
            serverWanteds[i].paragraph + ");' data-wantedid='" + serverWanteds[i].wantedId +
            "' data-jailtime='" +
            serverWanteds[i].jailtime + "' data-ticketfine='" + serverWanteds[i].ticketfine +
            "' data-paragraph='" +
            serverWanteds[i].category + "." + serverWanteds[i].paragraph +
            "'><div class='badge badge-pill badge-dark'>§" + serverWanteds[i].category + " Abs. " +
            serverWanteds[i]
            .paragraph + "</div> " + serverWanteds[i].wantedName + "</button>";
        else if (serverWanteds[i].category == 6) wantedHtmlCat6 +=
            "<button class='btn' onclick='phonePoliceAddParagraph(" + serverWanteds[i].category + "." +
            serverWanteds[i].paragraph + ");' data-wantedid='" + serverWanteds[i].wantedId +
            "' data-jailtime='" +
            serverWanteds[i].jailtime + "' data-ticketfine='" + serverWanteds[i].ticketfine +
            "' data-paragraph='" +
            serverWanteds[i].category + "." + serverWanteds[i].paragraph +
            "'><div class='badge badge-pill badge-dark'>§" + serverWanteds[i].category + " Abs. " +
            serverWanteds[i]
            .paragraph + "</div> " + serverWanteds[i].wantedName + "</button>";
        else if (serverWanteds[i].category == 7) wantedHtmlCat7 +=
            "<button class='btn' onclick='phonePoliceAddParagraph(" + serverWanteds[i].category + "." +
            serverWanteds[i].paragraph + ");' data-wantedid='" + serverWanteds[i].wantedId +
            "' data-jailtime='" +
            serverWanteds[i].jailtime + "' data-ticketfine='" + serverWanteds[i].ticketfine +
            "' data-paragraph='" +
            serverWanteds[i].category + "." + serverWanteds[i].paragraph +
            "'><div class='badge badge-pill badge-dark'>§" + serverWanteds[i].category + " Abs. " +
            serverWanteds[i]
            .paragraph + "</div> " + serverWanteds[i].wantedName + "</button>";
        else if (serverWanteds[i].category == 8) wantedHtmlCat8 +=
            "<button class='btn' onclick='phonePoliceAddParagraph(" + serverWanteds[i].category + "." +
            serverWanteds[i].paragraph + ");' data-wantedid='" + serverWanteds[i].wantedId +
            "' data-jailtime='" +
            serverWanteds[i].jailtime + "' data-ticketfine='" + serverWanteds[i].ticketfine +
            "' data-paragraph='" +
            serverWanteds[i].category + "." + serverWanteds[i].paragraph +
            "'><div class='badge badge-pill badge-dark'>§" + serverWanteds[i].category + " Abs. " +
            serverWanteds[i]
            .paragraph + "</div> " + serverWanteds[i].wantedName + "</button>";
    }

    $("#stgb1").html(wantedHtmlCat1);
    $("#stgb2").html(wantedHtmlCat2);
    $("#stgb3").html(wantedHtmlCat3);
    $("#stgb4").html(wantedHtmlCat4);
    $("#stgb5").html(wantedHtmlCat5);
    $("#stgb6").html(wantedHtmlCat6);
    $("#stgb7").html(wantedHtmlCat7);
    $("#stgb8").html(wantedHtmlCat8);
    $("#phone-app-police").show();
}

function phoneForceToHome() {
    selectedChatId = 0;
    allowChatKeyUp = false;
    $("#phone-screen-call").hide();
    $("#phone-screen-calling").hide();
    $("#phone-screen-sms").hide();
    $("#phone-screen-address").hide();
    $("#phone-screen-police").hide();
    $("#phone-screen-radio").hide();
    $("#phone-screen-settings").hide();
    $("#phone-screen-home").show();
    $('#phone-sms-home-carousel').carousel(0);
    $('#phone-sms-header-carousel').carousel(0);
    $("#phone-min-time").addClass("d-none");
    if (phoneActiveCall != null) {
        $("#phone-banner").slideDown("slow");
    }
}

function forceChatViewToBottom() {
    let display = document.getElementById("phone-chat-display");
    let scrollheight = display.scrollHeight;
    display.scrollTop = scrollheight - display.offsetHeight;
}

function phoneNewChat(target) {
    if (target == null) {
        target = document.getElementById("phone-input-new-chat");
        let targetVal = target.value;
        target.value = "";
        target = targetVal;
    }
    if (isNaN(parseInt(target)) != true) {
        globalChatsArray = [];
        alt.emit("Client:Smartphone:createNewChat", target);
        $('#phone-sms-home-carousel').carousel(0);
        $('#phone-sms-header-carousel').carousel(0);
    }
}

function phoneOpenChat(chatId, targetNumber) {
    loadTextMessages(chatId);
    document.getElementById('phone-chat-disp-name').dataset.target = targetNumber;

    document.getElementById("phone-chat-disp-name").innerHTML = getNameOrNumber(targetNumber);
    $('#phone-sms-home-carousel').carousel(1);
    $('#phone-sms-header-carousel').carousel(1);
    allowChatKeyUp = true;
    clearChatAlerts(chatId);
    selectedChatId = chatId;
}

function forceOpenChat(chatId, targetNumber) {
    phoneForceToHome();
    $("#phone-screen-sms").show();
    $("#phone-min-time").removeClass("d-none");
    loadMessagesMain();
    phoneOpenChat(chatId, targetNumber);
}

function phoneCloseChat() {
    $("#phone-sms-nav-chats").addClass("phone-sms-nav-item-active");
    $("#phone-sms-nav-status").removeClass("phone-sms-nav-item-active");
    $('#phone-sms-home-carousel').carousel(0);
    $('#phone-sms-header-carousel').carousel(0);
    allowChatKeyUp = false;
    selectedChatId = 0;
}

function clearChatAlerts(id) {
    let chatFull = document.getElementById("phone-sms-home-chats").querySelectorAll(
        "div[data-chatid='" + id +
        "']");
    [].forEach.call(chatFull, function (chat) {
        [].forEach.call(chat.querySelectorAll(".phone-app-chat-alert"), function (alertdiv) {
            alertdiv.innerHTML = "";
        });
    });
    checkChatAlerts();
};

function checkChatAlerts() {
    let alertsAll = document.getElementById("phone-sms-home-chats").querySelectorAll(
        ".phone-app-chat-alert");
    let alertsTotal = 0;
    [].forEach.call(alertsAll, function (alert) {
        if (isNaN(parseInt(alert.innerHTML)) != true) {
            alertsTotal = alertsTotal + parseInt(alert.innerHTML);
        }
    });
    if (alertsTotal == 0) {
        alertsTotal = "";
    }

    document.getElementById("phone-app-chat-alert").innerHTML = alertsTotal;
    if (alertsTotal < 10) {
        document.getElementById("phone-app-sms-alert").innerHTML = alertsTotal;
    } else {
        document.getElementById("phone-app-sms-alert").innerHTML = "9";
    }
}

function phoneSendMessage() {
    if (phoneFlightmode) {
        showPhoneNotification("Kein Netz", "error", null, "error");
    } else {
        let text = document.getElementById("phone-chat-input").value;
        toString(text);
        if (text !== "" && selectedChatId != 0) {
            playPhoneAudio("../utils/sounds/phone/msg_send.wav");
            let encodedText = encodeText(text);
            document.getElementById("phone-chat-input").value = null;
            var now = new Date();
            let unix = Math.round(now.getTime() / 1000);
            targetMessageUser = document.getElementById('phone-chat-disp-name').dataset.target;
            globalChatMessagesArray = [];
            alt.emit("Client:Smartphone:sendChatMessage", selectedChatId, userPhoneNumber,
                targetMessageUser, unix,
                encodedText);
        }
    }
}

var clothesShopHats = [],
    clothesShopMasks = [],
    clothesShopGlasses = [],
    clothesShopEarrings = [],
    clothesShopNecklaces = [],
    clothesShopTops = [],
    clothesShopTorsos = [],
    clothesShopUndershirts = [],
    clothesShopVests = [],
    clothesShopPants = [],
    clothesShopShoes = [],
    clothesShopWatches = [],
    clothesShopBracelets = [],
    clothesShopHatIndex = 0,
    clothesShopMaskIndex = 0,
    clothesShopGlassIndex = 0,
    clothesShopEarringIndex = 0,
    clothesShopNecklaceIndex = 0,
    clothesShopTopIndex = 0,
    clothesShopTorsoIndex = 0,
    clothesShopUndershirtIndex = 0,
    clothesShopVestIndex = 0,
    clothesShopPantsIndex = 0,
    clothesShopShoesIndex = 0,
    clothesShopWatchIndex = 0,
    clothesShopBraceletIndex = 0,
    globalClothesShopId = undefined,
    globalClothesShopArray = [];

function SetClothesShopItems(items) {
    items = JSON.parse(items);
    for (var i in items) {
        globalClothesShopArray.push(items[i]);
    }
}

function SetClothesShopContent(shopId) {
    clothesShopHats = [], clothesShopTorsos = [], clothesShopUndershirts = [], clothesShopMasks = [],
        clothesShopGlasses = [], clothesShopEarrings = [], clothesShopNecklaces = [],
        clothesShopTops = [],
        clothesShopVests = [], clothesShopPants = [], clothesShopShoes = [], clothesShopWatches = [],
        clothesShopBracelets = [], globalClothesShopId = undefined;
    globalClothesShopId = shopId;

    for (var i in globalClothesShopArray) {
        if (globalClothesShopArray[i].clothesType == "Hat") clothesShopHats.push(globalClothesShopArray[
            i]);
        else if (globalClothesShopArray[i].clothesType == "Mask") clothesShopMasks.push(
            globalClothesShopArray[i]);
        else if (globalClothesShopArray[i].clothesType == "Glass") clothesShopGlasses.push(
            globalClothesShopArray[
                i]);
        else if (globalClothesShopArray[i].clothesType == "Earring") clothesShopEarrings.push(
            globalClothesShopArray[i]);
        else if (globalClothesShopArray[i].clothesType == "Necklace") clothesShopNecklaces.push(
            globalClothesShopArray[i]);
        else if (globalClothesShopArray[i].clothesType == "Top") clothesShopTops.push(
            globalClothesShopArray[i]);
        else if (globalClothesShopArray[i].clothesType == "Torso") clothesShopTorsos.push(
            globalClothesShopArray[
                i]);
        else if (globalClothesShopArray[i].clothesType == "Undershirt") clothesShopUndershirts.push(
            globalClothesShopArray[i]);
        else if (globalClothesShopArray[i].clothesType == "Armor") clothesShopVests.push(
            globalClothesShopArray[i]);
        else if (globalClothesShopArray[i].clothesType == "Leg") clothesShopPants.push(
            globalClothesShopArray[i]);
        else if (globalClothesShopArray[i].clothesType == "Feet") clothesShopShoes.push(
            globalClothesShopArray[i]);
        else if (globalClothesShopArray[i].clothesType == "Watch") clothesShopWatches.push(
            globalClothesShopArray[
                i]);
        else if (globalClothesShopArray[i].clothesType == "Bracelet") clothesShopBracelets.push(
            globalClothesShopArray[i]);
    }

    if (clothesShopHats.length > 0) $("#ClothesShop-HatContainer").show();
    else $("#ClothesShop-HatContainer").hide();

    if (clothesShopMasks.length > 0) $("#ClothesShop-MaskContainer").show();
    else $("#ClothesShop-MaskContainer").hide();

    if (clothesShopGlasses.length > 0) $("#ClothesShop-GlassesContainer").show();
    else $("#ClothesShop-GlassesContainer").hide();

    if (clothesShopEarrings.length > 0) $("#ClothesShop-EarringContainer").show();
    else $("#ClothesShop-EarringContainer").hide();

    if (clothesShopNecklaces.length > 0) $("#ClothesShop-NecklaceContainer").show();
    else $("#ClothesShop-NecklaceContainer").hide();

    if (clothesShopTops.length > 0) $("#ClothesShop-TopContainer").show();
    else $("#ClothesShop-TopContainer").hide();

    if (clothesShopUndershirts.length > 0) $("#ClothesShop-UndershirtContainer").show();
    else $("#ClothesShop-UndershirtContainer").hide();

    if (clothesShopTorsos.length > 0) $("#ClothesShop-TorsoContainer").show();
    else $("#ClothesShop-TorsoContainer").hide();

    if (clothesShopVests.length > 0) $("#ClothesShop-VestContainer").show();
    else $("#ClothesShop-VestContainer").hide();

    if (clothesShopPants.length > 0) $("#ClothesShop-PantsContainer").show();
    else $("#ClothesShop-PantsContainer").hide();

    if (clothesShopShoes.length > 0) $("#ClothesShop-ShoeContainer").show();
    else $("#ClothesShop-ShoeContainer").hide();

    if (clothesShopWatches.length > 0) $("#ClothesShop-WatchContainer").show();
    else $("#ClothesShop-WatchContainer").hide();

    if (clothesShopBracelets.length > 0) $("#ClothesShop-BraceletContainer").show();
    else $("#ClothesShop-BraceletContainer").hide();

    $("#ClothesShop-HatText").html(`Kein Gegenstand ausgewählt`);
    $("#ClothesShop-MaskText").html(`Kein Gegenstand ausgewählt`);
    $("#ClothesShop-GlassesText").html(`Kein Gegenstand ausgewählt`);
    $("#ClothesShop-EarringText").html(`Kein Gegenstand ausgewählt`);
    $("#ClothesShop-NecklaceText").html(`Kein Gegenstand ausgewählt`);
    $("#ClothesShop-TopText").html(`Kein Gegenstand ausgewählt`);
    $("#ClothesShop-TorsoText").html(`Kein Gegenstand ausgewählt`);
    $("#ClothesShop-UndershirtText").html(`Kein Gegenstand ausgewählt`);
    $("#ClothesShop-VestText").html(`Kein Gegenstand ausgewählt`);
    $("#ClothesShop-PantsText").html(`Kein Gegenstand ausgewählt`);
    $("#ClothesShop-ShoeText").html(`Kein Gegenstand ausgewählt`);
    $("#ClothesShop-WatchText").html(`Kein Gegenstand ausgewählt`);
    $("#ClothesShop-BraceletText").html(`Kein Gegenstand ausgewählt`);
    $("#ClothesShop-HatPrice").html(`99999$`);
    $("#ClothesShop-MaskPrice").html(`99999$`);
    $("#ClothesShop-GlassesPrice").html(`99999$`);
    $("#ClothesShop-EarringPrice").html(`99999$`);
    $("#ClothesShop-NecklacePrice").html(`99999$`);
    $("#ClothesShop-TopPrice").html(`99999$`);
    $("#ClothesShop-TorsoPrice").html(`99999$`);
    $("#ClothesShop-UndershirtPrice").html(`99999$`);
    $("#ClothesShop-VestPrice").html(`99999$`);
    $("#ClothesShop-PantsPrice").html(`99999$`);
    $("#ClothesShop-ShoePrice").html(`99999$`);
    $("#ClothesShop-WatchPrice").html(`99999$`);
    $("#ClothesShop-BraceletPrice").html(`99999$`);
    $("#ClothesShopCEFBox").fadeTo(1000, 1, function () {});
}

function ClothesShopSwitchLeft(type) {
    switch (type) {
        case 1:
            clothesShopHatIndex--;
            if (clothesShopHatIndex < 0) clothesShopHatIndex = clothesShopHats.length - 1;
            $("#ClothesShop-HatText").html(
                `${clothesShopHats[clothesShopHatIndex].itemName} (${clothesShopHatIndex}/${clothesShopHats.length-1})`
            );
            $("#ClothesShop-HatPrice").html(`${clothesShopHats[clothesShopHatIndex].itemPrice}$`);
            alt.emit("Client:ClothesShop:setAccessory", 0, clothesShopHats[clothesShopHatIndex]
                .clothesDraw,
                clothesShopHats[clothesShopHatIndex].clothesTex);
            break;
        case 2:
            clothesShopMaskIndex--;
            if (clothesShopMaskIndex < 0) clothesShopMaskIndex = clothesShopMasks.length - 1;
            $("#ClothesShop-MaskText").html(
                `${clothesShopMasks[clothesShopMaskIndex].itemName} (${clothesShopMaskIndex}/${clothesShopMasks.length-1})`
            );
            $("#ClothesShop-MaskPrice").html(`${clothesShopMasks[clothesShopMaskIndex].itemPrice}$`);
            alt.emit("Client:ClothesShop:setClothes", 1, clothesShopMasks[clothesShopMaskIndex]
                .clothesDraw,
                clothesShopMasks[clothesShopMaskIndex].clothesTex);
            break;
        case 3:
            clothesShopGlassIndex--;
            if (clothesShopGlassIndex < 0) clothesShopGlassIndex = clothesShopGlasses.length - 1;
            $("#ClothesShop-GlassesText").html(
                `${clothesShopGlasses[clothesShopGlassIndex].itemName} (${clothesShopGlassIndex}/${clothesShopGlasses.length-1})`
            );
            $("#ClothesShop-GlassesPrice").html(
                `${clothesShopGlasses[clothesShopGlassIndex].itemPrice}$`);
            alt.emit("Client:ClothesShop:setAccessory", 1, clothesShopGlasses[clothesShopGlassIndex]
                .clothesDraw,
                clothesShopGlasses[clothesShopGlassIndex].clothesTex);
            break;
        case 4:
            clothesShopEarringIndex--;
            if (clothesShopEarringIndex < 0) clothesShopEarringIndex = clothesShopEarrings.length - 1;
            $("#ClothesShop-EarringText").html(
                `${clothesShopEarrings[clothesShopEarringIndex].itemName} (${clothesShopEarringIndex}/${clothesShopEarrings.length-1})`
            );
            $("#ClothesShop-EarringPrice").html(
                `${clothesShopEarrings[clothesShopEarringIndex].itemPrice}$`);
            alt.emit("Client:ClothesShop:setAccessory", 2, clothesShopEarrings[clothesShopEarringIndex]
                .clothesDraw,
                clothesShopEarrings[clothesShopEarringIndex].clothesTex);
            break;
        case 5:
            clothesShopNecklaceIndex--;
            if (clothesShopNecklaceIndex < 0) clothesShopNecklaceIndex = clothesShopNecklaces.length -
                1;
            $("#ClothesShop-NecklaceText").html(
                `${clothesShopNecklaces[clothesShopNecklaceIndex].itemName} (${clothesShopNecklaceIndex}/${clothesShopNecklaces.length-1})`
            );
            $("#ClothesShop-NecklacePrice").html(
                `${clothesShopNecklaces[clothesShopNecklaceIndex].itemPrice}$`);
            alt.emit("Client:ClothesShop:setClothes", 7, clothesShopNecklaces[clothesShopNecklaceIndex]
                .clothesDraw,
                clothesShopNecklaces[clothesShopNecklaceIndex].clothesTex);
            break;
        case 6:
            clothesShopTopIndex--;
            if (clothesShopTopIndex < 0) clothesShopTopIndex = clothesShopTops.length - 1;
            $("#ClothesShop-TopText").html(
                `${clothesShopTops[clothesShopTopIndex].itemName} (${clothesShopTopIndex}/${clothesShopTops.length-1})`
            );
            $("#ClothesShop-TopPrice").html(`${clothesShopTops[clothesShopTopIndex].itemPrice}$`);
            alt.emit("Client:ClothesShop:setClothes", 11, clothesShopTops[clothesShopTopIndex]
                .clothesDraw,
                clothesShopTops[clothesShopTopIndex].clothesTex);
            break;
        case 7:
            clothesShopVestIndex--;
            if (clothesShopVestIndex < 0) clothesShopVestIndex = clothesShopVests.length - 1;
            $("#ClothesShop-VestText").html(
                `${clothesShopVests[clothesShopVestIndex].itemName} (${clothesShopVestIndex}/${clothesShopVests.length-1})`
            );
            $("#ClothesShop-VestPrice").html(`${clothesShopVests[clothesShopVestIndex].itemPrice}$`);
            alt.emit("Client:ClothesShop:setClothes", 9, clothesShopVests[clothesShopVestIndex]
                .clothesDraw,
                clothesShopVests[clothesShopVestIndex].clothesTex);
            break;
        case 8:
            clothesShopPantsIndex--;
            if (clothesShopPantsIndex < 0) clothesShopPantsIndex = clothesShopPants.length - 1;
            $("#ClothesShop-PantsText").html(
                `${clothesShopPants[clothesShopPantsIndex].itemName} (${clothesShopPantsIndex}/${clothesShopPants.length-1})`
            );
            $("#ClothesShop-PantsPrice").html(`${clothesShopPants[clothesShopPantsIndex].itemPrice}$`);
            alt.emit("Client:ClothesShop:setClothes", 4, clothesShopPants[clothesShopPantsIndex]
                .clothesDraw,
                clothesShopPants[clothesShopPantsIndex].clothesTex);
            break;
        case 9:
            clothesShopShoesIndex--;
            if (clothesShopShoesIndex < 0) clothesShopShoesIndex = clothesShopShoes.length - 1;
            $("#ClothesShop-ShoeText").html(
                `${clothesShopShoes[clothesShopShoesIndex].itemName} (${clothesShopShoesIndex}/${clothesShopShoes.length-1})`
            );
            $("#ClothesShop-ShoePrice").html(`${clothesShopShoes[clothesShopShoesIndex].itemPrice}$`);
            alt.emit("Client:ClothesShop:setClothes", 6, clothesShopShoes[clothesShopShoesIndex]
                .clothesDraw,
                clothesShopShoes[clothesShopShoesIndex].clothesTex);
            break;
        case 10:
            clothesShopWatchIndex--;
            if (clothesShopWatchIndex < 0) clothesShopWatchIndex = clothesShopWatches.length - 1;
            $("#ClothesShop-WatchText").html(
                `${clothesShopWatches[clothesShopWatchIndex].itemName} (${clothesShopWatchIndex}/${clothesShopWatches.length-1})`
            );
            $("#ClothesShop-WatchPrice").html(
                `${clothesShopWatches[clothesShopWatchIndex].itemPrice}$`);
            alt.emit("Client:ClothesShop:setAccessory", 6, clothesShopWatches[clothesShopWatchIndex]
                .clothesDraw,
                clothesShopWatches[clothesShopWatchIndex].clothesTex);
            break;
        case 11:
            clothesShopBraceletIndex--;
            if (clothesShopBraceletIndex < 0) clothesShopBraceletIndex = clothesShopBracelets.length -
                1;
            $("#ClothesShop-BraceletText").html(
                `${clothesShopBracelets[clothesShopBraceletIndex].itemName} (${clothesShopBraceletIndex}/${clothesShopBracelets.length-1})`
            );
            $("#ClothesShop-BraceletPrice").html(
                `${clothesShopBracelets[clothesShopBraceletIndex].itemPrice}$`);
            alt.emit("Client:ClothesShop:setAccessory", 7, clothesShopBracelets[
                    clothesShopBraceletIndex]
                .clothesDraw, clothesShopBracelets[clothesShopBraceletIndex].clothesTex);
            break;
        case 12:
            clothesShopUndershirtIndex--;
            if (clothesShopUndershirtIndex < 0) clothesShopUndershirtIndex = clothesShopUndershirts
                .length - 1;
            $("#ClothesShop-UndershirtText").html(
                `${clothesShopUndershirts[clothesShopUndershirtIndex].itemName} (${clothesShopUndershirtIndex}/${clothesShopUndershirts.length-1})`
            );
            $("#ClothesShop-UndershirtPrice").html(
                `${clothesShopUndershirts[clothesShopUndershirtIndex].itemPrice}$`);
            alt.emit("Client:ClothesShop:setClothes", 8, clothesShopUndershirts[
                    clothesShopUndershirtIndex]
                .clothesDraw, clothesShopUndershirts[clothesShopUndershirtIndex].clothesTex);
            break;
        case 13:
            clothesShopTorsoIndex--;
            if (clothesShopTorsoIndex < 0) clothesShopTorsoIndex = clothesShopTorsos.length - 1;
            $("#ClothesShop-TorsoText").html(
                `${clothesShopTorsos[clothesShopTorsoIndex].itemName} (${clothesShopTorsoIndex}/${clothesShopTorsos.length-1})`
            );
            $("#ClothesShop-TorsoPrice").html(`${clothesShopTorsos[clothesShopTorsoIndex].itemPrice}$`);
            alt.emit("Client:ClothesShop:setClothes", 3, clothesShopTorsos[clothesShopTorsoIndex]
                .clothesDraw,
                clothesShopTorsos[clothesShopTorsoIndex].clothesTex);
            break;
    }
}

function ClothesShopSwitchRight(type) {
    switch (type) {
        case 1:
            clothesShopHatIndex++;
            if (clothesShopHatIndex > clothesShopHats.length - 1) clothesShopHatIndex = 0;
            $("#ClothesShop-HatText").html(
                `${clothesShopHats[clothesShopHatIndex].itemName} (${clothesShopHatIndex}/${clothesShopHats.length-1})`
            );
            $("#ClothesShop-HatPrice").html(`${clothesShopHats[clothesShopHatIndex].itemPrice}$`);
            alt.emit("Client:ClothesShop:setAccessory", 0, clothesShopHats[clothesShopHatIndex]
                .clothesDraw,
                clothesShopHats[clothesShopHatIndex].clothesTex);
            break;
        case 2:
            clothesShopMaskIndex++;
            if (clothesShopMaskIndex > clothesShopMasks.length - 1) clothesShopMaskIndex = 0;
            $("#ClothesShop-MaskText").html(
                `${clothesShopMasks[clothesShopMaskIndex].itemName} (${clothesShopMaskIndex}/${clothesShopMasks.length-1})`
            );
            $("#ClothesShop-MaskPrice").html(`${clothesShopMasks[clothesShopMaskIndex].itemPrice}$`);
            alt.emit("Client:ClothesShop:setClothes", 1, clothesShopMasks[clothesShopMaskIndex]
                .clothesDraw,
                clothesShopMasks[clothesShopMaskIndex].clothesTex);
            break;
        case 3:
            clothesShopGlassIndex++;
            if (clothesShopGlassIndex > clothesShopGlasses.length - 1) clothesShopGlassIndex = 0;
            $("#ClothesShop-GlassesText").html(
                `${clothesShopGlasses[clothesShopGlassIndex].itemName} (${clothesShopGlassIndex}/${clothesShopGlasses.length-1})`
            );
            $("#ClothesShop-GlassesPrice").html(
                `${clothesShopGlasses[clothesShopGlassIndex].itemPrice}$`);
            alt.emit("Client:ClothesShop:setAccessory", 1, clothesShopGlasses[clothesShopGlassIndex]
                .clothesDraw,
                clothesShopGlasses[clothesShopGlassIndex].clothesTex);
            break;
        case 4:
            clothesShopEarringIndex++;
            if (clothesShopEarringIndex > clothesShopEarrings.length - 1) clothesShopEarringIndex = 0;
            $("#ClothesShop-EarringText").html(
                `${clothesShopEarrings[clothesShopEarringIndex].itemName} (${clothesShopEarringIndex}/${clothesShopEarrings.length-1})`
            );
            $("#ClothesShop-EarringPrice").html(
                `${clothesShopEarrings[clothesShopEarringIndex].itemPrice}$`);
            alt.emit("Client:ClothesShop:setAccessory", 2, clothesShopEarrings[clothesShopEarringIndex]
                .clothesDraw,
                clothesShopEarrings[clothesShopEarringIndex].clothesTex);
            break;
        case 5:
            clothesShopNecklaceIndex++;
            if (clothesShopNecklaceIndex > clothesShopNecklaces.length - 1) clothesShopNecklaceIndex =
                0;
            $("#ClothesShop-NecklaceText").html(
                `${clothesShopNecklaces[clothesShopNecklaceIndex].itemName} (${clothesShopNecklaceIndex}/${clothesShopNecklaces.length-1})`
            );
            $("#ClothesShop-NecklacePrice").html(
                `${clothesShopNecklaces[clothesShopNecklaceIndex].itemPrice}$`);
            alt.emit("Client:ClothesShop:setClothes", 7, clothesShopNecklaces[clothesShopNecklaceIndex]
                .clothesDraw,
                clothesShopNecklaces[clothesShopNecklaceIndex].clothesTex);
            break;
        case 6:
            clothesShopTopIndex++;
            if (clothesShopTopIndex > clothesShopTops.length - 1) clothesShopTopIndex = 0;
            $("#ClothesShop-TopText").html(
                `${clothesShopTops[clothesShopTopIndex].itemName} (${clothesShopTopIndex}/${clothesShopTops.length-1})`
            );
            $("#ClothesShop-TopPrice").html(`${clothesShopTops[clothesShopTopIndex].itemPrice}$`);
            alt.emit("Client:ClothesShop:setClothes", 11, clothesShopTops[clothesShopTopIndex]
                .clothesDraw,
                clothesShopTops[clothesShopTopIndex].clothesTex);
            break;
        case 7:
            clothesShopVestIndex++;
            if (clothesShopVestIndex > clothesShopVests.length - 1) clothesShopVestIndex = 0;
            $("#ClothesShop-VestText").html(
                `${clothesShopVests[clothesShopVestIndex].itemName} (${clothesShopVestIndex}/${clothesShopVests.length-1})`
            );
            $("#ClothesShop-VestPrice").html(`${clothesShopVests[clothesShopVestIndex].itemPrice}$`);
            alt.emit("Client:ClothesShop:setClothes", 9, clothesShopVests[clothesShopVestIndex]
                .clothesDraw,
                clothesShopVests[clothesShopVestIndex].clothesTex);
            break;
        case 8:
            clothesShopPantsIndex++;
            if (clothesShopPantsIndex > clothesShopPants.length - 1) clothesShopPantsIndex = 0;
            $("#ClothesShop-PantsText").html(
                `${clothesShopPants[clothesShopPantsIndex].itemName} (${clothesShopPantsIndex}/${clothesShopPants.length-1})`
            );
            $("#ClothesShop-PantsPrice").html(`${clothesShopPants[clothesShopPantsIndex].itemPrice}$`);
            alt.emit("Client:ClothesShop:setClothes", 4, clothesShopPants[clothesShopPantsIndex]
                .clothesDraw,
                clothesShopPants[clothesShopPantsIndex].clothesTex);
            break;
        case 9:
            clothesShopShoesIndex++;
            if (clothesShopShoesIndex > clothesShopShoes.length - 1) clothesShopShoesIndex = 0;
            $("#ClothesShop-ShoeText").html(
                `${clothesShopShoes[clothesShopShoesIndex].itemName} (${clothesShopShoesIndex}/${clothesShopShoes.length-1})`
            );
            $("#ClothesShop-ShoePrice").html(`${clothesShopShoes[clothesShopShoesIndex].itemPrice}$`);
            alt.emit("Client:ClothesShop:setClothes", 6, clothesShopShoes[clothesShopShoesIndex]
                .clothesDraw,
                clothesShopShoes[clothesShopShoesIndex].clothesTex);
            break;
        case 10:
            clothesShopWatchIndex++;
            if (clothesShopWatchIndex > clothesShopWatches.length - 1) clothesShopWatchIndex = 0;
            $("#ClothesShop-WatchText").html(
                `${clothesShopWatches[clothesShopWatchIndex].itemName} (${clothesShopWatchIndex}/${clothesShopWatches.length-1})`
            );
            $("#ClothesShop-WatchPrice").html(
                `${clothesShopWatches[clothesShopWatchIndex].itemPrice}$`);
            alt.emit("Client:ClothesShop:setAccessory", 6, clothesShopWatches[clothesShopWatchIndex]
                .clothesDraw,
                clothesShopWatches[clothesShopWatchIndex].clothesTex);
            break;
        case 11:
            clothesShopBraceletIndex++;
            if (clothesShopBraceletIndex > clothesShopBracelets.length - 1) clothesShopBraceletIndex =
                0;
            $("#ClothesShop-BraceletText").html(
                `${clothesShopBracelets[clothesShopBraceletIndex].itemName} (${clothesShopBraceletIndex}/${clothesShopBracelets.length-1})`
            );
            $("#ClothesShop-BraceletPrice").html(
                `${clothesShopBracelets[clothesShopBraceletIndex].itemPrice}$`);
            alt.emit("Client:ClothesShop:setAccessory", 7, clothesShopBracelets[
                    clothesShopBraceletIndex]
                .clothesDraw, clothesShopBracelets[clothesShopBraceletIndex].clothesTex);
            break;
        case 12:
            clothesShopUndershirtIndex++;
            if (clothesShopUndershirtIndex > clothesShopUndershirts.length - 1)
                clothesShopUndershirtIndex = 0;
            $("#ClothesShop-UndershirtText").html(
                `${clothesShopUndershirts[clothesShopUndershirtIndex].itemName} (${clothesShopUndershirtIndex}/${clothesShopUndershirts.length-1})`
            );
            $("#ClothesShop-UndershirtPrice").html(
                `${clothesShopUndershirts[clothesShopUndershirtIndex].itemPrice}$`);
            alt.emit("Client:ClothesShop:setClothes", 8, clothesShopUndershirts[
                    clothesShopUndershirtIndex]
                .clothesDraw, clothesShopUndershirts[clothesShopUndershirtIndex].clothesTex);
            break;
        case 13:
            clothesShopTorsoIndex++;
            if (clothesShopTorsoIndex > clothesShopTorsos.length - 1) clothesShopTorsoIndex = 0;
            $("#ClothesShop-TorsoText").html(
                `${clothesShopTorsos[clothesShopTorsoIndex].itemName} (${clothesShopTorsoIndex}/${clothesShopTorsos.length-1})`
            );
            $("#ClothesShop-TorsoPrice").html(`${clothesShopTorsos[clothesShopTorsoIndex].itemPrice}$`);
            alt.emit("Client:ClothesShop:setClothes", 3, clothesShopTorsos[clothesShopTorsoIndex]
                .clothesDraw,
                clothesShopTorsos[clothesShopTorsoIndex].clothesTex);
            break;
    }
}

function ClothesShopBuyItem(type) {
    if (type == 0 || type == undefined) return;
    switch (type) {
        case 1:
            if (clothesShopHats.length < 1) return;
            alt.emit("Client:ClothesShop:buyItem", globalClothesShopId, clothesShopHats[
                    clothesShopHatIndex]
                .itemName);
            break;
        case 2:
            if (clothesShopMasks.length < 1) return;
            alt.emit("Client:ClothesShop:buyItem", globalClothesShopId, clothesShopMasks[
                    clothesShopMaskIndex]
                .itemName);
            break;
        case 3:
            if (clothesShopGlasses.length < 1) return;
            alt.emit("Client:ClothesShop:buyItem", globalClothesShopId, clothesShopGlasses[
                    clothesShopGlassIndex]
                .itemName);
            break;
        case 4:
            if (clothesShopEarrings.length < 1) return;
            alt.emit("Client:ClothesShop:buyItem", globalClothesShopId, clothesShopEarrings[
                    clothesShopEarringIndex]
                .itemName);
            break;
        case 5:
            if (clothesShopNecklaces.length < 1) return;
            alt.emit("Client:ClothesShop:buyItem", globalClothesShopId, clothesShopNecklaces[
                clothesShopNecklaceIndex].itemName);
            break;
        case 6:
            if (clothesShopTops.length < 1) return;
            alt.emit("Client:ClothesShop:buyItem", globalClothesShopId, clothesShopTops[
                    clothesShopTopIndex]
                .itemName);
            break;
        case 7:
            if (clothesShopVests.length < 1) return;
            alt.emit("Client:ClothesShop:buyItem", globalClothesShopId, clothesShopVests[
                    clothesShopVestIndex]
                .itemName);
            break;
        case 8:
            if (clothesShopPants.length < 1) return;
            alt.emit("Client:ClothesShop:buyItem", globalClothesShopId, clothesShopPants[
                    clothesShopPantsIndex]
                .itemName);
            break;
        case 9:
            if (clothesShopShoes.length < 1) return;
            alt.emit("Client:ClothesShop:buyItem", globalClothesShopId, clothesShopShoes[
                    clothesShopShoesIndex]
                .itemName);
            break;
        case 10:
            if (clothesShopWatches.length < 1) return;
            alt.emit("Client:ClothesShop:buyItem", globalClothesShopId, clothesShopWatches[
                    clothesShopWatchIndex]
                .itemName);
            break;
        case 11:
            if (clothesShopBracelets.length < 1) return;
            alt.emit("Client:ClothesShop:buyItem", globalClothesShopId, clothesShopBracelets[
                clothesShopBraceletIndex].itemName);
            break;
        case 12:
            if (clothesShopUndershirts.length < 1) return;
            alt.emit("Client:ClothesShop:buyItem", globalClothesShopId, clothesShopUndershirts[
                clothesShopUndershirtIndex].itemName);
            break;
        case 13:
            if (clothesShopTorsos.length < 1) return;
            alt.emit("Client:ClothesShop:buyItem", globalClothesShopId, clothesShopTorsos[
                    clothesShopTorsoIndex]
                .itemName);
            break;
    }
    closeClothesShopCEF();
}

function closeClothesShopCEF() {
    alt.emit("Client:ClothesShop:RequestCurrentSkin");
    $("#ClothesShopCEFBox").fadeOut(500, function () {
        $("#ClothesShopCEFBox").hide();
        clothesShopHats = [], clothesShopUndershirts = [], clothesShopMasks = [],
            clothesShopGlasses = [],
            clothesShopEarrings = [], clothesShopNecklaces = [], clothesShopTops = [],
            clothesShopVests = [], clothesShopPants = [], clothesShopShoes = [],
            clothesShopWatches = [],
            clothesShopBracelets = [], globalClothesShopId = undefined;
        clothesShopHatIndex = 0, clothesShopUndershirtIndex = 0, clothesShopMaskIndex = 0,
            clothesShopGlassIndex = 0, clothesShopEarringIndex = 0, clothesShopNecklaceIndex =
            0,
            clothesShopTopIndex = 0, clothesShopVestIndex = 0, clothesShopPantsIndex = 0,
            clothesShopShoesIndex = 0, clothesShopWatchIndex = 0, clothesShopBraceletIndex = 0;
    });
    alt.emit("Client:ClothesShop:destroyCEF");
    globalClothesShopArray = [];
}

function SetFuelstationListContent(fuelStationId, stationName, owner, maxFuelAmount, availableLiter,
    fuelArray,
    vehID) {
    var fuelstationHTML = "",
        fuelArray = JSON.parse(fuelArray),
        maxFuelAmount = parseInt(maxFuelAmount);

    for (var i in fuelArray) {
        if (fuelArray[i].fueltype == "Benzin")
            globalFuelstationBenzinPrice = fuelArray[i].fuelPrice;

        fuelstationHTML += "<li class='list-group-item' onclick='VehicleFuelStationFuelVehicle(" +
            vehID + ", " +
            fuelStationId + ", `" + fuelArray[i].fueltype + "`);'>" +
            `<img src='../utils/img/vehfuel.png'><p id='VehicleFuelStationCEFBox-${fuelArray[i].fueltype}Price'>${fuelArray[i].fueltype} tanken</p></li>`;
    }

    $("#VehicleFuelstationCEFBox-List").html(fuelstationHTML);
    $("#VehicleFuelstationCEFBox-stationName").html(`${stationName}`);
    $("#VehicleFuelstationCEFBox-ownerName").html(`${owner}`);
    $("#VehicleFuelstationCEFBox-availableLiter").html(`${availableLiter} Liter`);
    $("#VehicleFuelStationCEFBox-Out").html(`1`);
    $("#VehicleFuelStationCEFBox-LiterSlider").val(`1`);
    $("#VehicleFuelStationCEFBox-LiterSlider").attr({
        "max": maxFuelAmount,
        "min": 1
    });
    $("#VehicleFuelstationCEFBox").fadeTo(1000, 1, function () {});
}

function VehicleFuelStationFuelVehicle(vehID, fuelStationId, fueltype) {
    if (fuelStationId == 0 || fuelStationId == undefined || fueltype == "" || fueltype == undefined ||
        fueltype ==
        "undefined" || vehID == 0 || vehID == undefined || vehID == "undefined") return;
    var selectedLiterAmount = $("#VehicleFuelStationCEFBox-LiterSlider").val();
    var selectedLiterPrice = 0;
    if (fueltype == "Benzin") {
        selectedLiterPrice = globalFuelstationBenzinPrice;
    } else if (fueltype == "Diesel") {
        selectedLiterPrice = globalFuelstationDieselPrice;
    } else if (fueltype == "Strom") {
        selectedLiterPrice = globalFuelstationStromPrice;
    } else if (fueltype == "Kerosin") {
        selectedLiterPrice = globalFuelstationKerosinPrice;
    }

    alt.emit("Client:FuelStation:FuelVehicleAction", vehID, fuelStationId, fueltype,
        selectedLiterAmount,
        selectedLiterPrice);
    closeFuelstationCEF();
}

function VehicleFuelStationCEFBoxCalculatePrices() {
    var selectedLiterAmount = $("#VehicleFuelStationCEFBox-LiterSlider").val(),
        benzinPrice = selectedLiterAmount * globalFuelstationBenzinPrice,
        dieselPrice = selectedLiterAmount * globalFuelstationDieselPrice,
        stromPrice = selectedLiterAmount * globalFuelstationStromPrice,
        kerosinPrice = selectedLiterAmount * globalFuelstationKerosinPrice;

    if ($("#VehicleFuelStationCEFBox-BenzinPrice").length > 0) {
        $("#VehicleFuelStationCEFBox-BenzinPrice").html(`BENZIN TANKEN <br>(${benzinPrice}$)`);
    }

    if ($("#VehicleFuelStationCEFBox-DieselPrice").length > 0) {
        $("#VehicleFuelStationCEFBox-DieselPrice").html(`DIESEL TANKEN <br>(${dieselPrice}$)`);
    }

    if ($("#VehicleFuelStationCEFBox-StromPrice").length > 0) {
        $("#VehicleFuelStationCEFBox-StromPrice").html(`STROM TANKEN <br>(${stromPrice}$)`);
    }

    if ($("#VehicleFuelStationCEFBox-KerosinPrice").length > 0) {
        $("#VehicleFuelStationCEFBox-KerosinPrice").html(`KEROSIN TANKEN <br>(${kerosinPrice}$)`);
    }
}

function closeFuelstationCEF() {
    $("#VehicleFuelstationCEFBox").fadeOut(250, function () {});
    alt.emit("Client:FuelStation:destroyCEF");
}

$("#GivePlayerBillCEFBox-FinishBtn").click(function () {
    if (globalPlayerBillType != "faction" && globalPlayerBillType != "company") return;
    if (globalPlayerBillType == undefined || globalPlayerBillType == null) return;
    if (globalPlayerBilltargetCharId == undefined || globalPlayerBilltargetCharId == null ||
        globalPlayerBilltargetCharId <= 0) return;
    var selectedMoneyAmount = $("#GivePlayerBillCEFBox-AmountInput").val();
    var selectedReason = $("#GivePlayerBillCEFBox-ReasonInput").val().replace(/^\s+|\s+$/g, "");
    if (selectedReason.length <= 0) {
        return;
    }
    if (selectedMoneyAmount < 1 || selectedMoneyAmount == "") return;

    alt.emit("Client:GivePlayerBill:giveBill", globalPlayerBillType,
        globalPlayerBilltargetCharId,
        selectedReason, selectedMoneyAmount);
    closeGivePlayerBillCEFBox();
});

function closeGivePlayerBillCEFBox() {
    globalPlayerBillType = undefined;
    globalPlayerBilltargetCharId = undefined;
    $("#GivePlayerBillCEFBox").fadeOut(250, function () {});
    alt.emit("Client:GivePlayerBill:destroyCEF");
}

function RecievePlayerBillCEFBoxAction(action) {
    if (action != "bar" && action != "bank" && action != "decline") return;
    if (globalRecievePlayerBillType == undefined) return;
    if (globalRecievePlayerBillType != "faction" && globalRecievePlayerBillType != "company") return;
    if (globalRecievePlayerBillFactionCompanyId == undefined ||
        globalRecievePlayerBillFactionCompanyId <= 0)
        return;
    if (globalRecievePlayerBillAmount == undefined || globalRecievePlayerBillAmount <= 0) return;
    if (globalRecievePlayerBillReason == undefined || globalRecievePlayerBillReason == "") return;
    if (globalRecievePlayerBillFactionName == undefined || globalRecievePlayerBillFactionName == "")
        return;
    if (globalRecievePlayerBillGivenCharacterId == undefined ||
        globalRecievePlayerBillGivenCharacterId <= 0)
        return;
    alt.emit("Client:PlayerBill:BillAction", action, globalRecievePlayerBillType,
        globalRecievePlayerBillFactionCompanyId, globalRecievePlayerBillAmount,
        globalRecievePlayerBillReason,
        globalRecievePlayerBillGivenCharacterId);
    closeReviecePlayerBillCEFBox();
}

function closeReviecePlayerBillCEFBox() {
    globalRecievePlayerBillType = undefined;
    globalRecievePlayerBillFactionCompanyId = undefined;
    globalRecievePlayerBillAmount = undefined;
    globalRecievePlayerBillReason = undefined;
    globalRecievePlayerBillFactionName = undefined;
    globalRecievePlayerBillGivenCharacterId = undefined;
    $("#RecievePlayerBillCEFBox").fadeOut(250, function () {});
    alt.emit("Client:RecievePlayerBill:destroyCEF");
}

function closeFactionStorageCEFBox() {
    $("#FactionStorageCEFBox").fadeOut(250, function () {});
    alt.emit("Client:FactionStorage:destroyCEF");
}

function SetFactionStorageCEFBoxContent(charId, factionId, type, invArray, storageArray) {
    console.log("openStorage CEF");
    var invHTML = "",
        storageHTML = "",
        invArray = JSON.parse(invArray),
        storageArray = JSON.parse(storageArray);

    for (var i in invArray) {
        invHTML +=
            `<li class='list-group-item'><img src='../utils/img/inventory/${invArray[i].itemPicName}'><p class='name'><b>${invArray[i].itemName} (${invArray[i].itemAmount}x)</b></p><input type='number' placeholder='Anzahl' onkeypress='return event.charCode >= 48 && event.charCode <= 57'>` +
            "<button onclick='FactionStorageCEFAction(`storage`, " + factionId + ", " + charId + ", `" +
            type +
            "`, `" + invArray[i].itemLocation + "`, `" + invArray[i].itemName +
            "`, this);' type='button' class='btn btn-sm btn-primary'><i class='fas fa-check'></i></button></li>";
    }

    for (var i in storageArray) {
        storageHTML +=
            `<li class='list-group-item'><img src='../utils/img/inventory/${storageArray[i].itemPicName}'><p class='name'><b>${storageArray[i].itemName} (${storageArray[i].amount}x)</b></p><input type='number' placeholder='Anzahl' onkeypress='return event.charCode >= 48 && event.charCode <= 57'>` +
            "<button onclick='FactionStorageCEFAction(`take`, " + factionId + ", " + charId + ", `" +
            type +
            "`, `none`, `" + storageArray[i].itemName +
            "`, this);' type='button' class='btn btn-sm btn-primary'><i class='fas fa-check'></i></button></li>";
    }

    if (type == "faction") {
        $("#FactionStorageCEFBox-SpindTitle").html(`FRAKTIONSSPIND`);
    } else if (type == "hotel") {
        $("#FactionStorageCEFBox-SpindTitle").html(`LAGERPLATZ`);
    } else if (type == "house") {
        $("#FactionStorageCEFBox-SpindTitle").html(`HAUSLAGER`);
    }
    $("#FactionStorageCEFBox-InventoryList").html(invHTML);
    $("#FactionStorageCEFBox-StorageList").html(storageHTML);
    $("#FactionStorageCEFBox").fadeTo(1000, 1, function () {});
}

function FactionStorageCEFAction(action, factionId, charId, type, fromContainer, itemName, htmlElem) {
    if (factionId <= 0 || charId <= 0 || type == null || type == undefined || type == "" || htmlElem ==
        null ||
        itemName == undefined || itemName == "" || htmlElem == undefined) return;
    if (action != "take" && action != "storage") return;
    if (type != "hotel" && type != "faction" && type != "house") return;
    var inputElem = $(htmlElem).parent().find("input");
    var inputVal = $(inputElem).val();
    if (inputVal == "" || inputVal == "" || inputVal < 1) return;
    if (action == "storage" && fromContainer == undefined || action == "storage" && fromContainer ==
        "none") return;
    alt.emit("Client:FactionStorage:FactionStorageAction", action, factionId, charId, type, itemName,
        inputVal,
        fromContainer);
    closeFactionStorageCEFBox();
}

function SetVehicleTrunkCEFBoxContent(charId, vehId, type, invArray, storageArray) {
    var invHTML = "",
        storageHTML = "",
        invArray = JSON.parse(invArray),
        storageArray = JSON.parse(storageArray);

    for (var i in invArray) {
        invHTML +=
            `<li class='list-group-item'><img src='../utils/img/inventory/${invArray[i].itemPicName}'><p class='name'><b>${invArray[i].itemName} (${invArray[i].itemAmount}x)</b></p><input type='number' placeholder='Anzahl' onkeypress='return event.charCode >= 48 && event.charCode <= 57'>` +
            "<button onclick='VehicleTrunkCEFAction(`storage`, " + vehId + ", " + charId + ", `" +
            invArray[i]
            .itemLocation + "`, `" + invArray[i].itemName + "`, `" + type +
            "`,this);' type='button' class='btn btn-sm btn-primary'><i class='fas fa-check'></i></button></li>";
    }

    for (var i in storageArray) {
        storageHTML +=
            `<li class='list-group-item'><img src='../utils/img/inventory/${storageArray[i].itemPicName}'><p class='name'><b>${storageArray[i].itemName} (${storageArray[i].itemAmount}x)</b></p><input type='number' placeholder='Anzahl' onkeypress='return event.charCode >= 48 && event.charCode <= 57'>` +
            "<button onclick='VehicleTrunkCEFAction(`take`, " + vehId + ", " + charId + ", `none`, `" +
            storageArray[i].itemName + "`, `" + type +
            "`, this);' type='button' class='btn btn-sm btn-primary'><i class='fas fa-check'></i></button></li>";
    }

    var title = "FAHRZEUGLAGER";
    if (type == "trunk") {
        title = "KOFFERRAUM";
    } else if (type == "glovebox") {
        title = "HANDSCHUHFACH";
    }

    $("#VehicleTrunkCEFBox-SubTitle").html(title);
    $("#VehicleTrunkCEFBox-Title").html(title);
    $("#VehicleTrunkCEFBox-InventoryList").html(invHTML);
    $("#VehicleTrunkCEFBox-StorageList").html(storageHTML);
    $("#VehicleTrunkCEFBox").fadeTo(1000, 1, function () {});
}

function VehicleTrunkCEFAction(action, vehId, charId, fromContainer, itemName, type, htmlElem) {
    if (vehId <= 0 || charId <= 0 || htmlElem == null || htmlElem == undefined || itemName ==
        undefined ||
        itemName == "" || fromContainer == "" || type == undefined || type == null) return;
    if (action != "take" && action != "storage") return;
    if (type != "trunk" && type != "glovebox") return;
    var inputElem = $(htmlElem).parent().find("input");
    var inputVal = $(inputElem).val();
    if (inputVal == "" || inputVal < 1) return;
    if (action == "storage" && fromContainer == undefined || action == "storage" && fromContainer ==
        "none") return;
    alt.emit("Client:VehicleTrunk:VehicleTrunkAction", action, vehId, charId, itemName, inputVal,
        fromContainer,
        type);
    closeVehicleTrunkCEFBox();
}

function closeVehicleTrunkCEFBox() {
    $("#VehicleTrunkCEFBox").fadeOut(0, function () {});
    alt.emit("Client:VehicleTrunk:destroyCEF");
}

function SetPlayerSearchInventoryCEFBoxContent(targetCharId, invArray) {
    var searchHTML = "",
        invArray = JSON.parse(invArray);

    for (var i in invArray) {
        searchHTML +=
            `<li class='list-group-item'><img src='../utils/img/inventory/${invArray[i].itemPicName}'><p class='name'><b>${invArray[i].itemName} (${invArray[i].itemAmount}x)</b></p><input type='number' placeholder='Anzahl' onkeypress='return event.charCode >= 48 && event.charCode <= 57' value='1'>` +
            "<button onclick='PlayerSearchCEFAction(" + targetCharId + ", `" + invArray[i].itemName +
            "`, `" +
            invArray[i].itemLocation +
            "`, this);' type='button' class='btn btn-sm btn-primary'><i class='fas fa-times'></i></button></li>";
    }

    $("#PlayerSearchInventoryCEFBox-List").html(searchHTML);
    $("#PlayerSearchInventoryCEFBox").fadeTo(1000, 1, function () {});
}

function PlayerSearchCEFAction(targetCharId, itemName, itemLocation, htmlElem) {
    if (targetCharId <= 0 || itemName == undefined || itemName == "" || htmlElem == null || htmlElem ==
        undefined ||
        itemLocation == undefined || itemLocation == "") return;
    var inputElem = $(htmlElem).parent().find("input");
    var inputVal = $(inputElem).val();
    if (inputVal == "" || inputVal < 1) return;
    closePlayerSearchCEFBox();
    alt.emit("Client:PlayerSearch:TakeItem", targetCharId, itemName, itemLocation, inputVal);
}

function closePlayerSearchCEFBox() {
    $("#PlayerSearchInventoryCEFBox").fadeOut(250, function () {
        alt.emit("Client:PlayerSearch:destroyCEF");
    });
}


function SetVehicleLicensingCEFBoxContent(vehArray) {
    var licenseHTML = "",
        vehArray = JSON.parse(vehArray);

    for (var i in vehArray) {
        licenseHTML +=
            `<li class='list-group-item'><div class='container left'><p class='title'>FAHRZEUGNAME</p><p class='name'>${vehArray[i].vehName}</p></div>` +
            `<div class='container mid'><p class='title'>KENNZEICHEN</p><p class='name'>${vehArray[i].vehPlate}</p></div>` +
            `<div class='container right'><p class='title'>FAHRZEUG ANMELDEN?</p><input type='text' spellcheck='false' maxlength='8'>` +
            "<button type='button' onclick='VehicleLicensingCEFAction(`anmelden`, " + vehArray[i]
            .vehId + ", `" +
            vehArray[i].vehPlate +
            "`, this);' class='btn btn-sm btn-anmelden'><i class='fas fa-check'></i></button>" +
            "<button type='button' onclick='VehicleLicensingCEFAction(`abmelden`, " + vehArray[i]
            .vehId + ", `" +
            vehArray[i].vehPlate +
            "`, this);' class='btn btn-sm btn-abmelden'><i class='fas fa-times'></i></button></div></li>";
    }

    $("#VehicleLicensingCEFBox-List").html(licenseHTML);
    $("#VehicleLicensingCEFBox").fadeTo(1000, 1, function () {});
}

function encodeText(text) {
    let encodedMessage = "";
    let encodeIndex = 0;
    while (encodeIndex < text.length) {
        if (encodeIndex > 0) {
            encodedMessage += " ";
        }
        encodedMessage += text.charCodeAt(encodeIndex);
        encodeIndex++;
    }
    return encodedMessage;
}

function phoneDecodeText(encodedText) {
    let decodedArray;
    let decodedMessage = "";
    decodedArray = encodedText.split(" ");
    decodedArray.forEach(function (ascii) {
        decodedMessage += "&#" + ascii + ";"
    });
    decodedMessage = replaceEmotes(decodedMessage);
    if (decodedMessage.search("&") == -1) {
        decodedMessage = "<span data-emote='true'>" + decodedMessage + "</span>";
    }
    return decodedMessage;
}

function phoneDecodePre(encodedText) {
    let decodedArray,
        decodedMessage = "",
        decodeIndex = 0,
        criticalNumber = 25;
    decodedArray = encodedText.split(" ");
    decodedArray.forEach(function (ascii) {
        if (decodeIndex < criticalNumber) {
            decodedMessage += "&#" + ascii + ";";
        } else if (decodeIndex == criticalNumber) {
            decodedMessage += "...";
        }
        decodeIndex++;
    });
    decodedMessage = replaceEmotes(decodedMessage);
    return decodedMessage;
}

function replaceEmotes(s) {
    /* TBD move to arrays */
    s = s.replace(/&#58;&#41;/g, "<i class='far fa-smile emote'></i>"); /*:)*/
    s = s.replace(/&#58;&#68;/g, "<i class='far fa-laugh emote'></i>"); /*:D*/
    s = s.replace(/&#40;&#58;/g, "<i class='far fa-smile emote'></i>"); /*(:*/
    s = s.replace(/&#59;&#41;/g, "<i class='far fa-grin-wink emote'></i>"); /*;)*/
    s = s.replace(/&#60;&#51;/g, "<i class='far fa-heart' style='color: #c90a0a'></i>"); /*<3*/
    s = s.replace(/&#58;&#42;/g, "<i class='far fa-kiss emote'></i>"); /*:**/
    s = s.replace(/&#21325;/g,
        "<i class='fad fa-angel' style='--fa-primary-color: lightgrey; --fa-secondary-color: orange;'></i>"
    );
    s = s.replace(/&#21328;/g,
        "<i class='fad fa-angel' style='--fa-primary-color: lightgrey; --fa-secondary-color: orange;'></i>"
    );
    s = s.replace(/&#58;&#119;&#101;&#101;&#100;&#58;/g,
        "<i class='fas fa-cannabis' style='color: #08c93c'></i>"); /*weed*/
    s = s.replace(/&#58;&#109;&#105;&#100;&#100;&#108;&#101;&#102;&#105;&#110;&#103;&#101;&#114;&#58;/g,
        "<i class='fal fa-hand-middle-finger' style='color: #d9b85d'></i>"); /*middlefinger*/
    s = s.replace(/&#58;&#99;&#104;&#97;&#105;&#114;&#58;/g,
        "<i class='fab fa-accessible-icon' style='color: #2a92e8'></i>"); /*chair*/
    s = s.replace(/&#58;&#119;&#97;&#114;&#110;&#58;/g,
        "<i class='fas fa-exclamation-triangle' style='color: #a80f0f'></i>"); /*warn*/
    s = s.replace(/&#58;&#97;&#110;&#103;&#114;&#121;&#58;/g,
        "<i class='far fa-angry emote'></i>"); /*angry*/
    s = s.replace(/&#58;&#100;&#105;&#122;&#122;&#121;&#58;/g,
        "<i class='far fa-dizzy emote'></i>"); /*dizzy*/
    s = s.replace(/&#58;&#102;&#108;&#117;&#115;&#104;&#101;&#100;&#58;/g,
        "<i class='far fa-flushed emote'></i>"); /*flushed*/
    s = s.replace(/&#58;&#102;&#114;&#111;&#119;&#110;&#58;/g,
        "<i class='far fa-frown emote'></i>"); /*frown*/
    s = s.replace(/&#58;&#103;&#114;&#105;&#110;&#58;/g, "<i class='far fa-grin emote'></i>"); /*grin*/
    s = s.replace(/&#58;&#108;&#111;&#118;&#101;&#58;/g,
        "<i class='far fa-grin-hearts emote'></i>"); /*love*/
    s = s.replace(/&#58;&#116;&#105;&#114;&#101;&#100;&#58;/g,
        "<i class='far fa-tired emote'></i>"); /*tired*/
    s = s.replace(/&#58;&#115;&#109;&#105;&#108;&#101;&#58;/g,
        "<i class='far fa-smile emote'></i>"); /*smile*/
    s = s.replace(/&#58;&#99;&#114;&#121;&#58;/g, "<i class='far fa-sad-cry emote'></i>"); /*cry*/
    s = s.replace(/&#58;&#109;&#101;&#104;&#58;/g, "<i class='far fa-meh emote'></i>"); /*meh*/
    s = s.replace(/&#58;&#107;&#105;&#115;&#115;&#58;/g,
        "<i class='far fa-kiss-beam emote'></i>"); /*kiss*/
    s = s.replace(/&#58;&#115;&#117;&#114;&#112;&#114;&#105;&#115;&#101;&#58;/g,
        "<i class='far fa-surprise emote'></i>"); /*surprise*/
    s = s.replace(/&#58;&#111;/g, "<i class='far fa-surprise emote'></i>"); /*:o*/
    s = s.replace(/&#58;&#99;&#97;&#114;&#100;&#58;/g,
        "<i class='fad fa-gem' style='--fa-primary-color: #1c8ad4; --fa-secondary-color: #25a1f5;'></i>"
    ); /*card*/
    s = s.replace(/&#58;&#104;&#101;&#97;&#114;&#116;&#58;/g,
        "<i class='far fa-heart' style='color: #c90a0a'></i>"); /*heart*/
    s = s.replace(/&#58;&#108;&#105;&#107;&#101;&#58;/g,
        "<i class='far fa-thumbs-up' style='color: #0a33c9'></i>"); /*like*/
    s = s.replace(/&#58;&#100;&#105;&#115;&#108;&#105;&#107;&#101;&#58;/g,
        "<i class='far fa-thumbs-down' style='color: #0a33c9'></i>"); /*dislike*/
    s = s.replace(/&#58;&#98;&#108;&#111;&#99;&#107;&#58;/g,
        "<i class='far fa-ban' style='color: #ff0011'></i>"); /*block*/
    s = s.replace(/&#58;&#101;&#121;&#101;&#58;/g,
        "<i class='far fa-eye' style='color: #758aff'></i>"); /*eye*/
    s = s.replace(/&#58;&#108;&#111;&#99;&#107;&#58;/g,
        "<i class='far fa-lock' style='color: #ffcb21'></i>"); /*lock*/
    s = s.replace(/&#58;&#115;&#99;&#104;&#108;&#111;&#115;&#115;&#58;/g,
        "<i class='fad fa-lock' style='--fa-primary-color: #ffcb21; --fa-secondary-color: #919191;'></i>"
    ); /*schloss*/
    s = s.replace(/&#58;&#98;&#97;&#116;&#58;/g,
        "<i class='far fa-bat' style='color: #000000'></i>"); /*bat*/
    s = s.replace(/&#58;&#100;&#111;&#103;&#58;/g,
        "<i class='fal fa-dog' style='color: #755d3f'></i>"); /*dog*/
    s = s.replace(/&#58;&#100;&#111;&#118;&#101;&#58;/g,
        "<i class='far fa-dove' style='color: #2ba9bd'></i>"); /*dove*/
    s = s.replace(/&#58;&#102;&#114;&#111;&#103;&#58;/g,
        "<i class='far fa-frog' style='color: #086610'></i>"); /*frog*/
    s = s.replace(/&#58;&#109;&#111;&#110;&#107;&#101;&#121;&#58;/g,
        "<i class='far fa-monkey' style='color: #755d3f'></i>"); /*monkey*/
    s = s.replace(/&#58;&#102;&#105;&#115;&#104;&#58;/g,
        "<i class='fas fa-fish' style='color: #0a33c9'></i>"); /*fish*/
    s = s.replace(/&#58;&#112;&#105;&#103;&#58;/g,
        "<i class='far fa-pig' style='color: #eda4e5'></i>"); /*pig*/
    s = s.replace(/&#58;&#115;&#112;&#105;&#100;&#101;&#114;&#58;/g,
        "<i class='far fa-spider' style='color: #000000'></i>"); /*spider*/
    s = s.replace(/&#58;&#119;&#104;&#97;&#108;&#101;&#58;/g,
        "<i class='far fa-whale' style='color: #1476cc'></i>"); /*whale*/
    s = s.replace(/&#58;&#116;&#117;&#114;&#116;&#108;&#101;&#58;/g,
        "<i class='fad fa-turtle' style='--fa-primary-color: #448c41; --fa-secondary-color: #857058;'></i>"
    ); /*turtle*/
    s = s.replace(/&#58;&#109;&#101;&#100;&#105;&#99;&#58;/g,
        "<i class='fal fa-ambulance' style='color: #a11216'></i>"); /*medic*/
    s = s.replace(/&#58;&#112;&#105;&#108;&#108;&#115;&#58;/g,
        "<i class='fal fa-pills' style='color: #a6a6a6'></i>"); /*pills*/
    s = s.replace(/&#58;&#112;&#111;&#111;&#112;&#58;/g,
        "<i class='fal fa-poop' style='color: #754e34'></i>"); /*poop*/
    s = s.replace(/&#58;&#110;&#111;&#97;&#104;&#58;/g,
        "<i class='fad fa-bed' style='--fa-primary-color: #754e34; --fa-secondary-color: #4625e8;'></i>"
    ); /*noah*/
    s = s.replace(/&#58;&#115;&#108;&#101;&#101;&#112;&#58;/g,
        "<i class='fad fa-bed' style='--fa-primary-color: #754e34; --fa-secondary-color: #4625e8;'></i>"
    ); /*sleep*/
    return s;
}

function addChatEmote(str) {
    document.getElementById("phone-chat-input").value += str;
}

let globalChatsArray = [],
    globalChatMessagesArray = [],
    globalContactsArray = [];

function SmartphoneAddChatJSONs(items) {
    items = JSON.parse(items);
    for (var i in items) {
        globalChatsArray.push(items[i]);
    }
}

function SmartphoneSetAllChats() {
    let html = "";
    if (phoneFlightmode) {
        html += "<div id='phone-chat-main-info' class='text-center'" +
            "<p>Messenger kann derzeit keine Verbindung zum Server herstellen</p>" +
            "<span><i class='fas fa-spinner fa-3x fa-spin'></i></span>" +
            "</div>";
    } else {
        let chatTo = "",
            unixToLatestVal = "";
        for (var i in globalChatsArray) {
            if (globalChatsArray[i].to == userPhoneNumber) chatTo = globalChatsArray[i].from;
            else chatTo = globalChatsArray[i].to;

            if (globalChatsArray[i].unix == 0 || globalChatsArray[i].unix == undefined ||
                globalChatsArray[i]
                .unix == "") unixToLatestVal =
                '<span class="badge badge-success text-white"><i class="fas fa-plus"></i></span>';
            else unixToLatestVal = unixToLatest(globalChatsArray[i].unix, null);

            html += '<div class="phone-sms-chat-pre waves-effect" data-chatid="' + chatTo +
                '" onClick="phoneOpenChat(' + globalChatsArray[i].chatId + ', ' + chatTo + ');">' +
                '<div class="phone-sms-chat-pre-upper">' +
                '<div class="phone-sms-chat-pre-name">' +
                getNameOrNumber(chatTo) +
                '</div><div class="phone-sms-chat-pre-time" data-value="' + globalChatsArray[i].unix +
                '">' +
                unixToLatestVal + '</div></div>' +
                '<div class="phone-sms-chat-pre-lower">' +
                '<div class="phone-sms-chat-pre-text">';
            if (globalChatsArray[i].text == undefined || globalChatsArray[i].text == "" ||
                globalChatsArray[i]
                .text == " ") {
                html += "Dieser Chat ist leer.";
            } else {
                html += phoneDecodePre(globalChatsArray[i].text);
            }
            html +=
                '</div><div class="phone-sms-chat-pre-alert"><span class="badge badge-pill badge-danger phone-app-chat-alert"></span></div></div>' +
                '</div><hr class="phone-sms-chat-divider"/>';
        }

        if (html == "" || html == "[]") {
            html = "";
            html += "<div id='phone-chat-main-info' class='text-center'" +
                "<p>Du hast derzeit keine Nachrichten</p>" +
                "<span><i class='fas fa-alien-monster'> </i></span>" +
                "</div>";
        }
    }
    $("#phone-sms-home-chats").html(html);
}

function loadMessagesMain() {
    globalChatsArray = [];
    alt.emit("Client:Smartphone:requestChats");
}

function SmartphoneSetAllMessages() {
    let html = "",
        floatTyp = "",
        date,
        lastDate;
    for (var i in globalChatMessagesArray) {
        if (globalChatMessagesArray[i].from == userPhoneNumber) floatTyp = "me";
        else floatTyp = "other";
        date = new Date(globalChatMessagesArray[i].unix * 1000);
        date = Math.floor(date.getTime() / (1000 * 60 * 60 * 24));
        if (date != lastDate) {
            html +=
                `<div class="phone-chat-info-sm">${unixToLatest(globalChatMessagesArray[i].unix, "day")}</div>`;
        }
        lastDate = date;
        html += '<div class="phone-chat-box phone-chat-' + floatTyp + '">' +
            phoneDecodeText(globalChatMessagesArray[i].text) +
            '<span class="phone-chat-time" data-unix=' +
            globalChatMessagesArray[i].unix + '>' + unixToTime(globalChatMessagesArray[i].unix) +
            '</span></div>';
    }

    if (html == "" || html == "[]") html =
        '<div class="phone-chat-info">Dieser Chat ist noch leer. Brich doch das Eis und sag Hallo!</div>';

    $("#phone-chat-display").html(html);
    parseEmotes();
    forceChatViewToBottom();
    globalChatsArray = [];
}

function SmartphoneAddMessageJSONs(items) {
    items = JSON.parse(items);
    for (var i in items) {
        globalChatMessagesArray.push(items[i]);
    }
}

function loadTextMessages(chatId) {
    globalChatMessagesArray = [];
    alt.emit("Client:Smartphone:requestChatMessages", chatId);
}

function phoneOpenAddress(id) {
    updateAddressWindow(id);
    $("#phone-address-carousel").carousel(1);
}

function getTargetAddressNumber() {
    return document.getElementById("phone-address-number").dataset.target;
}

function phoneNewAddress() {
    $("#phone-address-carousel").carousel(2);
    document.getElementById("phone-address-addOrEdit").dataset.target = null;
    document.getElementById("phone-address-aoe-header").innerHTML = "Neuer Kontakt";
    document.getElementById("phone-address-aoe-name").value = null;
    document.getElementById("phone-address-aoe-number").value = null;
    document.getElementById("phone-address-aoe-namelabel").classList.remove("active");
    document.getElementById("phone-address-aoe-numlabel").classList.remove("active");
}

function phoneCallAddress() {
    phoneCall(getTargetAddressNumber());
}

function phoneMessageAddress() {
    $("#phone-screen-address").hide();
    $("#phone-screen-sms").show();
    phoneNewChat(getTargetAddressNumber());
}

function phoneEditAddress() {
    $("#phone-address-carousel").carousel(2);
    let json = getAddressData(document.getElementById("phone-address-view").dataset.id, null);
    document.getElementById("phone-address-aoe-header").innerHTML = "Kontakt bearbeiten";
    document.getElementById("phone-address-aoe-name").value = json.name;
    document.getElementById("phone-address-aoe-number").value = json.number;
    document.getElementById("phone-address-addOrEdit").dataset.target = json.id;
    document.getElementById("phone-address-aoe-namelabel").classList.add("active");
    document.getElementById("phone-address-aoe-numlabel").classList.add("active");
}

function SmartphoneAddContactJSONs(items) {
    items = JSON.parse(items);
    for (var i in items) {
        globalContactsArray.push(items[i]);
    }
}

function SmartphoneSetAllContacts() {
    let html = "";
    for (var i in globalContactsArray) {
        html += '<div class="phone-address-item waves-effect" data-addressid="' + globalContactsArray[i]
            .contactId +
            '" data-phonenumber="' + globalContactsArray[i].contactNumber +
            '" onclick="phoneOpenAddress(' +
            globalContactsArray[i].contactId + ')">' +
            '<div class="phone-address-nickname">' + globalContactsArray[i].contactName + '</div>' +
            '<div class="phone-address-phonenumber">' + globalContactsArray[i].contactNumber +
            '</div></div>';
    }
    globalContactsArray = [];
    $("#phone-address-list").html(html);
    phoneSmsSyncAddresses();
}

function phoneAddressRefresh() {
    globalContactsArray = [];
    alt.emit("Client:Smartphone:requestPhoneContacts");
}

function phoneDeleteAddress() {
    let id = document.getElementById("phone-address-view").dataset.id;
    if (id <= 0) return;
    alt.emit("Client:Smartphone:deleteContact", id);
    $("#phone-address-carousel").carousel(0);
}

function phoneAddressSubmit() {
    let name = document.getElementById("phone-address-aoe-name").value,
        number = parseInt(document.getElementById("phone-address-aoe-number").value),
        id = document.getElementById("phone-address-addOrEdit").dataset.target;
    if (id == null || id == "null") {
        if (name != "" && number != "NaN") {
            alt.emit("Client:Smartphone:addNewContact", name, number);
        } else {
            showPhoneNotification("Der Kontakt konnte nicht erstellt werden", "address", null, "error");
        }
        $("#phone-address-carousel").carousel(0);
    } else {
        if (name != "" && number != "NaN") {
            alt.emit("Client:Smartphone:editContact", id, name, number);
        } else {
            showPhoneNotification("Der Kontakt konnte nicht erstellt werden", "address", null, "error");
        }
        $("#phone-address-carousel").carousel(0);
    }
    document.getElementById("phone-address-aoe-name").value = null;
    document.getElementById("phone-address-aoe-number").value = null;
}

function phoneSmsSyncAddresses() {
    let nodelist = document.getElementById("phone-address-list").querySelectorAll(
            '.phone-address-item'),
        id,
        json,
        html = "";
    [].forEach.call(nodelist, function (node) {
        id = node.dataset.addressid;
        json = getAddressData(id, null);
        html += '<div class="phone-messenger-row waves-effect" onClick="phoneNewChat(' + json
            .number +
            ')">' + json.name + '</div>';
    });
    document.getElementById("phone-messenger-contacts").innerHTML = html;
}

function updateAddressWindow(id) {
    let json = getAddressData(id, null);
    $("#phone-address-number").html(json.number);
    document.getElementById("phone-address-number").dataset.target = json.number;
    $("#phone-address-name").html(json.name);
    document.getElementById("phone-address-view").dataset.id = json.id;
}

function getNameOrNumber(number) {
    let address = getAddressData(null, number);
    if (address.name == null) {
        return number;
    } else {
        return address.name;
    }
}

function policeAppQuery() {
    let input = document.getElementById("police-app-query-input"),
        query = input.value;
    LSPDIntranetLastQuery = query;
    input.value = "";
    alt.emit("Client:Smartphone:SearchLSPDIntranetPeople", `${query}`);
}

function SetLSPDIntranetSearchedPeople(searchedPersonsJSON) {
    let html = "";
    searchedPersonsJSON = JSON.parse(searchedPersonsJSON);
    $("#police-querylist-header").html("<b>" + searchedPersonsJSON.length +
        "</b> Ergebnisse für <b>\"" +
        LSPDIntranetLastQuery + "\"");
    for (var i in searchedPersonsJSON) {
        html += "<button class='btn btn-elegant' data-charid='" + searchedPersonsJSON[i].charId +
            "' data-charname='" + searchedPersonsJSON[i].charname + "' onclick='policeAppOpenWanteds(" +
            searchedPersonsJSON[i].charId + ", `" + searchedPersonsJSON[i].charname + "`);'>" +
            searchedPersonsJSON[
                i].charname + "</button>";
    }

    $("#phone-police-querylist-main").html(html);
    policeAppToQuerylist();
}

function policeAppToHome() {
    $("#phone-police-main").show();
    $("#phone-police-querylist").hide();
    $("#phone-police-wanteds").hide();
    $("#phone-police-mostwanted").hide();
    $("#phone-police-addwanteds").hide();
}

function policeAppToQuerylist() {
    $("#phone-police-main").hide();
    $("#phone-police-querylist").show();
    $("#phone-police-wanteds").hide();
    $("#phone-police-mostwanted").hide();
    $("#phone-police-addwanteds").hide();
}

function policeAppOpenWanteds(charId, charname) {
    $("#phone-police-querylist").hide();
    $("#phone-police-mostwanted").hide();
    $("#phone-police-wanteds").show();
    LSPDIntranetSelectedPerson = charId;
    $("#phone-police-wanteds-header").html(`${charname}`);
    alt.emit("Client:Smartphone:requestLSPDIntranetPersonWanteds", charId)
}

function requestPoliceAppMostWanteds() {
    alt.emit("Client:Smartphone:requestPoliceAppMostWanteds");
}

function setPoliceAppMostWanteds(mostWantedJSON) {
    let html = "";
    mostWantedJSON = JSON.parse(mostWantedJSON);

    for (var i in mostWantedJSON) {
        html += "<button class='btn btn-elegant' onclick='locateMostWanted(`" + mostWantedJSON[i].posX +
            "`, `" +
            mostWantedJSON[i].posY +
            "`)'><div class='d-inline'><i class='fas fa-map-marker-alt'></i></div> " +
            mostWantedJSON[i].description + "</button>"
    }

    $("#phone-police-mostwanted-main").html(html);
    policeAppToMostwanted();
}

function locateMostWanted(posX, posY) {
    alt.emit("Client:Smartphone:locateMostWanted", posX, posY);
}

function policeAppToMostwanted() {
    $("#phone-police-main").hide();
    $("#phone-police-querylist").hide();
    $("#phone-police-wanteds").hide();
    $("#phone-police-mostwanted").show();
    $("#phone-police-addwanteds").hide();
}

function setLSPDIntranetPersonWanteds(wantedJSON) {
    let currentJailtime = 0,
        currentTicketfine = 0;
    wantedJSON = JSON.parse(wantedJSON);
    $("#phone-police-wanteds-list").html("");
    if (wantedJSON.length <= 0) {
        $("#phone-police-wanteds-list").html(
            "<div class='wanted-entry btn'>Für diesen Bürger liegen keine Delikte vor.</div>");
        return;
    }
    for (var i in wantedJSON) {
        parseWanteds(wantedJSON[i].id, wantedJSON[i].wantedId, wantedJSON[i].givenString);
        currentJailtime = currentJailtime + getJailTimeFor(wantedJSON[i].wantedId);
        currentTicketfine = currentTicketfine + getTicketfineFor(wantedJSON[i].wantedId);
    }
    $("#phone-police-wanteds-total").data("ticketfine", currentTicketfine);
    $("#phone-police-wanteds-total").data("jailtime", currentJailtime);
    syncPenalty();
}

function syncPenalty() {
    let currentTicketfine = $("#phone-police-wanteds-total").data("ticketfine"),
        currentJailtime = $("#phone-police-wanteds-total").data("jailtime");
    $("#phone-police-wanteds-total").html("<b>Ticketstrafen:</b> " + currentTicketfine +
        "$ <b>Hafteinheiten:</b> " + currentJailtime);
}

function getJailTimeFor(wantedid) {
    let nodelist = document.getElementById("phone-police-addwanteds-stgb").querySelectorAll(
            "button[data-wantedid='" + wantedid + "']"),
        jailtime;
    [].forEach.call(nodelist, function (node) {
        jailtime = parseInt(node.dataset.jailtime);
    });
    return jailtime;
}

function getTicketfineFor(wantedid) {
    let nodelist = document.getElementById("phone-police-addwanteds-stgb").querySelectorAll(
            "button[data-wantedid='" + wantedid + "']"),
        ticketfine;
    [].forEach.call(nodelist, function (node) {
        ticketfine = parseInt(node.dataset.ticketfine);
    });
    return ticketfine;
}

function VehicleLicensingCEFAction(action, vehId, vehPlate, htmlElem) {
    if (vehId <= 0 || vehPlate == "" || htmlElem == undefined || vehPlate == undefined || vehId ==
        undefined ||
        action == undefined || action == "") return;
    if (action != "anmelden" && action != "abmelden") return;
    var inputElem = $(htmlElem).parent().find("input");
    var inputVal = $(inputElem).val().replace(/^\s+|\s+$/g, "");
    closeVehicleLicensingCEFBox();
    if (action == "anmelden") {
        if (inputVal == "" || inputVal.length <= 0) return;
        var newPlate = inputVal.replace(" ", "-");
        alt.emit("Client:VehicleLicensing:LicensingAction", action, vehId, vehPlate, newPlate
            .toUpperCase());
    } else if (action == "abmelden") {
        alt.emit("Client:VehicleLicensing:LicensingAction", action, vehId, vehPlate, "");
    }
}

function closeVehicleLicensingCEFBox() {
    $("#VehicleLicensingCEFBox").fadeOut(250, function () {
        alt.emit("Client:VehicleLicensing:destroyCEF");
    });
}

function SetGivePlayerLicenseCEFContent(targetCharId, licArray) {
    var licHTML = "",
        licArray = JSON.parse(licArray);

    for (var i in licArray) {
        if (!licArray[i].PKW) {
            licHTML +=
                `<li class='list-group-item' onclick='GivePlayerLicenseCEFAction(${targetCharId}, "pkw");'><img src='../utils/img/inventory/Führerschein_Klasse_B.png'><p>PKW Führerschein (${licArray[i].PKWPrice}$)</p></li>`;
        }

        if (!licArray[i].LKW) {
            licHTML +=
                `<li class='list-group-item' onclick='GivePlayerLicenseCEFAction(${targetCharId}, "lkw");'><img src='../utils/img/inventory/Führerschein_Klasse_C.png'><p>LKW Führerschein (${licArray[i].LKWPrice}$)</p></li>`;
        }

        if (!licArray[i].Bike) {
            licHTML +=
                `<li class='list-group-item'onclick='GivePlayerLicenseCEFAction(${targetCharId}, "bike");'><img src='../utils/img/inventory/Führerschein_Klasse_A.png'><p>Motorrad Führerschein (${licArray[i].BikePrice}$)</p></li>`;
        }

        if (!licArray[i].Boat) {
            licHTML +=
                `<li class='list-group-item' onclick='GivePlayerLicenseCEFAction(${targetCharId}, "boat");'><img src='../utils/img/inventory/Bootsschein.png'><p>Bootsschein (${licArray[i].BoatPrice}$)</p></li>`;
        }

        if (!licArray[i].Fly) {
            licHTML +=
                `<li class='list-group-item' onclick='GivePlayerLicenseCEFAction(${targetCharId}, "fly");'><img src='../utils/img/inventory/Bootsschein.png'><p>Flugschein (${licArray[i].FlyPrice}$)</p></li>`;
        }

        if (!licArray[i].Helicopter) {
            licHTML +=
                `<li class='list-group-item' onclick='GivePlayerLicenseCEFAction(${targetCharId}, "helicopter");'><img src='../utils/img/inventory/Helikopterschein.png'><p>Helikopterschein (${licArray[i].HelicopterPrice}$)</p></li>`;
        }

        if (!licArray[i].PassengerTransport) {
            licHTML +=
                `<li class='list-group-item' onclick='GivePlayerLicenseCEFAction(${targetCharId}, "passengertransport");'><img src='../utils/img/inventory/Personenbeförderungsschein.png'><p>Personenbeförderungsschein (${licArray[i].PassengerTransportPrice}$)</p></li>`;
        }
    }

    $("#GivePlayerLicenseCEFBox-List").html(licHTML);
    $("#GivePlayerLicenseCEFBox").fadeTo(1000, 1, function () {});
}

function GivePlayerLicenseCEFAction(targetCharId, licname) {
    if (targetCharId <= 0 || licname.length <= 0 || licname == "") return;
    closeGivePlayerLicenseCEFBox();
    alt.emit("Client:GivePlayerLicense:GiveLicense", targetCharId, licname);
}

function closeGivePlayerLicenseCEFBox() {
    $("#GivePlayerLicenseCEFBox").fadeOut(250, function () {
        alt.emit("Client:GivePlayerLicense:destroyCEF");
    });
}

function MinijobPilotCEFSelectJob(level) {
    if (level <= 0) return;
    closeMinijobPilotCEFBox();
    alt.emit("Client:MinijobPilot:SelectJob", level);
}

function closeMinijobPilotCEFBox() {
    $("#Minijob-PilotCEFBox").fadeOut(50, function () {
        alt.emit("Client:MinijobPilot:destroyCEF");
    });
}

function SetMinijobBusDriverListContent(routeArray) {
    var busHTML = "",
        routeArray = JSON.parse(routeArray);

    for (var i in routeArray) {
        busHTML +=
            `<div class='container' onclick='MinijobBusDriverStartRoute(${routeArray[i].routeId});'><img src='../../../../vehicles/vehicles/${routeArray[i].hash}.png'><p class='title'>${routeArray[i].routeName}</p><p class='subtitle'>Geschätzte Fahrtdauer: <font>${routeArray[i].neededTime}</font></p>` +
            `<p class='subtitle'>Entlohnung: <font>${routeArray[i].paycheck}$</font></p></div>`;
    }
    $("#Minijob-BusDriverCEFBox-List").html(busHTML);
    $("#Minijob-BusDriverCEFBox").fadeTo(1000, 1, function () {});
}

function MinijobBusDriverStartRoute(routeId) {
    if (routeId <= 0) return;
    closeMinijobBusDriverCEFBox();
    alt.emit("Client:MinijobBusdriver:StartJob", routeId);
}

function closeMinijobBusDriverCEFBox() {
    $("#Minijob-BusDriverCEFBox").fadeOut(50, function () {
        alt.emit("Client:MinijobBusdriver:destroyCEF");
    });
}

function openDeathscreenCEF() {
    $("#Deathscreen-Box").fadeTo(100, 1, function () {});
}

function closeDeathscreen() {
    $("#Deathscreen-Box").fadeOut(50, function () {
        alt.emit("Client:Deathscreen:destroyCEF");
    });
}

function parseWanteds(dbid, wantedid, string) {
    let html,
        nodelist = document.getElementById("phone-police-addwanteds-stgb").querySelectorAll(
            "button[data-wantedid='" + wantedid + "']");
    [].forEach.call(nodelist, function (node) {
        html = '<div class="wanted-entry btn" data-toggle="tooltip" data-entry="' + dbid +
            '" data-placement="bottom" title="Erstellt am ' + string + '">' + node.innerHTML +
            '<span class="close" onclick="policeAppDeleteWanted(' + dbid + ', ' +
            LSPDIntranetSelectedPerson + ')"><i class="far fa-times-circle"></i></span>' +
            '</div>';
    });
    $("#phone-police-wanteds-list").append(html);
}

function policeAppAddWanted() {
    $("#phone-police-wanteds").hide();
    $("#phone-police-addwanteds").show();
}

function policeAppToWanteds() {
    $("#phone-police-addwanteds").hide();
    $("#phone-police-wanteds").show();
}

function phonePoliceAddParagraph(value) {
    let input = document.getElementById("phone-police-addwanteds-json"),
        array = [];
    input.value != "" ? array = JSON.parse(input.value) : array;
    if (array.includes(value)) {
        array.splice(array.indexOf(value), 1);
    } else {
        array.push(value);
    }
    input.value = JSON.stringify(array);
    getParagraphDescriptions(array);
}

function getParagraphDescriptions(array) {
    let html = "",
        nodelist,
        target = document.getElementById("phone-police-addwanteds-active");
    if (array.length != 0) {
        array.forEach(function (paragraph) {
            nodelist = document.getElementById("phone-police-addwanteds-stgb").querySelectorAll(
                "button[data-paragraph='" + paragraph + "']");
            [].forEach.call(nodelist, function (node) {
                html += "<button class='btn' onclick='phonePoliceAddParagraph(" +
                    paragraph +
                    ")'>" + node.innerHTML + "</button>";
            });
        });
    } else {
        html = "<div class='text-center text-muted'>keine</div>";
    }
    target.innerHTML = html;
}

function policeAppSaveWanted() {
    let value = document.getElementById("phone-police-addwanteds-json").value,
        array = JSON.parse(value),
        ids = [],
        nodelist;
    if (array.length != 0) {
        array.forEach(function (paragraph) {
            nodelist = document.getElementById("phone-police-addwanteds-stgb").querySelectorAll(
                "button[data-paragraph='" + paragraph + "']");
            [].forEach.call(nodelist, function (node) {
                ids.push(node.dataset.wantedid);
            });
        });
    }
    ids = JSON.stringify(ids);
    if (LSPDIntranetSelectedPerson == null) return;
    alt.emit("Client:Smartphone:GiveLSPDIntranetWanteds", LSPDIntranetSelectedPerson, ids);
    policeAppToWanteds();
    policeAppClearWanteds();
}

function policeAppClearWanteds() {
    let array = [];
    document.getElementById("phone-police-addwanteds-json").value = array;
    getParagraphDescriptions(array);
    $('#phone-police-addwanteds-stgb').children(".collapse").collapse("hide");
}

function policeAppDeleteWanted(id, charid) {
    alt.emit("Client:Smartphone:DeleteLSPDIntranetWanted", id, charid);
    let currentJailtime = getJailTimeFor(id),
        currentTicketfine = getTicketfineFor(id);
    currentTicketfine = parseInt($("#phone-police-wanteds-total").data("ticketfine")) -
        currentTicketfine;
    currentJailtime = parseInt($("#phone-police-wanteds-total").data("jailtime")) - currentJailtime;
    $("#phone-police-wanteds-total").data("ticketfine", currentTicketfine);
    $("#phone-police-wanteds-total").data("jailtime", currentJailtime);
    syncPenalty();
}

function getAddressData(id, number) {
    let nodelist,
        name = null;
    if (id == null) {
        nodelist = document.getElementById("phone-address-list").querySelectorAll(
            "div[data-phonenumber='" +
            number + "']");
        [].forEach.call(nodelist, function (node) {
            id = node.dataset.addressid;
        });
    }
    nodelist = document.getElementById("phone-address-list").querySelectorAll("div[data-addressid='" +
        id + "']");
    [].forEach.call(nodelist, function (node) {
        [].forEach.call(node.querySelectorAll("div"), function (div) {
            if (div.classList.contains("phone-address-nickname")) {
                name = div.innerHTML;
            } else if (div.classList.contains("phone-address-phonenumber")) {
                number = div.innerHTML;
            }
        });
    });
    return {
        "id": id,
        "name": name,
        "number": number
    };
}

function unixToLatest(unix, type) {
    unix = unix * 1000;
    let date = new Date(unix),
        today = new Date(),
        str,
        dateDay = date.getDate(),
        dateMonth = date.getMonth(),
        todayDay = today.getDate(),
        todayMonth = today.getMonth();

    if (dateDay == todayDay && dateMonth == todayMonth) {
        if (type == null) {
            unix = unix / 1000;
            str = unixToTime(unix);
        } else if (type == "day") {
            str = "Heute";
        }
    } else {
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);

        let unixDate = date.getTime();
        let unixToday = today.getTime();
        let diffdays = (unixToday - unixDate) / (1000 * 60 * 60 * 24);

        if (diffdays == 1) {
            str = "Gestern";
        } else {
            dateMonth++;
            str = checkTime(dateDay) + "." + checkTime(dateMonth) + ".";
        }
    }
    return (str);
}

function unixToTime(unix) {
    let date = new Date(unix * 1000);
    hour = checkTime(date.getHours()),
        minute = checkTime(date.getMinutes());
    let str = hour + ":" + minute;
    return (str);
}

function SmartphoneReceiveTextMessage(chatId, phoneNumber, text) {
    loadMessagesMain();
    if (chatId != selectedChatId) {
        let address = getNameOrNumber(phoneNumber),
            str = `${address}: ${phoneDecodePre(text)}`;
        showPhoneNotification(str, "sms", "" + "forceOpenChat(" + chatId + ", " + phoneNumber + ");",
            "sms");
        [].forEach.call(document.getElementById("phone-sms-home-chats").querySelectorAll(
            "div[data-chatid='" +
            chatId + "']"), function (chat) {
            [].forEach.call(chat.querySelectorAll(".phone-app-chat-alert"), function (
                alertdiv) {
                alertdiv.innerHTML == 0 ? alertdiv.innerHTML = 1 : alertdiv.innerHTML =
                    parseInt(
                        alertdiv.innerHTML) + 1;
            });
        });
        checkChatAlerts();
        return;
    } else if (chatId == selectedChatId) {
        playPhoneAudio("../utils/sounds/phone/msg_get_silent.mp3");
    }
    loadTextMessages(chatId);
}

var phoneFlightmode = true;

function phoneSwapFlightmode() {
    var value = document.getElementById("phone-flightmode-switch").checked;
    if (value == true) {
        phoneFlightmodeOn(true);
    } else {
        phoneFlightmodeOff(true);
    }
}

function phoneFlightmodeOn(shouldBeSave) {
    clearTimeout(activePhoneFlightmodeTimeout);
    document.getElementById("phone-connection-str").innerHTML = "Flugmodus";
    document.getElementById("phone-connection-svg").innerHTML = "<i class=\"fad fa-wifi-slash\"></i>";
    if (phoneFlightmode != true) {
        phoneFlightmode = true;
        if (RadioEnabled == true) {
            phoneRadioLeaveFrequency();
            playRadioAudio();
        }
        phoneHangUp();
        if (shouldBeSave) alt.emit("Client:Smartphone:setFlyModeEnabled", true);
    }
}
let activePhoneFlightmodeTimeout = null;

function phoneFlightmodeOff(shouldBeSave) {
    document.getElementById("phone-connection-str").innerHTML =
        "Verbinden.. <i class=\"fas fa-spinner fa-spin\"></i>";
    document.getElementById("phone-connection-svg").innerHTML = "<i class=\"fad fa-ban\"></i>";
    activePhoneFlightmodeTimeout = setTimeout(function () {
        document.getElementById("phone-connection-str").innerHTML = "RP-95";
        document.getElementById("phone-connection-svg").innerHTML =
            "<i class=\"fad fa-wifi-1\"></i>";
        phoneFlightmode = false;
        swapPhoneFrequency();
        if (shouldBeSave) alt.emit("Client:Smartphone:setFlyModeEnabled", false);
        activePhoneFlightmodeTimeout = setTimeout(function () {
            document.getElementById("phone-connection-svg").innerHTML =
                "<i class=\"fad fa-wifi-2\"></i>";
            activePhoneFlightmodeTimeout = setTimeout(function () {
                document.getElementById("phone-connection-svg").innerHTML =
                    "<i class=\"fas fa-wifi\"></i>";
                activePhoneFlightmodeTimeout = null;
            }, Math.random() * 30000);
        }, Math.random() * 7000);
    }, Math.random() * 20000);
}
var phoneNodisturb = false;

function phoneSwapNodisturb() {
    let value = document.getElementById("phone-nodisturb-switch").checked;
    if (value == true) {
        phoneNodisturbOn();
    } else {
        phoneNodisturbOff();
    }
}

function phoneNodisturbOn() {
    phoneNodisturb = true;
    $("#phone-nodisturb").removeClass("d-none");
}

function phoneNodisturbOff() {
    phoneNodisturb = false;
    $("#phone-nodisturb").addClass("d-none");
}

function phoneShowCalling() {
    selectedChatId = 0;
    $("#phone-screen-calling").show();
    $("#phone-banner").slideUp();
    $('#phone-sms-home-carousel').carousel(0);
    $('#phone-sms-header-carousel').carousel(0);
}

function phoneDialDelete() {
    document.getElementById("phone-call-input").value = null;
}

function phoneDialAdd(value) {
    document.getElementById("phone-call-input").value += value;
}
var phoneActiveCall;
var PhoneCallTimer;


function phoneReceiveCall(number) {
    if (phoneActiveCall == null) {
        latestCall != null ? clearTimeout(latestCall) : latestCall;
        $("#phoneAcceptCall").show();
        allowChatKeyUp = false;
        if (isNaN(parseInt(number)) != true) {
            phoneActiveCall = parseInt(number);
            phoneParseCall(phoneActiveCall);
            let display = document.getElementById("phone-calling-display"),
                activetime = document.getElementById("phone-calling-activetime"),
                banner = document.getElementById("phone-banner"),
                address = getAddressData(null, phoneActiveCall);
            startPhoneAudioLoop("../utils/sounds/phone/ring.wav");
            if (address.name == null) {
                display.innerHTML = phoneActiveCall;
                banner.innerHTML = "Eingehender Anruf " + phoneActiveCall;
            } else {
                display.innerHTML = address.name;
                banner.innerHTML = "Eingehender Anruf von " + address.name;
            }
            activetime.innerHTML = "Eingehender Anruf";
            $("#phone-screen-calling").show();
            selectedChatId = 0;
            $('#phone-sms-home-carousel').carousel(0);
            $('#phone-sms-header-carousel').carousel(0);
        }
    }
}

function toggleRadio(shouldBeActivated) {
    if (shouldBeActivated == true && RadioEnabled == false) {
        RadioEnabled = true;
        swapPhoneFrequency();
    } else if (shouldBeActivated == false && RadioEnabled == true) {
        RadioEnabled = false;
        phoneRadioLeaveFrequency();
        clearTimeout(RadioTimeout);
        stopRadioAudioLoop();
    }
}

function phoneRadioJoinFrequency() {
    value = parseInt(document.getElementById("phone-radio-frequency-slider").value);
    if (parseFloat(value / 1000) == document.getElementById("phone-radio-frequency-number").value) {
        console.log("Funkfrequenz")
        console.log(value + " kHz");
        activeRadioFreq = value;
        joinFrequency(value);
        value = parseFloat(value / 1000);
        console.log(value + " MHz");
        stopRadioAudioLoop();
        playPhoneAudio("../utils/sounds/phone/radio_join.wav");
        document.getElementById("phone-radio-frequency-diode").classList.add("active");
    } else {
        value = parseFloat(document.getElementById("phone-radio-frequency-number").value).toFixed(2) *
            1000;
        let floored = Math.floor(value / 1000);
        if (permittedFrequencies.includes(floored)) {
            console.log("Funkfrequenz")
            console.log(value + " kHz");
            activeRadioFreq = value;
            joinFrequency(value);
            value = parseFloat(value / 1000);
            console.log(value + " MHz");
            stopRadioAudioLoop();
            playPhoneAudio("../utils/sounds/phone/radio_join.wav");
            document.getElementById("phone-radio-frequency-diode").classList.add("active");
        }
    }
}

function joinFrequency(frequence) {
    alt.emit("Client:Smartphone:joinRadioFrequence", `${frequence}`);
}

function leaveFrequency() {
    alt.emit("Client:Smartphone:leaveRadioFrequence");
}

function phoneRadioLeaveFrequency() {
    document.getElementById("phone-radio-frequency-diode").classList.remove("active");
    leaveFrequency();
    activeRadioFreq = null;
}

function phoneSwapRadio() {
    var value = document.getElementById("phone-radio-switch").checked;
    if (value == true) {
        toggleRadio(true);
    } else {
        toggleRadio(false);
    }
}

function stopRadioAudioLoop() {
    if (RadioAudioLoop != null) {
        setTimeout(function () {
            RadioAudioLoop.pause();
            RadioAudioLoop.loop = false;
            RadioAudioLoop = null;
        }, 100);
    }
}

function phoneChangeRadioLimits(min, max) {
    if (activeRadioFreq < min || activeRadioFreq > max) {
        phoneRadioLeaveFrequency();
        playRadioAudio();
    }
    RadioFreqMin = min;
    RadioFreqMax = max;
    phoneGenerateRadioSlider();
}

function phoneGenerateRadioSlider() {
    let slider = document.getElementById("phone-radio-frequency-slider"),
        datalist = document.getElementById("freqTickmarks"),
        html = "",
        totalFreq,
        deployFreq = 0,
        htmlFreq,
        dispLabel;
    setTimeout(() => {
        slider.max = RadioFreqMax;
        slider.min = RadioFreqMin;
        slider.step = RadioFreqSteps;
        totalFreq = parseInt((RadioFreqMax - RadioFreqMin) / RadioFreqSteps);
        slider.style.width = (RadioFreqSpacing * (RadioFreqSteps / RadioMarkSteps)) *
            totalFreq + "px";
        datalist.style.width = (RadioFreqSpacing * (RadioFreqSteps / RadioMarkSteps)) * (
                totalFreq + 1) +
            15 + "px";
        if (totalFreq > 0) {
            while (deployFreq <= totalFreq) {
                htmlFreq = RadioFreqMin + (deployFreq * RadioFreqSteps);
                if (htmlFreq % RadioLabelSteps == 0) {
                    dispLabel = parseFloat(htmlFreq / 1000);
                    html += "<option value='" + htmlFreq + "' label='" + dispLabel + "'>" +
                        dispLabel +
                        "</option>";
                } else {
                    if (htmlFreq % RadioMarkSteps == 0) {
                        html += "<option value='" + htmlFreq + "'></option>";
                    }
                }
                deployFreq++;
            }
        }
        document.getElementById("freqTickmarks").innerHTML = html;
    }, 300);
}

function swapPhoneFrequency() {
    if (RadioEnabled == true) {
        playRadioAudio();
        phoneRadioLeaveFrequency();
        if (phoneFlightmode == false) {
            RadioTimeout != null ? clearTimeout(RadioTimeout) : RadioTimeout;
            RadioTimeout = setTimeout(function () {
                RadioTimeout = null;
                phoneRadioJoinFrequency();
            }, Math.random() * 3000 + 2000);
        }
    }
}

function playRadioAudio() {
    if (RadioAudioLoop == null) {
        RadioAudioLoop = new Audio("../utils/sounds/phone/radio_noise.wav");
        RadioAudioLoop.loop = true;
        RadioAudioLoop.play();
    }
}

function phoneSyncRadioFrequencyWith(type) {
    let slider = document.getElementById("phone-radio-frequency-slider"),
        number = document.getElementById("phone-radio-frequency-number"),
        frame = document.getElementById("phone-radio-frequency-frame");
    if (type == "slider") {
        value = parseFloat(slider.value / 1000).toFixed(2);
        number.value = value;
    } else if (type == "number") {
        value = parseFloat(number.value).toFixed(2);
        value = value * 1000;
        slider.value = value;
        frame.scrollLeft = 32 - 0.5 * frame.offsetWidth + (((value - RadioFreqMin) / (RadioFreqMax -
            RadioFreqMin)) * slider.offsetWidth);
    }
    swapPhoneFrequency()
}

phoneGenerateRadioSlider();

function phoneAcceptCall() {
    let callto = phoneParseCall(null);
    phoneActiveCall = callto;
    selectedChatId = 0;
    alt.emit("Client:Smartphone:acceptCall");
}

function showIdentityCard(type, infoArray) {
    if (isPersoIdentityCardInUse || isPersoServiceCardInUse || infoArray == "[]" || infoArray ==
        undefined) return;
    if (type != "perso" && type != "faction") return;
    if (type == "perso") isPersoIdentityCardInUse = true;
    else if (type == "faction") isPersoServiceCardInUse = true;

    var persoHTML = "",
        infoArray = JSON.parse(infoArray),
        colorCode = "#fff";

    for (var i in infoArray) {
        if (type == "perso") {
            $("#UserIdCard-name").html(`${infoArray[i].charname}`);
            $("#UserIdCard-address").html(`${infoArray[i].address}`);
            $("#UserIdCard-birthdate").html(`${infoArray[i].birthdate}`);
            $("#UserIdCard-birthplace").html(`${infoArray[i].birthplace}`);
            $("#UserIdCard-signature").html(`${infoArray[i].charname}`);
            $("#UserIdCard-joinInfo").html(`${infoArray[i].firstJoin} (${infoArray[i].charId})`);

            $(function () {
                $("#UserIdCard").show();
                setTimeout(() => {
                    $("#UserIdCard").hide("slide", {
                        direction: "right"
                    }, 800);
                    isPersoIdentityCardInUse = false;
                }, 8000);
            });
        } else if (type == "faction") {
            $("#UserFactionCard-name").html(`${infoArray[i].charname}`);
            $("#UserFactionCard-birthdate").html(`${infoArray[i].birthdate}`);
            $("#UserFactionCard-rankname").html(`${infoArray[i].rankname}`);
            $("#UserFactionCard-serviceNumber").html(`${infoArray[i].servicenumber}`);
            $("#UserFactionCard-signature").html(`${infoArray[i].charname}`);
            $("#UserFactionCard-joinInfo").html(`${infoArray[i].firstJoin} (${infoArray[i].charId})`);
            $("#UserFactionCard").css("background-image",
                `url(../utils/img/${infoArray[i].factionShort}.png)`);
            $('.FactionCardColor').css('color', `#fff`);
            if (infoArray[i].factionShort == "LSPD") colorCode = "#3ea1e8";
            else if (infoArray[i].factionShort == "LSFD") colorCode = "#e83e3e";
            else if (infoArray[i].factionShort == "DOJ") colorCode = "#e88c3e";
            else if (infoArray[i].factionShort == "USMS") colorCode = "#94c27d";
            else if (infoArray[i].factionShort == "ACLS") {
                colorCode = "#555252";
                $("FactionCardColor").css("color", "#000");
            }

            $(".FactionCardTitleColor").css("color", `${colorCode}`);

            $(function () {
                $("#UserFactionCard").show();
                setTimeout(() => {
                    $("#UserFactionCard").hide("slide", {
                        direction: "right"
                    }, 800);
                    isPersoServiceCardInUse = false;
                }, 8000);
            });
        }
    }
}

var globalAnimArray = [];

function setAnimationMenuItems(array) {
    array = JSON.parse(array);
    for (var i in array) {
        globalAnimArray.push(array[i]);
    }
}

function setupAnimationMenu(favoriteArray) {
    var animHTML = "";
    for (var i in globalAnimArray) {
        animHTML +=
            `<li class='list-group-item'><span onclick='playAnimation("${globalAnimArray[i].animDict}", "${globalAnimArray[i].animName}", ${globalAnimArray[i].animFlag}, ${globalAnimArray[i].duration});'>${globalAnimArray[i].displayName}</span><button type='button' onclick='deleteAnimationHotkey(this);' class='btn btn-sm btn-danger'><i class='fas fa-trash'></i></button>` +
            `<button type='button' onclick='setAnimationHotkey(this, ${globalAnimArray[i].animId}, "${globalAnimArray[i].animName}", "${globalAnimArray[i].animDict}", ${globalAnimArray[i].animFlag}, ${globalAnimArray[i].duration});' class='btn btn-sm btn-success'><i class='fas fa-save'></i></button>`;
        var hotName = "unset";
        if (favoriteArray.Num1 == globalAnimArray[i].animId) hotName = "Num1";
        else if (favoriteArray.Num2 == globalAnimArray[i].animId) hotName = "Num2";
        else if (favoriteArray.Num3 == globalAnimArray[i].animId) hotName = "Num3";
        else if (favoriteArray.Num4 == globalAnimArray[i].animId) hotName = "Num4";
        else if (favoriteArray.Num5 == globalAnimArray[i].animId) hotName = "Num5";
        else if (favoriteArray.Num6 == globalAnimArray[i].animId) hotName = "Num6";
        else if (favoriteArray.Num7 == globalAnimArray[i].animId) hotName = "Num7";
        else if (favoriteArray.Num8 == globalAnimArray[i].animId) hotName = "Num8";
        else if (favoriteArray.Num9 == globalAnimArray[i].animId) hotName = "Num9";
        else hotName = "unset";
        if (hotName == "unset") {
            animHTML += `<input type='text' maxlength='4'></li>`;
        } else {
            animHTML +=
                `<input type='text' placeholder='${hotName}' maxlength='4' value='${hotName}'></li>`;
        }
        $("#AnimationList").html(animHTML);
        $("#AnimationMenuBox").fadeTo(800, 1, function () {});
    }
}

function playAnimation(animDict, animName, animFlag, animDuration) {
    if (animDict == undefined || animName == undefined || animFlag == undefined || animDuration ==
        undefined)
        return;
    alt.emit("Client:Animation:playAnimation", animDict, animName, parseInt(animFlag), parseInt(
        animDuration));
}

function deleteAnimationHotkey(htmlElem) {
    if (htmlElem == undefined) return;
    var listItem = $(htmlElem).parent();
    var listItemInput = $(listItem).find("input").val();
    if (listItem == undefined) return;
    if (listItemInput != "Num1" && listItemInput != "Num2" && listItemInput != "Num3" &&
        listItemInput != "Num4" &&
        listItemInput != "Num5" && listItemInput != "Num6" && listItemInput != "Num7" &&
        listItemInput != "Num8" &&
        listItemInput != "Num9") {
        ShowNotification(3, "Der Inhalt des Hotkeys darf nur aus Num1 bis Num9 bestehen.", 2500);
        return;
    }
    hideAnimationMenu();
    alt.emit("Client:Animation:DeleteAnimationHotkey", listItemInput);
}

function setAnimationHotkey(htmlElem, animId, animName, animDict, animFlag, animDuration) {
    if (animId <= 0 || htmlElem == undefined) return;
    var listItem = $(htmlElem).parent();
    var listItemInput = $(listItem).find("input").val();
    if (listItem == undefined) return;
    if (listItemInput != "Num1" && listItemInput != "Num2" && listItemInput != "Num3" &&
        listItemInput != "Num4" &&
        listItemInput != "Num5" && listItemInput != "Num6" && listItemInput != "Num7" &&
        listItemInput != "Num8" &&
        listItemInput != "Num9") {
        ShowNotification(3, "Der Inhalt des Hotkeys darf nur aus Num1 bis Num9 bestehen.", 2500);
        return;
    }
    hideAnimationMenu();
    alt.emit("Client:Animation:SaveAnimationHotkey", listItemInput, parseInt(animId), animName,
        animDict, animFlag,
        animDuration);
}

function hideAnimationMenu() {
    $("#AnimationMenuBox").fadeOut(500, function () {
        $("#AnimationMenuBox").hide();
    });
    alt.emit('Client:Animations:hideAnimationMenu');
}

/* Tuning */
var CurTuningMenuWindow = "none",
    SelectedVehicleTuningMenuColorBoxModtype = "none";

function ShowACLSTuningMenuWindow(subwindow, modtype) {
    if (CurTuningMenuWindow != "none") {
        document.getElementById(CurTuningMenuWindow).style.display = "none";
    }
    document.getElementById(subwindow).style.display = "block";
    CurTuningMenuWindow = subwindow;
    SelectedVehicleTuningMenuColorBoxModtype = modtype;
}

function closeTuningSubWindow(subwindow) {
    document.getElementById(subwindow).style.display = "none";
}

function closeTuningMenuCEF() {
    $("#VehicleTuningMainMenuBox").fadeOut(100, function () {
        $("#VehicleTuningMainMenuBox").hide();
        $("#VehicleTuningMenuColorSelection").hide();
        alt.emit("Client:Tuning:closeCEF");
    });
}

function VehicleTuningMenuColorSelectionTestColor(install) {
    var r = $("#rgbRvalField").val();
    var g = $("#rgbGvalField").val();
    var b = $("#rgbBvalField").val();
    if (install) {
        alt.emit("Client:Tuning:switchTuningColor", "Build", SelectedVehicleTuningMenuColorBoxModtype,
            r, g, b);
    } else {
        alt.emit("Client:Tuning:switchTuningColor", "Test", SelectedVehicleTuningMenuColorBoxModtype, r,
            g, b);
    }
}

function SwitchTuning(Type, ID, Action) {
    alt.emit("Client:Tuning:switchTuning", Type, ID, Action);
}

function openVehicleTuningMenu(Items) {
    var items = Items.split(";");
    var html = "";

    for (var i = 0; i < items.length; i++) {
        var itemValues = items[i].split(":");
        var modTyp = itemValues[0];
        var modTypeID = itemValues[1];

        html += `<li><span class='title'>${modTyp}</span><img src='../test.png'>`;

        if (modTyp.match("Neonröhren") || modTyp.match("Reifenqualm")) {
            html +=
                "<span class='actionbtn' onclick='ShowACLSTuningMenuWindow(`VehicleTuningMenuColorSelection`, `" +
                modTyp + "`);'>Farbe auswählen</span>";
        } else {
            html += "<div class='far-div1' onclick='SwitchTuning(`Preview` ,`" + modTypeID +
                "`, `>`);'><i class='far fa-arrow-alt-circle-right'></i></div>" +
                "<div class='far-div2' onclick='SwitchTuning(`Preview` ,`" + modTypeID +
                "`, `<`);'> <i class='far fa-arrow-alt-circle-left'></i></div>" +
                "<span class='actionbtn' onclick='SwitchTuning(`Build` ,`" + modTypeID +
                "`, `>`);'>Montieren</span>";
        }
        html += "</li>";
    }

    $("#VehicleTuningMainMenuBoxList").html(html);
    $("#VehicleTuningMainMenuBox").fadeTo(1000, 1, function () {});
}

function ShowPhoneCallError(errno) {
    stopPhoneAudioLoop();
    let msg,
        banner = document.getElementById("phone-banner");
    switch (errno) {
        case 1:
            msg = "Kein Anschluss unter dieser Nummer.";
            playPhoneAudio("../utils/sounds/phone/busy.wav");
            banner.innerHTML = "Nummer nicht vorhanden";
            break;
        case 2:
            msg = "Der Angerufene Teilnehmer ist nicht erreichbar.";
            banner.innerHTML = "Nicht erreichbar";
            playPhoneAudio("../utils/sounds/phone/busy.wav");
            break;
        case 3:
            msg = "Besetzt";
            banner.innerHTML = "Besetzt";
            playPhoneAudio("../utils/sounds/phone/busy.wav");
            break;
        case 4:
            msg = "Anruf beendet";
            banner.innerHTML = "Anruf beendet";
            break;
    }
    $("#phoneAcceptCall").hide();
    phoneActiveCall = null;
    phoneStopTimer();
    latestCall != null ? clearTimeout(latestCall) : latestCall;
    document.getElementById("phone-calling-activetime").innerHTML = msg;
    latestCall = setTimeout(() => {
        $("#phone-screen-calling").hide();
        $("#phone-banner").slideUp();
    }, 5000);
}

function phoneParseCall(number) {
    let display = document.getElementById("phone-calling-display");
    if (number == null) {
        return display.dataset.target;
    } else {
        display.dataset.target = number;
    }
}

function phoneCall(number) {
    if (phoneActiveCall == null) {
        if (phoneFlightmode) {
            showPhoneNotification("Kein Netz", "error", null, "error");
        } else {
            latestCall != null ? clearTimeout(latestCall) : latestCall;
            $("#phoneAcceptCall").hide();
            allowChatKeyUp = false;
            if (isNaN(parseInt(number)) != true) {
                startPhoneAudioLoop("../utils/sounds/phone/dial.wav");
                phoneActiveCall = parseInt(number);
                phoneParseCall(phoneActiveCall);
                $("#phone-screen-call").hide();
                let display = document.getElementById("phone-calling-display"),
                    activetime = document.getElementById("phone-calling-activetime"),
                    banner = document.getElementById("phone-banner");
                getNameOrNumber(phoneActiveCall);
                display.innerHTML = getNameOrNumber(phoneActiveCall);
                banner.innerHTML = "W&auml;hle " + getNameOrNumber(phoneActiveCall);
                activetime.innerHTML = "W&auml;hlen...";
                $("#phone-screen-calling").show();
                $("#phone-screen-home").show();
                alt.emit("Client:Smartphone:tryCall", number);
            }
        }
    }
}

function showPhoneCallActive(shownNumber) {
    stopPhoneAudio();
    stopPhoneAudioLoop();
    $("#phoneAcceptCall").hide();
    let activetime = document.getElementById("phone-calling-activetime"),
        banner = document.getElementById("phone-banner"),
        PhoneCallSeconds = 0,
        PhoneCallMinutes = 0,
        PhoneDispSeconds = 0,
        PhoneDispMinutes = 0;
    activetime.innerHTML = "00:00";
    PhoneCallTimer = setInterval(function () {
        PhoneCallSeconds++;
        if (PhoneCallSeconds % 60 < 10) {
            if (PhoneCallSeconds % 60 == 0) {
                PhoneCallMinutes = PhoneCallSeconds / 60;
                if (PhoneCallMinutes < 10) {
                    PhoneDispMinutes = "0" + PhoneCallMinutes;
                } else {
                    PhoneDispMinutes = PhoneCallMinutes;
                }
            } else if (PhoneCallSeconds == 1) {
                PhoneDispMinutes = "00";
            }
            PhoneDispSeconds = "0" + PhoneCallSeconds % 60;
        } else {
            PhoneDispSeconds = PhoneCallSeconds % 60;
        }
        activetime.innerHTML = PhoneDispMinutes + ":" + PhoneDispSeconds;
    }, 1000);
    banner.innerHTMl = "Verbunden mit " + getNameOrNumber(shownNumber);
};

function phoneStopTimer() {
    clearInterval(PhoneCallTimer);
}

function phoneHangUp() {
    $("#phone-screen-calling").hide();
    $("#phone-banner").slideUp();
    phoneStopTimer();
    stopPhoneAudioLoop();
    phoneActiveCall = null;
    alt.emit("Client:Smartphone:denyCall");
}

setInterval(function () {
    streamTime();
}, 5000);

function checkTime(i) {
    return (i < 10) ? "0" + i : i;
}

function parseEmotes() {
    let emoteElements = document.querySelectorAll("span[data-emote='true']");
    [].forEach.call(emoteElements, function (emote) {
        emote.classList.add("fa-3x");
    });
}
streamTime();

function streamTime() {
    let today = new Date(),
        month = today.getMonth(),
        weekday = today.getDay(),
        day = today.getDate(),
        hour = checkTime(today.getHours()),
        minute = checkTime(today.getMinutes());
    switch (weekday) {
        case 0:
            weekday = "Sonntag";
            break;
        case 1:
            weekday = "Montag";
            break;
        case 2:
            weekday = "Dienstag";
            break;
        case 3:
            weekday = "Mittwoch";
            break;
        case 4:
            weekday = "Donnerstag";
            break;
        case 5:
            weekday = "Freitag";
            break;
        case 6:
            weekday = "Samstag";
    }
    switch (month) {
        case 0:
            month = "Januar";
            break;
        case 1:
            month = "Februar";
            break;
        case 2:
            month = "M&auml;rz";
            break;
        case 3:
            month = "April";
            break;
        case 4:
            month = "Mai";
            break;
        case 5:
            month = "Juni";
            break;
        case 6:
            month = "Juli";
            break;
        case 7:
            month = "August";
            break;
        case 8:
            month = "September";
            break;
        case 9:
            month = "Oktober";
            break;
        case 10:
            month = "November";
            break;
        case 11:
            month = "Dezember";
            break;
    }
    let time = hour + ":" + minute,
        date = weekday + ", " + day + ". " + month;
    document.getElementById("phone-min-time").innerHTML = time;
    document.getElementById("phone-time").innerHTML = time;
    document.getElementById("phone-date").innerHTML = date;
}

function showPhoneNotification(message, app, fn, sound) {
    let notificationBox = $("#phone-notif"),
        notificationContent = $("#phone-notif-content"),
        notificationApp = $("#phone-notif-app"),
        svg,
        path;
    latestAlert != null ? clearTimeout(latestAlert) : latestAlert;
    switch (app) {
        case "sms":
            svg = "<i class='fas fa-sms fa-2x text-success'></i>";
            break;
        case "address":
            svg = "<i class='far fa-address-book fa-2x'></i>"
            break;
        case "error":
            svg = "<i class='far fa-exclamation-triangle fa-2x text-warning'></i>";
            break;
        default:
            svg = "";
            break;
    }
    switch (sound) {
        case "sms":
            path = "../utils/sounds/phone/msg_get_2.wav";
            break;
        case "error":
            path = "../utils/sounds/phone/msg_get_1.wav";
            break;
        default:
            path = null;
            break;
    }
    if (phoneNodisturb == false) {
        if (fn != null) {
            notificationBox.attr('onclick', '');
            notificationBox.attr('onclick', `${fn}`);
        }
        notificationContent.html(message);
        notificationApp.html(svg);
        if (path != null) {
            playPhoneAudio(path);
        }
        notificationBox.slideDown();
        latestAlert = setTimeout(function () {
            notificationBox.slideUp();
            latestAlert = null;
        }, 5000);
    }
}

function startPhoneAudioLoop(path) {
    if (phoneNodisturb == false) {
        phoneAudioLoop = new Audio(path);
        phoneAudioLoop.loop = true;
        phoneAudioLoop.play();
    }
}

function stopPhoneAudioLoop() {
    if (phoneAudioLoop != null) {
        phoneAudioLoop.pause();
        phoneAudioLoop.loop = false;
        phoneAudioLoop = null;
        return true;
    } else {
        return false;
    }
}

function playPhoneAudio(path) {
    if (phoneNodisturb == false) {
        phoneAudioOnce = new Audio(path);
        phoneAudioOnce.play();
    }
}

function stopPhoneAudio() {
    if (phoneAudioOnce != null) {
        phoneAudioOnce.pause();
        phoneAudioOnce = null;
        return true;
    } else {
        return false;
    }
}

function openNewChat() {
    $("#phone-sms-nav-chats").addClass("phone-sms-nav-item-active");
    $("#phone-sms-nav-status").removeClass("phone-sms-nav-item-active");
    $('#phone-sms-home-carousel').carousel(2);
    $('#phone-sms-header-carousel').carousel(2);
}

checkChatAlerts();
phoneFlightmodeOff(true);

/////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function () {

    alt.emit("Client:HUD:cefIsReady");
    setTimeout(function () {
        $("#drinkbox").fadeTo(1000, 1, function () {});
        $("#voicebox").css("background", "#36b1468a");
        $("#voicebox").fadeTo(1000, 1, function () {});
        $("#foodbox").fadeTo(1000, 1, function () {});
        $("#waterMarkImage").fadeTo(1000, 1, function () {});
    }, 1000);

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });

    $('.nav-tabs > li > a').click(function () {
        $('.nav-tabs > li.active').removeClass('active');
        $(this).parent().parent().addClass('active');
    });

    window.addEventListener("keyup", event => {
        if (allowChatKeyUp) {
            if (event.keyCode == 13) {
                phoneSendMessage();
            }
        }
    });
    window.addEventListener("keydown", event => {
        if (allowHudlistScroll) {
            if (event.keyCode == 37) {
                hudlistCycleLeft();
            }
            if (event.keyCode == 38) {
                hudlistCycleUp();
            }
            if (event.keyCode == 39 || event.keyCode == 13) {
                hudlistCycleRight();
            }
            if (event.keyCode == 40) {
                hudlistCycleDown();
            }
        }
    });


    $("#bankFactionATMForm-DepositBtn").click(function () {
        var selectedAmount = $("#bankFactionATMForm-DepositInput").val();
        if (selectedAmount < 1 || selectedAmount == "" || globalFactionATMfactionid == undefined ||
            globalFactionATMfactionid == 0 || globalFactionATMfactionid == "0") return;
        if (globalFactionATMtype == undefined || globalFactionATMtype == 0 ||
            globalFactionATMtype == "")
            return;
        alt.emit("Client:FactionBank:DepositMoney", globalFactionATMtype, globalFactionATMfactionid,
            selectedAmount);
        BankFactionATMFormDestroyCEF();
    });

    $("#bankFactionATMForm-WithdrawBtn").click(function () {
        var selectedAmount = $("#bankFactionATMForm-WithdrawInput").val();
        if (selectedAmount < 1 || selectedAmount == "" || globalFactionATMfactionid == undefined ||
            globalFactionATMfactionid == 0 || globalFactionATMfactionid == "0") return;
        if (globalFactionATMtype == undefined || globalFactionATMtype == 0 ||
            globalFactionATMtype == "")
            return;
        alt.emit("Client:FactionBank:WithdrawMoney", globalFactionATMtype,
            globalFactionATMfactionid,
            selectedAmount);
        BankFactionATMFormDestroyCEF();
    });



    $("#bankATMBox-PinInput-Button").click(function () {
        var inputPin = $("#bankATMBox-PinInput").val();
        if (curATMPin == inputPin) {
            alt.emit("Client:ATM:TryPin", "reset", curATMAccountNumber);
            BankATMshowSite("bankATMbox-OverviewArea");
        } else {
            alt.emit("Client:ATM:TryPin", "increase", curATMAccountNumber);
        }
    });

    $("#bankATMBox-DepositArea-Button").click(function () {
        var selectedAmount = $("#bankATMBox-DepositInput").val();
        if (selectedAmount < 1 || selectedAmount == "") return;
        alt.emit("Client:ATM:DepositMoney", curATMAccountNumber, selectedAmount, curATMzoneName);
        BankATMshowSite("bankATMbox-OverviewArea");
    });

    $("#bankATMBox-WithdrawArea-Button").click(function () {
        var selectedAmount = $("#bankATMBox-WithdrawInput").val();
        if (selectedAmount < 1 || selectedAmount == "") return;
        alt.emit("Client:ATM:WithdrawMoney", curATMAccountNumber, selectedAmount, curATMzoneName);
        BankATMshowSite("bankATMbox-OverviewArea");
    });

    $("#bankATMBox-DoMoneyTransfer-Button").click(function () {
        var targetAccount = $("#bankATMBox-MoneyTransferTargetInput").val();
        var selectedAmount = $("#bankATMBox-MoneytransferInput").val();
        if (selectedAmount < 1 || selectedAmount == "" || targetAccount == 0 || targetAccount == "")
            return;
        alt.emit("Client:ATM:TransferMoney", curATMAccountNumber, targetAccount, selectedAmount,
            curATMzoneName);
        BankATMshowSite("bankATMbox-OverviewArea");
    });



    $("#phone-app-call").click(function () {
        $("#phone-screen-home").hide();
        if (phoneActiveCall != null) {
            phoneShowCalling();
        } else {
            $("#phone-screen-call").show();
        }
        $("#phone-min-time").removeClass("d-none");
    });

    $("#phone-app-sms").click(function () {
        $("#phone-screen-sms").show();
        $("#phone-min-time").removeClass("d-none");
        loadMessagesMain();
    });

    $("#phone-app-address").click(function () {
        $("#phone-screen-address").show();
        $("#phone-min-time").removeClass("d-none");
    });



    $("#phone-app-police").click(function () {
        $("#phone-screen-police").show();
        $("#phone-min-time").removeClass("d-none");
    });

    $("#phone-app-settings").click(function () {
        $("#phone-screen-settings").show();
        $("#phone-min-time").removeClass("d-none");
        updatePhoneNumber(userPhoneNumber);
    });

    $("#phone-app-radio").click(function () {
        $("#phone-screen-radio").show();
        $("#phone-min-time").removeClass("d-none");
    });


    $("#phone-banner").click(function () {
        phoneShowCalling();
        $("#phone-min-time").removeClass("d-none");
        selectedChatId = 0;
    });

    $("#phone-sms-nav-chats").click(function () {
        $("#phone-sms-nav-chats").addClass("phone-sms-nav-item-active");
        $("#phone-sms-nav-status").removeClass("phone-sms-nav-item-active");
        $('#phone-sms-home-carousel').carousel(0);
    });


    $("#phone-sms-nav-status").click(function () {
        $("#phone-sms-nav-chats").removeClass("phone-sms-nav-item-active");
        $("#phone-sms-nav-status").addClass("phone-sms-nav-item-active");
        $('#phone-sms-home-carousel').carousel(3);
    });

    $('#phone-chat-emotes .dropdown-menu').on('click', function (event) {
        event.stopPropagation();
    });
    $("#phone-call-submit").click(function () {
        var number = document.getElementById("phone-call-input").value;
        phoneCall(number);
    });
    $("#phone-chat-call").click(function () {
        var number = document.getElementById("phone-chat-disp-name").dataset.target;
        phoneCall(number);
    });
    $("#phone-chat-delete").click(function () {
        alt.emit("Client:Smartphone:deleteChat", selectedChatId);
        $('#phone-sms-home-carousel').carousel(0);
        $('#phone-sms-header-carousel').carousel(0);
        selectedChatId = 0;
        allowChatKeyUp = false;
    });
});
/////////////////////////////////////////////////////////////////////////////////////////////////
//Alt On Events
alt.on('HUD:UpdateLockState', state => {
    $('.lockstate-' + state).removeClass('d-none');
    $('.lockstate-' + !state).addClass('d-none');
});

alt.on('HUD:UpdateSeatbelt', state => {
    $('#seatbelt-' + state).removeClass('d-none');
    $('#seatbelt-' + !state).addClass('d-none');
});

alt.on("CEF:HUD:sendNotification", (type, time, message) => {
    ShowNotification(type, message, time);
});

alt.on("CEF:HUD:updateStreetLocation", (loc) => {
    updateStreetLocation(loc);
});

alt.on("CEF:HUD:updateSpeakState", (state) => {
    updateSpeakState(state);
});

alt.on("CEF:HUD:updateHUDVoice", (state) => {
    updateVoiceHUD(state);
});

alt.on("CEF:HUD:updateHUDPosInVeh", (state, fuel, km) => {
    if (fuel == null) fuel = 0;
    if (km == null) km = 0;
    SetPlayerHUDInVehicle(state, fuel.toFixed(2), km.toFixed(2));
});

alt.on("CEF:HUD:SetPlayerHUDVehicleSpeed", (speed) => {
    SetPlayerHUDVehicleSpeed(speed.toFixed(0));
});

alt.on("CEF:HUD:SetPlayerHUDVehicleInfos", (fuel, km) => {
    SetPlayerHUDVehicleInfos(fuel.toFixed(2), km.toFixed(2));
});

alt.on("CEF:HUD:createIdentityCardApplyForm", (charname, gender, adress, birthdate) => {
    CreateIdentityCardApplyForm(charname, gender, adress, birthdate);
});

alt.on("CEF:Bank:createBankAccountManageForm", (bankArray, curBank) => {
    createBankAccountManageForm(bankArray, curBank);
});

alt.on("CEF:ATM:BankATMcreateCEF", (pin, accNumber, zoneName) => {
    BankATMcreateCEF(pin, accNumber);
    curATMzoneName = zoneName;
});

alt.on("CEF:ATM:BankATMSetRequestedData", (curBalance, paperArray) => {
    BankATMSetRequestedData(curBalance, paperArray);
});

alt.on("CEF:ATM:BankATMdestroyCEF", () => {
    BankATMdestroyCEF();
});

alt.on("CEF:Shop:shopCEFBoxCreateCEF", (itemArray, shopId, isOnlySelling) => {
    shopCEFBoxCreateCEF(itemArray, shopId, isOnlySelling);
});

alt.on("CEF:General:hideAllCEFs", (hideCursor) => {
    $("#bankAccountManageForm").fadeOut(500, function () {
        $("#bankAccountManageForm").hide();
    });

    $("#VehicleTuningMainMenuBox").hide();
    $("#VehicleTuningMenuColorSelection").hide();

    $("#identityCardApplyForm").fadeOut(300, 0, function () {
        $("#identityCardApplyForm").hide();
    });

    $("#shopCEFBox").fadeOut(500, function () {
        $("#shopCEFBox").hide();
    });

    $("#bankATMbox").fadeOut(500, function () {
        $("#bankATMbox").hide();
    });

    $("#barberCEFBox").fadeOut(500, function () {
        $("#barberCEFBox").hide();
    });

    $("#GarageCEFBox").fadeOut(1, function () {
        $("#GarageCEFBox").hide();
        curGarageId = undefined;
    });

    $("#VehicleShopCEFBox").fadeOut(500, function () {
        $("#VehicleShopCEFBox").hide();
        curVehShopId = undefined;
    });

    $("#jobCenterApplyForm").fadeOut(250, function () {
        $("#jobCenterApplyForm").hide();
    });

    $("#VehicleFuelstationCEFBox").fadeOut(250, function () {
        $("#VehicleFuelstationCEFBox").hide();
    });

    globalClothesShopArray = [];
    $("#ClothesShopCEFBox").fadeOut(500, function () {
        $("#ClothesShopCEFBox").hide();
        clothesShopHats = [], clothesShopMasks = [], clothesShopGlasses = [],
            clothesShopEarrings = [], clothesShopNecklaces = [], clothesShopTops = [],
            clothesShopVests = [], clothesShopPants = [], clothesShopShoes = [],
            clothesShopWatches = [], clothesShopBracelets = [], globalClothesShopId =
            undefined;
        clothesShopHatIndex = 0, clothesShopMaskIndex = 0, clothesShopGlassIndex = 0,
            clothesShopEarringIndex = 0, clothesShopNecklaceIndex = 0,
            clothesShopTopIndex = 0,
            clothesShopVestIndex = 0, clothesShopPantsIndex = 0, clothesShopShoesIndex =
            0,
            clothesShopWatchIndex = 0, clothesShopBraceletIndex = 0;
    });

    $("#bankFactionATMForm").fadeOut(500, function () {
        globalFactionATMfactionid = undefined;
        globalFactionATMtype = undefined;
        $("#bankFactionATMForm").hide();
    });

    globalPlayerBillType = undefined;
    globalPlayerBilltargetCharId = undefined;
    $("#GivePlayerBillCEFBox").fadeOut(250, function () {
        $("#GivePlayerBillCEFBox").hide();
    });

    globalRecievePlayerBillType = undefined;
    globalRecievePlayerBillFactionCompanyId = undefined;
    globalRecievePlayerBillAmount = undefined;
    globalRecievePlayerBillReason = undefined;
    globalRecievePlayerBillFactionName = undefined;
    globalRecievePlayerBillGivenCharacterId = undefined;
    $("#RecievePlayerBillCEFBox").fadeOut(250, function () {
        $("#RecievePlayerBillCEFBox").hide();
    });
    $("#FactionStorageCEFBox").fadeOut(250, function () {
        $("#FactionStorageCEFBox").hide();
    });
    $("#VehicleTrunkCEFBox").fadeOut(250, function () {
        $("#VehicleTrunkCEFBox").hide();
    });

    $("#PlayerSearchInventoryCEFBox").fadeOut(250, function () {
        $("#PlayerSearchInventoryCEFBox").hide();
    });

    $("#GivePlayerLicenseCEFBox").fadeOut(250, function () {
        $("#GivePlayerLicenseCEFBox").hide();
    });

    $("#Minijob-PilotCEFBox").fadeOut(50, function () {
        $("#Minijob-PilotCEFBox").hide();
    });

    $("#Minijob-BusDriverCEFBox").fadeOut(50, function () {
        $("#Minijob-BusDriverCEFBox").hide();
    });

    globalHotelApartmentsArray = [];
    $("#HotelManageCEFBox").fadeOut(500, function () {
        $("#HotelManageCEFBox").hide();
    });
    $("#HouseEntranceCEFBox").fadeOut(500, function () {
        $("#HouseEntranceCEFBox").hide();
    });
    $("#HouseManageCEFBox").fadeOut(500, function () {
        $("#HouseManageCEFBox").hide();
    });
    $("#TownhallHouseSelectorBox").fadeOut(500, function () {
        $("#TownhallHouseSelectorBox").hide();
    });
    $("#AnimationMenuBox").fadeOut(500, function () {
        $("#AnimationMenuBox").hide();
    });
});

alt.on("CEF:Barber:barberCEFBoxCreateCEF", (headoverlaysarray) => {
    headoverlaysarray = JSON.parse(headoverlaysarray);
    globalBarberHeadoverlaysData = headoverlaysarray[0];
    globalBarberHeadoverlaysOpacityData = headoverlaysarray[1];
    globalBarberHeadoverlaysColorData = headoverlaysarray[2];
    globalBarberheadoverlaysarray = [globalBarberHeadoverlaysData,
        globalBarberHeadoverlaysOpacityData,
        globalBarberHeadoverlaysColorData
    ];

    //Daten werden visuell eingetragen
    document.getElementById("BarberHairVariation").value = globalBarberheadoverlaysarray[0][13];
    document.getElementById("BarberHairVariationOutput").innerHTML =
        globalBarberheadoverlaysarray[0][13];
    document.getElementById("BarberHairColor1").value = globalBarberheadoverlaysarray[2][13];
    document.getElementById("BarberHairColor1Output").innerHTML = globalBarberheadoverlaysarray[
        2][13];
    document.getElementById("BarberHairColor2").value = globalBarberheadoverlaysarray[1][13];
    document.getElementById("BarberHairColor2Output").innerHTML = globalBarberheadoverlaysarray[
        1][13];
    document.getElementById("BarberEyebrowsVariation").value = globalBarberheadoverlaysarray[0][
        2
    ];
    document.getElementById("BarberEyebrowsVariationOutput").innerHTML =
        globalBarberheadoverlaysarray[0][
            2
        ];
    document.getElementById("BarberEyebrowsColor").value = globalBarberheadoverlaysarray[2][2];
    document.getElementById("BarberEyebrowsColorOutput").innerHTML =
        globalBarberheadoverlaysarray[2][2];
    document.getElementById("BarberBeardVariation").value = globalBarberheadoverlaysarray[0][1];
    document.getElementById("BarberBeardVariationOutput").innerHTML =
        globalBarberheadoverlaysarray[0][1];
    document.getElementById("BarberBeardColor").value = globalBarberheadoverlaysarray[2][1];
    document.getElementById("BarberBeardColorOutput").innerHTML = globalBarberheadoverlaysarray[
        2][1];
    document.getElementById("BarberMakeupVariation").value = globalBarberheadoverlaysarray[0][
        4
    ];
    document.getElementById("BarberMakeupVariationOutput").innerHTML =
        globalBarberheadoverlaysarray[0][4];
    document.getElementById("BarberMakeupAlpha").value = globalBarberheadoverlaysarray[1][4];
    document.getElementById("BarberMakeupAlphaOutput").innerHTML =
        globalBarberheadoverlaysarray[1][4];
    document.getElementById("BarberLipstickVariation").value = globalBarberheadoverlaysarray[0][
        8
    ];
    document.getElementById("BarberLipstickVariationOutput").innerHTML =
        globalBarberheadoverlaysarray[0][
            8
        ];
    document.getElementById("BarberLipstickColor").value = globalBarberheadoverlaysarray[2][8];
    document.getElementById("BarberLipstickColorOutput").innerHTML =
        globalBarberheadoverlaysarray[2][8];
    document.getElementById("BarberWangenBlushVariation").value = globalBarberheadoverlaysarray[
        0][5];
    document.getElementById("BarberWangenBlushVariationOutput").innerHTML =
        globalBarberheadoverlaysarray[0]
        [5];
    document.getElementById("BarberWangenBlushColor").value = globalBarberheadoverlaysarray[2][
        5
    ];
    document.getElementById("BarberWangenBlushColorOutput").innerHTML =
        globalBarberheadoverlaysarray[2][5];
    $("#barberCEFBox").fadeTo(500, 1, function () {});
});

alt.on("CEF:InteractionMenu:toggleInteractionMenu", (state, type, itemArray) => {
    toggleInterActionMenu(state, type, itemArray);
});

alt.on("CEF:InteractionMenu:requestAction", () => {
    alt.emit("Client:InteractionMenu:giveRequestedAction", globalInteractMenuType,
        globalInteractMenuAction);
});

alt.on("CEF:Garage:OpenGarage", (garageId, garagename, garageInArray, garageOutArray) => {
    curGarageId = garageId;
    SetGarageCEFListContent(garagename, garageInArray, garageOutArray);
});

alt.on("CEF:VehicleShop:SetListContent", (shopid, shopname, itemarray) => {
    SetVehicleShopCEFListContent(shopid, shopname, itemarray);
    curVehShopId = shopid;
});

alt.on("CEF:Jobcenter:OpenCEF", (jobarray) => {
    SetJobcenterJobListContent(jobarray);
});

alt.on("CEF:FuelStation:OpenCEF", (fuelStationId, stationName, owner, maxFuel, availableLiter,
    fuelArray,
    vehID) => {
    SetFuelstationListContent(fuelStationId, stationName, owner, maxFuel, availableLiter,
        fuelArray, vehID);
});

alt.on("CEF:ClothesShop:createCEF", (shopId) => {
    SetClothesShopContent(shopId);
});

alt.on("CEF:ClothesStorage:createCEF", () => {
    toggleHudlist(true);
});

alt.on("CEF:ClothesShop:sendItemsToClient", (array) => {
    SetClothesShopItems(array);
});

alt.on("CEF:ClothesStorage:sendItemsToClient", (array) => {
    SetClothesStorageItems(array);
});

alt.on("CEF:Hotel:openCEF", (hotelname) => {
    openHotelRentCEF(hotelname);
});

alt.on("CEF:Hotel:setApartmentItems", (array) => {
    setHotelApartmentsItems(array);
});

alt.on("CEF:HouseEntrance:openCEF", (charId, houseArray, isRentedIn) => {
    openHouseEntranceCEF(charId, houseArray, isRentedIn);
});

alt.on("CEF:FactionBank:createCEF", (type, factionId, factionBalance) => {
    globalFactionATMfactionid = factionId;
    globalFactionATMtype = type;
    if (type == "faction") {
        $("#bankFactionATMForm-Title").html(`FRAKTIONSBANK`);
    } else if (type == "company") {
        $("#bankFactionATMForm-Title").html(`UNTERNEHMENSKONTO`);
    }
    $("#bankFactionATMForm-CurBalance").html(`${factionBalance}`);
    $("#bankFactionATMForm").fadeTo(1000, 1, function () {});
});

alt.on("CEF:GivePlayerBill:openCEF", (type, targetCharId) => {
    globalPlayerBillType = type;
    globalPlayerBilltargetCharId = targetCharId;
    $("#GivePlayerBillCEFBox-AmountInput").val("");
    $("#GivePlayerBillCEFBox-ReasonInput").val("");
    $("#GivePlayerBillCEFBox").fadeTo(1000, 1, function () {});
});

alt.on("CEF:RecievePlayerBill:openCEF", (type, factionCompanyId, moneyAmount, reason,
    factionCompanyName,
    charId) => {
    globalRecievePlayerBillType = type;
    globalRecievePlayerBillFactionCompanyId = factionCompanyId;
    globalRecievePlayerBillAmount = moneyAmount;
    globalRecievePlayerBillReason = reason;
    globalRecievePlayerBillFactionName = factionCompanyName;
    globalRecievePlayerBillGivenCharacterId = charId;
    $("#RecievePlayerBillCEFBox-NameInput").val(`${factionCompanyName} (${factionCompanyId})`);
    $("#RecievePlayerBillCEFBox-AmountInput").val(`${moneyAmount}`);
    $("#RecievePlayerBillCEFBox-ReasonInput").val(`${reason}`);
    $("#RecievePlayerBillCEFBox").fadeTo(1000, 1, function () {});
});

alt.on("CEF:FactionStorage:openCEF", (charId, factionId, type, invArray, storageArray) => {
    SetFactionStorageCEFBoxContent(charId, factionId, type, invArray, storageArray);
});

alt.on("CEF:VehicleTrunk:openCEF", (charId, vehID, type, invArray, storageArray) => {
    SetVehicleTrunkCEFBoxContent(charId, vehID, type, invArray, storageArray);
});

alt.on("CEF:PlayerSearch:openCEF", (targetCharId, invArray) => {
    SetPlayerSearchInventoryCEFBoxContent(targetCharId, invArray);
});

alt.on("CEF:VehicleLicensing:openCEF", (vehArray) => {
    SetVehicleLicensingCEFBoxContent(vehArray);
});

alt.on("CEF:GivePlayerLicense:SetGivePlayerLicenseCEFContent", (targetCharId, licArray) => {
    SetGivePlayerLicenseCEFContent(targetCharId, licArray);
});

alt.on("CEF:MinijobPilot:openCEF", () => {
    $("#Minijob-PilotCEFBox").fadeTo(1000, 1, function () {});
});

alt.on("CEF:MinijobBusdriver:openCEF", (routeArray) => {
    SetMinijobBusDriverListContent(routeArray);
});

alt.on("CEF:Deathscreen:openCEF", () => {
    openDeathscreenCEF();
});

alt.on("CEF:Deathscreen:closeCEF", () => {
    closeDeathscreen();
});

alt.on("CEF:HouseManage:openCEF", (houseInfoArray, renterArray) => {
    openHouseManageCEF(houseInfoArray, renterArray);
});

alt.on("CEF:IdentityCard:showIdentityCard", (type, infoArray) => {
    showIdentityCard(type, infoArray);
});

alt.on("CEF:Townhall:openHouseSelector", (houseArray) => {
    openTownhallHouseSelector(houseArray);
});

alt.on("CEF:Animations:setupItems", (array) => {
    setAnimationMenuItems(array);
});

alt.on("CEF:Animations:setupAnimationMenu", (favoriteArray) => {
    setupAnimationMenu(favoriteArray);
});

alt.on("CEF:Animations:hideAnimationMenu", () => {
    hideAnimationMenu();
});

alt.on("CEF:Tuning:openTuningMenu", (Items) => {
    openVehicleTuningMenu(Items);
});

/* Smartphone Alt Ons */
alt.on("CEF:Smartphone:equipPhone", (isEquipped, phoneNumber, isFlyModeEnabled) => {
    activatePhone(isEquipped);
    updatePhoneNumber(phoneNumber);
    if (isFlyModeEnabled) phoneFlightmodeOn(false);
    else phoneFlightmodeOff(false);
});

alt.on("CEF:Smartphone:togglePhone", (shouldBeVisible) => {
    togglePhone(shouldBeVisible);
});

alt.on("CEF:Smartphone:showPhoneReceiveCall", (number) => {
    phoneReceiveCall(number);
});

alt.on("CEF:Smartphone:showPhoneCallActive", (number) => {
    showPhoneCallActive(number);
});

alt.on("CEF:Smartphone:addChatJSON", (chats) => {
    SmartphoneAddChatJSONs(chats);
});

alt.on("CEF:Smartphone:setAllChats", () => {
    SmartphoneSetAllChats();
});

alt.on("CEF:Smartphone:addMessageJSON", (msg) => {
    SmartphoneAddMessageJSONs(msg);
});

alt.on("CEF:Smartphone:setAllMessages", () => {
    SmartphoneSetAllMessages();
});

alt.on("CEF:Smartphone:recieveNewMessage", (chatId, phoneNumber, message) => {
    SmartphoneReceiveTextMessage(chatId, phoneNumber, message);
});

alt.on("CEF:Smartphone:ShowPhoneCallError", (errorId) => {
    ShowPhoneCallError(errorId);
});

alt.on("CEF:Smartphone:addContactJSON", (json) => {
    SmartphoneAddContactJSONs(json);
});

alt.on("CEF:Smartphone:setAllContacts", () => {
    SmartphoneSetAllContacts();
});

alt.on("CEF:Smartphone:showNotification", (message, app, fn, sound) => {
    showPhoneNotification(message, app, fn, sound)
});

alt.on("CEF:Smartphone:ShowLSPDIntranetApp", (shouldBeVisible, serverWanteds) => {
    ShowLSPDIntranetApp(shouldBeVisible, serverWanteds);
});

alt.on("CEF:Smartphone:SetLSPDIntranetSearchedPeople", (searchedPersonJSON) => {
    SetLSPDIntranetSearchedPeople(searchedPersonJSON);
});

alt.on("CEF:Smartphone:setLSPDIntranetPersonWanteds", (json) => {
    setLSPDIntranetPersonWanteds(json);
});

alt.on("CEF:Smartphone:setPoliceAppMostWanteds", (mostWanteds) => {
    setPoliceAppMostWanteds(mostWanteds);
});
