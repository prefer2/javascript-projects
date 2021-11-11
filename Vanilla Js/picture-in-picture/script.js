const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// Prompt to select media stream, pass to viedo element, then play
async function selectMediaStream() {
    try{
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        }
    } catch(error){
        //Catch Error
        console.log('get error! : ',error);
    }
}

button.addEventListener('click', async ()=>{
    // Disable Button
    button.disable = true;
    // Start picture in picture
    await videoElement.requestPictureInPicture();
    // Reset Button
    button.disable = false;
});

selectMediaStream();

// About Screen Captuer
// https://developer.mozilla.org/en-US/docs/Web/API/Screen_Capture_API/Using_Screen_Capture