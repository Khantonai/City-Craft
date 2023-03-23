var onCase = -1; //Case sur laquelle le curseur est
var placeBatType = -1; //Le batiment qui va être posé
var selectedBat = -1; // Le batiment qui est sélectionné
var textPos = 0;
var letterPos = 0;

var money = document.querySelector("#money-progress");
var currentMoney = 500;
var maxMoney = 1000;


function reset() {
    localStorage.removeItem('slot');
    localStorage.removeItem('money');
    location.reload();
}

var esc = false

document.onkeydown = function (evt) {
    evt = evt || window.event;
    isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
    } else {
        isEscape = (evt.keyCode === 27);
    }
    if (isEscape && document.querySelector('#on-placing').style.display == "block" && placeBatType != "mairie") {
        esc = true;
    }

    if (isEscape && ameliorer == true && document.querySelector("#artisanMenu").style.display != "block") {
        ameliorer = false;
        document.querySelector("#case" + onCase).style.border = "";
        document.querySelector("#dialog-box").innerHTML = "";
    }
    if (isEscape && document.querySelector('#close-menu').style.display == "block") {
        closeMenu();
    }
};


setInterval(function () {
    // catch all the errors.
    for (var i = 0; i < slot.length; i++) {
        if (slot[i].nom == "boutique" && slot[i].currentUpgrade == false) {
            if (slot[i].moneyStock + slot[i].moneyGen < slot[i].maxStock) {
                slot[i].moneyStock += slot[i].moneyGen;
                if (slot[i].moneyStock > slot[i].maxStock / 10) {
                    document.querySelector("#case" + i).style.backgroundColor = "green";
                }
            }
            else {
                slot[i].moneyStock += slot[i].maxStock - slot[i].moneyStock;
                document.querySelector("#case" + i).style.backgroundColor = "crimson";
            }

        }

        if (slot[i].nom == "restaurant" && slot[i].currentUpgrade == false) {
            if (slot[i].restaurantDelay > 0) {
                slot[i].restaurantDelay -= 1;
            }
            else {
                if (slot[i].moneyStock + slot[i].moneyGen < slot[i].maxStock) {
                    slot[i].moneyStock += slot[i].moneyGen;
                    if (slot[i].moneyStock > slot[i].maxStock / 10) {
                        document.querySelector("#case" + i).style.backgroundColor = "green";
                    }
                }
                else {
                    slot[i].moneyStock += slot[i].maxStock - slot[i].moneyStock;
                    document.querySelector("#case" + i).style.backgroundColor = "crimson";
                }
                slot[i].restaurantDelay = 25;
            }

        }

        if (slot[i].currentUpgrade == true) {
            slot[i].upgradeTime -= 1;
        }

        if (slot[i].upgradeTime == 0) {
            if (slot[i].nom == "mairie") {
                slot[i].upgradeCost = 2000 * 1.5;
                slot[i].upgradeTime = 120 * 1.5;
            }
            else if (slot[i].nom == "boutique") {
                slot[i].upgradeCost = 1400 * 1.5;
                slot[i].upgradeTime = 36 * 1.5;
            }
            else if (slot[i].nom == "restaurant") {
                slot[i].upgradeCost = 1800 * 1.5;
                slot[i].upgradeTime = 90 * 1.5;
            }
            else if (slot[i].nom == "banque") {
                maxMoney -= slot[i].banqueStock / 1.5;
                slot[i].upgradeCost = 1900 * 1.5;
                slot[i].upgradeTime = 60 * 1.5;
                maxMoney += slot[i].banqueStock;
            }
            else if (slot[i].nom == "artisan") {

            }
            slot[i].currentUpgrade = false;
            if (i % 2 == 0) {
                document.querySelector("#case" + i).style.backgroundColor = "#FCFBFB";
            }
            else {
                document.querySelector("#case" + i).style.backgroundColor = "#FDFDFD";
            }
            if (slot[i].nom == "boutique" || slot[i].nom == "restaurant") {
                if (slot[i].moneyStock > slot[i].maxStock / 10) {
                document.querySelector("#case" + i).style.backgroundColor = "green";
            }
            else {
                slot[i].moneyStock += slot[i].maxStock - slot[i].moneyStock;
                document.querySelector("#case" + i).style.backgroundColor = "crimson";
            }
            }

            
            document.querySelector("#case" + i).style.backgroundColor;

        }
    }

    if (document.querySelector("#boutiqueMenu").style.display == "block") {
        document.querySelector("#money-stock-" + slot[selectedBat].nom).innerHTML = slot[selectedBat].moneyStock;
    }

    if (document.querySelector("#restaurantMenu").style.display == "block") {
        document.querySelector("#money-stock-" + slot[selectedBat].nom).innerHTML = slot[selectedBat].moneyStock;
    }

    if (perdu == true) {
        if (parseInt(document.querySelector("#argent-recolte").textContent) > maxMoney - currentMoney) {
            currentMoney = maxMoney;
        }
        else {
            currentMoney += parseInt(document.querySelector("#argent-recolte").textContent);
        }
        document.querySelector("#argent-recolte").textContent = 0;
        document.querySelector("#current-money").textContent = currentMoney;
        money.style.width = currentMoney / maxMoney * 100 + "%";
    }



    localStorage.setItem("money", currentMoney);
    localStorage.setItem("slot", JSON.stringify(slot));


}, 5000);

