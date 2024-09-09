import {Tabs} from "expo-router";
import {Image} from "react-native";

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen name='index' options={{
                title: 'Home',
                headerShown: false,
                tabBarIcon: ({size, focused}) => (
                    <Image
                        source={require('../../assets/icons/tabs/pokeball.png')}
                        tintColor={ focused ? undefined : 'gray' }
                        style={{ width: size, height: size }}/>
                ),
            }} />
            <Tabs.Screen name='favorites' options={{
                title: 'Favorites',
                headerShown: false,
                tabBarIcon: ({size, focused}) => (
                    <Image
                        source={require('../../assets/icons/tabs/heart.png')}
                        tintColor={ focused ? undefined : 'gray' }
                        style={{ width: size, height: size }}/>
                ),
            }} />
            <Tabs.Screen name='mine' options={{
                title: 'Mine',
                headerShown: false,
                tabBarIcon: ({size, focused}) => (
                    <Image
                        source={require('../../assets/icons/tabs/trainer.gif')}
                        tintColor={ focused ? undefined : 'gray' }
                        style={{ width: size, height: size }}/>
                ),
            }} />
            <Tabs.Screen name='settings' options={{
                title: 'Settings',
                headerShown: false,
                tabBarIcon: ({size, focused}) => (
                    <Image
                        source={require('../../assets/icons/tabs/cogs.png')}
                        tintColor={ focused ? undefined : 'gray' }
                        style={{ width: size, height: size }}/>
                ),
            }} />
        </Tabs>
    );
}