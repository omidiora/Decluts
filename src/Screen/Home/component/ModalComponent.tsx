import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import QuickCard from '../../../component/QuickCard';
import {BODY_IMAGE, COLOR, HP, WP} from '../../../Util/Util';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import LineComponent from '../../../component/ LineComponent';
import Spacer from '../../../component/Spacer';
import Electronics from '../../../assets/images/svg/elect.svg';
import Furniture from '../../../assets/images/svg/furniture.svg';
import Clothing from '../../../assets/images/svg/Clothing.svg';
import Baby from '../../../assets/images/svg/Baby.svg';
import Pet from '../../../assets/images/svg/Pet.svg';
import Sport from '../../../assets/images/svg/Sport.svg';
import Ant from '../../../assets/images/svg/Ant.svg';
import Health from '../../../assets/images/svg/Health.svg';
import Kitchen from '../../../assets/images/svg/Kitchen.svg';
import Music from '../../../assets/images/svg/Music.svg';
import Office from '../../../assets/images/svg/Office.svg';
import Book from '../../../assets/images/svg/Book.svg';
import Art from '../../../assets/images/svg/Art.svg';
import Auto from '../../../assets/images/svg/Auto.svg';
import Garden from '../../../assets/images/svg/Garden.svg';
import Miss from '../../../assets/images/svg/Miss.svg';
import Game from '../../../assets/images/svg/Game.svg';

// furniture.svg
const ModalComponent = ({onPress, visible, setModalVisible}) => {
  const navigation = useNavigation();

  const NavigateCategoryProduct = (id, title) => {
    setModalVisible(false);
    navigation.navigate('CategoryProductDetail', {
      categoryId: id,
      categoryTitle: title,
    });
  };

  return (
    <View>
      <Modal isVisible={visible}>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 20,
            }}>
            <Text style={styles.categories}>Categories</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Entypo name="circle-with-cross" size={32}  color={COLOR.black}/>
            </TouchableOpacity>
          </View>
          <Spacer height={10} />
          <LineComponent />
          <View style={styles.quickCardContainer}>
            <QuickCard
              image={<Electronics />}
              subTitle="Electronics"
              onPress={() => NavigateCategoryProduct(1, 'Electronics')}
            />
            <QuickCard
              image={<Furniture />}
              subTitle="Furniture"
              onPress={() => NavigateCategoryProduct(2, 'Furniture')}
            />
            <QuickCard
              image={<Clothing />}
              subTitle="Clothing"
              onPress={() => NavigateCategoryProduct(3, 'Clothing')}
            />
          </View>

          <View style={styles.quickCardContainer}>
            <QuickCard
              image={<Baby />}
              subTitle="Babies & Kids"
              onPress={() => NavigateCategoryProduct(5, 'Babies & Kids')}
            />

            <QuickCard
              image={<Pet />}
              subTitle="Pets"
              onPress={() => NavigateCategoryProduct(6, 'Pets')}
            />

            <QuickCard
              image={<Sport />}
              subTitle="Sports & Outdoor"
              onPress={() => NavigateCategoryProduct(7, 'Sports & Outdoor')}
            />
          </View>

          <View style={styles.quickCardContainer}>
            <QuickCard
              image={<Health />}
              subTitle="Health & Beauty"
              onPress={() => NavigateCategoryProduct(9, 'Health & Beauty')}
            />
            <QuickCard
              image={<Kitchen />}
              subTitle="Kitchen wares"
              onPress={() => NavigateCategoryProduct(10, 'Kitchen wares')}
            />

            <QuickCard
              image={<Music />}
              subTitle="Musical Instruments"
              onPress={() => NavigateCategoryProduct(11, 'Musical Instruments')}
            />
          </View>

          <View style={styles.quickCardContainer}>
            <QuickCard
              image={<Book />}
              subTitle="Books & Media"
              onPress={() => NavigateCategoryProduct(13, 'Books & Media')}
            />

            <QuickCard
              image={<Auto />}
              subTitle="Automobile"
              onPress={() => NavigateCategoryProduct(15, 'Automobile')}
            />

            <QuickCard
              image={<Garden />}
              subTitle="Garden"
              onPress={() => NavigateCategoryProduct(16, 'Garden')}
            />
          </View>
          <View style={styles.quickCardContainer}>
            <QuickCard
              image={<Game />}
              subTitle="Toys & Games"
              onPress={() => NavigateCategoryProduct(4, 'Toys & Games')}
            />

            <QuickCard
              image={<Ant />}
              subTitle="Antiques"
              onPress={() => NavigateCategoryProduct(8, 'Babies & Kids')}
            />
            <QuickCard
              image={<Office />}
              subTitle="Office Supplies"
              onPress={() => NavigateCategoryProduct(12, 'Office Supplies')}
            />
          </View>

          <View style={styles.quickCardContainer}>
            <QuickCard
              image={<Art />}
              subTitle="Arts"
              onPress={() => NavigateCategoryProduct(14, 'Garden')}
            />
            <QuickCard
              image={<Miss />}
              subTitle="Miscellaneous"
              onPress={() => NavigateCategoryProduct(17, 'Garden')}
            />
            <QuickCard
              image={<Game />}
              subTitle="Toys & Games"
              onPress={() => NavigateCategoryProduct(4, 'Toys & Games')}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalComponent;

const styles = StyleSheet.create({
  container: {
    height: HP(90),
    width: WP(101),
    backgroundColor: 'white',
    marginLeft: -25,
    borderRadius: 10,
    // alignSelf:"center"
  },
  quickCardContainer: {
    marginTop: HP(1),
    marginBottom: HP(3),
    marginHorizontal: WP(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  categories: {
    fontWeight: 'bold',
    fontSize: HP(2),
    paddingLeft: WP(5),
    color:  COLOR.black
  },
});
