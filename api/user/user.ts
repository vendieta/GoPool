import { ENV } from "../../utils/constants";
import { Users } from "../../types/chat/chat";
export class User {
  async getMe(accessToken: string) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ME}`;
      const params = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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

  async updateUser(accessToken:string, userData: Users) {
    try {
      const data = userData;

      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        const typedKey = key as keyof Users;
        formData.append(key, data[typedKey] as string);
      });

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ME}`;

      const params = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getAll(accessToken:string) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USER}`;
      const params = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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

  async getUser(accessToken:string, userId:string) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USER}/${userId}`;
      const params = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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

  async getUsersExeptParticipantsGroup(accessToken:string, groupId:string) {
    try {
      console.log(groupId);
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USER_EXCEPT_PARTICIPANTS_GROUP}/${groupId}`;
      const params = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      console.log(url);
      console.log(params);

      const response = await fetch(url, params);

      console.log(response);

      const result = await response.json();

      if (response.status !== 200) throw Error(result);

      return result;
    } catch (error) {
      throw error;
    }
  }
}
