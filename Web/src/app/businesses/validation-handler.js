module.exports = {
    loginValidation: {
        username: "string|min:1|max:255",
        password: "string|min:1|max:255",
    },
    signupValidation: {
        name: "string|min:1|max:255",
        email: "string|min:3|max:255",
        username: "string|min:1|max:255",
        password: "string|min:8|max:255",
        birthday: "date",
        is_admin: "boolean|optional|default:false",
    },
    userUpdateValidation: {
        id: "number|min:1",
        name: "string|min:1|max:255",
        email: "string|min:3|max:255",
        birthday: "date",
    },
    pageValidation: {
        page: "number|min:1|default:1",
        size: "number|min:1|default:10",
        field: "string|min:1|optional|max:255",
        is_reverse_sort: "boolean|optional|default:false",
    },
    idValidation: {
        id: "number|min:0|default:0",
    },
    statusValidation: {
        status: "number|min:-1|max:5",
    },
    tokenValidation: {
        token: "string|min:1",
    },
    bookingInfoDtoValidation: {
        customer_id: "number|min:1",
        table_id: "number|min:1",
        received_date: "date",
        payment_date: "date|optional",
    },
    imageUploadValidation: {
        url: "string",
        file_base64: "string",
        is_url: "boolean",
    },
    foodUpdateValidation: {
        id: "number|min:1",
        name: "string|min:1|max:255",
        price: "number|min:1",
        image_url: "string|min:1",
    },
    foodCreateValidation: {
        name: "string|min:1|max:255",
        price: "number|min:1",
        image_url: "string|min:1",
    },
    typeOfPartyCreateValidation: {
        name: "string|min:1|max:255",
    },
    tableCreateValidation: {
        name: "string|min:1|max:255",
        number_of_seat: "number|min:1",
    },
    ticketCreateValidation: {
        customer_id: "number|min:1",
        type_party_id: "number|min:0",
        table_id: "number|min:0",
        received_date: "date",
        payment_date: "date|optional",
        customer_phone: "string|min:0|max:255",
        customer_address: "string|min:0|max:255",
    },
    commentCreateValidation: {
        bill_id: "number|min:1",
        content: "string|min:1|max:255",
        point: "number|min:1|max:5",
    },
    billIdValidation: {
        bill_id: "number|min:1|default:0",
    },
    orderCreateValidation: {
        ticket_id: "number|min:1",
        food_id: "number|min:1",
        quantity: "number|min:1",
    },
    mainIngredientDetailCreateValidation: {
        food_id: "number|min:1",
        main_ingredient_id: "number|min:1",
        quantity: "number|min:1",
    },
    discountCreateValidation: {
        name: "string|min:1|max:255",
        amount: "number|min:1",
        percent: "number|min:1",
    },
    feedbackCreateValidation: {
        comment_id: "number|min:1",
        admin_id: "number|min:1",
        content: "string|min:1|max:255",
    },
    feedbackIdValidation: {
        comment_id: "number|min:1|default:0",
    },
    adminIdValidation: {
        admin_id: "number|min:1|default:0",
    },
    mainIngredientCreateValidation: {
        name: "string|min:1|max:255",
    },
    billCreateValidation: {
        ticket_id: "number|min:1",
        admin_id: "number|min:0",
        discount_id: "number|min:0",
    },
    customerIdValidation: {
        customer_id: "number|min:1|default:0",
    },
};
