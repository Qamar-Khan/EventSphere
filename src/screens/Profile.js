import React, { useState } from "react";
import { View, Text, StatusBar, Image, TouchableOpacity, useWindowDimensions, FlatList } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import images from "../../constants/images";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { photos } from "../../constants/data";


const PhotosRoutes = () => (
    <View style={{ flex: 1 }}>
        <FlatList
            data={photos}
            numColumns={3}
            renderItem={({ item, index }) => (
                <TouchableOpacity style={{
                    flex: 1,
                    aspectRatio: 0.7,
                    margin: 3,
                }} >
                    <Image
                        key={index}
                        source={item}
                        style={{ width: '100%', height: '100%', borderRadius: 12 }} />
                </TouchableOpacity>
            )} />
    </View>
)
const LikesRoutes = () => (
    <View style={{ flex: 1 }}>
    <FlatList
        data={photos}
        numColumns={2}
        renderItem={({ item, index }) => (
            <TouchableOpacity style={{
                flex: 1,
                aspectRatio: 0.7,
                margin: 3,
            }} >
                <Image
                    key={index}
                    source={item}
                    style={{ width: '100%', height: '100%', borderRadius: 12 }} />
            </TouchableOpacity>
        )} />
</View>
)

const renderScene = SceneMap({
    first: PhotosRoutes,
    second: LikesRoutes
});
const Profile = () => {
    const Layout = useWindowDimensions();
    const [index, setIndex] = useState(0);

    const [routes] = useState([
        { key: 'first', title: 'Photos' },
        { key: 'second', title: 'Likes' },
    ])
    const renderTabBar = (props) => {
        <TabBar
        {...props}
        indicatorStyle={{
            backgroundColor: COLORS.primary
        }}
        style={{
            backgroundColor: COLORS.white,
            height: 44
        }}
        renderLabel={({ focused, route }) => (
            <Text style={[{ color: focused ? COLORS.black : COLORS.gray }]}>
                {route.title}
            </Text>
        )}
    /> 
}

  
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: COLORS.white
        }}>

            <View style={{ width: '100%' }}>
                <Image
                    source={images.cover}
                    resizeMode="cover"
                    style={{
                        height: 224,
                        width: '100%'
                    }} />
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Image
                    source={images.profile}
                    style={{
                        height: 155,
                        width: 155,
                        borderRadius: 999,
                        borderColor: COLORS.primary,
                        borderWidth: 2,
                        marginTop: -90
                    }} />
                <Text style={{
                    ...FONTS.h3,
                    color: COLORS.primary,
                    marginVertical: 8,
                    fontWeight: 'bold'
                }}>Muhammad Hamza</Text>
                <Text style={{
                    color: COLORS.black,
                    ...FONTS.body4
                }}>Interior Designer</Text>
                <View style={{
                    flexDirection: 'row',
                    marginVertical: 6,
                    alignItems: 'center',
                }}>
                    <MaterialIcons
                        name='location-on'
                        size={24}
                        color='black'
                    />
                    <Text style={{
                        ...FONTS.body4,
                        marginLeft: 4
                    }}>Lahore, Pakistan</Text>
                </View>
                <View style={{
                    //flex:1,
                    paddingVertical: 8,
                    flexDirection: 'row'
                }}>
                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginRight: 16
                        //marginVertical: SIZES.padding,
                    }}>
                        <Text style={{
                            ...FONTS.body2,
                            fontWeight: 'bold',
                            color: COLORS.primary
                        }}>122</Text>
                        <Text style={{
                            ...FONTS.body4,
                            color: COLORS.primary
                        }}>Followers</Text>
                    </View>

                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'center',

                        //marginVertical: SIZES.padding,
                    }}>
                        <Text style={{
                            ...FONTS.body2,
                            fontWeight: 'bold',
                            color: COLORS.primary
                        }}>67</Text>
                        <Text style={{
                            ...FONTS.body4,
                            color: COLORS.primary
                        }}>Following</Text>
                    </View>
                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginLeft: 16
                        // marginVertical: SIZES.padding,
                    }}>
                        <Text style={{
                            ...FONTS.body2,
                            fontWeight: 'bold',
                            color: COLORS.primary
                        }}>77K</Text>
                        <Text style={{
                            ...FONTS.body4,
                            color: COLORS.primary
                        }}>Likes</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{
                        width: 124,
                        height: 36,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: COLORS.primary,
                        borderRadius: 10,
                        marginHorizontal: SIZES.padding * 2
                    }}>
                        <Text style={{
                            ...FONTS.body4,
                            color: COLORS.white
                        }}>Edit Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        width: 124,
                        height: 36,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: COLORS.primary,
                        borderRadius: 10,
                        marginHorizontal: SIZES.padding * 2
                    }}>
                        <Text style={{
                            ...FONTS.body4,
                            color: COLORS.white
                        }}>Add Friends</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
            <View style={{ flex:1, marginHorizontal: 22, marginTop: 20 }}>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: Layout.width }}
                    renderTabBar={renderTabBar} 
                    />
            </View>
           
        </SafeAreaView>
    )
};
export default Profile;