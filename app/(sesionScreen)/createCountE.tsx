import { View , Text , StyleSheet } from "react-native";
import ImgCard from "@/components/ImgCard";


export default function createCountU(){

  return(
    <ImgCard 
      color="blue"
      img={require('@/assets/images/partial-react-logo.png')}
    >

    </ImgCard>
  );
};

const styles= StyleSheet.create({
  container:{

  }
})