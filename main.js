var prediction1 = "";
Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 100
});
camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '">';
    });

}
console.log('ml5.version:', ml5.version);

Classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/fF58gQond/model.json", ModelLoaded);

function ModelLoaded() {
    console.log("Model Loaded!");
}
function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The prediction is " + prediction1;
     
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);

    
     synth.speak(utterThis);
}
function check() {
    img = document.getElementById('captured_image');
    Classifier.classify(img, gotResult);
}
function gotResult(error, result) {
    if (error) {
        console.log(error);
    } else {
        console.log(result);
        prediction1 = result[0].label;
        
        document.getElementById("result_emotion_name").innerHTML = prediction1;
        speak();



        if (result[0].label == "best") {
            document.getElementById("update_emoji").innerHTML = "&#128077;";

        } if (result[0].label == "victory") {
            document.getElementById("update_emoji").innerHTML = "&#9996;";

        } if (result[0].label == "amazing") {
            document.getElementById("update_emoji").innerHTML ="&#128076;";

        } 
    }
}