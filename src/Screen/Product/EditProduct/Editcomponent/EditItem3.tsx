import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import ViewContainer from '../../../../component/ViewContainer';
import HeaderComponent from '../../../../component/HeaderComponent';
import {BODY_IMAGE, COLOR, HP, SERVER_URL, WP} from '../../../../Util/Util';
import FormInput from '../../../../component/FormInput';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../../component/FormButton';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {createThumbnail} from 'react-native-create-thumbnail';
import {useDispatch, useSelector} from 'react-redux';
import {
  upLoadFileApi,
  updateImagePreView,
  updateItemSuccess,
} from '../../../../redux/product/api';
import {useAppDispatch, useAppSelector} from '../../../../redux/hook';
import {getUserAsyncStorage} from '../../../../Util';
import {useNavigation} from '@react-navigation/native';
import VideoPlayer from 'react-native-video-player';

const data = [
  {label: 'Lagos', value: '1', search: 'Lagos'},
  {label: 'Abuja', value: '2', search: 'Abuja'},
];

const EditItem3 = () => {
  const [value, setValue] = useState<string>();
  const [isFocus, setIsFocus] = useState(false);
  const [imageTypes, setImageTypes] = useState<{}[]>([]);
  const [videoTypes, setVideoTypes] = useState<{}>({});
  const [videoThumbNail, setVideoThumbNail] = useState<{}>({});
  const dispatch = useAppDispatch();
  const {data, loading, error, item} = useAppSelector(state => state.product);
  const navigation = useNavigation();

  const {editProductListItem} = useSelector(state => state.product);

  const SetItemProduct = (values: any) => {
    dispatch(
      updateItemSuccess({
        condition: values.condition,
        price: values.price,
      }),
    );
    navigation.navigate('Item3');
  };

  const ImagePicker = async () => {
    await launchImageLibrary({
      mediaType: 'photo',
      // includeBase64:true,
      selectionLimit: 3,
    })
      .then(response => {
        if (response.didCancel) {
          setImageTypes([]);
        } else {
          setImageTypes(response?.assets);
        }
      })
      .catch(err => {
        console.log(err, 'err');
      });
  };

  const VideoPicker = async () => {
    await launchImageLibrary({
      mediaType: 'video',
      selectionLimit: 1,
    })
      .then(response => {
        if (response.didCancel) {
          setVideoTypes({});
        } else {
          setVideoTypes(response?.assets);
          thumbNailCreator(response?.assets[0]?.uri);
        }
        // if (response) {

        // }
      })
      .catch(err => {
        console.log(err, 'err');
      });
  };

  const thumbNailCreator = uri => {
    createThumbnail({
      url: uri,
      timeStamp: 10000,
    })
      .then(response => setVideoThumbNail(response))
      .catch(err => console.log({err}));
  };

  const UploadFileFunction = async () => {
    if (editProductListItem?.item_media  || !Object.keys(videoTypes).length) {
      Alert.alert(
        'Image File Error',
        'You must select three good picture  and one video for the Item',
      );
    } else {
      const formData = new FormData();

      formData.append('file[0]', {
        uri:
          Platform.OS === 'ios'
            ? imageTypes[0]?.uri?.replace('file://', '')
            : imageTypes[0]?.uri,
        type: imageTypes[0]?.type,

        name: imageTypes[0]?.fileName,
      });
      formData.append('file[1]', {
        //  uri: Platform.OS === 'ios' ? ? photo.uri.replace('file://', '') : photo.uri
        uri:
          Platform.OS === 'ios'
            ? imageTypes[1]?.uri?.replace('file://', '')
            : imageTypes[1]?.uri,
        type: imageTypes[1]?.type,

        name: imageTypes[1]?.fileName,
      });
      formData.append('file[2]', {
        uri:
          Platform.OS === 'ios'
            ? imageTypes[2]?.uri?.replace('file://', '')
            : imageTypes[2]?.uri,
        type: imageTypes[2]?.type,

        name: imageTypes[2]?.fileName,
      });
      formData.append('file[3]', {
        uri: videoTypes[0]?.uri,
        type: videoTypes[0]?.type,
        name: videoTypes[0]?.fileName,
      });
      formData.append('path', 'item');
      dispatch(upLoadFileApi(formData, navigation));
      dispatch(
        updateImagePreView({
          payload: {
            imageTypes,
            videoTypes,
          },
        }),
      );
    }
  };

  const onSubmitUrl = () => {
    UploadFileFunction();
  };

  console.log(
    editProductListItem?.item_media[3]?.filepath,
    'editProductListItem',
  );
  return (
    <KeyboardAwareScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={{paddingBottom: 110}}>
      <View style={styles.header}>
        <HeaderComponent
          animatingWidthValues={[0, 111]}
          title="Upload Item"
          rightComponent={true}
          rightText={'3/4'}
        />
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.addItem}>Media</Text>

        <Image source={BODY_IMAGE.note} style={styles.img} />
        <View style={styles.imageContainer}>
          <TouchableOpacity>
            <Image
              source={{
                uri: editProductListItem?.item_media[0]?.filepath,
              }}
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={{
                uri: editProductListItem?.item_media[1]?.filepath,
              }}
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={{
                uri: editProductListItem?.item_media[2]?.filepath,
              }}
              style={styles.image}
            />
          </TouchableOpacity>

          <View></View>
          {/* {editProductListItem?.item_media.map((item, index) => (
            <Image
              key={index}
              source={{
                uri: item.filepath,
              }}
              style={styles.image}
            />
          ))} */}
        </View>

        {/* Video */}
        <TouchableOpacity style={styles.video}>
          <VideoPlayer
            video={{
              uri:editProductListItem?.item_media[3]?.filepath,
            }}
            // videoWidth={10}
            // videoHeight={20}
            thumbnail={{uri: 'https://i.picsum.photos/id/866/1600/900.jpg'}}
          />
          {/* <Video
            source={{uri: editProductListItem?.item_media[3]?.filepath}} // Can be a URL or a local file.
            ref={ref => {
              this.player = ref;
            }} // Store reference
            // onBuffer={this.onBuffer} // Callback when remote video is buffering
            onError={()=>{}} // Callback when video cannot be loaded
            // style={styles.backgroundVideo}
          /> */}
        </TouchableOpacity>

        <View></View>

        <View style={styles.btn}>
          <FormButton
            btnTitle="Next"
            onPress={() => onSubmitUrl()}
            loading={loading}
            disabled={loading}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default EditItem3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  addItem: {
    color: COLOR.black,
    fontWeight: 'bold',
    marginVertical: HP(2),
    marginLeft: 10,
  },
  headerComponent: {
    // paddingLeft:-100
    paddingTop: HP(2),
    paddingLeft: WP(-4),
  },
  subContainer: {
    paddingLeft: WP(4),
    paddingTop: HP(2),
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.0,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: COLOR.lightBlue,
    width: '90%',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  FormInput: {
    paddingTop: HP(4),
    paddingBottom: 50,
  },
  img: {
    alignSelf: 'center',
    marginVertical: 10,
    resizeMode: 'cover',
    width: '92%',
    borderRadius: 10,
  },
  bodyImage: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  btn: {
    marginTop: HP(28),
    marginLeft:10
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // width:"20%",
  },
  image: {
    width: WP(27),
    height: HP(15),
    maxWidth: WP(30),
    color: 'black',

    // paddingLeft:130
  },
  videoType: {
    width: WP(84),
    height: HP(15),
    resizeMode: 'cover',
    borderRadius: 10,

    maxWidth: WP(96),
    marginVertical: 50,
  },
  file: {
    width: WP(90),
    resizeMode: 'stretch',
  },
  header: {
    width: '90%',
    alignSelf: 'center',
  },
  backgroundVideo: {
    width: '1%',
    height: '100%',
  },
  video:{
    marginTop:HP(5),
    width:WP(90,),
    height:HP(4)
    // marginLeft:-30
  }
});
