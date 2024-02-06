document.addEventListener('DOMContentLoaded', async () => {
    

    const signResponse = await fetch('/api/signuploadform');
    const signData = await signResponse.json();

    const url = "https://api.cloudinary.com/v1_1/" + signData.cloudname + "/auto/upload";
    const form = document.querySelector(".image-form");
    console.log(form);

    form.addEventListener("submit", (e) => {
        // alert("Loaded and ready!");
        e.preventDefault();
        // alert("Clicked submit!");

        const files = document.querySelector("[type=file]").files;
        const formData = new FormData();

        // Append parameters to the form data. The parameters that are signed using 
        // the signing function (signuploadform) need to match these.
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            formData.append("file", file);
            formData.append("api_key", signData.apikey);
            formData.append("timestamp", signData.timestamp);
            formData.append("signature", signData.signature);
            formData.append("eager", "c_pad,h_300,w_400|c_crop,h_200,w_260");
            formData.append("folder", "anothers_treasure_form");

            fetch(url, {
                method: "POST",
                body: formData
            })
                .then((response) => {
                    return response.text();
                })
                .then(async (data) => {
                      console.log(JSON.parse(data));
                    const cloudinaryData = JSON.parse(data);
                    //   console.log(cloudinaryData.public_id);
                    const public_id = cloudinaryData.public_id;
                    const version = cloudinaryData.version;
                    const signature = cloudinaryData.signature;
                    // console.log(public_id);

                    // if (public_id && version && signature) {
                    //     const newImgResponse = await 
                    fetch(`/api/images`, {
                            method: 'POST',
                            body: JSON.stringify({ public_id, version, signature }),
                            headers: {
                                'Content-Type': 'application/json',
                              },
                        })
                        
                    //     if (newImgResponse.ok) {
                    //         document.location.replace('/profile');
                    //       } else {
                    //         alert('Failed to create post');
                    //       }
                    // }
                })
        }
    });
})


