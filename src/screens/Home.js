import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Card from '../components/Card';

const foods = [
  {
    name: 'Kue Bolu',
    price: 'Rp 20.000',
    image:
      'https://content.shopback.com/id/wp-content/uploads/2020/04/09153754/cara-membuat-kue-bolu-kukus.jpg',
  },
  {
    name: 'Kue Nastar',
    price: 'Rp 25.000',
    image:
      'https://img-global.cpcdn.com/recipes/874868f7ba933ccb/751x532cq70/kue-nastar-lumerrrrrr-di-mulut-%F0%9F%98%8E-foto-resep-utama.jpg',
  },
  {
    name: 'Kue Salju',
    price: 'Rp 30.000',
    images:
      'https://cf.shopee.co.id/file/8311a7b1e954609c0b27a06c6ca1248c',
  },
  {
    name: 'Kue Kacang',
    price: 'Rp 30.000',
    images:
      'https://ecs7.tokopedia.net/img/cache/700/product-1/2018/3/25/29470142/29470142_c6be7cb9-5a88-4fc5-a81f-52c4a0e41a4d_1024_768.jpg',
  },
  {
    name: 'Kue Pisang',
    price: 'Rp 5.000',
    images:
      'https://img-global.cpcdn.com/recipes/Recipe_2015_02_01_01_07_18_384_9cdfba2ce24628db6f03/751x532cq70/kue-pisang-tradisional-foto-resep-utama.jpg',
  },
];

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList 
        contentContainerStyle={{
          justifyContent: 'space-between'
        }}
        data={foods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <Card name={item.name} price={item.price} url={item.image} />
          )
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'space-around'
  },
});
