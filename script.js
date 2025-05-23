const video = document.getElementById("video")

// load models
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
    faceapi.nets.faceExpressionNet.loadFromUri("/models"),
]).then(startVideo)

// start video and render
function startVideo() {
    navigator.getUserMedia(
        { video: {} }
        , stream => video.srcObject = stream,
        err => console.log("Error -------------- ", err)
    )
}

video.addEventListener("play", () => {
    setInterval(async () => {

        const detections = await faceapi.detectAllFaces(video,
            new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
        console.log(detections)

    }, 10000)
})