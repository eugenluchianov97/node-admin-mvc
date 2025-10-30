import mongoose from "mongoose";

export const isValid = (id) => {


    if (!id) {
        throw new Error("ID пользователя отсутствует");
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Неверный ID пользователя");
    }

    return id;
}

export default isValid;