
// Upload Image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const uploadImageInput = document.querySelector("[upload-image-input]");
  const uploadImagePreview = document.querySelector("[upload-image-preview]");

  uploadImageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImagePreview.src = URL.createObjectURL(file);
    }

    const btnCancel = document.querySelector("[btn-cancel]");

    btnCancel.classList.toggle("d-none");

    btnCancel.addEventListener("click", () => {
      uploadImageInput.value = "";
      uploadImagePreview.src = "";
      btnCancel.classList.add("d-none");
    });
  });
}
// End Upload Image


// Upload audio
const uploadAudio = document.querySelector("[upload-audio]");
if (uploadAudio) {
  const uploadAudioInput = document.querySelector("[upload-audio-input]");
  const uploadAudioPlay = document.querySelector("[upload-audio-play]");
  const source = uploadAudio.querySelector("source");

  uploadAudioInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      source.src = URL.createObjectURL(file);
      uploadAudioPlay.load();
    }
  });
}
// End Upload Audio