//----------------- GRILLE --------------------
var slot = [
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
];

var gridContainer = document.querySelector(".grid-container");

for (var i in slot) {
    var caseGrid = document.createElement("div");
    caseGrid.id = "case" + i;
    //caseGrid.textContent = i;
    if (i % 2 == 0) {
        caseGrid.setAttribute("style", "box-sizing: border-box;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;background-color:#FCFBFB;z-index:" + (slot.length - i));
    }
    else {
        caseGrid.setAttribute("style", "box-sizing: border-box;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;background-color:#FDFDFD;z-index:" + (slot.length - i));
    }



    caseGrid.setAttribute("onmouseenter", "detCase(" + i + ", true)");
    caseGrid.setAttribute("onmouseleave", "detCase(" + i + "), false");
    gridContainer.appendChild(caseGrid);
};





class Batiment {
    constructor(nom, level, moneyGen, moneyStock, maxStock, upgradeTime, upgradeCost, currentUpgrade, restaurantDelay, banqueStock) {
        this.nom = nom;
        this.level = level;
        this.moneyGen = moneyGen;
        this.moneyStock = moneyStock;
        this.maxStock = maxStock;
        this.upgradeTime = upgradeTime;
        this.upgradeCost = upgradeCost;
        this.currentUpgrade = currentUpgrade;
        this.restaurantDelay = restaurantDelay;
        this.banqueStock = banqueStock;
    }
}





//======================LANCEMENT============================


if (localStorage.getItem("slot") != null) {
    slot = JSON.parse(localStorage.getItem("slot"));
    for (var i = 0; i < slot.length; i++) {
        if (slot[i] != 0) {
            document.querySelector('#case' + i).innerHTML = "<img src='picture/Batiments/" + slot[i].nom + ".png' alt='' class='bat-img'>";
        }

        if (slot[i].nom == "mairie") {
            document.querySelector("#max-bat-boutique").textContent = slot[i].level;
            document.querySelector("#max-bat-restaurant").textContent = slot[i].level;
            document.querySelector("#max-bat-banque").textContent = slot[i].level;
        }

        if (slot[i].nom != "mairie" && slot[i] != 0) {
            getNum = parseInt(document.querySelector("#current-bat-" + slot[i].nom).textContent);
            getNum += 1;
            document.querySelector("#current-bat-" + slot[i].nom).textContent = getNum;

        }

        if (slot[i].nom == "banque") {
            maxMoney += slot[i].banqueStock;

        }
    }
}
if (localStorage.getItem("money") != null) {
    currentMoney = parseInt(localStorage.getItem("money"));
    for (var i = 0; i < slot.length; i++) {
        if (slot[i].moneyStock > slot[i].maxStock / 10) {
            document.querySelector("#case" + i).style.backgroundColor = "green";
        }
        if (slot[i].nom == "boutique" && slot[i].moneyStock == slot[i].maxStock || slot[i].nom == "restaurant" && slot[i].moneyStock == slot[i].maxStock) {
            document.querySelector("#case" + i).style.backgroundColor = "crimson";
        }
        if (slot[i].currentUpgrade == true) {
            document.querySelector("#case" + i).style.backgroundColor = "orange";
        }


    }

}
document.querySelector("#current-money").textContent = currentMoney;
document.querySelector("#max-money").textContent = maxMoney;
money.style.width = currentMoney / maxMoney * 100 + "%";

console.log("lancé");






//---------------- DIALOGUE -------------------
var welcomeText = ["Bienvenue !", "Installer la mairie pour commencer"];
var escText = "Appuyez sur Échap (ESC) pour annuler";


