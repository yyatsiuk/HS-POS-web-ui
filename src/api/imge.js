import {coreApi} from "../config";

class ImageApi {

    async uploadImage(image, type) {
        const accessToken = window.localStorage.getItem('accessToken');
        const formData = new FormData();
        formData.append("image", image)
        formData.append("type", type)

        const response = await fetch(coreApi.imageUploadUrl, {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const {url} = await response.json();
        return url;
    }

}

export const imageApi = new ImageApi();
