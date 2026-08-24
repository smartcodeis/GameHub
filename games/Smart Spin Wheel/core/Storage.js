const STORAGE_KEY = "smart_spin_wheel_data";


export default class Storage {

    static load() {

        try {

            const data =
                localStorage.getItem(STORAGE_KEY);

            if (!data) {
                return null;
            }

            return JSON.parse(data);

        } catch (error) {

            console.error(
                "Storage load error:",
                error
            );

            return null;
        }
    }


    static save(data) {

        try {

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(data)
            );

            return true;

        } catch (error) {

            console.error(
                "Storage save error:",
                error
            );

            return false;
        }
    }


    static clear() {

        localStorage.removeItem(
            STORAGE_KEY
        );
    }
}