function typeWriter(type) {
    let hasMairie = false;
    if (type == "a") {
        document.querySelector("#dialog-box").innerHTML = "";
        document.querySelector("#arrow-pass").style.display = "none";
        document.querySelector("#dialog-pass").style.display = "none";
    }

    for (var i = 0; i < slot.length; i++) {
        if (slot[i].nom == "mairie") {
            hasMairie = true;
        }

    }

    if (hasMairie == false) {

        if (welcomeText[textPos] == undefined) {
            placeBat("mairie");

        }

        if (letterPos < welcomeText[textPos].length) {
            document.querySelector("#dialog-box").innerHTML += welcomeText[textPos].charAt(letterPos);
            letterPos++;
            setTimeout(typeWriter, 25);
        }
        else {
            textPos += 1;
            letterPos = 0;
            document.querySelector("#arrow-pass").style.display = "block";
            document.querySelector("#dialog-pass").style.display = "block";
        }
    }

    if (document.querySelector('#on-placing').style.display == "block" || ameliorer == true) {
        document.querySelector("#dialog-box").innerHTML += escText.charAt(letterPos);
        letterPos++;
        setTimeout(typeWriter, 25);
    }




}
typeWriter();




//----------------- MENU ----------------------
var menuOpened = "";

function openMenu(menuId) {
    if (document.querySelector('#' + menuId).style.display == "") {
        document.querySelector("body").style.overflow = "hidden";
        document.querySelector('#' + menuId).style.display = "block";
        document.querySelector('#close-menu').style.display = "block";
        menuOpened = menuId;
        document.querySelector("main").classList.remove("dragscroll");

        if (ameliorer == false) {
            if (slot[selectedBat].nom == "boutique" || slot[selectedBat].nom == "restaurant") {
                document.querySelector("#money-gen-" + slot[selectedBat].nom).innerHTML = slot[selectedBat].moneyGen * 12;
                document.querySelector("#money-stock-" + slot[selectedBat].nom).innerHTML = slot[selectedBat].moneyStock;
                document.querySelector("#money-max-" + slot[selectedBat].nom).innerHTML = slot[selectedBat].maxStock;
            }

            if (slot[selectedBat].nom == "restaurant") {
                document.querySelector("#money-gen-" + slot[selectedBat].nom).innerHTML = slot[selectedBat].moneyGen / 2;
            }

            if (slot[selectedBat].nom == "banque") {
                document.querySelector("#stock-banque").innerHTML = slot[selectedBat].banqueStock;
            }

            document.querySelector("#level-" + slot[selectedBat].nom).innerHTML = slot[selectedBat].level;
        }



    }
    else if (document.querySelector('#' + menuId).style.display == "block") {
        closeMenu();
    }

}

function closeMenu() {
    document.querySelector("body").style.overflow = "scroll";
    document.querySelector('#' + menuOpened).style.display = "";
    document.querySelector('#close-menu').style.display = "";
    menuOpened = "";
    document.querySelector("main").classList.add("dragscroll");
    if (ameliorer == false && slot[selectedBat].nom != "artisan" && slot[selectedBat].nom != "restaurant" && slot[selectedBat].nom != "banque") {
        document.querySelector("#menu-bis-" + slot[selectedBat].nom).style.display = "none";
        document.querySelector("#info-" + slot[selectedBat].nom).style.display = "block";
    }

    if (ameliorer == true) {
        document.querySelector("#menu-bis-artisan").style.display = "none";
        document.querySelector("#info-artisan").style.display = "block";
        document.querySelector("#case" + selectedBat).style.border = "";
        selectedBat = -1;
        document.querySelector("#ameliorer-boutique").style.display = "none";
        document.querySelector("#ameliorer-banque").style.display = "none";
    }


    if (ameliorer == false && slot[selectedBat].nom == "mairie") {
        document.querySelector("#menu-" + slot[selectedBat].nom).textContent = "Mairie";
    }

}


function changeMenu() {
    document.querySelector("#menu-bis-" + slot[selectedBat].nom).style.display = "flex";
    document.querySelector("#info-" + slot[selectedBat].nom).style.display = "none";
    if (slot[selectedBat].nom == "mairie") {
        document.querySelector("#menu-" + slot[selectedBat].nom).textContent = "Bâtiments";
    }
}

//---------------------------------------------


