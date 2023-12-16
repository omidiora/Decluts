import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddItem1 from '../Screen/Product/component/AddItem1';
import AddItem2 from '../Screen/Product/component/AddItem2';
import AddItem3 from '../Screen/Product/component/AddItem3';
import AddItem4 from '../Screen/Product/component/AddItem4';
import EditProductScreen from '../Screen/Product/EditProduct/EditProductScreen';
import EditItem1 from '../Screen/Product/EditProduct/Editcomponent/EditItem1';
import EditItem2 from '../Screen/Product/EditProduct/Editcomponent/EditItem2';
import EditItem3 from '../Screen/Product/EditProduct/Editcomponent/EditItem3';
import EditItem4 from '../Screen/Product/EditProduct/Editcomponent/EditItem4';
const Stack = createNativeStackNavigator();

const ProductNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Item1" component={AddItem1} />
      <Stack.Screen name="Item2" component={AddItem2} />
      <Stack.Screen name="Item3" component={AddItem3} />
      <Stack.Screen name="Item4" component={AddItem4} />

      <Stack.Group>
        <Stack.Screen name="EditItem1" component={EditItem1} />
        <Stack.Screen name="EditItem2" component={EditItem2} />
        <Stack.Screen name="EditItem3" component={EditItem3} />
        <Stack.Screen name="EditItem4" component={EditItem4} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
export default ProductNavigation;
