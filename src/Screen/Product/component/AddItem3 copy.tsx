import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  TouchableOpacity,
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
import {useDispatch} from 'react-redux';
import {upLoadFileApi} from '../../../redux/product/api';
import {useAppSelector} from '../../../redux/hook';
import { getUserAsyncStorage } from '../../../Util';
import RNFetchBlob from 'react-native-fetch-blob'

const data = [
  {label: 'Lagos', value: '1', search: 'Lagos'},
  {label: 'Abuja', value: '2', search: 'Abuja'},
];

const AddItem3 = () => {
  const [value, setValue] = useState<string>();
  const [isFocus, setIsFocus] = useState(false);
  const [imageTypes, setImageTypes] = useState<{}[]>([]);
  const [videoTypes, setVideoTypes] = useState<{}>({});
  const dispatch = useDispatch();
  const {data, loading, error} = useAppSelector(state => state.product);

  const ImagePicker = async () => {
    await launchImageLibrary({
      mediaType: 'photo',
      // includeBase64:true,
      selectionLimit: 3,
    })
      .then(response => {
        setImageTypes(response?.assets);
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
        if (response) {
          // console.log(response?.assets[0]?.uri, 'response?.asset[0]?.uri');
          thumbNailCreator(response?.assets[0]?.uri);
        }
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
      .then(response => setVideoTypes(response))
      .catch(err => console.log({err}));
  };

  const formData = new FormData();

  formData.append('file[0]', {
    // @ts-ignore
    uri:Platform.OS === 'ios' ? imageTypes[0]?.uri?.replace('file://', ''):imageTypes[0]?.uri,
    type: 'image/png',
    // @ts-ignore
    name: "da121233da",
});
  formData.append('file[1]', {
    // @ts-ignore
    //  uri: Platform.OS === 'ios' ? ? photo.uri.replace('file://', '') : photo.uri
    uri:  Platform.OS === 'ios' ? imageTypes[0]?.uri?.replace('file://', ''):imageTypes[0]?.uri,
    type: 'image/png',
    // @ts-ignore
    name: "adadatestImage.jpg",
});
  formData.append('file[2]', {
    // @ts-ignore
    uri: Platform.OS === 'ios'? imageTypes[0]?.uri?.replace('file://', ''):imageTypes[0]?.uri,
    type: 'image/png',
    // @ts-ignore
    name: "testImaage.jpg",
});
  formData.append('file[3]', {
    // @ts-ignore
    uri: Platform.OS === 'ios' ? imageTypes[0]?.uri?.replace('file://', ''):imageTypes[0]?.uri,
    type: 'image/png',
    // @ts-ignore
    name: "testImage.jpg",
});
  formData.append('path', 'category');


  const UploadFileFunction = async () => {
  
     const user = await getUserAsyncStorage();
    const token = user ? user.access_token : null;
    const response = await fetch(`${SERVER_URL}${"/files/upload"}`, {
      method: 'POST',
      headers: {
        'content-type': 'multipart/form-data',
        // Accept: "application/json",
        Authorization: `Bearer ${token}`, // notice the Bearer before your token
      },
      body: formData,
    });
    const movies = await response.json();
    console.log(movies,'1212121');
    
  };

  const onSubmitUrl = () => {
    UploadFileFunction()
  };

console.log(imageTypes[0],'1')
 
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: 1310}}>
      <View style={styles.subContainer}>
        <Text style={styles.addItem}>Media</Text>

        <Image source={BODY_IMAGE.note} style={styles.img} />

        {imageTypes?.length > 0 ? (
          <TouchableWithoutFeedback
            onPress={() => ImagePicker()}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              gap: 1,
            }}>
            {imageTypes.map(item => (
              <Image
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
                <Image source={BODY_IMAGE.file} style={styles.file} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={BODY_IMAGE.file} style={styles.file} />
              </TouchableOpacity>
            </View>
          </>
        )}

        {/* Video */}
        {Object.keys(videoTypes).length ? (
          <TouchableWithoutFeedback onPress={() => VideoPicker()}>
            <Image source={{uri: videoTypes?.path}} style={styles.videoType} />
          </TouchableWithoutFeedback>
        ) : (
          <>
            <TouchableWithoutFeedback
              style={styles.bodyImage}
              onPress={() => VideoPicker()}>
              <View>
                <Image source={BODY_IMAGE.file} style={styles.file} />
              </View>
              <View>
                <Image source={BODY_IMAGE.file} style={styles.file} />
              </View>
            </TouchableWithoutFeedback>
          </>
        )}

        <View></View>

        <View style={styles.btn}>
          <FormButton btnTitle="Next" onPress={() => onSubmitUrl()} />
        </View>
      </View>
    </KeyboardAwareScrollView>
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
    paddingBottom: HP(4),
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
  },
  bodyImage: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  btn: {
    paddingTop: HP(10),
  },
  image: {
    width: WP(30),
    height: HP(15),
    maxWidth: WP(30),
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
});
