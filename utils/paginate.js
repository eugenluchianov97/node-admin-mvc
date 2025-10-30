export const paginate = ({data, total, page, limit,sortBy = {} }) => {
    const totalPages = Math.ceil(total / limit);

    return {
        data,
        meta: {
            total:total,
            page:page,
            limit:limit,
            totalPages:totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
            sortBy:sortBy
        },
    };
};
