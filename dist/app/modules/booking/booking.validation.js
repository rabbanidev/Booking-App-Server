"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const date_fns_1 = require("date-fns");
const isValidISO8601Date = (dateString) => {
    return (0, date_fns_1.isValid)(new Date(dateString));
};
const iso8601Date = zod_1.z.string().refine((date) => isValidISO8601Date(date), {
    message: 'Invalid ISO 8601 date format',
});
const createBooking = zod_1.z.object({
    body: zod_1.z
        .object({
        service: zod_1.z.string({ required_error: 'Service ID is required' }),
        checkIn: iso8601Date,
        checkOut: iso8601Date,
        totalPerson: zod_1.z
            .number({ required_error: 'Total person is required!' })
            .positive(),
        customer: zod_1.z.object({
            name: zod_1.z.string({ required_error: 'Name is required!' }),
            contactNo: zod_1.z.string({ required_error: 'Contact No is required!' }),
        }, { required_error: 'Customer is required!' }),
    })
        .refine(({ checkIn, checkOut }) => {
        return new Date(checkIn) < new Date(checkOut);
    }, {
        message: 'Check in date must be before the check out date',
    }),
});
const adjustSchedules = zod_1.z.object({
    body: zod_1.z
        .object({
        checkIn: iso8601Date,
        checkOut: iso8601Date,
    })
        .refine(({ checkIn, checkOut }) => {
        return new Date(checkIn) < new Date(checkOut);
    }, {
        message: 'Check in date must be before the check out date',
    }),
});
exports.BookingValidation = {
    createBooking,
    adjustSchedules,
};
