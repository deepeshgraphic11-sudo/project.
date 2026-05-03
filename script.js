// INIT
let colorsDiv = document.getElementById("colors");
let angle = document.getElementById("angle");
let angleValue = document.getElementById("angleValue");
let historyDiv = document.getElementById("history");

function addColor(value="#ff0000") {
    let input = document.createElement("input");
    input.type = "color";
    input.value = value;
    colorsDiv.appendChild(input);
}

addColor("#ff0000");
addColor("#0000ff");

// ANGLE
angle.oninput = () => {
    angleValue.innerText = angle.value;
};

// GET COLORS
function getColors() {
    return [...document.querySelectorAll("#colors input")].map(i => i.value);
}

// GENERATE
function generate() {
    let colors = getColors();
    let type = document.getElementById("type").value;

    let gradient = type === "linear"
        ? `linear-gradient(${angle.value}deg, ${colors.join(",")})`
        : `radial-gradient(circle, ${colors.join(",")})`;

    let output = document.getElementById("output");
    output.style.background = gradient;

    document.getElementById("cssCode").value = gradient;

    saveHistory(gradient);
}

// RANDOM
function randomGradient() {
    document.querySelectorAll("#colors input").forEach(i => {
        i.value = "#" + Math.floor(Math.random()*16777215).toString(16);
    });
    generate();
}

// COPY
function copyCSS() {
    navigator.clipboard.writeText(document.getElementById("cssCode").value);
    alert("Copied!");
}

// DOWNLOAD
function downloadImage() {
    let div = document.getElementById("output");

    html2canvas(div).then(canvas => {
        let link = document.createElement("a");
        link.download = "gradient.png";
        link.href = canvas.toDataURL();
        link.click();
    });
}

// DARK MODE
function toggleMode() {
    document.body.classList.toggle("dark");
}

// SCROLL
function scrollToGen() {
    document.getElementById("generator").scrollIntoView({behavior:"smooth"});
}

// IMAGE UPLOAD
document.getElementById("imageUpload").onchange = function(e) {
    let reader = new FileReader();
    reader.onload = function() {
        document.getElementById("output").style.backgroundImage =
            `url(${reader.result})`;
    };
    reader.readAsDataURL(e.target.files[0]);
};

// HISTORY
function saveHistory(gradient) {
    let div = document.createElement("div");
    div.style.background = gradient;

    div.onclick = () => {
        document.getElementById("output").style.background = gradient;
        document.getElementById("cssCode").value = gradient;
    };

    historyDiv.appendChild(div);
}