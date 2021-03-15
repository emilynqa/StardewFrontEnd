"use strict";

const contextPath = "http://localhost:8080";
const output = document.getElementById("output");


const myModal = new bootstrap.Modal(document.getElementById('updateModal'), "show");


const myId = "";



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

function getDeets(id) {
    
    myModal.show();
    axios.get(contextPath + "/getVillager/" + id)
    .then(res => {
        const selectedVillager = res.data;
        document.getElementById("updateVillagerId").value = selectedVillager.id;
        document.getElementById("updateVillagerName").value = selectedVillager.name;
        document.getElementById("updateBirthDay").value = selectedVillager.birthDay;
        document.getElementById("updateBirthSeason").value = selectedVillager.birthSeason;
        document.getElementById("updateFaveItems").value = selectedVillager.faveItem;
        document.getElementById("updateLeastFaveItems").value = selectedVillager.leastFaveItem;


        //updateVillager(id, selectedVillager);


        



        

    }).catch(err => console.error(err))
    
}


//function updateVillager(id, updatedVillager) {

   // const updatedVillager = {
    //    name: this.updateVillagerName.value,
   //     birthDay: this.updateBirthDay.value,
   //     birthSeason: this.updateBirthSeason.value,
    //    faveItem: this.updateFaveItems.value,
   //     leastFaveItem: this.updateLeastFaveItems.value
  //  };
//

   // axios.put(contextPath + "/updateVillager/" + id, updatedVillager)
   // .then(() => getVillagers())
   // .catch(err => console.error(err));
//}




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

    villagerTitle.id = "card-title";

    villagerBody.appendChild(villagerTitle);

    const villagerText = document.createElement("p");
    villagerText.className = "card-text";

    villagerText.id = "card-text";
    villagerText.innerHTML = "Birthday: " + villager.birthSeason + " " + villager.birthDay;

    villagerText.innerHTML += "<br>";
    villagerText.innerHTML += "Favourite Items: " + villager.faveItem;
    villagerText.innerHTML += "<br>";
    villagerText.innerHTML += "Least Favourite Items: " + villager.leastFaveItem;
    villagerBody.appendChild(villagerText);

    const villagerFooter = document.createElement("div");
    villagerFooter.className = "card-footer";
    newVillager.appendChild(villagerFooter);


    const deleteVillagerButton = document.createElement("button");


    deleteVillagerButton.className = "card-link";
    deleteVillagerButton.innerText = "Delete";
    deleteVillagerButton.id = "Delete" + villager.name;
    deleteVillagerButton.addEventListener('click', function() {
        deleteVillager(villager.id);
    });

    villagerFooter.appendChild(deleteVillagerButton);


    const updateVillagerButton = document.createElement("button");

    updateVillagerButton.className = "card-link";
    updateVillagerButton.innerText = "Update";
    updateVillagerButton.id = "Update" + villager.name;    
    updateVillagerButton.addEventListener('click', function() {
        getDeets(villager.id);

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

document.getElementById("updateVillagerForm").addEventListener('submit', function (event) {
    event.preventDefault();

    const data = {
        id: this.updateVillagerId.value,
        name: this.updateVillagerName.value,
        birthDay: this.updateBirthDay.value,
        birthSeason: this.updateBirthSeason.value,
        faveItem: this.updateFaveItems.value,
        leastFaveItem: this.updateLeastFaveItems.value
    };

    const id = updateVillagerId.value;

    

    axios.put(contextPath + "/updateVillager/" + id, data)
    .then(() => getVillagers() + myModal.hide())
    .catch(err => console.error(err));
});

getVillagers();


