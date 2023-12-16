import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Hideo, Kohana} from 'react-native-textinput-effects';
import {COLOR, HP} from '../../Util/Util';
import TextInput from 'react-native-text-input-interactive';
import SearchInput from '../../component/SearchInput';
import PostComponent from '../../component/PostComponent';
import {useAppDispatch, useAppSelector} from '../../redux/hook';
import {fetchApiData, fetchCategoryProductById} from '../../redux/product/api';
import Feather from 'react-native-vector-icons/Feather';
import HeaderComponent from '../../component/HeaderComponent';

const CategoryProductDetail = props => {
  const [searchKey, setSearchKey] = useState('Keyword');
  const {
    route: {params},
  } = props;
  const dispatch = useAppDispatch();
  const [filterWord, setfilterWord] = useState([]);
  const {data, loading, error, category} = useAppSelector(
    state => state.product,
  );

  console.log(data, 'adada');
  //  const imageUrls = filterImageUrls(ImageOnly());

  // console.log('Image URLs:', imageUrls);

  React.useEffect(() => {
    dispatch(fetchApiData());
    dispatch(fetchCategoryProductById(params.categoryId));
  }, [dispatch]);

  const searchWord = () => {
    let word = data?.data?.data.filter(documents => {
      return documents.brand.toLowerCase().includes(searchKey.toLowerCase());
    });
    setfilterWord(word);
  };

  // console.log(searchWord(),'1sd1')
  console.log(params.categoryId, '11');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HeaderComponent title={params.categoryTitle} rightComponent={' '} />
      </View>
      <View style={styles.rowContainer}>
        <SearchInput
          placeholder={'What are you looking for?'}
          onChangeText={text => setSearchKey(text)}
          onSubmitEditing={() => searchWord()}
        />
        <View style={styles.recent}>
          <Text style={styles.recents}>
            {category?.data?.data?.length} total result
          </Text>
          <TouchableOpacity onPress={() => {}}>
            <Feather name="settings" size={30} color={COLOR.black} />
          </TouchableOpacity>
        </View>
        <View style={styles.flatListContainer}>
          <PostComponent
            postData={category?.data?.data}
            message={`No Item  was found  in this Category !!!!!`}
          />
        </View>
      </View>
    </View>
  );
};

export default CategoryProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  rowContainer: {
    alignSelf: 'center',
    paddingTop: HP(3),
  },
  recent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: HP(4),
  },
  recents: {
    color: COLOR.black,
    fontWeight: 'bold',
  },
  search: {
    color: COLOR.mainColor,
    fontWeight: 'bold',
  },
  header:{
    marginTop:HP(3)
  }
});
