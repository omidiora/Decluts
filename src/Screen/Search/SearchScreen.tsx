import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Hideo, Kohana} from 'react-native-textinput-effects';
import {COLOR, FontFamily, HP, WP} from '../../Util/Util';
import TextInput from 'react-native-text-input-interactive';
import SearchInput from '../../component/SearchInput';
import PostComponent from '../../component/PostComponent';
import {useAppDispatch, useAppSelector} from '../../redux/hook';
import {SaveSearchKeyWord, fetchApiData} from '../../redux/product/api';
import HeaderComponent from '../../component/HeaderComponent';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import LineComponent from '../../component/ LineComponent';
import ViewContainer from '../../component/ViewContainer';
const SearchScreen = () => {
  const [searchKey, setSearchKey] = useState('');
  const dispatch = useAppDispatch();
  const [filterWord, setfilterWord] = useState([]);
  const {data, loading, error, searchHistory} = useAppSelector(
    state => state.product,
  );

  // console.log(searchHistory, 'adada');
  //  const imageUrls = filterImageUrls(ImageOnly());

  // console.log('Image URLs:', imageUrls);

  React.useEffect(() => {
    dispatch(fetchApiData());
    dispatch(SaveSearchKeyWord());
  }, [dispatch]);

  const searchWord = () => {
    let word = data?.data?.data.filter(documents => {
      return documents.brand.toLowerCase().includes(searchKey.toLowerCase());
    });
    console.log(word,'dlmaadafdlknfladsnlkfnkadsnkfndkdlmlf')
    setfilterWord(word);
  };


 console.log( searchKey,'searchHistory?.data')
  return (
    <ViewContainer>
      <View style={styles.rowContainer}>
        <SearchInput
          placeholder={'What are you looking for?'}
          onChangeText={text => setSearchKey(text)}
          onSubmitEditing={() => searchWord()}
        />
        <View style={styles.paddLeft}>
          {searchHistory?.data > 0 && (
            <View style={styles.recent}>
              <Text style={styles.recents}>Recent Searches</Text>
              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.search}>Clear</Text>
              </TouchableOpacity>
            </View>
          )}

          <FlatList
            data={searchHistory?.data}
            renderItem={({item}) => (
              <TouchableOpacity
                style={{paddingTop: HP(5), paddingBottom: 30,}}
                onPress={() => setSearchKey(item?.keyword)}>
                <LineComponent />
                <View
                  style={{
                    marginTop: 20,
                    flexDirection: 'row',
                    paddingBottom: 20,
                    // justifyContent: 'space-between',
                  }}>
                  <EvilIcons name="search" size={23} />
                  <View style={styles.keyCont}>
                    <TouchableOpacity
                      onPress={() => {
                        {
                          setSearchKey(item?.keyword);
                          searchWord();
                        }
                      }}>
                      <Text style={styles.keyword}>{item.keyword}</Text>
                    </TouchableOpacity>

                    <View>
                      <Feather
                        name="arrow-up-right"
                        size={25}
                        color={COLOR.mainColor}
                      />
                    </View>
                  </View>
                  <LineComponent />
                </View>
                <LineComponent />
              </TouchableOpacity>
            )}
          />

          {!searchKey == '' && (
            <>
              <View style={styles.flatListContainer}>
                <PostComponent
                  postData={filterWord}
                  message={`No ${searchKey} was found !!!!!`}
                />
              </View>
            </>
          )}
        </View>
      </View>
    </ViewContainer>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  rowContainer: {
    alignSelf: 'center',
    marginTop: -10,
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
    right: WP(7),
  },
  header: {
    paddingBottom: HP(3),
    marginLeft: WP(5),
  },
  keyword: {
    fontSize: WP(4.3),
    color: 'black',
    fontFamily: FontFamily.regular,
  },
  paddLeft: {
    marginLeft: WP(3),
  },
  keyCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  flatListContainer: {
    flex: 2,
    marginTop: HP(-50),
    marginLeft:-30
  },
});
