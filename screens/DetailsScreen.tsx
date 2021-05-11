import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function DetailsScreen ({ navigation, route }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState("");

  let i = 4; 
  useEffect(() => {
    console.log(route)
    console.log('https://swapi.dev/api/vehicles/' + String(i))
    fetch('https://swapi.dev/api/vehicles/' + String(i))
    .then((response) => response.json())
    .then((json) => setData(json))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));

    
  }, []);

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Wehicle details:</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      
    {isLoading ? <ActivityIndicator/> : (
    <View>
      <Text style={styles.listItem} >Name: {data.name}</Text>
      <Text style={styles.listItem} >Model: {data.model}</Text>
      <Text style={styles.listItem} >Manufacturer: {data.manufacturer}</Text>
      <Text style={styles.listItem} >Cost in credits: {data.cost_in_credits}</Text>
      <Text style={styles.listItem} >Max atm speed: {data.max_atmosphering_speed}</Text>
      <Text style={styles.listItem} >Crew: {data.crew}</Text>
      <Text style={styles.listItem} >Passengers: {data.passengers}</Text>
      </View>
    )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  listItem:{
    fontSize: 20,
  }
});
