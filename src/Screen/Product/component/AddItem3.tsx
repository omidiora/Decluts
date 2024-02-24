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
import ViewContainer from '../../../component/ViewContainer';
import HeaderComponent from '../../../component/HeaderComponent';
import {BODY_IMAGE, COLOR, HP, SERVER_URL, WP} from '../../../Util/Util';
import FormInput from '../../../component/FormInput';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../component/FormButton';
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
} from '../../../redux/product/api';
import {useAppDispatch, useAppSelector} from '../../../redux/hook';
import {getUserAsyncStorage} from '../../../Util';
import {useNavigation} from '@react-navigation/native';
import Note from '../../../assets/images/notes.svg';
import MessageModalComponent from '../../../component/MessageModalComponent';
import ProgressIndicator from '../../../component/ProgressIndicator';

const data = [
  {label: 'Lagos', value: '1', search: 'Lagos'},
  {label: 'Abuja', value: '2', search: 'Abuja'},
];

const AddItem3 = () => {
  const [value, setValue] = useState<string>();
  const [isFocus, setIsFocus] = useState(false);
  const [imageTypes, setImageTypes] = useState<{}[]>([]);
  const [videoTypes, setVideoTypes] = useState<{}>({});
  const [videoThumbNail, setVideoThumbNail] = useState<{}>({});
  const dispatch = useAppDispatch();
  const {data, loading, error, item} = useAppSelector(state => state.product);
  const navigation = useNavigation();
  const {updateUploadProgress} = useSelector(state => state.product);
  console.log(updateUploadProgress, 'props');

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
    if (imageTypes.length !== 3 || !Object.keys(videoTypes).length) {
      Alert.alert(
        'File Upload',
        'You must select three good picture  and one video to upload',
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HeaderComponent
          animatingWidthValues={[0, 111]}
          title="Upload Item"
          rightComponent={true}
          rightText={'3/4'}
          showStep={true}
          step1={true}
          step2={true}
          step3={true}
        />
      </View>

      <ProgressIndicator visible={loading} />
      {/* <MessageModalComponent visible={true}/> */}
      <KeyboardAwareScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.subContainer}>
          <Text style={styles.addItem}>Media</Text>
          <Note
            width={WP(803)}
            height={HP(11.85)}
            style={{
              alignSelf: 'center',
              marginLeft: -2,
            }}
          />
          {/* <Image source={BODY_IMAGE.note} style={styles.img} /> */}

          {imageTypes?.length > 0 ? (
            <TouchableWithoutFeedback
              onPress={() => ImagePicker()}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                gap: 1,
              }}>
              {imageTypes.map((item, index) => (
                <Image
                  key={index}
                  source={{
                    uri: item.uri,
                  }}
                  style={styles.image}
                />
              ))}
            </TouchableWithoutFeedback>
          ) : (
            <>
              <View style={styles.bodyImage}>
                <TouchableOpacity onPress={() => ImagePicker()}>
                  <Image source={BODY_IMAGE.fileUpload1} style={styles.file} />
                </TouchableOpacity>
              </View>
            </>
          )}

          {/* Video */}
          {Object.keys(videoTypes).length ? (
            <TouchableWithoutFeedback onPress={() => VideoPicker()}>
              <Image
                source={{uri: videoThumbNail?.path}}
                style={styles.videoType}
              />
            </TouchableWithoutFeedback>
          ) : (
            <>
              <TouchableWithoutFeedback
                style={styles.bodyImage}
                onPress={() => VideoPicker()}>
                <View>
                  <Image source={BODY_IMAGE.fileUpload2} style={styles.file} />
                </View>
              </TouchableWithoutFeedback>
            </>
          )}

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
    </View>
  );
};

export default AddItem3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  addItem: {
    color: COLOR.black,
    fontWeight: 'bold',
    marginVertical: HP(2),
    marginLeft: 17,
  },
  headerComponent: {
    // paddingLeft:-100
    paddingTop: HP(2),
    paddingLeft: WP(-4),
  },
  subContainer: {
    paddingLeft: WP(2),
    marginTop: HP(-2.6),
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
    paddingTop: HP(10),
    marginLeft: WP(4),
    width: WP(99),
  },
  image: {
    width: WP(24),
    height: HP(20),
    maxWidth: WP(30),
    color: 'black',
    resizeMode: 'contain',
    // paddingLeft:130
  },
  videoType: {
    width: WP(94),
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
    height: HP(12),
    // position:'absolute',
    // marginTop:HP(4)
  },
});
