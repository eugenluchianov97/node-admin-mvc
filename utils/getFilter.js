const getFilter = (sortFields, filterFields,options) => {

    const sortField = options.sort || "createdAt";
    const sortOrder = options.order === "desc" ? -1 : 1;
    const q = options.q ? options.q.trim() : null;

    const sortBy = sortFields.includes(sortField) ? { [sortField]: sortOrder } : { [sortField]: 1 };


    const filter = {};

    if (q) {
        filter.$or = filterFields.map(field => ({
            [field]: { $regex: q.trim(), $options: "i" }
        }));
    }

    sortFields.forEach(field => {
        if (options[field] !== undefined) {
            filter[field] = options[field];
        }
    });

    return {
        sortBy,filter
    }
}

export default getFilter