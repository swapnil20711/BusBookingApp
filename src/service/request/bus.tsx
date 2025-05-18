import apiClient from '../apiClient';

export const fetchBuses = async (from: string, to: string, date: string) => {
    const { data } = await apiClient.post('/bus/search', {
        from,
        to,
        date,
    });
    return data?.data || [];
};

export const fetchBusDetails = async (busId: string) => {
    const { data } = await apiClient.get(`/bus/${busId}`);
    return data?.data || [];
};

export const fetchUserTickets = async () => {
    const { data } = await apiClient.get('/ticket/my-tickets');
    // console.log("my-ticket are : ", data)
    return data.tickets;
};

export const bookTickets = async ({ busId, date, seatNumbers }: { busId: string, date: string, seatNumbers: string[] }) => {
    const { data } = await apiClient.post('/ticket/book', {
        busId,
        date,
        seatNumbers,
    });
    return data?.ticket;
};
