var pngs = [
"ale.png",
"ale2.png",
"ale3.png",
"ale4.png"
];

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }

    slides[slideIndex - 1].style.display = "block";  
}


function autoSlide() {
    setInterval(function() {
        slideIndex++;
        if (slideIndex > document.getElementsByClassName("mySlides").length) {
            slideIndex = 1;
        }
        showSlides(slideIndex);
    }, 5000);
}

autoSlide();



function signin() {
    const credentials = {
        customer: "bob:Shamrock123!",
        employee: "employee:Shamrock2024!",
        manager: "manager:Manager2024!"
    };
    const email = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    const roles = ["customer", "employee", "manager"];
    let isAuthenticated = false;

    for (const role of roles) {
        const checkBox = document.getElementById(role);
        if (checkBox.checked) {
            const [expectedEmail, expectedPass] = credentials[role].split(":");
            if (email === expectedEmail && pass === expectedPass) {
                isAuthenticated = true;
                alert(`Successfully logged in, welcome to The Lucky Shamrock Pub ${(role)}!`);
                break;
            }
        }
    }
    if (!isAuthenticated) {
        alert("Wrong, try again.");
    }
}