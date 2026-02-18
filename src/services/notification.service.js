import api from "./api";

const notificationService = {
    // Get all notifications for the current user
    getUserNotifications: async () => {
        try {
            const response = await api.get("/notification");
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || "Failed to fetch notifications";
        }
    },

    // Mark a single notification as read
    markAsRead: async (id) => {
        try {
            const response = await api.put(`/notification/${id}/read`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || "Failed to mark notification as read";
        }
    },

    // Mark all notifications as read
    markAllAsRead: async () => {
        try {
            const response = await api.put("/notification/read-all");
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || "Failed to mark all notifications as read";
        }
    },
};

export default notificationService;
