// ================= أزرار التبديل =================

const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");


// الانتقال إلى تسجيل الدخول
loginTab.addEventListener("click", function () {

    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");

    loginTab.classList.add("active");
    registerTab.classList.remove("active");

});


// الانتقال إلى إنشاء حساب
registerTab.addEventListener("click", function () {

    registerForm.classList.remove("hidden");
    loginForm.classList.add("hidden");

    registerTab.classList.add("active");
    loginTab.classList.remove("active");

});


// ================= إنشاء حساب =================

registerForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const message = document.getElementById("registerMessage");


    // التحقق من الاسم
    if (name === "") {

        message.textContent = "يرجى إدخال الاسم";
        return;

    }


    // التحقق من البريد
    if (email === "" || !email.includes("@")) {

        message.textContent = "يرجى إدخال بريد إلكتروني صحيح";
        return;

    }


    // التحقق من كلمة المرور
    if (password.length < 6) {

        message.textContent =
            "كلمة المرور يجب أن تكون 6 أحرف على الأقل";

        return;

    }


    // تأكيد كلمة المرور
    if (password !== confirmPassword) {

        message.textContent =
            "كلمتا المرور غير متطابقتين";

        return;

    }


    // حفظ بيانات الحساب في المتصفح
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);


    message.textContent =
        "تم إنشاء الحساب بنجاح، يمكنك الآن تسجيل الدخول";

});


// ================= تسجيل الدخول =================

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    const message = document.getElementById("loginMessage");


    // البيانات المحفوظة
    const savedEmail = localStorage.getItem("userEmail");
    const savedPassword = localStorage.getItem("userPassword");


    // إذا لم يتم إنشاء حساب
    if (!savedEmail || !savedPassword) {

        message.textContent =
            "لا يوجد حساب، يرجى إنشاء حساب أولاً";

        return;

    }


    // التحقق من البريد وكلمة المرور
    if (email === savedEmail && password === savedPassword) {

        message.textContent =
            "تم تسجيل الدخول بنجاح";

        // الانتقال إلى الصفحة الرئيسية
        setTimeout(function () {

            window.location.href = "index.html";

        }, 500);

    } else {

        message.textContent =
            "البريد الإلكتروني أو كلمة المرور غير صحيحة";

    }

});