function placeBat(bat) {
    if (bat == "mairie") {
        placeBatType = bat;
        document.querySelector('#on-placing').style.display = "block";
        document.querySelector('#' + menuOpened).style.display = "";
        document.querySelector('#close-menu').style.display = "";
        menuOpened = "";
        document.querySelector("main").classList.add("dragscroll");
        letterPos = 0;
        typeWriter();
    }
    else {
        getNum = parseInt(document.querySelector("#current-bat-" + bat).textContent);
        maxNum = parseInt(document.querySelector("#max-bat-" + bat).textContent);
        if (getNum < maxNum && currentMoney >= parseInt(document.querySelector("#cout-bat-" + bat).textContent)) {
            placeBatType = bat;
            document.querySelector('#on-placing').style.display = "block";
            document.querySelector('#' + menuOpened).style.display = "";
            document.querySelector('#close-menu').style.display = "";
            menuOpened = "";
            document.querySelector("main").classList.add("dragscroll");
            letterPos = 0;
            typeWriter();
            document.querySelector("#on-placing-img").setAttribute("src", "picture/Batiments/" + bat + ".png");
        }
    }



}

var ameliorer = false;

function detCase(id, state) {
    if (document.querySelector('#on-placing').style.display == "block" || ameliorer == true) {
        if (state == true && slot[id] == 0 || state == true && ameliorer == true) {
            document.querySelector('#case' + id).style.border = "solid";
        }
        else {
            document.querySelector('#case' + id).style.border = "";
        }
    }

    onCase = id;
}




function ameliorerBat() {
    ameliorer = true;
    document.querySelector("#menu-button").removeAttribute("onclick");
    document.querySelector("#open-menu-" + slot[selectedBat].nom).style.display = "none";
    document.querySelector("#case" + selectedBat).style.border = "";
    closeMenu();
    selectedBat = -1;
    letterPos = 0;
    typeWriter();
}


document.querySelector("main").addEventListener("mousemove", function (event) {
    if (document.querySelector('#on-placing').style.display == "block") {
        document.querySelector('#on-placing').style.left = event.pageX + 'px';
        document.querySelector('#on-placing').style.top = event.pageY + 'px';
        if (selectedBat != -1 && document.querySelector("#open-menu-" + slot[selectedBat].nom) != undefined) {
            document.querySelector("#open-menu-" + slot[selectedBat].nom).style.display = "none";
            document.querySelector("#menu-button").removeAttribute("onclick");
            document.querySelector("#case" + selectedBat).style.border = "";
            selectedBat = -1;
        }

    }
    if (document.querySelector('#on-placing').style.display == "block" && esc == true) {
        esc = false;
        document.querySelector('#on-placing').style.display = "";
        document.querySelector('#case' + onCase).style.border = "";
        document.querySelector("#dialog-box").innerHTML = "";

    }

})

var mousePosX = 0;
var mousePosY = 0;

document.addEventListener("mousedown", function (event) {
    mousePosX = event.pageX;
    mousePosY = event.pageY;
})


