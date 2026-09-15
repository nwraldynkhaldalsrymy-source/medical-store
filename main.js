const productsDetails = [
    {
        name: "جهاز قياس ضغط الدم",
        image: "img/blood-pressure-monitor.png",
        description: "جهاز إلكتروني دقيق لقياس ضغط الدم والنبض بسهولة وسرعة.",
        price: "45.00 ريال"
    },
    {
        name: "سماعة طبية",
        image: "img/stethoscope.png",
        description: "سماعة طبية عالية الجودة للاستخدام العام والمهني.",
        price: "25.00 ريال"
    },
    {
        name: "جهاز مراقبة المريض",
        image: "img/patient-monitor.png",
        description: "يستخدم لمراقبة العلامات الحيوية للمريض بشكل مستمر.",
        price: "250.00 ريال"
    },
    {
        name: "مقياس حرارة رقمي",
        image: "img/digital-thermometer.png",
        description: "جهاز رقمي لقياس درجة الحرارة بدقة وسرعة.",
        price: "20.00 ريال"
    },
    {
        name: "سرير طبي للمستشفيات",
        image: "img/hospital-bed.png",
        description: "سرير طبي مريح ومناسب لرعاية المرضى وسهولة الاستخدام.",
        price: "450.00 ريال"
    },
    {
        name: "جهاز نيبولايزر",
        image: "img/nebulizer.png",
        description: "جهاز يساعد على علاج مشاكل التنفس بكفاءة عالية.",
        price: "60.00 ريال"
    },
    {
        name: "كرسي متحرك",
        image: "img/wheelchair.png",
        description: "كرسي متحرك مريح وخفيف الوزن للاستخدام اليومي.",
        price: "120.00 ريال"
    }
];

document.addEventListener("DOMContentLoaded", function () {
    // 1) البحث
    const searchInput = document.querySelector(".search input, .product-tools input");
    const searchButton = document.querySelector(".search button");

    function performSearch() {
        if (!searchInput) return;

        const query = searchInput.value.trim().toLowerCase();

        if (query === "") {
            alert("اكتب اسم المنتج الذي تريد البحث عنه");
            searchInput.focus();
            return;
        }

        const cards = document.querySelectorAll(".product-card, .product, .product-item, .card");
        let found = false;

        cards.forEach(function (card) {
            const text = card.textContent.toLowerCase();
            const match = text.includes(query);

            card.style.display = match ? "" : "none";

            if (match) found = true;
        });

        if (!found) {
            alert("لم يتم العثور على المنتج: " + searchInput.value.trim());
        }
    }

    if (searchButton) {
        searchButton.addEventListener("click", performSearch);
    }

    if (searchInput) {
        searchInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                performSearch();
            }
        });
    }

    // 2) تفاصيل المنتج في Modal
    const productButtons = document.querySelectorAll(".ajax-product");

    productButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {
            event.preventDefault();

            const productNumber = Number(this.dataset.product);

            fetch("js/products-data.json")
                .then(function (response) {
                    if (!response.ok) {
                        throw new Error("فشل في تحميل ملف JSON");
                    }
                    return response.json();
                })
                .then(function (data) {
                    const product = data[productNumber];

                    if (!product) {
                        throw new Error("المنتج غير موجود");
                    }

                    const modalTitle = document.getElementById("ajaxProductTitle");
                    const modalName = document.getElementById("ajaxProductName");
                    const modalImage = document.getElementById("ajaxProductImage");
                    const modalText = document.getElementById("ajaxProductText");
                    const modalPrice = document.getElementById("ajaxProductPrice");

                    if (modalTitle) modalTitle.textContent = "تفاصيل المنتج";
                    if (modalName) modalName.textContent = product.title;
                    if (modalImage) {
                        modalImage.src = product.image;
                        modalImage.alt = product.title;
                    }
                    if (modalText) modalText.textContent = product.text;
                    if (modalPrice) modalPrice.textContent = "السعر: " + product.price;

                    const modalEl = document.getElementById("ajaxProductModal");
                    if (modalEl && window.bootstrap) {
                        const modal = new bootstrap.Modal(modalEl);
                        modal.show();
                    }
                })
                .catch(function (error) {
                    console.error(error);

                    const fallbackProduct = productsDetails[productNumber];
                    const modalTitle = document.getElementById("ajaxProductTitle");
                    const modalName = document.getElementById("ajaxProductName");
                    const modalImage = document.getElementById("ajaxProductImage");
                    const modalText = document.getElementById("ajaxProductText");
                    const modalPrice = document.getElementById("ajaxProductPrice");

                    if (fallbackProduct) {
                        if (modalTitle) modalTitle.textContent = "تفاصيل المنتج";
                        if (modalName) modalName.textContent = fallbackProduct.name;
                        if (modalImage) {
                            modalImage.src = fallbackProduct.image;
                            modalImage.alt = fallbackProduct.name;
                        }
                        if (modalText) modalText.textContent = fallbackProduct.description;
                        if (modalPrice) modalPrice.textContent = "السعر: " + fallbackProduct.price;

                        const modalEl = document.getElementById("ajaxProductModal");
                        if (modalEl && window.bootstrap) {
                            const modal = new bootstrap.Modal(modalEl);
                            modal.show();
                        }
                    } else {
                        alert("حدث خطأ في تحميل بيانات المنتج.");
                    }
                });
        });
    });

    // 3) حقوق النشر
    const copyright = document.querySelector(".copyright");
    if (copyright) {
        const currentYear = new Date().getFullYear();
        copyright.innerHTML = "© " + currentYear + " جميع الحقوق محفوظة - المتجر الطبي";
    }

    // 4) صورة Hero
    const heroImage = document.getElementById("heroImage");
    if (heroImage) {
        const images = ["img/hero-medical-equipment.png", "img/about-main.jpg"];
        let currentImage = 0;

        setInterval(function () {
            currentImage = (currentImage + 1) % images.length;
            heroImage.src = images[currentImage];
        }, 3000);
    }

    // 5) jQuery لصفحة التصنيفات فقط
    if (typeof $ !== "undefined" && $(".search input").length && $(".category-card").length) {
        $(".search input").on("keyup", function () {
            const value = $(this).val().trim().toLowerCase();

            $(".category-card").each(function () {
                const text = $(this).text().toLowerCase();
                $(this).toggle(text.includes(value));
            });
        });
    }
});