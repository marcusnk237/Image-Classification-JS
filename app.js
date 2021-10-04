/************************** Initialization **********************/
const log = console.log; 
const image = document.getElementById("image");
const dropContainer = document.getElementById("container");
const fileInput = document.getElementById("fileUploader");
const ImageSrc = "grumpy_cat.jpg"; // Image par défaut

const result = document.getElementById("result");
const probability = document.getElementById("probability");
const classifier = ml5.imageClassifier("Mobilenet", () => {});
/****************************************************************/

/********************************************** Drop image **********************************************/
["dragenter", "dragover"].forEach(eventName => {
    dropContainer.addEventListener(eventName, e => dropContainer.classList.add("highlight"))
});

["dragleave", "drop"].forEach(eventName => {
    dropContainer.addEventListener(eventName, e => dropContainer.classList.remove("highlight"))
});

["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
    dropContainer.addEventListener(eventName, preventDefaults)
});

dropContainer.addEventListener("drop", gotImage);
/**************************************************************************************************************/

/** Classification **/
classification();
/*******************/
function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
};

/********************* Loading image function *********************/
function gotImage(e) {
    const dt = e.dataTransfer;
    const files = dt.files;

    if (files.length > 1) {
        alert("Charger une image à la fois");
    };

    const file = files[0];
    const imageType = /image.*/;
    if (file.type.match(imageType)) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            image.src = reader.result;
            setTimeout(classifyImage, 100);
        };
    } 
};
/********************************************************************/

/********************* Classification function *********************/
function classification() {
    classifier.predict(image, (err, results) => {
        if (err) {
            alert("Erreur rencontrée !");
        } else {
            let resultTxt = results[0].className;
            result.innerText = resultTxt;
            let prob = 100 * results[0].probability;
            probability.innerText = Number.parseFloat(prob).toFixed(2) + "%";
        };
    });
};
/*********************************************************************************/

/************ File management ************/
function handleFiles() {
    const curFiles = fileInput.files;
    if (curFiles.length === 0) {
        image.src = ImageSrc;
        setTimeout(classifyImage, 100);
    }; 
};
/************************************************/
function clickUploader() {
    fileInput.click();
};
