import {
    ActivityIndicator,
    Alert,
    FlatList, Modal,
    SafeAreaView, ScrollView,
    StatusBar,
    StyleSheet,
    Text, TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {useEffect, useState} from "react";
import {FAB} from "react-native-paper";
import axios from "axios";
import Toast from "react-native-toast-message";
import {FadeIn, FadeOutDown} from "react-native-reanimated";
import Animated from 'react-native-reanimated';
import DropDownPicker from "react-native-dropdown-picker";


const API_URL = 'http://10.0.2.2:8000/api/';
function Home({navigation}) {


    const [list, setList] = useState([]);
    const [error, setError] = useState();
    const [refreshing ,setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [counte, setCount] = useState(0);

    const [cout, setCounter] = useState([]);


    const totalQuantity = list.length > 0 ? list.reduce((total, item) => total + item.quantite, 0) : 0;

    useEffect(() => {
        setCount(list.length);
    }, [list]);


    const numRows = list.length;

     // Initial accumulator is 0

    const  handleRefresh = () => {
        setRefreshing(true);
        fetchData();
        Count();
        setRefreshing(false)
    }

    const URL_DELETE = 'http://10.0.2.2:8000/api/Delete_all';
    const API = "http://10.0.2.2:8000/api/TB_materiel";


    const Count = () => {
        axios.get(API)
            .then(response => {
                // Handle successful response
                setCounter(response.data);
                console.log(response.data)
                setLoading(false);
            })
            .catch(error => {
                // Handle error
                setError(error.message);
            });
    }


    const fetchData = () => {
        axios.get(API_URL)
            .then(response => {
                // Handle successful response
                setList(response.data);
                setLoading(false);
            })
            .catch(error => {
                // Handle error
                setError(error.message);
            });
    }

    const handleDelete = async () => {

        // Make DELETE request using Axios
        axios.delete(URL_DELETE)
            .then(response => {
                const showToast = () => {
                    Toast.show({
                        type: 'error',
                        text1: 'SUPPRESSION',
                        text2: 'Tout les donners on été supprimer 🎯'
                    });
                }
                // Handle successful response
                showToast();
                setList(response.data)
            })
            .catch(error => {
                // Handle error
                console.error('Error:', error);
                Alert.alert('Error', 'Failed to make DELETE request');
            });
    };

    useEffect(() => {
        // Make GET request using Axios
        Count();
    }, []);

    useEffect(() => {
        // Make GET request using Axios
        fetchData();
    }, []);

    const [selectedItem, setSelectedItem] = useState(null);

    const handleSelectItem = (item) => {
        setSelectedItem(item);
        setUpdate(true);
    };

    if (loading){
        return (
            <SafeAreaView style={styles.safe}>
                <ActivityIndicator size={"large"} color="0000"/>
                <Text>Chargement...</Text>
            </SafeAreaView>
        )
    }


    const render = ({ item }) => (
        <View className={"flex flex-row justify-center rounded-lg items-center mx-4 space-x-2 py-1 p-2 bg-indigo-500"}>
            <Text className={"text-white font-bold text-lg uppercase"}>{item.etat} :</Text>
            <Text className={"text-white font-medium text-lg"}>{item.count}</Text>
        </View>
    );

    const renderItem = ({ item }) => (
        <Animated.View entering={FadeIn} exiting={FadeOutDown} className="px-6 flex space-y-4 ml-2 py-2 bg-indigo-500 my-2 items-start mx-4 shadow-2xl rounded-lg">
            <View className={"flex flex-row justify-around space-x-9"}>
                <Text className={"bg-slate-200 px-4 py-5 text-2xl text-center text-indigo-500 font-bold rounded-full"}>{item.id}</Text>
                <View className={"flex flex-col justify-center"}>
                    <View className={"flex flex-row space-x-2"}>
                        <Text className="text-white font-bold uppercase">Designation:</Text>
                        <Text className={"text-white font-medium"}>{item.design}</Text>
                    </View>
                    <View className={"flex flex-row space-x-2"}>
                        <Text className="text-white font-bold uppercase">Etat:</Text>
                        <Text className={"text-white font-medium"}>{item.etat}</Text>
                    </View>
                    <View className={"flex flex-row space-x-2"}>
                        <Text className="text-white font-bold uppercase">Quantité:</Text>
                        <Text className={"text-white font-medium"}>{item.quantite}</Text>
                    </View>
                </View>
                <View className={"flex flex-col justify-center space-y-2"}>
                    <TouchableOpacity onPress={() => Delete(item.id)} className={"border border-spacing-1 border-gray-300 rounded-lg p-2"}>
                        <Text className={"text-red-500 uppercase font-bold"}>supprimer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleSelectItem(item)} className={"border border-spacing-1 border-gray-300 rounded-lg p-2"}>
                        <Text className={" text-center text-yellow-500 uppercase font-bold"}>modifier</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Animated.View>
    );



    const Update = (id) => {
        // Define the API endpoint URL
        const API_URL = `http://10.0.2.2:8000/api/modify_materiel/${id}`;
        // Define the data you want to send
        const Putdata = {
            design: val1,
            etat: val2,
            quantite: val3
        };

        // Make POST request using Axios
        axios.post(API_URL, Putdata)
            .then(response => {
                // Handle successful response
                console.log('Response:', response.data);
                Toast.show({
                    type: 'info',
                    text1: 'Modification',
                    text2: 'Materiel modifier avec succées 👋'
                })
                CleanVal();
                setModale(false);
                fetchData();
                Count();
            })
            .catch(error => {
                // Handle error
                console.error('Error:', error);
                Alert.alert('Error', 'Failed to make POST request');
            });
    };
    const handlePost = () => {
        // Define the API endpoint URL
        const API_URL = 'http://10.0.2.2:8000/api/ajout_materiel';
        // Define the data you want to send
        const postData = {
            design: val1,
            etat: val2,
            quantite: val3
        };

        // Make POST request using Axios
        axios.post(API_URL, postData)
            .then(response => {
                // Handle successful response
                console.log('Response:', response.data);
                Toast.show({
                    type: 'success',
                    text1: 'AJOUT',
                    text2: 'Materiel ajouter avec succées 👋'
                })
               setModale(false);
                fetchData();
                Count();
                CleanVal();
            })
            .catch(error => {
                // Handle error
                console.error('Error:', error);
                Alert.alert('Error', 'Failed to make POST request');
            });
    };
    const CleanVal= () => {
        setVal1("");
        setVal2("");
        setVal3("");
    }

    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        {label: 'bon', value: 'bon'},
        {label: 'mauvais', value: 'mauvais'},
        {label: 'abime', value: 'abime'}
    ]);

    const Delete = async (id) => {
        try {
            // Make DELETE request to remove data
            await axios.delete(`http://10.0.2.2:8000/api/${id}/delete_materiel`);
            const showToast = () => {
                Toast.show({
                    type: 'error',
                    text1: 'SUPPRESSION',
                    text2: 'cette donner a été supprimer 🎯'
                });
            }
            // Handle successful response
            showToast();
            // After successful delete, fetch the updated data
            fetchData();
            Count();
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };


    const [val1, setVal1] = useState('');
    const [val2, setVal2] = useState('');
    const [val3, setVal3] = useState('');


    const [Modale, setModale] = useState(false);

    const [UpdateModale, setUpdate] = useState(false);



    console.log(list)
    return (
            <View style={{ flex: 1}} className="pt-10 bg-slate-900">
                <Text className={"text-center font-bold text-2xl text-indigo-500 uppercase underline-offset-2 mb-4"}>liste materiel informatique</Text>
                <FlatList
                    data={list}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    ListEmptyComponent={() =>
                        <View className={"justify-center items-center mt-52s"}>
                            <Text className={"text-3xl mt-24 justify-center text-center text-indigo-500 font-bold"}>Aucun donner!</Text>
                        </View>
                    }
                    disableRightSwipe
                    rightOpenValue={-60}
                    rightActionValue={100}
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                />
                <Modal
                    visible={Modale}
                    onRequestClose={() => setModale(false)}
                    animationType={'fade'}
                    presentationStyle={'fullScreen'}>
                    <View className={"pt-24 bg-slate-900 h-screen"}>
                        <Text className="text-center text-2xl uppercase font-bold text-indigo-500 my-4">Materiel</Text>
                        <View className={"flex mx-6"}>
                            <View className={"my-4 space-y-2"}>
                                <Text className={"font-bold text-lg text-indigo-500"}>Designation</Text>
                                <TextInput onChangeText={text => setVal1(text)}
                                           value={val1} className={"bg-gray-200 placeholder:bg-slate-200 rounded-lg border-2 border-gray-300 px-4 py-2 focus:border-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-700"} placeholder={"Designation"} />
                            </View>
                            <View className={"my-4 space-y-2"}>
                                <Text className={"font-bold text-lg text-indigo-500"}>Etat</Text>

                                <DropDownPicker
                                    open={open}
                                    value={val2}
                                    items={items}
                                    setOpen={setOpen}
                                    setValue={setVal2}
                                    onChangeText={text => setVal2(text)}
                                    setItems={setItems}
                                />
                            </View>
                            <View className={"my-4 space-y-2"}>
                                <Text className={"font-bold text-lg text-indigo-500"}>Quantité</Text>
                                <TextInput  onChangeText={text => setVal3(text)}
                                            value={val3} keyboardType={"numeric"} className={"bg-gray-200 rounded-lg placeholder:bg-slate-200 border-2 border-gray-300 px-4 py-2 focus:border-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-700"} placeholder={"Quantité"} />
                            </View>
                            <View className={"flex mt-8 justify-between space-x-8 flex-row"}>
                                <TouchableOpacity onPress={handlePost} className={"bg-indigo-500 flex-grow px-6 py-2 rounded-lg"}>
                                    <Text className={"text-white text-center font-bold capitalize text-lg"}>ajouter</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModale(false)} className={"bg-gray-300 flex-grow px-6 py-2 rounded-lg"}>
                                    <Text className={"text-slate-700 text-center font-bold capitalize text-lg"}>retour</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal
                    visible={UpdateModale}
                    onRequestClose={() => setUpdate(false)}
                    animationType={'fade'}
                    presentationStyle={'fullScreen'}>
                    <View className={"pt-24 bg-slate-900 h-screen"}>
                        <Text className="text-center text-2xl uppercase font-bold text-indigo-500 my-4">Modification Materiel</Text>
                        <View className={"flex mx-6"}>
                            <View className={"my-4 space-y-2"}>
                                <Text className={"font-bold text-lg text-indigo-500"}>Designation</Text>
                                <TextInput onChangeText={text => setVal1(text)}
                                           value={val1} className={"bg-gray-200 placeholder:bg-slate-200 rounded-lg border-2 border-gray-300 px-4 py-2 focus:border-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-700"} placeholder={String(selectedItem?.design)} />
                            </View>
                            <View className={"my-4 space-y-2"}>
                                <Text className={"font-bold text-lg text-indigo-500"}>Etat</Text>

                                <DropDownPicker
                                    open={open}
                                    value={val2}
                                    items={items}
                                    setOpen={setOpen}
                                    setValue={setVal2}
                                    onChangeText={text => setVal2(text)}
                                    setItems={setItems}
                                />
                            </View>
                            <View className={"my-4 space-y-2"}>
                                <Text className={"font-bold text-lg text-indigo-500"}>Quantité</Text>
                                <TextInput onChangeText={text => setVal3(text)}
                                           value={val3}    keyboardType={"numeric"} className={"bg-gray-200 rounded-lg placeholder:bg-slate-200 border-2 border-gray-300 px-4 py-2 focus:border-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-700"} placeholder={String(selectedItem?.quantite)} />
                            </View>
                            <View className={"flex mt-8 justify-between space-x-8 flex-row"}>
                                <TouchableOpacity onPress={() =>Update(selectedItem?.id)} className={"bg-yellow-300 flex-grow px-6 py-2 rounded-lg"}>
                                    <Text className={"text-slate-700 text-center font-bold capitalize text-lg"}>Modifier</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setUpdate(false)} className={"bg-gray-300 flex-grow px-6 py-2 rounded-lg"}>
                                    <Text className={"text-slate-700 text-center font-bold capitalize text-lg"}>retour</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <View className={"flex space-y-2 p-4 justify-center"}>
                    <Text className={"text-indigo-500 font-bold text-2xl uppercase"}>Total</Text>
                    <View className={"flex flex-col space-y-2"}>
                        <View className={"flex flex-row space-x-4"}>
                            <Text className={"text-indigo-500 font-bold text-lg uppercase"}>Nombre de materiel:</Text>
                            <Text className={"text-slate-50 font-bold text-lg uppercase"}>{numRows}</Text>
                        </View>
                        <View className={"flex flex-row space-x-4"}>
                            <Text className={"text-indigo-500 font-bold text-lg uppercase"}>Quantité de materiel:</Text>
                            <Text className={"text-slate-50 font-bold text-lg uppercase"}>{totalQuantity}</Text>
                        </View>
                    </View>
                </View>

                <FlatList
                    data={cout}
                    renderItem={render}
                    horizontal
                    ListEmptyComponent={() =>
                        <View className={"justify-center items-center mt-52s"}>
                            <Text className={"text-3xl mt-24 justify-center text-center text-white font-bold"}>Aucun donner!</Text>
                        </View>
                    }
                    disableRightSwipe
                    rightOpenValue={-60}
                    rightActionValue={100}
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                />


                <FAB
                    icon="plus"
                    style={styles.fab}
                    mode={"elevated"}
                    onPress={() => setModale(true)}
                />
                <FAB
                    icon="delete"
                    style={styles.fab1}
                    mode={"elevated"}
                    onPress={handleDelete}
                />
            </View>

    );
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 80,
    },
    fab1: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 150,
    },
    safe:{
        padding: StatusBar.currentHeight,
        flex:1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2D0C57"
    }
});


export default Home;