document.addEventListener("mouseup", function (event) {
    let currentMousePosX = event.pageX;
    let currentMousePosY = event.pageY;

    //---------------Sélection de batiment------------------
    if (document.querySelector('#case' + onCase).style.border == "" && slot[onCase] != 0 && mousePosX == currentMousePosX && mousePosY == currentMousePosY) {
        if (selectedBat != onCase && selectedBat != -1) {
            document.querySelector("#open-menu-" + slot[selectedBat].nom).style.display = "none";
        }

        //-----------Récupération aregnt-----------
        if (document.querySelector('#case' + onCase).style.backgroundColor == "green" && currentMoney != maxMoney || document.querySelector('#case' + onCase).style.backgroundColor == "crimson" && currentMoney != maxMoney) {
            if (slot[onCase].moneyStock > maxMoney - currentMoney) {
                slot[onCase].moneyStock -= maxMoney - currentMoney;
                currentMoney = maxMoney;
                if (slot[onCase].moneyStock < slot[onCase].maxStock) {
                    document.querySelector('#case' + onCase).style.backgroundColor = "green";
                }

            }
            else {
                if (i % 2 == 0) {
                    document.querySelector('#case' + onCase).style.backgroundColor = "#FDFDFD";
                }
                else {
                    document.querySelector('#case' + onCase).style.backgroundColor = "#FCFBFB";
                }
                currentMoney += slot[onCase].moneyStock;
                slot[onCase].moneyStock = 0;
            }


        }
        else {
            selectedBat = onCase;
        }
        //------------------------------------------
    }
    else if (document.querySelector('#case' + onCase).style.border == "solid" && slot[onCase] != 0 && mousePosX == currentMousePosX && mousePosY == currentMousePosY && ameliorer == false) {
        document.querySelector("#menu-button").removeAttribute("onclick");
        document.querySelector("#open-menu-" + slot[selectedBat].nom).style.display = "none";
        selectedBat = -1;
    }

    if (slot[selectedBat] != undefined && ameliorer == false) {
        if (slot[selectedBat].currentUpgrade == false) {
            document.querySelector("#menu-button").setAttribute("onclick", "openMenu('" + slot[selectedBat].nom + "Menu')");
        }
        document.querySelector("#open-menu-" + slot[selectedBat].nom).style.display = "block";
    }


    //------------------------------------------------


    //-------------Placement de batiment----------------
    if (document.querySelector('#on-placing').style.display == "block" && document.querySelector('#case' + onCase).style.border == "solid" && mousePosX == currentMousePosX && mousePosY == currentMousePosY && slot[onCase] == 0) {
        if (placeBatType == "mairie" || placeBatType == "artisan") {
            slot[onCase] = new Batiment(placeBatType, 1, undefined, undefined, undefined, 120, 2000, false, undefined, undefined);
        }
        else if (placeBatType == "boutique") {
            slot[onCase] = new Batiment(placeBatType, 1, 5, 0, 500, 36, 1400, false, undefined, undefined);

        }
        else if (placeBatType == "banque") {
            slot[onCase] = new Batiment(placeBatType, 1, undefined, undefined, undefined, 60, 1900, false, undefined, 1000);

            maxMoney += 1000;
            document.querySelector("#max-money").innerHTML = maxMoney;
        }
        else if (placeBatType == "restaurant") {
            slot[onCase] = new Batiment(placeBatType, 1, 150, 0, 1500, 90, 1800, false, 25, undefined);
        }

        if (placeBatType != "mairie") {
            getNum = parseInt(document.querySelector("#current-bat-" + placeBatType).textContent);
            getNum += 1;
            document.querySelector("#current-bat-" + placeBatType).textContent = getNum;
            currentMoney -= parseInt(document.querySelector("#cout-bat-" + placeBatType).textContent);
        }

        document.querySelector('#dialog-box').innerHTML = "";
        document.querySelector('#on-placing').style.display = "";
        document.querySelector('#case' + onCase).style.border = "";


    }

    //------------------------------------------------

    //--------------------Amélioration--------------------------
    if (ameliorer == true && document.querySelector('#case' + onCase).style.border == "solid" && mousePosX == currentMousePosX && mousePosY == currentMousePosY && slot[onCase] != 0 && document.querySelector("#artisanMenu").style.display != "block") {
        openMenu("artisanMenu");
        document.querySelector("#menu-bis-artisan").style.display = "block";
        document.querySelector("#info-artisan").style.display = "none";
        document.querySelector("#menu-artisan").textContent = slot[onCase].nom.charAt(0).toUpperCase() + slot[onCase].nom.slice(1);
        selectedBat = onCase;

        if (slot[selectedBat].nom == "boutique" || slot[selectedBat].nom == "restaurant") {
            document.querySelector("#ameliorer-boutique").style.display = "block";

            document.querySelector("#money-gen-ameliorer").textContent = slot[selectedBat].moneyGen * 12;
            document.querySelector("#money-gen-ameliorer-bis").textContent = slot[selectedBat].moneyGen * 12 * 1.5;

            document.querySelector("#money-max-ameliorer").textContent = slot[selectedBat].maxStock;
            document.querySelector("#money-max-ameliorer-bis").textContent = slot[selectedBat].maxStock * 1.5;


        }
        else if (slot[selectedBat].nom == "banque") {
            document.querySelector("#ameliorer-banque").style.display = "block";
            document.querySelector("#stock-ameliorer").textContent = slot[selectedBat].banqueStock;
            document.querySelector("#stock-ameliorer-bis").textContent = slot[selectedBat].banqueStock * 1.5;

        }

        document.querySelector("#level-ameliorer").textContent = slot[selectedBat].level;
        document.querySelector("#level-ameliorer-bis").textContent = slot[selectedBat].level + 1;

        document.querySelector("#cout-ameliorer").textContent = slot[selectedBat].upgradeCost;

    }





    for (var i = 0; i < slot.length; i++) {
        if (slot[i] != 0) {
            document.querySelector('#case' + i).innerHTML = "<img src='picture/Batiments/" + slot[i].nom + ".png' alt='' class='bat-img'>";
        }
        if (i == selectedBat) {
            document.querySelector('#case' + i).style.border = "solid";
        }
        if (i != selectedBat && mousePosX == currentMousePosX && mousePosY == currentMousePosY && ameliorer == false) {
            document.querySelector('#case' + i).style.border = "";
        }
    }

    document.querySelector("#current-money").textContent = currentMoney;
    document.querySelector("#max-money").textContent = maxMoney;
    money.style.width = currentMoney / maxMoney * 100 + "%";

})

