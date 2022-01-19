import {coreApi} from "../config";

class ImageApi {

    async uploadImage(image, type) {
        const formData = new FormData();
        formData.append("image", image)
        formData.append("type", type)

        const response = await fetch(coreApi.imageUploadUrl, {
            method: "POST",
            body: formData
        });

        const {url} = await response.json();
        return url;

    }

}

export const imageApi = new ImageApi();
