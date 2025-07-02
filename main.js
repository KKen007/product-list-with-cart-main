

let add_btns = document.querySelectorAll(".add-btn");
let crd_slt = document.querySelector(".crd-slt");
let crd_slt_grd = document.querySelector(".crd-slt-grd");
let crd_slt_ctn = document.querySelector(".crd-slt-ctn");
let crd_slt_btm = document.querySelector(".crd-slt-btm");
let ord_crd_slt_grd = document.querySelector(".ord-crd-slt-grd");

// Add Events For All Add Button

add_btns.forEach(add_btn => {
    let crd = add_btn.parentElement.parentElement;
    let dec_btn = crd.querySelector(".dec-btn");
    let inc_btn = crd.querySelector(".inc-btn");
    let qtt = crd.querySelector(".qtt");

    add_btn.addEventListener("click", () => {
        
        crd.setAttribute("data-slt", "true");
        crd_slt_ctn.setAttribute("data-empty", "false");

        let new_crd_slt = crd_slt.cloneNode(true);

        new_crd_slt.style.display = "flex";
        new_crd_slt.querySelector(".crd-slt-ttl").textContent = crd.querySelector(".crd-nme").textContent;
        new_crd_slt.querySelector(".qtt-slt").textContent = crd.querySelector(".qtt").textContent + "x";
        new_crd_slt.querySelector(".crd-prc").textContent = "@ " + crd.querySelector(".crd-prc").textContent;
        new_crd_slt.querySelector(".qtt-slt-prc").textContent = "$" + parseInt(crd.querySelector(".qtt").textContent)*parseFloat(crd.querySelector(".crd-prc").textContent);

        crd_slt_grd.appendChild(new_crd_slt); 
        ord_crd_slt_grd.appendChild(new_crd_slt); 

        function ttl_prc() {
            let crd_slts = crd_slt_grd.querySelectorAll(".crd-slt");
            let ttl_prc = 0;

            for ( let i = 1; i < crd_slts.length; i++ ) {
                let qtt_slt_val = crd_slts[i].querySelector(".qtt-slt-prc").textContent.replace("$", "") ;
                ttl_prc = ttl_prc + parseFloat(qtt_slt_val);
                crd_slt_btm.querySelector(".ttl-prc").textContent = "$" + ttl_prc;
            }
        }

        ttl_prc();


        dec_btn.addEventListener("click", () => {
            if ( qtt.textContent > 0 ) {
                parseInt(qtt.textContent--);
                new_crd_slt.querySelector(".qtt-slt").textContent = qtt.textContent + "x";
                new_crd_slt.querySelector(".qtt-slt-prc").textContent = "$" + parseFloat(crd.querySelector(".qtt").textContent)*parseFloat(crd.querySelector(".crd-prc").textContent) ;
                ttl_prc();
            }

            if ( qtt.textContent == 0 ) {
                if ( crd_slt_grd.contains(new_crd_slt) ) {
                    crd_slt_grd.removeChild(new_crd_slt);
                }

                let crd_slts = crd_slt_grd.querySelectorAll(".crd-slt");
                if ( crd_slts.length == 1 ) {
                    crd_slt_ctn.setAttribute("data-empty", "true");
                }
            }
        });

        inc_btn.addEventListener("click", () => {
            parseInt(qtt.textContent++);
            new_crd_slt.querySelector(".qtt-slt").textContent = qtt.textContent + "x";
            new_crd_slt.querySelector(".qtt-slt-prc").textContent = "$" + parseFloat(crd.querySelector(".qtt").textContent)*parseFloat(crd.querySelector(".crd-prc").textContent);
            ttl_prc();
            crd_slt_ctn.setAttribute("data-empty", "false");
            
            if ( !crd_slt_grd.contains(new_crd_slt) ) {
                crd_slt_grd.appendChild(new_crd_slt); 
            }
        });

        new_crd_slt.querySelector(".rmv-btn").addEventListener("click", () => {
            qtt.textContent = 0;

            if ( crd_slt_grd.contains(new_crd_slt) ) {
                crd_slt_grd.removeChild(new_crd_slt);
                let ttl_prc_rmv = parseFloat(crd_slt_btm.querySelector(".ttl-prc").textContent.replace("$", "")) - parseFloat(new_crd_slt.querySelector(".qtt-slt-prc").textContent.replace("$", ""));
                
                crd_slt_btm.querySelector(".ttl-prc").textContent = "$" + ttl_prc_rmv;

                let crd_slts = crd_slt_grd.querySelectorAll(".crd-slt");
                if ( crd_slts.length == 1 ) {
                    crd_slt_ctn.setAttribute("data-empty", "true");
                }
            }
        });    
    }); 
});


