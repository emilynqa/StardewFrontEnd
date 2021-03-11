"use strict";

const contextPath = "http://localhost:8080";
const output = document.getElementById("output");

function getVillagers() {
    axios.get(contextPath + "/getVillagers")
    .then(res => {
        output.innerHTML = "";
        const villagers = res.data;

        villagers.forEach(villager => {
            const newVillager = renderVillager(villager);
            output.appendChild(newVillager);


        });
    }).catch(err => console.error(err))
}

function deleteVillager(id) {
    axios.delete(contextPath + "/removeVillager/" + id)
    .then(() => getVillagers())
    .catch(err => console.error(err));
}

function renderVillager(villager) {

    const newColumn = document.createElement("div");
    newColumn.className = "col";

    const newVillager = document.createElement("div");
    newVillager.className = "card";
    newColumn.appendChild(newVillager);

    const villagerBody = document.createElement("div");
    villagerBody.className = "card-body";
    newVillager.appendChild(villagerBody);

    const villagerTitle = document.createElement("h5");
    villagerTitle.className = "card-title";
    villagerTitle.innerText = villager.name;
    villagerBody.appendChild(villagerTitle);

    const villagerText = document.createElement("p");
    villagerText.className = "card-text";
    
    villagerText.innerHTML = "Birthday = " + villager.birthSeason + " " + villager.birthDay;
    villagerText.innerHTML += "<br>";
    villagerText.innerHTML += "Favourite Items: " + villager.faveItem;
    villagerText.innerHTML += "<br>";
    villagerText.innerHTML += "Least Favourite Items: " + villager.leastFaveItem;
    villagerBody.appendChild(villagerText);

    const villagerFooter = document.createElement("div");
    villagerFooter.className = "card-footer";
    newVillager.appendChild(villagerFooter);

    const deleteVillagerButton = document.createElement("a");

    deleteVillagerButton.className = "card-link";
    deleteVillagerButton.innerText = "Delete";
    deleteVillagerButton.addEventListener('click', function() {
        deleteVillager(villager.id);
    });

    villagerFooter.appendChild(deleteVillagerButton);

    const updateVillagerButton = document.createElement("a");

    updateVillagerButton.className = "card-link";
    updateVillagerButton.innerText = "Update";
    updateVillagerButton.addEventListener('click', function() {
        updateVillager(villager.id);
    });

    villagerFooter.appendChild(updateVillagerButton);

    return newColumn;

}


document.getElementById("villagerForm").addEventListener('submit', function (event) {
    event.preventDefault();

    const data = {
        name: this.villagerName.value,
        birthDay: this.birthDay.value,
        birthSeason: this.birthSeason.value,
        faveItem: this.faveItems.value,
        leastFaveItem: this.leastFaveItems.value
    };

    axios.post(contextPath + "/addVillager", data)
    .then(() => getVillagers())
    .catch(err => console.error(err));
});

getVillagers();


