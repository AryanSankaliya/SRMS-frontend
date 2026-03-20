import api from "./api";

const notificationService = {
    getUserNotifications: async () => {
        try {
            const response = await api.get("/notification");
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || "Failed to fetch notifications";
        }
    },

    markAsRead: async (id) => {
        try {
            const response = await api.put(`/notification/${id}/read`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || "Failed to mark notification as read";
        }
    },

    markAllAsRead: async () => {
        try {
            const response = await api.put("/notification/read-all");
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || "Failed to mark all notifications as read";
        }
    },

    getSummary: async (role, userId) => {
        try {
            const response = await api.get("/notification/summary", { params: { role, userId } });
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || "Failed to fetch summary";
        }
    },
};

export default notificationService;