function lancementAmeliorer() {
    if (slot[selectedBat].upgradeCost <= currentMoney) {
        slot[selectedBat].currentUpgrade = true;
        ameliorer = false;
        document.querySelector("#case" + onCase).style.border = "";
        document.querySelector("#dialog-box").innerHTML = "";
        document.querySelector("#case" + selectedBat).style.backgroundColor = "orange";
        document.querySelector("#menu-bis-artisan").style.display = "none";
        document.querySelector("#menu-bis-artisan").style.display = "block";
        closeMenu();
        currentMoney -= slot[selectedBat].upgradeCost;
        document.querySelector("#current-money").textContent = currentMoney;
        money.style.width = currentMoney / maxMoney * 100 + "%";


        if (slot[selectedBat].nom == "boutique" || slot[selectedBat].nom == "restaurant") {
            slot[selectedBat].moneyGen *= 12 * 1.5;

            slot[selectedBat].maxStock *= 1.5;

        }
        else if (slot[selectedBat].nom == "banque") {
            slot[selectedBat].banqueStock *= 1.5;


        }
        else if (slot[selectedBat].nom == "mairie") {
            maxNum = parseInt(document.querySelector("#max-bat-boutique").textContent) + 1;
            document.querySelector("#max-bat-boutique").textContent = maxNum;
            document.querySelector("#max-bat-restaurant").textContent = maxNum;
            document.querySelector("#max-bat-banque").textContent = maxNum;

        }

        slot[selectedBat].level += 1;

    }


}


function recupMoney() {
    if (slot[selectedBat].moneyStock > maxMoney - currentMoney) {
        slot[selectedBat].moneyStock -= maxMoney - currentMoney;
        currentMoney = maxMoney;
        if (slot[selectedBat].moneyStock < slot[selectedBat].maxStock) {
            document.querySelector('#case' + selectedBat).style.backgroundColor = "green";
        }

    }
    else {
        if (i % 2 == 0) {
            document.querySelector('#case' + selectedBat).style.backgroundColor = "#FDFDFD";
        }
        else {
            document.querySelector('#case' + selectedBat).style.backgroundColor = "#FCFBFB";
        }
        currentMoney += slot[selectedBat].moneyStock;
        slot[selectedBat].moneyStock = 0;
        document.querySelector("#money-stock-" + slot[selectedBat].nom).innerHTML = slot[selectedBat].moneyStock;
        document.querySelector("#current-money").textContent = currentMoney;
        money.style.width = currentMoney / maxMoney * 100 + "%";
    }
}


document.querySelector("main").addEventListener("click", function (event) {
    if (mousePosX == currentMousePosX && mousePosY == currentMousePosY && document.querySelector("#menu-button").hasAttribute("onclick")) {
        document.querySelector("#menu-button").removeAttribute("onclick");
        document.querySelector("#open-menu-" + slot[selectedBat].nom).style.display = "none";
        document.querySelector("#case" + selectedBat).style.border = "";
        selectedBat = -1;
    }

})





document.querySelector("main").scrollTop = document.querySelector("main").scrollHeight / 3.5;
document.querySelector("main").scrollLeft = document.querySelector("main").scrollWidth / 4;

var scale = 1;



window.addEventListener("wheel", function (event) {
    if (document.querySelector('#close-menu').style.display == "") {
        if (event.deltaY < 0) {
            if (scale < 3.5) {
                for (var i = 0; i < 50; i++) {
                    scale += 0.001;
                }
            }
        }
        if (event.deltaY > 0) {
            if (scale > 0.5) {
                for (var i = 0; i < 50; i++) {
                    scale -= 0.001;
                }
            }
        }



        document.querySelector(".grid-container").style.transform = "scale(" + scale + ") rotate(-45deg) skew(10deg, 10deg)";
        document.querySelector(".grid-container").style.margin = (40 * scale) + "% " + (70 * scale) + "%";
        document.querySelector("#on-placing").style.transform = "scale(" + scale + ") translate(" + (-50 / scale) + "%," + (-50 / scale) + "%)";
    }
})










//========================================================
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
};

var score = 0;

var slot1 = [
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 1, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
];

var gridContainer = document.querySelector(".grid-snake");

