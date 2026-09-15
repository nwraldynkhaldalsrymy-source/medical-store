document.addEventListener("DOMContentLoaded", function () {

    const products = document.querySelectorAll(".product-card");

    // =========================
    // البحث عن المنتجات
    // =========================

    const searchBox = document.querySelector(".product-tools input");

    if (searchBox) {

        searchBox.addEventListener("input", function () {

            const searchText = searchBox.value.trim().toLowerCase();

            products.forEach(function (product) {

                const title = product.querySelector("h3").textContent.toLowerCase();
                const description = product.querySelector("p").textContent.toLowerCase();

                if (
                    title.includes(searchText) ||
                    description.includes(searchText)
                ) {
                    product.style.display = "";
                } else {
                    product.style.display = "none";
                }

            });

        });

    }


    // =========================
    // نافذة تفاصيل المنتج
    // =========================

    const modal = document.createElement("div");

    modal.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.6);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        padding: 20px;
    `;

    modal.innerHTML = `
        <div style="
            background: white;
            width: 90%;
            max-width: 500px;
            padding: 25px;
            border-radius: 15px;
            text-align: center;
            direction: rtl;
            position: relative;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        ">

            <button id="closeProduct" style="
                position: absolute;
                top: 8px;
                left: 15px;
                border: none;
                background: none;
                font-size: 30px;
                color: #075da5;
                cursor: pointer;
            ">×</button>

            <img id="productImage" src="" alt="" style="
                width: 220px;
                height: 220px;
                object-fit: contain;
                margin-bottom: 15px;
            ">

            <h2 id="productTitle" style="
                color: #075da5;
                margin-bottom: 15px;
            "></h2>

            <p id="productDescription" style="
                color: #555;
                line-height: 1.8;
                margin-bottom: 15px;
            "></p>

            <strong id="productPrice" style="
                display: block;
                color: #075da5;
                font-size: 20px;
            "></strong>

        </div>
    `;

    document.body.appendChild(modal);


    // عناصر النافذة
    const productImage = document.getElementById("productImage");
    const productTitle = document.getElementById("productTitle");
    const productDescription = document.getElementById("productDescription");
    const productPrice = document.getElementById("productPrice");
    const closeProduct = document.getElementById("closeProduct");


    // =========================
    // زر عرض التفاصيل
    // =========================

    products.forEach(function (product) {

        const button = product.querySelector("a");

        button.addEventListener("click", function (event) {

            event.preventDefault();

            const image = product.querySelector("img");
            const title = product.querySelector("h3");
            const description = product.querySelector("p");
            const price = product.querySelector("strong");

            productImage.src = image.src;
            productImage.alt = image.alt;

            productTitle.textContent = title.textContent;

            productDescription.textContent =
                description.textContent.trim();

            productPrice.textContent = price.textContent;

            modal.style.display = "flex";

        });

    });


    // =========================
    // إغلاق نافذة التفاصيل
    // =========================

    closeProduct.addEventListener("click", function () {

        modal.style.display = "none";

    });


    // الإغلاق عند الضغط خارج النافذة
    modal.addEventListener("click", function (event) {

        if (event.target === modal) {

            modal.style.display = "none";

        }

    });


    // الإغلاق بزر Escape
    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            modal.style.display = "none";

        }

    });

});