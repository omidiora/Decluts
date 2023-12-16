import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

export const SERVER_URL = 'https://declutstg.vereinigt.org/api/v1';
import {Linking, Alert, Platform} from 'react-native';

export const HP = heightPercentageToDP;
export const WP = widthPercentageToDP;

export const BODY_IMAGE = {
  slider1: require('../assets/images/slider1.png'),
  slider2: require('../assets/images/slider2.png'),
  slider3: require('../assets/images/slider3.png'),
  logo: require('../assets/images/logo.png'),
  dotted: require('../assets/images/dotted.png'),
  forgot: require('../assets/images/forgot.png'),
  emptyMyPost: require('../assets/images/emptyMyPost.png'),
  dummyImage1: require('../assets/images/dummy.png'),
  avatar: require('../assets/images/avatar.png'),
  emoji1: require('../assets/images/emoji1.png'),
  emoji2: require('../assets/images/emoji2.png'),
  emoji3: require('../assets/images/emoji3.png'),
  emoji4: require('../assets/images/emoji4.png'),
  emoji5: require('../assets/images/emoji5.png'),
  note: require('../assets/images/note.png'),
  file: require('../assets/images/file.png'),
  priceNote: require('../assets/images/priceNote.png'),
  electronics: require('../assets/images/elect.png'),
  furniture: require('../assets/images/Furn.png'),
  sport: require('../assets/images/sport.png'),
  game: require('../assets/images/game.png'),
  baby: require('../assets/images/baby.png'),
  pet: require('../assets/images/pet.png'),
  anti: require('../assets/images/anti.png'),
  health: require('../assets/images/health.png'),
  kit: require('../assets/images/kit.png'),
  music: require('../assets/images/music.png'),
  office: require('../assets/images/office.png'),
  book: require('../assets/images/book.png'),
  art: require('../assets/images/art.png'),
  automobile: require('../assets/images/auto.png'),
  garden: require('../assets/images/garden.png'),
  padLock: require('../assets/images/padLock.png'),
  fileUpload1: require('../assets/images/fileUpload1.png'),
  fileUpload2: require('../assets/images/fileUpload2.png'),
  preloader: require('../assets/images/preloader.gif'),
  paymentGif: require('../assets/images/Pinwheel.gif'),
  circular: require('../assets/images/circle.png'),
};

export const FontFamily = {
  medium: 'Roboto-Medium',
  regular: 'Roboto-Regular',
  bold: 'Roboto-Bold',
  black: 'Roboto-Black',
  Mulish:"Mulish-ExtraBold"
};

export const COLOR = {
  mainColor: '#02A89E',
  black: '#101828',
  white: '#fff',
  lightBlue: '#E4E7EC',
  lightGrey: '#667085',
  lightOrange: '#A28300',
  green: '#60B527',
  orange: '#FBBF24',
  lightDeepBlue: '#02A89E',
  grey:"#344054"
};

export const NAIRA_SYSMBOL = '\u20A6';

export const currencyFormatter = (number: number | string) => {
  const numberString = String(number);
  const newArray: Array<string> = [];
  const splitedNumberStringArray = numberString.split('.');
  const mainNumber = splitedNumberStringArray[0];
  const reversedNumber = mainNumber.split('').reverse();
  reversedNumber.forEach((element, index) => {
    if (index % 3 === 0 && index !== 0) {
      newArray.push(',');
    }
    newArray.push(element);
  });
  return splitedNumberStringArray.length > 1
    ? newArray.reverse().join('') + '.' + splitedNumberStringArray[1]
    : newArray.reverse().join('');
};

export const callNumber = phone => {
  console.log('callNumber ----> ', phone);
  let phoneNumber = phone;
  if (Platform.OS !== 'android') {
    phoneNumber = `telprompt:${phone}`;
  } else {
    phoneNumber = `tel:${phone}`;
  }
  Linking.canOpenURL(phoneNumber)
    .then(supported => {
      if (!supported) {
        Alert.alert('Phone number is not available');
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
    .catch(err => console.log(err));
};

export const sendOnWhatsApp = (phoneNumber) => {
  console.log(phoneNumber,'a')
  console.log('test');
  let msg = 's';
  let mobile = '08067031917';

  if (mobile) {
    if (msg) {
      let url = 'whatsapp://send?phone=' + `${phoneNumber}` + '&text=' + msg;
      Linking.openURL(url)
        .then(() => {
          console.log('WhatasApp Opened');
        })
        .catch(() => {
          alert('Make Sure whatsapp is installed on your device');
        });
    } else {
      console.log('Please insert message to send');
    }
  } else {
    console.log('Please insert mobile no');
  }
};
