
import * as Mod from "./module.js";

let default_card = document.querySelector(".crd");
let default_card_selected = document.querySelector(".crd-slt");
let card_grid = document.querySelector(".crd-grd");
let card_selected_container = document.querySelector(".crd-slt-ctn");
let card_selected_grid = document.querySelector(".crd-slt-grd");
let default_order = document.querySelector(".order");
let order_grid = document.querySelector(".order-grid");
let order_confirmed = document.querySelector(".order-confirmed")

fetch("https://kken007.github.io/product-list-with-cart-main/data.json")
.then(response => response.json())
.then(cards => {
    for ( let i = 0; i < cards.length; i++  ) {
        //Creation des cartes.
        let card = default_card.cloneNode(true);
        let quantity = 1;

        //ajout des elements de chaque carte

        card.id = cards[i].id;
        card.querySelector(".crd-ctg").textContent = cards[i].category;
        card.querySelector(".crd-nme").textContent = cards[i].name;
        card.querySelector(".crd-prc").textContent = "$" + cards[i].price;

        card.querySelector(".crd-img").src = cards[i].image.mobile;

        //ajout de carte a la grid
        Mod.add_to(card, card_grid);

        //achat
        card.querySelector(".add-btn").addEventListener("click", () => {
            //la carte est selectionee
            card.setAttribute("data-slt", "true");
            card.querySelector(".qtt").textContent = quantity;
        
            //quelques fonction
            function card_selected_load() {
                card_selected.querySelector(".qtt-slt").textContent = quantity + "x";
                card_selected.querySelector(".crd-prc").textContent = "@ $" + cards[i].price;
                card_selected.querySelector(".qtt-slt-prc").textContent = "$" + quantity*cards[i].price;
            }

            function card_selected_number() {
                let number = card_selected_grid.querySelectorAll(".crd-slt").length;
                card_selected_container.querySelector(".crd-slt-nmb").textContent = number;
            }

            function total_price() {
                let card_selecteds = card_selected_grid.querySelectorAll(".crd-slt");
                let total_price_value = 0;

                for ( let i = 0;  i < card_selecteds.length; i++) {
                    total_price_value = total_price_value + parseFloat(card_selecteds[i].querySelector(".qtt-slt-prc").textContent.replace("$", ""));
                }

                card_selected_container.querySelector(".ttl-prc").textContent = "$" + total_price_value;
            }

            function card_selected_container_load() {
                if( card_selected_grid.querySelectorAll(".crd-slt").length == 0 ) {
                    card_selected_container.setAttribute("data-empty", "true");
                }
                else {
                    card_selected_container.setAttribute("data-empty", "false");
                }
            }

            ////choix de quantite
                //decrementation
                card.querySelector(".dec-btn").addEventListener("click", () => {
                    if ( quantity > 0 ) {
                        quantity--;
                    }

                    if ( quantity == 0 ) {
                        Mod.remove_to(card_selected, card_selected_grid);
                        card.querySelector(".qtt").style.color = "rgba(255, 255, 255, 0.501)";
                    }

                    card.querySelector(".qtt").textContent = quantity;
                    card_selected_load();
                    card_selected_number();
                    total_price();
                    card_selected_container_load();
                    
                });

                //incrementation
                card.querySelector(".inc-btn").addEventListener("click", () => {
                    card.querySelector(".qtt").style.color = "white";
                    quantity++;
                    Mod.add_to(card_selected, card_selected_grid);

                    card.querySelector(".qtt").textContent = quantity;
                    card_selected_load();
                    card_selected_number();
                    total_price();
                    card_selected_container_load();
                });
        
            //creation de cartes selectionees
            let card_selected = default_card_selected.cloneNode(true);
            card_selected.classList.add(card.id);

            //ajout des elements de chaque cartes selectionee
            card_selected.querySelector("a").textContent = cards[i].name;
            card_selected.querySelector(".qtt-slt").textContent = quantity + "x";
            card_selected.querySelector(".crd-prc").textContent = "@ $" + cards[i].price;
            card_selected.querySelector(".qtt-slt-prc").textContent = "$" + quantity*cards[i].price;
            card_selected.querySelector("a").href = "#" + cards[i].id;

            card_selected.querySelector("a").addEventListener("click", () => {
                card.querySelector(".crd-img").style.transform = "scale(1.1)";

                setTimeout(() => {
                    card.querySelector(".crd-img").style.transform = "scale(1)";
                }, 500);
            });
            
            //ajout de la carte aux cartes selectionees
            card_selected_container.setAttribute("data-empty", "false");
            Mod.add_to(card_selected, card_selected_grid);
            card_selected_container.querySelector(".crd-slt-nmb").textContent = card_selected_grid.querySelectorAll(".crd-slt").length;

            //Annuler choix
            card_selected.querySelector(".rmv-btn").addEventListener("click", () => {
                Mod.remove_to(card_selected, card_selected_grid);
                card.querySelector(".qtt").textContent = quantity;
                card_selected_load();
                card_selected_number();
                total_price();
                card_selected_container_load()
            });

            //calcul de la somme totale
            total_price();

            //reload la cartes container
            card_selected_container_load();

        });
    }

    //validation d'achat
    document.querySelector(".cfm-btn").addEventListener("click", () => {
        order_confirmed.setAttribute("data-empty", "false");
        card_selected_container.setAttribute("data-empty", "true");
        document.querySelector("main").style.filter = "blur(10px)";
        let card_selecteds = card_selected_grid.querySelectorAll(".crd-slt");
        let total_order = 0

        for ( let i = 0; i < card_selecteds.length; i++ ) {
            let order = default_order.cloneNode(true);

            order.querySelector(".order-image").src = document.getElementById(card_selecteds[i].classList[1]).querySelector(".crd-img").src.replace("mobile", "thumbnail");
            order.querySelector(".order-title").textContent = card_selecteds[i].querySelector("a").textContent;
            order.querySelector(".order-quantity").textContent = card_selecteds[i].querySelector(".qtt-slt").textContent;
            order.querySelector(".order-price").textContent = card_selecteds[i].querySelector(".crd-prc").textContent;
            order.querySelector(".order-total-price").textContent = card_selecteds[i].querySelector(".qtt-slt-prc").textContent;
            total_order = total_order + parseFloat(order.querySelector(".order-total-price").textContent.replace("$", ""));

            Mod.add_to(order, order_grid);

            order_confirmed.querySelector(".total-price").textContent = "$" + total_order;
        }

    });

    //autre achat
    document.querySelector(".start-new-order").addEventListener("click", () => {
        order_confirmed.setAttribute("data-empty", "true");
        document.querySelector("main").style.filter = "blur(0)";
        window.location.reload();
    });

    //supression order originale
    Mod.remove_to(default_order, order_grid);
    
    //suppression de la carte originale
    Mod.remove_to(default_card, card_grid);

    //suppresion de la carte selectionee originale
    Mod.remove_to(default_card_selected, card_selected_grid);
    card_selected_container.querySelector(".crd-slt-nmb").textContent = card_selected_grid.querySelectorAll(".crd-slt").length;
});

