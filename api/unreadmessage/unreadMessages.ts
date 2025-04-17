import AsyncStorage from "@react-native-async-storage/async-storage";

export class UnreadMessages {
  async getTotalReadMessages(id: string) {
    const response = await AsyncStorage.getItem(`${id}_read`);
    return Number(response);
  }

  async setTotalReadMessages(id:string, total:number) {
    await AsyncStorage.setItem(`${id}_read`, JSON.stringify(total));
  }
}
