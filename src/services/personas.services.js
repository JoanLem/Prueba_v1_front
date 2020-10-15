
import http from '../http-common';

export class personasServices{

    getAll() {
        return http.get("personas/list")
        .then(response => response.data)
        .catch(e => {
            console.error(new Error(e));
        });
    }

    create(data) {
        return http.post("personas/save", data);
    }


}

export default new personasServices();