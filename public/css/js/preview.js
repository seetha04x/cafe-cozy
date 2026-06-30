
  const imageInput = document.getElementById("image");
  const previewContainer = document.getElementById("preview");

  imageInput.addEventListener("change", () => {
    previewContainer.innerHTML = ""; // clear old previews
    const files = Array.from(imageInput.files);

    files.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = e => {
        // Create wrapper div
        const wrapper = document.createElement("div");
        wrapper.classList.add("position-relative", "d-inline-block");

        // Create image
        const img = document.createElement("img");
        img.src = e.target.result;
        img.classList.add("img-thumbnail");
        img.style.maxWidth = "150px";
        img.style.maxHeight = "150px";

        // Create remove button
        const btn = document.createElement("button");
        btn.innerHTML = "&times;";
        btn.classList.add("btn", "btn-sm", "btn-danger", "position-absolute");
        btn.style.top = "0";
        btn.style.right = "0";

        btn.addEventListener("click", () => {
          files.splice(index, 1); // remove file from array
          // Create a new FileList without the removed file
          const dataTransfer = new DataTransfer();
          files.forEach(f => dataTransfer.items.add(f));
          imageInput.files = dataTransfer.files;

          wrapper.remove(); // remove preview
        });

        wrapper.appendChild(img);
        wrapper.appendChild(btn);
        previewContainer.appendChild(wrapper);
      };
      reader.readAsDataURL(file);
    });
  });

