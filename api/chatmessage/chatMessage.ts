import { ENV } from "../../utils/constants";

export class ChatMessage {
  async getLastMessage(token:string , chatId:string) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CHAT_MESSAGE_LAST}/${chatId}`;
      const params = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getTotal(token:string , chatId:string) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CHAT_MESSAGE_TOTAL}/${chatId}`;
      const params = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getAll(token:string, chatId:string) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CHAT_MESSAGE}/${chatId}`;
      const params = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async sendText(token:string, chatId:string, message:string) {
    if (!message) throw new Error("Message is required");
    if (!chatId) throw new Error("Chat ID is required");
    if (!token) throw new Error("Token is required");
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CHAT_MESSAGE}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          chat_id: chatId,
          message,
        }),
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 201) throw result;

      return true;
    } catch (error) {
      throw error;
    }
  }

  async sendImage(token:string, chatId:string, file:File) {
    try {
      const formData = new FormData();
      formData.append("chat_id", chatId);
      formData.append("image", file);

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CHAT_MESSAGE_IMAGE}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 201) throw result;

      return true;
    } catch (error) {
      throw error;
    }
  }
}
