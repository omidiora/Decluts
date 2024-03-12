import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Hideo, Kohana} from 'react-native-textinput-effects';
import {COLOR, HP, WP} from '../../Util/Util';
import TextInput from 'react-native-text-input-interactive';
import SearchInput from '../../component/SearchInput';
import PostComponent from '../../component/PostComponent';
import {useAppDispatch, useAppSelector} from '../../redux/hook';
import {fetchApiData, fetchCategoryProductById} from '../../redux/product/api';
import Feather from 'react-native-vector-icons/Feather';
import HeaderComponent from '../../component/HeaderComponent';
import ViewContainer from '../../component/ViewContainer';

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

   console.log(category?.data,'1sd1')

  return (
    <View style={styles.container}>
     <ViewContainer>
     <View style={styles.header}>
        <HeaderComponent title={params.categoryTitle} rightComponent={' '} />
      </View>
      <View style={styles.rowContainer}>
        <View style={{marginLeft:30}}>
        <SearchInput
          placeholder={'What are you looking for?'}
          onChangeText={text => setSearchKey(text)}
          onSubmitEditing={() => searchWord()}
        />
        </View>
        <View style={styles.recent}>
          <Text style={styles.recents}>
            {category?.data?.length || 0} total result
          </Text>
          <TouchableOpacity onPress={() => {}}>
            <Feather name="settings" size={20} color={COLOR.black} />
          </TouchableOpacity>
        </View>
        <View style={styles.flatListContainer}>
          <PostComponent
            postData={category?.data}
            message={`No Item  was found  in this Category !!!!!`}
          />
        </View>
      </View>
     </ViewContainer>
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
     marginTop: HP(-5),

  },
  recent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: HP(4),
    width:"92%",
    marginLeft:WP(55)
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
  },
  flatListContainer:{
  marginLeft:WP(53)
  }
});