for (var i in slot1) {
    var caseGrid = document.createElement("div");
    caseGrid.id = "casee" + i;
    //caseGrid.textContent = i;
    gridContainer.appendChild(caseGrid);
};

var pos = 40;
var direction = undefined;
var dir = "droite";
var cc = -1;

perdu = false;

setInterval(function () {

    if (perdu == false) {

        cc = pos;

        if (direction == "droite") {
            if (dir == "gauche" && score > 0) {
                direction = "gauche";
                if (pos % 9 != 0) {
                    slot1[pos] = 0;
                    pos -= 1;
                    if (slot1[pos] == -1) {
                        getNum = parseInt(document.querySelector("#argent-recolte").textContent);
                        getNum += score;
                        document.querySelector("#argent-recolte").textContent = getNum;
                        score++;
                        apple();
                    }
                    else if (slot1[pos] > 1) {
                        document.querySelector("#perdu-text").style.display = "block";
                        perdu = true;

                    }
                    slot1[pos] = 1;
                    dir = "gauche";
                }
                else {
                    document.querySelector("#perdu-text").style.display = "block";
                    perdu = true;

                }
            }
            else {
                if (pos % 9 != 8) {
                    slot1[pos] = 0;
                    pos += 1;
                    if (slot1[pos] == -1) {
                        getNum = parseInt(document.querySelector("#argent-recolte").textContent);
                        getNum += score;
                        document.querySelector("#argent-recolte").textContent = getNum;
                        score++;
                        apple();
                    }
                    else if (slot1[pos] > 1) {

                    }
                    slot1[pos] = 1;
                    dir = "droite";
                }
                else {
                    document.querySelector("#perdu-text").style.display = "block";
                    perdu = true;

                }
            }


        }

        else if (direction == "gauche") {
            if (dir == "droite" && score > 0) {
                direction = "droite";
                if (pos % 9 != 8) {
                    slot1[pos] = 0;
                    pos += 1;
                    if (slot1[pos] == -1) {
                        getNum = parseInt(document.querySelector("#argent-recolte").textContent);
                        getNum += score;
                        document.querySelector("#argent-recolte").textContent = getNum;
                        score++;
                        apple();
                    }
                    else if (slot1[pos] > 1) {
                        document.querySelector("#perdu-text").style.display = "block";
                        perdu = true;

                    }
                    slot1[pos] = 1;
                    dir = "droite";
                }
                else {
                    document.querySelector("#perdu-text").style.display = "block";
                    perdu = true;

                }
            }
            else {
                if (pos % 9 != 0) {
                    slot1[pos] = 0;
                    pos -= 1;
                    if (slot1[pos] == -1) {
                        getNum = parseInt(document.querySelector("#argent-recolte").textContent);
                        getNum += score;
                        document.querySelector("#argent-recolte").textContent = getNum;
                        score++;
                        apple();
                    }
                    else if (slot1[pos] > 1) {
                        document.querySelector("#perdu-text").style.display = "block";
                        perdu = true;

                    }
                    slot1[pos] = 1;
                    dir = "gauche";
                }
                else {
                    document.querySelector("#perdu-text").style.display = "block";
                    perdu = true;

                }
            }


        }

        else if (direction == "haut") {
            if (dir == "bas" && score > 0) {
                direction = "bas";
                if (pos < 72) {
                    slot1[pos] = 0;
                    pos += 9;
                    if (slot1[pos] == -1) {
                        getNum = parseInt(document.querySelector("#argent-recolte").textContent);
                        getNum += score;
                        document.querySelector("#argent-recolte").textContent = getNum;
                        score++;
                        apple();
                    }
                    else if (slot1[pos] > 1) {
                        document.querySelector("#perdu-text").style.display = "block";
                        perdu = true;

                    }
                    slot1[pos] = 1;
                    dir = "bas";
                }
                else {
                    document.querySelector("#perdu-text").style.display = "block";
                    perdu = true;

                }
            }
            else {
                if (pos > 8) {
                    slot1[pos] = 0;
                    pos -= 9;
                    if (slot1[pos] == -1) {
                        getNum = parseInt(document.querySelector("#argent-recolte").textContent);
                        getNum += score;
                        document.querySelector("#argent-recolte").textContent = getNum;
                        score++;
                        apple();
                    }
                    else if (slot1[pos] > 1) {
                        document.querySelector("#perdu-text").style.display = "block";
                        perdu = true;

                    }
                    slot1[pos] = 1;
                    dir = "haut";
                }
                else {
                    document.querySelector("#perdu-text").style.display = "block";
                    perdu = true;

                }
            }


        }

        else if (direction == "bas") {
            if (dir == "haut" && score > 0) {
                direction = "haut";
                if (pos > 8) {
                    slot1[pos] = 0;
                    pos -= 9;
                    if (slot1[pos] == -1) {
                        getNum = parseInt(document.querySelector("#argent-recolte").textContent);
                        getNum += score;
                        document.querySelector("#argent-recolte").textContent = getNum;
                        score++;
                        apple();
                    }
                    else if (slot1[pos] > 1) {
                        document.querySelector("#perdu-text").style.display = "block";
                        perdu = true;

                    }
                    slot1[pos] = 1;
                    dir = "haut";
                }
                else {
                    document.querySelector("#perdu-text").style.display = "block";
                    perdu = true;

                }
            }
            else {
                if (pos < 72) {
                    slot1[pos] = 0;
                    pos += 9;
                    if (slot1[pos] == -1) {
                        getNum = parseInt(document.querySelector("#argent-recolte").textContent);
                        getNum += score;
                        document.querySelector("#argent-recolte").textContent = getNum;
                        score++;
                        apple();
                    }
                    else if (slot1[pos] > 1) {
                        document.querySelector("#perdu-text").style.display = "block";
                        perdu = true;

                    }
                    slot1[pos] = 1;
                    dir = "bas";
                }
                else {
                    document.querySelector("#perdu-text").style.display = "block";
                    perdu = true;

                }
            }


        }



        for (var j = 2; j < score + 2; j++) {
            if (j % 2 == 0) {
                aa = slot1.indexOf(j);
                slot1[slot1.indexOf(j)] = 0;
                slot1[cc] = j;
            }
            else {
                cc = slot1.indexOf(j);
                slot1[slot1.indexOf(j)] = 0;
                slot1[aa] = j;
            }

        }




        for (var i = 0; i < slot1.length; i++) {
            if (slot1[i] == 1) {
                document.querySelector("#casee" + i).style.backgroundColor = "orange";
            }
            else if (slot1[i] > 1) {
                document.querySelector("#casee" + i).style.backgroundColor = "blue";
            }
            else if (slot1[i] == -1) {
                document.querySelector("#casee" + i).style.backgroundColor = "red";
            }
            else {
                if (i % 2 == 0) {
                    document.querySelector("#casee" + i).style.backgroundColor = "green";
                }
                else {
                    document.querySelector("#casee" + i).style.backgroundColor = "lightgreen";
                }
            }
        }
        document.querySelector("#score").textContent = score;
    }
}, 300)

