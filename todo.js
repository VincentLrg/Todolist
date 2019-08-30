class SimpleItem{
    constructor(){
        //Création de la liste et de ses items
        this.list = document.querySelector("#todo");
        this.item = document.createElement("li");

        //Création de l'input (checkbox) de la tâche, de son label, et des outils (supprimer, modifier)
        this.input = this.createInput();
        this.label;
        this.tools = this.createTools();
        //Type de la tâche
        this.taskType = "simple";

        //Création de l'input de saisie (saisie du label)
        this.saisie = document.createElement("input");
        this.saisie.type = "text";

        //On donne l'item tout ses composants créer au dessus
        this.item.appendChild(this.input);
        this.item.appendChild(this.saisie);
        this.item.appendChild(this.tools);

        //On ajoute l'item à la liste
        this.list.appendChild(this.item);

        //Validation de la tâche et donc suppression de celle-ci de la liste
        this.buttonValid.addEventListener("click", function(){
            this.list.removeChild(this.item);
        }.bind(this));
        //Suppression de la tâche dans la liste
        this.buttonDelete.addEventListener("click", function(){
            this.list.removeChild(this.item);
        }.bind(this));
        //Edit du label de la tâche
        this.buttonEdit.addEventListener("click", function(){
            this.saisie.value= "";
            this.item.replaceChild(this.saisie, this.label);
        }.bind(this));
        //Quand un label est entré dans la saisie, remplace l'input de saisie par le label entré
        this.saisie.addEventListener("change", function(){
            this.label= this.createLabel(this.saisie.value);
            this.item.replaceChild(this.label, this.saisie);
            this.saveTaskSimple();
        }.bind(this));

        //Au clique sur le bouton remove, tous les items avec leur cases cochés se voit supprimer
        document.querySelector("#remove").addEventListener("click", function(){
            if(this.input.checked == true){
                this.list.removeChild(this.item);
            }
        }.bind(this))
    } 

    //Création de l'input (checkbox)
    createInput(){
        let input = document.createElement("input");
        input.type="checkbox";
        return input;
    }
    //Création du label
    createLabel(texte){
        let label = document.createElement("span");
        label.innerHTML= texte;
        return label;
    }
    //Création de la boite à outils (validation, suppression, edit)
    createTools(){
        let divTools = document.createElement("div");
        divTools.className = "tools";

        this.buttonValid = document.createElement("button");
        this.buttonValid.className = "checked";

        this.buttonEdit = document.createElement("button");
        this.buttonEdit.className = "edit";

        this.buttonDelete = document.createElement("button");
        this.buttonDelete.className = "delete";
        
        divTools.appendChild(this.buttonValid);
        divTools.appendChild(this.buttonEdit);
        divTools.appendChild(this.buttonDelete);

        return divTools;
    }
    //Methode de stockage non concluant
    
    // saveTaskSimple(){
    //     if(this.taskType=="simple"){
    //         if(localStorage.getItem('simpleTodo')== null)
    //         {
    //             var labelSimple = [this.label.innerHTML];
    //             localStorage.setItem('simpleTodo', JSON.stringify(labelSimple));
    //         }
    //         else{
    //             var localData= JSON.parse(localStorage.getItem('simpleTodo'))
    //             localData += [this.label.innerHTML];
    //             localStorage.setItem("simpleTodo", localData);
    //         }
    //     }
    // }
}

class ChronoItem extends SimpleItem{
    constructor(){
        //Import de tous les attributs et méthodes de SimpleItem
        super();
        //Création d'un attribut pour le temps restant
        this.diffTime = 0;

        //Création d'un calendrier pour choisir la date de fin de la tâche
        this.timePicker = this.createTimePicker();
        //Crée le badge montrant le temps restant
        this.chrono = this.createChrono();

        this.item.insertBefore(this.timePicker, this.item.childNodes[2]);
        //Le bouton d'edit permet aussi d'éditer le calendrier
        this.buttonEdit.addEventListener("click", function(){
            this.timePicker.value = "";
            this.item.replaceChild(this.timePicker, this.chrono);
        }.bind(this));
        //Quand on a un changement dans le sélecteur de date, créer la différence entre aujourd'hui et la date butoir
        this.timePicker.addEventListener("change", function(){
            let today = new Date();
            let then = new Date(this.timePicker.value);

            this.diffTime = (then.getTime() - today.getTime())/(1000*3600*24);
            this.chrono = this.createChrono();
            this.item.replaceChild(this.chrono, this.timePicker);
        }.bind(this));
    }
    //Création du calendrier
    createTimePicker(){
        let picker = document.createElement("input");
        picker.type = "date";
        return picker;
    }
    //Création du badge de temps restant pour la tâche
    createChrono(){
        let span = document.createElement("span");
        span.className = "badge";
        
		let days = Math.floor(this.diffTime).toString();
		span.textContent = days ; 
		span.textContent += days <= 1 ? " jour" : " jours";
		
		if (this.diffTime <= 2)
			span.className += " badge-danger";
		else if (this.diffTime > 2 && this.diffTime <= 7)
			span.className += " badge-warning";
		else
			span.className += " badge-success";
		return span;
    }
}
//Création d'une tâche simple au bouton correspondant
document.querySelector("#add").addEventListener("click", function(){
    new SimpleItem();
})
//Création d'une tâche chrono au bouton correspondant
document.querySelector("#addChrono").addEventListener("click", function(){
    new ChronoItem();
})

//Test de stockage non concluant

// if(localStorage.getItem('simpleTodo')!=null){
//     let localData= JSON.parse(localStorage.getItem('simpleTodo'));
//     console.log(localData);
//     for(let i=0;i<localData.length;i++){
//         let obj= new SimpleItem;
//         obj.saisie.value=localData[i];
//         obj.saisie.focus();
//     }
// }