document.addEventListener("keydown", (event) => {
    if (perdu == false) {
        if (event.keyCode === 37) {
            //gauche
            direction = "gauche";
        }
        if (event.keyCode === 38) {
            //haut
            direction = "haut";

        }
        if (event.keyCode === 39) {
            //droite
            direction = "droite";

        }
        if (event.keyCode === 40) {
            //bas
            direction = "bas";

        }
    }


});

function apple() {
    let random = getRandomInt(81)
    if (slot1[random] != 0) {
        apple();
    }
    else {
        slot1[random] = -1;
    }

}

function reload() {
    if (parseInt(document.querySelector("#argent-recolte").textContent) > maxMoney - currentMoney) {
        currentMoney = maxMoney;
    }
    else {
        currentMoney += parseInt(document.querySelector("#argent-recolte").textContent);
    }
    document.querySelector("#argent-recolte").textContent = 0;
    document.querySelector("#current-money").textContent = currentMoney;
    money.style.width = currentMoney / maxMoney * 100 + "%";
    slot1 = [
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];
    document.querySelector("#perdu-text").style.display = "none";
    score = 0;
    pos = 40;
    direction = undefined;
    dir = "droite";
    cc = -1;
    aa = -1;

    perdu = false;
    if (slot.indexOf(-1) == -1) {
        apple();
    }

    for (var i = 0; i < slot1.length; i++) {
        if (slot1[i] == 1) {
            document.querySelector("#casee" + i).style.backgroundColor = "orange";
        }
        else if (slot1[i] > 1) {
            document.querySelector("#casee" + i).style.backgroundColor = "blue";
        }
        else if (slot1[i] == -1) {
            document.querySelector("#casee" + i).style.backgroundColor = "red";
        }
        else {
            if (i % 2 == 0) {
                document.querySelector("#casee" + i).style.backgroundColor = "green";
            }
            else {
                document.querySelector("#casee" + i).style.backgroundColor = "lightgreen";
            }
        }
    }

}

apple();